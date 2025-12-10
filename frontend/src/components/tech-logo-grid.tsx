import { motion } from "framer-motion";

interface TechLogo {
  name: string;
  logo: string;
}

interface TechLogoGridProps {
  technologies: TechLogo[];
}

export function TechLogoGrid({ technologies }: TechLogoGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
      {technologies.map((tech, index) => (
        <motion.div
          key={tech.name}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          whileHover={{ scale: 1.1 }}
          className="flex items-center justify-center p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors"
        >
          <div className="relative w-16 h-16 grayscale hover:grayscale-0 transition-all">
            <img
              src={tech.logo}
              alt={tech.name}
              className="w-full h-full object-contain"
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}



