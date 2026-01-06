import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, BookOpen, Code2, Zap, Brain, FileText, Users } from "lucide-react";
import { Link } from "wouter";

/**
 * SAP BTP AI Learning Hub - Home Page
 * Design: Modern Enterprise Minimalism
 * Color Palette: SAP Blue (#0070F2) + Warm Gold (#F5A623)
 * Typography: Poppins (headlines) + Inter (body)
 */

export default function Home() {
  const tutorials = [
    {
      id: 1,
      title: "Getting Started with SAP BTP Trial",
      description: "Learn how to set up your SAP BTP trial account and provision AI services.",
      difficulty: "Beginner",
      duration: "15 min",
      icon: BookOpen,
      color: "from-blue-50 to-blue-100",
    },
    {
      id: 2,
      title: "Exploring the Generative AI Hub Playground",
      description: "Discover LLMs and craft effective prompts using the interactive playground.",
      difficulty: "Beginner",
      duration: "20 min",
      icon: Zap,
      color: "from-amber-50 to-amber-100",
    },
    {
      id: 3,
      title: "Building a RAG Solution with SAP BTP",
      description: "Create a Retrieval-Augmented Generation system for context-aware answers.",
      difficulty: "Intermediate",
      duration: "45 min",
      icon: Brain,
      color: "from-purple-50 to-purple-100",
    },
    {
      id: 4,
      title: "Creating AI Agents with Joule Studio",
      description: "Build intelligent agents that perform multi-step tasks autonomously.",
      difficulty: "Intermediate",
      duration: "50 min",
      icon: Users,
      color: "from-green-50 to-green-100",
    },
    {
      id: 5,
      title: "Automating Document Processing",
      description: "Use SAP Document AI to extract and classify information automatically.",
      difficulty: "Intermediate",
      duration: "40 min",
      icon: FileText,
      color: "from-red-50 to-red-100",
    },
    {
      id: 6,
      title: "Advanced Topics - Custom AI Models",
      description: "Build and deploy custom machine learning models on SAP BTP.",
      difficulty: "Advanced",
      duration: "60 min",
      icon: Code2,
      color: "from-indigo-50 to-indigo-100",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">SAP BTP AI Hub</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#tutorials" className="text-gray-600 hover:text-gray-900 transition-colors">
              Tutorials
            </a>
            <Link href="/playground" className="text-gray-600 hover:text-gray-900 transition-colors">
              Playground
            </Link>
            <a href="#resources" className="text-gray-600 hover:text-gray-900 transition-colors">
              Resources
            </a>
            <a href="#about" className="text-gray-600 hover:text-gray-900 transition-colors">
              About
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: "url('/images/hero-bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative container py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                Master AI Business Solutions on <span className="text-blue-600">SAP BTP</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Learn hands-on how to build, deploy, and integrate AI-powered solutions using SAP Business Technology Platform. From foundational concepts to advanced implementations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-lg flex items-center gap-2 transition-all hover:shadow-lg"
                  onClick={() => document.getElementById("tutorials")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Explore Tutorials
                  <ArrowRight className="w-5 h-5" />
                </Button>
                <Link href="/playground">
                  <Button
                    variant="outline"
                    className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg rounded-lg"
                  >
                    Try Playground
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:flex justify-center">
              <img
                src="/images/ai-core-illustration.png"
                alt="SAP AI Core Architecture"
                className="w-full max-w-md drop-shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Why SAP BTP for AI?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Enterprise Integration",
                description: "Seamlessly integrate AI with your existing SAP systems and data.",
                icon: "🔗",
              },
              {
                title: "Governance & Security",
                description: "Built-in compliance, security, and governance for enterprise-grade AI.",
                icon: "🔒",
              },
              {
                title: "Business Context",
                description: "Leverage your business data to create contextual, accurate AI solutions.",
                icon: "💼",
              },
            ].map((item, idx) => (
              <Card
                key={idx}
                className="p-8 bg-white border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tutorials Section */}
      <section id="tutorials" className="py-20 md:py-32">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Hands-On Tutorials</h2>
            <p className="text-xl text-gray-600">
              Learn through practical, step-by-step guides covering everything from basics to advanced topics.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tutorials.map((tutorial) => {
              const Icon = tutorial.icon;
              return (
                <div
                  key={tutorial.id}
                  className="tutorial-card p-6 hover:scale-105 transition-transform duration-300"
                >
                  <div className={`bg-gradient-to-br ${tutorial.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-gray-700" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{tutorial.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{tutorial.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex gap-3">
                      <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 rounded-full font-medium">
                        {tutorial.difficulty}
                      </span>
                      <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
                        {tutorial.duration}
                      </span>
                    </div>
                  </div>
                  <Button
                    asChild
                    className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    <Link href={`/tutorials/${tutorial.id}`}>
                      Start
                    </Link>
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section id="resources" className="bg-gray-50 py-20 md:py-32">
        <div className="container">
          <h2 className="text-4xl font-bold text-gray-900 mb-16">Resources & Links</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Official SAP Documentation",
                description: "Comprehensive guides and API references from SAP.",
                url: "https://help.sap.com/docs/sap-ai-core",
                icon: "📚",
              },
              {
                title: "SAP BTP Trial Account",
                description: "Get started with a free trial account to explore SAP BTP.",
                url: "https://account.hanatrial.ondemand.com",
                icon: "🚀",
              },
              {
                title: "SAP Community",
                description: "Connect with SAP experts and other developers.",
                url: "https://community.sap.com",
                icon: "👥",
              },
              {
                title: "SAP Learning Hub",
                description: "Structured learning paths and certification programs.",
                url: "https://learning.sap.com",
                icon: "🎓",
              },
            ].map((resource, idx) => (
              <Card
                key={idx}
                className="p-8 bg-white border border-gray-200 hover:shadow-lg transition-all hover:border-blue-300"
              >
                <div className="text-4xl mb-4">{resource.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{resource.title}</h3>
                <p className="text-gray-600 mb-4">{resource.description}</p>
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  Visit <ArrowRight className="w-4 h-4" />
                </a>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 md:py-32">
        <div className="container max-w-3xl">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">About This Learning Hub</h2>
          <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
            <p>
              The SAP BTP AI Learning Hub is a comprehensive resource designed to help developers, architects, and business professionals master the art of building AI-powered business solutions on SAP Business Technology Platform.
            </p>
            <p>
              Whether you're just starting your AI journey or looking to deepen your expertise, this hub provides hands-on tutorials, best practices, and real-world examples to accelerate your learning.
            </p>
            <p>
              Our content is regularly updated to reflect the latest SAP BTP AI capabilities, including the Generative AI Hub, AI Core, Joule Studio, and Document AI services.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-white font-semibold mb-4">Learning Hub</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#tutorials" className="hover:text-white transition-colors">Tutorials</a></li>
                <li><a href="#resources" className="hover:text-white transition-colors">Resources</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">SAP Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="https://www.sap.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">SAP.com</a></li>
                <li><a href="https://help.sap.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="https://community.sap.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Community</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Technologies</h4>
              <ul className="space-y-2 text-sm">
                <li>SAP AI Core</li>
                <li>Generative AI Hub</li>
                <li>Joule Studio</li>
                <li>Document AI</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a></li>
                <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Twitter</a></li>
                <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-sm">
            <p>&copy; 2026 SAP BTP AI Learning Hub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
