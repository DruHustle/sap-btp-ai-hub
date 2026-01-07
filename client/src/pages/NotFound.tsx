import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Search, BookOpen, Zap, Layers } from "lucide-react";
import { useLocation, Link } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 p-6">
      <div className="max-w-2xl w-full text-center space-y-12">
        {/* Animated Illustration */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative inline-block"
        >
          <div className="absolute inset-0 bg-blue-100 rounded-full blur-3xl opacity-50 animate-pulse" />
          <div className="relative bg-white p-12 rounded-full shadow-2xl border border-slate-100">
            <Search className="h-24 w-24 text-blue-600" />
          </div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute -top-4 -right-4 bg-slate-900 text-white text-4xl font-black px-6 py-3 rounded-2xl shadow-xl"
          >
            404
          </motion.div>
        </motion.div>

        <div className="space-y-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight"
          >
            Lost in the <span className="text-blue-600">Cloud?</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-slate-600 max-w-md mx-auto leading-relaxed"
          >
            The page you're looking for has drifted away. Let's get you back to the SAP BTP AI Hub.
          </motion.p>
        </div>

        {/* Quick Links */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          <Link href="/tutorials">
            <div className="p-4 bg-white rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all cursor-pointer group">
              <BookOpen className="w-6 h-6 text-blue-600 mb-2 mx-auto group-hover:scale-110 transition-transform" />
              <span className="text-sm font-bold text-slate-900">Tutorials</span>
            </div>
          </Link>
          <Link href="/playground">
            <div className="p-4 bg-white rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all cursor-pointer group">
              <Zap className="w-6 h-6 text-amber-500 mb-2 mx-auto group-hover:scale-110 transition-transform" />
              <span className="text-sm font-bold text-slate-900">Playground</span>
            </div>
          </Link>
          <Link href="/architecture">
            <div className="p-4 bg-white rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all cursor-pointer group">
              <Layers className="w-6 h-6 text-purple-600 mb-2 mx-auto group-hover:scale-110 transition-transform" />
              <span className="text-sm font-bold text-slate-900">Architecture</span>
            </div>
          </Link>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
        >
          <Button
            onClick={() => setLocation("/")}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-2xl text-lg font-bold shadow-lg shadow-blue-200 transition-all hover:-translate-y-1"
          >
            <Home className="w-5 h-5 mr-2" />
            Back to Home
          </Button>
          <Button
            onClick={() => window.history.back()}
            variant="outline"
            size="lg"
            className="px-8 py-6 rounded-2xl text-lg font-bold border-slate-200 hover:bg-slate-100 transition-all"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
