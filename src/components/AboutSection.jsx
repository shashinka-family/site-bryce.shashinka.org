import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

const stats = [
  { label: 'Experience', value: '20 Years' },
  { label: 'Focus', value: 'CM & Infrastructure' },
  { label: 'Education', value: 'BS Business Management' },
  { label: 'Certification', value: 'Six Sigma Green Belt' },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-32 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-2 gap-16 items-start"
        >
          {/* Left column — prose */}
          <div>
            <p className="text-blue-700 text-sm tracking-[0.2em] uppercase mb-4 font-medium">
              About Me
            </p>
            <h2 className="text-4xl md:text-5xl font-light text-slate-900 mb-8 tracking-tight">
              Crafting systems that work
            </h2>
            <div className="space-y-6 text-slate-600 leading-relaxed">
              <p>
                Twenty years in technology — starting with a residential IT support business I founded in 2006, through aerospace supply chains at Pratt & Whitney, into configuration management and master data at ASML in semiconductor manufacturing. Every role reinforced the same principle: disciplined systems thinking scales, whether the deliverable is a jet engine BoM or a cloud deployment pipeline.
              </p>
              <p>
                That thread now comes full circle with BPS Enterprises and 1507 Systems, the managed service provider I relaunched in 2024. I design infrastructure, automate operations, and secure networks for small and mid-size businesses — production systems, not prototypes. An AS in Computer Engineering gave me the technical baseline; a BS in Business Management and a Six Sigma Green Belt sharpened the operational and leadership edge.
              </p>
              <p>
                I build things that run. Infrastructure that holds up under load, automation that eliminates repetitive work, and documentation that makes the next person's job easier. Currently looking for the right engineering team where that mindset fits — individual contributor or technical lead.
              </p>
            </div>

            <div className="mt-8 flex items-center gap-2 text-slate-500">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">Connecticut</span>
            </div>
          </div>

          {/* Right column — stats grid */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="border border-slate-200 rounded-xl p-6 hover:border-blue-500 transition-colors duration-300"
              >
                <p className="text-blue-700 text-xs uppercase tracking-widest mb-2">{stat.label}</p>
                <p className="text-slate-900 text-xl font-semibold">{stat.value}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
