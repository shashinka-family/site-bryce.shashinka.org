import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

// Production Turnstile site key — widget "bryce.shashinka.org Contact Form"
// in the 1507 Systems CF account, managed mode, domain-scoped to
// bryce.shashinka.org. Rotate by minting a new widget via
// `wicket get cloudflare/turnstile` and updating this string.
const TURNSTILE_SITE_KEY = '0x4AAAAAABnJv4z3QpLQTdnE';

const contactLinks = [
  {
    label: 'LinkedIn',
    url: 'https://linkedin.com/in/shashinka',
    display: 'linkedin.com/in/shashinka',
    icon: Linkedin,
    hoverBg: 'hover:bg-blue-600 hover:text-white hover:border-blue-600',
  },
  {
    label: 'GitHub',
    url: 'https://github.com/bryce-shashinka',
    display: 'github.com/bryce-shashinka',
    icon: Github,
    hoverBg: 'hover:bg-slate-900 hover:text-white hover:border-slate-900',
  },
];

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');
  const turnstileRef = useRef(null);
  const widgetIdRef = useRef(null);

  // Load Turnstile script and render widget
  useEffect(() => {
    // Only load once
    if (document.querySelector('script[src*="challenges.cloudflare.com"]')) {
      // Script already loaded, render widget if turnstile API is ready
      if (window.turnstile && turnstileRef.current && widgetIdRef.current === null) {
        widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          callback: (token) => setTurnstileToken(token),
          'expired-callback': () => setTurnstileToken(''),
          theme: 'light',
        });
      }
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (turnstileRef.current && widgetIdRef.current === null) {
        widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          callback: (token) => setTurnstileToken(token),
          'expired-callback': () => setTurnstileToken(''),
          theme: 'light',
        });
      }
    };
    document.head.appendChild(script);

    return () => {
      // Reset widget on unmount
      if (widgetIdRef.current !== null && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, []);

  const handleChange = useCallback((e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    if (!turnstileToken) {
      setStatus('error');
      setErrorMsg('Please complete the verification challenge.');
      return;
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          turnstileToken,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Request failed (${res.status})`);
      }

      setStatus('success');
      setForm({ name: '', email: '', message: '' });
      // Reset Turnstile widget for potential future submission
      if (widgetIdRef.current !== null && window.turnstile) {
        window.turnstile.reset(widgetIdRef.current);
        setTurnstileToken('');
      }
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <section id="contact" className="py-32 bg-slate-50">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-blue-700 text-sm tracking-[0.2em] uppercase mb-4 font-medium">
            Get in Touch
          </p>
          <h2 className="text-4xl md:text-5xl font-light text-slate-900 tracking-tight mb-6">
            Let's connect
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            Interested in discussing opportunities, technical projects, or collaboration? Send a message or reach out through LinkedIn or GitHub.
          </p>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          {status === 'success' ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Message Sent</h3>
              <p className="text-slate-500 mb-6">
                Thanks for reaching out. I'll get back to you soon.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 p-8 space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                {/* Name */}
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-medium text-slate-700 mb-1.5">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    placeholder="Your name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="contact-email" className="block text-sm font-medium text-slate-700 mb-1.5">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="contact-message" className="block text-sm font-medium text-slate-700 mb-1.5">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  required
                  value={form.message}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
                  placeholder="What would you like to discuss?"
                />
              </div>

              {/* Turnstile widget */}
              <div className="flex justify-center">
                <div ref={turnstileRef} />
              </div>

              {/* Error */}
              {status === 'error' && (
                <div className="flex items-start gap-2 text-red-600 text-sm bg-red-50 rounded-lg p-3 border border-red-200">
                  <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={status === 'submitting' || !turnstileToken}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white rounded-lg px-8 py-3 text-sm font-medium transition-colors flex items-center justify-center gap-2"
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid md:grid-cols-2 gap-6"
        >
          {contactLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-4 p-6 bg-white rounded-xl border border-slate-200 transition-all duration-300 group ${link.hoverBg}`}
              >
                <div className="p-3 bg-slate-100 rounded-xl group-hover:bg-white/20 transition-colors">
                  <Icon className="w-6 h-6 text-slate-600 group-hover:text-current transition-colors" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900 group-hover:text-current transition-colors">
                    {link.label}
                  </p>
                  <p className="text-sm text-slate-500 group-hover:text-current/80 transition-colors">
                    {link.display}
                  </p>
                </div>
              </a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
