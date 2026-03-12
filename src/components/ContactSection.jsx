import { motion } from 'framer-motion';
import { Github, Linkedin } from 'lucide-react';

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
    url: 'https://github.com/shasb',
    display: 'github.com/shasb',
    icon: Github,
    hoverBg: 'hover:bg-slate-900 hover:text-white hover:border-slate-900',
  },
];

export default function ContactSection() {
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
            Interested in discussing opportunities, technical projects, or collaboration — reach out through LinkedIn or GitHub.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
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
