import { motion } from 'framer-motion';
import { Briefcase, MapPin, ExternalLink } from 'lucide-react';
import { experiences } from '../data/experience';

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-32 bg-slate-50">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-blue-700 text-sm tracking-[0.2em] uppercase mb-4 font-medium">
            Career Journey
          </p>
          <h2 className="text-4xl md:text-5xl font-light text-slate-900 tracking-tight">
            Work Experience
          </h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-slate-200 transform md:-translate-x-1/2" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 w-3 h-3 bg-blue-700 rounded-full transform -translate-x-1/2 mt-6 ring-4 ring-white" />

                {/* Content card */}
                <div
                  className={`md:w-1/2 ${
                    index % 2 === 0 ? 'md:pl-12' : 'md:pr-12'
                  } pl-8 md:pl-0`}
                >
                  <div className="bg-white rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-slate-900">
                          {exp.position}
                        </h3>
                        <div className="flex items-center gap-2 text-blue-700 mt-1">
                          <Briefcase className="w-4 h-4" />
                          <span className="font-medium">{exp.company}</span>
                        </div>
                      </div>
                      {exp.isCurrent && (
                        <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">
                          Current
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-slate-500 mb-4">
                      <span>
                        {exp.startYear} — {exp.endYear}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {exp.location}
                      </span>
                    </div>

                    <p className="text-slate-600 leading-relaxed">{exp.description}</p>

                    {exp.url && (
                      <a
                        href={exp.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 mt-4 text-blue-700 hover:text-blue-800 text-sm font-medium transition-colors"
                      >
                        {exp.url.replace('https://', '')}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
