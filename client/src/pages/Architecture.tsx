import { motion } from "framer-motion";
import ArchitectureBuilder from "@/components/ArchitectureBuilder";
import { Layers, Sparkles } from "lucide-react";

export default function Architecture() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header Section - Blue Themed */}
      <div className="bg-[#001A33] border-b border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[40%] -left-[10%] w-[70%] h-[70%] rounded-full bg-blue-600/10 blur-[120px]" />
        </div>
        
        <div className="container py-16 md:py-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider"
            >
              <Layers className="w-3 h-3" />
              <span>Solution Design</span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold tracking-tight text-white"
            >
              Architecture <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Builder</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-slate-400 leading-relaxed"
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
            <div className="flex items-center gap-2 text-white">
              <Sparkles className="w-5 h-5 text-blue-400" />
              <h2 className="text-2xl font-bold">Interactive Canvas</h2>
            </div>
            <ArchitectureBuilder />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
