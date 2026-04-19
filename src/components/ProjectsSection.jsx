import { motion } from 'framer-motion';
import { projects } from '../data/projects';

// Status pill colors. Add new statuses here as the showcase rotates.
const statusStyles = {
  Live: 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30',
  'Live (beta)': 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30',
  'Open source': 'bg-violet-500/15 text-violet-300 border border-violet-500/30',
  'Pre-launch': 'bg-amber-500/15 text-amber-300 border border-amber-500/30',
  'Private beta': 'bg-slate-500/20 text-slate-300 border border-slate-500/40',
};

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-32 bg-slate-800">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-blue-300 text-sm tracking-[0.2em] uppercase mb-4 font-medium">
            Portfolio
          </p>
          <h2 className="text-4xl md:text-5xl font-light text-white tracking-tight">
            Featured Projects
          </h2>
          <p className="text-slate-400 text-sm mt-4 max-w-xl mx-auto">
            A curated rotation of the work that's currently most worth showing.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-slate-700/60 rounded-2xl p-8 border border-slate-600 hover:border-slate-400 transition-all duration-500"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <h3 className="text-xl font-semibold text-white">
                  {project.url ? (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-300 transition-colors"
                    >
                      {project.title}
                    </a>
                  ) : (
                    project.title
                  )}
                </h3>
                {project.status && (
                  <span
                    className={`shrink-0 px-2 py-0.5 text-[10px] uppercase tracking-wider rounded-full ${
                      statusStyles[project.status] || 'bg-slate-700 text-slate-300 border border-slate-600'
                    }`}
                  >
                    {project.status}
                  </span>
                )}
              </div>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-slate-800 text-slate-400 text-xs rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mt-16"
        >
          <a
            href="https://1507.systems/apps"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-300 hover:text-blue-200 text-sm font-medium tracking-wide group"
          >
            See the full catalog at 1507.systems
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
