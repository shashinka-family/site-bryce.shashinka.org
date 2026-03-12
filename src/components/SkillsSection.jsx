import { motion } from 'framer-motion';
import { skillCategories } from '../data/skills';

export default function SkillsSection() {
  return (
    <section id="skills" className="py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-blue-700 text-sm tracking-[0.2em] uppercase mb-4 font-medium">
            Expertise
          </p>
          <h2 className="text-4xl md:text-5xl font-light text-slate-900 tracking-tight">
            Skills &amp; Technologies
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-shadow duration-500"
            >
              <div
                className={`inline-flex px-3 py-1 rounded-full bg-gradient-to-r ${category.gradient} text-white text-xs font-medium mb-6`}
              >
                {category.label}
              </div>

              <div className="flex flex-wrap gap-2">
                {category.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 bg-slate-100 text-slate-700 text-sm rounded-lg"
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
