import { motion } from "framer-motion";
import ArchitectureBuilder from "@/components/ArchitectureBuilder";
import { Layers, Sparkles } from "lucide-react";

export default function Architecture() {
  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* Header Section */}
      <div className="bg-white border-b border-slate-200">
        <div className="container py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider"
            >
              <Layers className="w-3 h-3" />
              <span>Solution Design</span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900"
            >
              Architecture <span className="text-blue-600">Builder</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-slate-600 leading-relaxed"
            >
              Design your SAP BTP AI solution architecture with our interactive drag-and-drop builder. Visualize connections between AI Core, HANA, and Generative AI Hub.
            </motion.p>
          </div>
        </div>
      </div>

      <div className="container py-12 md:py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <div className="flex items-center gap-2 text-slate-900">
              <Sparkles className="w-5 h-5 text-blue-600" />
              <h2 className="text-2xl font-bold">Interactive Canvas</h2>
            </div>
            <ArchitectureBuilder />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
