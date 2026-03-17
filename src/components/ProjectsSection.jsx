import { motion } from 'framer-motion';
import { projects } from '../data/projects';

// External link icon (arrow pointing out of a box)
function ExternalLinkIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-3.5 h-3.5 inline-block ml-1 -mt-0.5"
    >
      <path
        fillRule="evenodd"
        d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5zm7.25-.75a.75.75 0 01.75-.75h3.5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0V6.31l-5.47 5.47a.75.75 0 01-1.06-1.06l5.47-5.47H12.25a.75.75 0 01-.75-.75z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ProjectCard({ project }) {
  // Determine status badge styling based on status text
  const getStatusClasses = (status) => {
    if (!status) return null;
    if (status === 'Live') {
      return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
    }
    return 'bg-blue-500/15 text-blue-300 border-blue-500/30';
  };

  return (
    <div className="bg-slate-700/60 rounded-2xl p-8 border border-slate-600 hover:border-slate-400 transition-all duration-500">
      {/* Header row with title and optional status badge */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="text-xl font-semibold text-white">
          {project.url ? (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-300 transition-colors"
            >
              {project.title}
              <ExternalLinkIcon />
            </a>
          ) : (
            project.title
          )}
        </h3>
        {project.status && (
          <span
            className={`shrink-0 px-2.5 py-1 text-xs font-medium rounded-full border ${getStatusClasses(project.status)}`}
          >
            {project.status}
          </span>
        )}
      </div>

      <p className="text-slate-400 text-sm mb-4 leading-relaxed">
        {project.description}
      </p>

      {/* Publisher line */}
      {project.publisher && (
        <p className="text-slate-500 text-xs mb-4">
          Publisher: {project.publisher}
        </p>
      )}

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
    </div>
  );
}

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
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
