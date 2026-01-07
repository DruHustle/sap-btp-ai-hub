import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, BookOpen, Code2, Zap, Brain, FileText, Users, Sparkles, ShieldCheck, Database } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  const tutorials = [
    {
      id: 1,
      title: "Getting Started with SAP BTP Trial",
      description: "Learn how to set up your SAP BTP trial account and provision AI services.",
      difficulty: "Beginner",
      duration: "15 min",
      icon: BookOpen,
      color: "from-blue-50 to-blue-100 text-blue-600",
    },
    {
      id: 2,
      title: "Exploring the Generative AI Hub Playground",
      description: "Discover LLMs and craft effective prompts using the interactive playground.",
      difficulty: "Beginner",
      duration: "20 min",
      icon: Zap,
      color: "from-amber-50 to-amber-100 text-amber-600",
    },
    {
      id: 3,
      title: "Building a RAG Solution with SAP BTP",
      description: "Create a Retrieval-Augmented Generation system for context-aware answers.",
      difficulty: "Intermediate",
      duration: "45 min",
      icon: Brain,
      color: "from-purple-50 to-purple-100 text-purple-600",
    },
    {
      id: 4,
      title: "Creating AI Agents with Joule Studio",
      description: "Build intelligent agents that perform multi-step tasks autonomously.",
      difficulty: "Intermediate",
      duration: "50 min",
      icon: Users,
      color: "from-green-50 to-green-100 text-green-600",
    },
    {
      id: 5,
      title: "Automating Document Processing",
      description: "Use SAP Document AI to extract and classify information automatically.",
      difficulty: "Intermediate",
      duration: "40 min",
      icon: FileText,
      color: "from-red-50 to-red-100 text-red-600",
    },
    {
      id: 6,
      title: "Advanced Topics - Custom AI Models",
      description: "Build and deploy custom machine learning models on SAP BTP.",
      difficulty: "Advanced",
      duration: "60 min",
      icon: Code2,
      color: "from-indigo-50 to-indigo-100 text-indigo-600",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[40%] -left-[10%] w-[70%] h-[70%] rounded-full bg-blue-600/20 blur-[120px]" />
          <div className="absolute -bottom-[40%] -right-[10%] w-[70%] h-[70%] rounded-full bg-indigo-600/20 blur-[120px]" />
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-4"
            >
              <Sparkles className="w-4 h-4" />
              <span>The Future of Enterprise AI is Here</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-[1.1]"
            >
              Master AI Solutions on <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">SAP BTP</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed"
            >
              Learn hands-on how to build, deploy, and integrate AI-powered solutions using SAP Business Technology Platform. From foundational concepts to advanced implementations.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
            >
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-7 text-lg rounded-xl flex items-center gap-2 transition-all hover:shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                onClick={() => document.getElementById("tutorials")?.scrollIntoView({ behavior: "smooth" })}
              >
                Explore Tutorials
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Link href="/playground">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-slate-700 text-white hover:bg-slate-800 px-8 py-7 text-lg rounded-xl"
                >
                  Try Playground
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                title: "Enterprise Integration",
                description: "Seamlessly integrate AI with your existing SAP systems and data with production-ready patterns.",
                icon: Sparkles,
                color: "bg-blue-50 text-blue-600"
              },
              {
                title: "Governance & Security",
                description: "Built-in compliance, security, and governance for enterprise-grade AI implementations.",
                icon: ShieldCheck,
                color: "bg-indigo-50 text-indigo-600"
              },
              {
                title: "Business Context",
                description: "Leverage your business data to create contextual, accurate AI solutions that matter.",
                icon: Database,
                color: "bg-slate-50 text-slate-600"
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="space-y-4"
              >
                <div className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center mb-6`}>
                  <item.icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed text-justify">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tutorials Section */}
      <section id="tutorials" className="py-24 bg-slate-50/50 border-y border-slate-100">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl space-y-4">
              <h2 className="text-4xl font-bold text-slate-900">Hands-On Tutorials</h2>
              <p className="text-lg text-slate-600">
                Learn through practical, step-by-step guides covering everything from basics to advanced topics.
              </p>
            </div>
            <Button variant="ghost" className="text-blue-600 hover:text-blue-700 font-bold gap-2" asChild>
              <Link href="/tutorials">View all tutorials <ArrowRight className="w-4 h-4" /></Link>
            </Button>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {tutorials.map((tutorial) => {
              const Icon = tutorial.icon;
              return (
                <motion.div key={tutorial.id} variants={itemVariants}>
                  <Card className="group h-full border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
                    <CardContent className="p-8 flex flex-col h-full">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tutorial.color.split(' ').slice(0,2).join(' ')} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                        <Icon className={`w-6 h-6 ${tutorial.color.split(' ').pop()}`} />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">{tutorial.title}</h3>
                      <p className="text-slate-600 mb-6 text-sm leading-relaxed flex-1 text-justify">{tutorial.description}</p>
                      
                      <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                        <div className="flex gap-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold">
                            {tutorial.difficulty}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold">
                            {tutorial.duration}
                          </span>
                        </div>
                        <Button
                          asChild
                          variant="ghost"
                          size="sm"
                          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-bold p-0"
                        >
                          <Link href={`/tutorials/${tutorial.id}`}>
                            Start <ArrowRight className="ml-1 w-4 h-4" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Resources Section */}
      <section id="resources" className="py-24 bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold text-slate-900">Resources & Links</h2>
            <p className="text-lg text-slate-600">Expand your knowledge with official documentation and community resources.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "Official SAP Documentation",
                description: "Comprehensive guides and API references from SAP AI Core and Generative AI Hub.",
                url: "https://help.sap.com/docs/sap-ai-core",
                icon: "📚",
              },
              {
                title: "SAP BTP Trial Account",
                description: "Get started with a free trial account to explore SAP BTP AI services today.",
                url: "https://account.hanatrial.ondemand.com",
                icon: "🚀",
              },
              {
                title: "SAP Community",
                description: "Connect with SAP experts, ask questions, and share your AI journey.",
                url: "https://community.sap.com",
                icon: "👥",
              },
              {
                title: "SAP Learning Hub",
                description: "Structured learning paths and official certification programs for AI.",
                url: "https://learning.sap.com",
                icon: "🎓",
              },
            ].map((resource, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="p-8 border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all group">
                  <div className="text-3xl mb-4 group-hover:scale-110 transition-transform inline-block">{resource.icon}</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{resource.title}</h3>
                  <p className="text-slate-600 mb-6 text-sm leading-relaxed text-justify">{resource.description}</p>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-bold transition-colors"
                  >
                    Visit Resource <ArrowRight className="w-4 h-4" />
                  </a>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-20 border-t border-slate-800">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2 space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-white">SAP BTP AI Hub</span>
              </div>
              <p className="max-w-sm leading-relaxed">
                The premier learning destination for mastering AI on SAP Business Technology Platform. Built for developers, by developers.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Learning Hub</h4>
              <ul className="space-y-4 text-sm">
                <li>
                  <a 
                    href="#/" 
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById("tutorials")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="hover:text-white transition-colors"
                  >
                    Tutorials
                  </a>
                </li>
                <li>
                  <a 
                    href="#/" 
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById("resources")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="hover:text-white transition-colors"
                  >
                    Resources
                  </a>
                </li>
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Connect</h4>
              <ul className="space-y-4 text-sm">
                <li><a href="https://github.com/DruHustle" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a></li>
                <li><a href="https://www.linkedin.com/in/andrew-gotora-72966068" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a></li>
                <li><a href="https://x.com/DruHustle" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Twitter</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
            <p>© {new Date().getFullYear()} SAP BTP AI Learning Hub. All rights reserved.</p>
            <p>Built with ❤️ for the SAP Community</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
