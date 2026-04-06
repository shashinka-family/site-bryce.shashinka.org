/**
 * POST /api/contact — handles contact form submissions.
 *
 * Flow:
 * 1. Parse form data (name, email, message, turnstile token)
 * 2. Verify Turnstile token with CF siteverify API
 * 3. Forward to email-sender worker to deliver notification email
 *
 * Environment variables (set in CF Pages settings):
 * - TURNSTILE_SECRET: Turnstile secret key for server-side verification
 * - EMAIL_SENDER_URL: URL of the email-sender worker (e.g., https://email-sender.1507.workers.dev/send)
 * - EMAIL_SENDER_TOKEN: Bearer token for the email-sender worker
 */

// Only allow POST requests
export async function onRequestPost(context) {
  const { request, env } = context;

  // CORS headers for the frontend
  const corsHeaders = {
    "Access-Control-Allow-Origin": "https://bryce.shashinka.org",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  try {
    const body = await request.json();
    const { name, email, message, turnstileToken } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return Response.json(
        { error: "Name, email, and message are required" },
        { status: 400, headers: corsHeaders }
      );
    }

    if (!turnstileToken) {
      return Response.json(
        { error: "Turnstile verification required" },
        { status: 400, headers: corsHeaders }
      );
    }

    // Verify Turnstile token with Cloudflare
    const turnstileSecret = env.TURNSTILE_SECRET;
    if (!turnstileSecret) {
      console.error("TURNSTILE_SECRET not configured");
      return Response.json(
        { error: "Server configuration error" },
        { status: 500, headers: corsHeaders }
      );
    }

    const verifyResponse = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          secret: turnstileSecret,
          response: turnstileToken,
          remoteip: request.headers.get("CF-Connecting-IP"),
        }),
      }
    );

    const verifyResult = await verifyResponse.json();
    if (!verifyResult.success) {
      return Response.json(
        { error: "Turnstile verification failed. Please try again." },
        { status: 403, headers: corsHeaders }
      );
    }

    // Send notification email via the email-sender worker
    const emailUrl = env.EMAIL_SENDER_URL;
    const emailToken = env.EMAIL_SENDER_TOKEN;

    if (!emailUrl || !emailToken) {
      console.error("EMAIL_SENDER_URL or EMAIL_SENDER_TOKEN not configured");
      return Response.json(
        { error: "Server configuration error" },
        { status: 500, headers: corsHeaders }
      );
    }

    const emailResponse = await fetch(emailUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${emailToken}`,
      },
      body: JSON.stringify({
        subject: `Portfolio Contact: ${name}`,
        text: [
          `New contact from bryce.shashinka.org`,
          ``,
          `Name: ${name}`,
          `Email: ${email}`,
          ``,
          `Message:`,
          message,
          ``,
          `---`,
          `Sent via bryce.shashinka.org contact form`,
          `IP: ${request.headers.get("CF-Connecting-IP") || "unknown"}`,
          `Time: ${new Date().toISOString()}`,
        ].join("\n"),
      }),
    });

    if (!emailResponse.ok) {
      console.error("Email sender failed:", await emailResponse.text());
      return Response.json(
        { error: "Failed to send message. Please try again later." },
        { status: 502, headers: corsHeaders }
      );
    }

    return Response.json(
      { success: true, message: "Message sent successfully" },
      { status: 200, headers: corsHeaders }
    );
  } catch (err) {
    console.error("Contact form error:", err);
    return Response.json(
      { error: "An unexpected error occurred" },
      { status: 500, headers: corsHeaders }
    );
  }
}

// Handle CORS preflight
export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "https://bryce.shashinka.org",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
