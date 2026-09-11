// Curated, rotating showcase. Highest-impact public/ready work goes here;
// the full catalog lives at https://1507.systems/apps. Rotate cards as
// projects mature, launch, or get archived — don't be shy.
//
// Cards are ordered alphabetically by `title`. Keep that order when adding
// or removing entries; the render uses this array order as-is.
export const projects = [
  {
    id: 'applimint',
    title: 'Applimint',
    description:
      'A calm system for a messy search. Personal operations tool for your job search — track every application end to end: company, role, date applied, last contact, next action. No gamification, no LinkedIn login, no nagging notifications.',
    tags: ['React', 'Cloudflare Workers', 'D1', 'Tailwind CSS'],
    status: 'Pre-launch',
    url: 'https://applimint.app',
  },
  {
    id: 'dingus',
    title: 'Dingus',
    description:
      'Push notifications for the stuff you built yourself. A small macOS and iOS client for ntfy — the self-hosted push service. Bring your own ntfy server, subscribe from your pocket, stop paying a SaaS to forward a webhook.',
    tags: ['Swift', 'SwiftUI', 'UserNotifications', 'StoreKit 2'],
    status: 'Pre-launch',
    url: 'https://dingus.app',
  },
  {
    id: 'hellgas-kitchen',
    title: "Hellga's Kitchen",
    description:
      'Custom e-commerce, order management, and customer loyalty platform for an artisan preserved goods business in the Pocono Mountains. Online ordering, event management, customer profiles with loyalty tracking, and a full admin dashboard.',
    tags: ['React', 'Cloudflare Workers', 'D1', 'Tailwind CSS'],
    status: 'Live',
    url: 'https://hellgaskitchen.com',
  },
  {
    id: 'hosthum',
    title: 'HostHum',
    description:
      'Quiet always-on uptime and health monitor for the homelab and beyond. Small Python daemon per host, native macOS menu bar client, no cloud required.',
    tags: ['Python', 'Swift', 'SwiftUI', 'macOS'],
    status: 'Pre-launch',
    url: 'https://hosthum.app',
  },
  {
    id: 'hourchit',
    title: 'HourChit',
    description:
      'Time, mileage, and invoicing for a business of one. Punch in and out, bill the miles you actually drove, and send a real invoice — with quoting on the way.',
    tags: ['Cloudflare Workers', 'D1', 'TypeScript', 'MIT License'],
    status: 'Live',
    url: 'https://hourchit.app',
  },
  {
    id: 'murmurate',
    title: 'Murmurate',
    description:
      'Privacy tool that generates realistic decoy internet traffic to obscure real browsing activity. Runs in the background producing convincing web requests across diverse sites and topics — making it harder for observers to identify what you are actually doing online.',
    tags: ['TypeScript', 'Node.js', 'Privacy', 'Open Source'],
    status: 'Open source',
    url: 'https://github.com/1507-systems/murmurate',
  },
  {
    id: 'narmfinder',
    title: 'NARM Finder',
    description:
      'Free community tool for searching the North American Reciprocal Museum network. Sort 1,500+ museums by distance, filter by restriction codes, pick a home institution and see which restrictions actually apply to you.',
    tags: ['Cloudflare Workers', 'D1', 'Hono', 'Vanilla JS'],
    status: 'Live (beta)',
    url: 'https://narmfinder.app',
  },
];
