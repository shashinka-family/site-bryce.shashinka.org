import { motion } from 'framer-motion';
import { projects } from '../data/projects';

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
              <h3 className="text-xl font-semibold text-white mb-3">
                {project.title}
              </h3>
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
      </div>
    </section>
  );
}
