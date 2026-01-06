import { motion } from "framer-motion";
import ArchitectureBuilder from "@/components/ArchitectureBuilder";

export default function Architecture() {
  return (
    <div className="container py-12 md:py-20 space-y-8">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold tracking-tight"
        >
          Architecture Builder
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-muted-foreground"
        >
          Design your SAP BTP AI solution architecture with our drag-and-drop builder.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <ArchitectureBuilder />
      </motion.div>
    </div>
  );
}
