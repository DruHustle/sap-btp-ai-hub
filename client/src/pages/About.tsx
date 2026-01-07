import { motion } from "framer-motion";
import { Linkedin, Mail, ExternalLink, Award, BookOpen, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  const linkedinUrl = "https://www.linkedin.com/in/andrew-gotora-72966068";

  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* Hero Section */}
      <div className="bg-white border-b border-slate-200">
        <div className="container py-16 md:py-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center space-y-4"
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900">
              About the <span className="text-blue-600">Learning Hub</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Empowering the next generation of SAP developers with cutting-edge AI knowledge and hands-on expertise.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container py-16 md:py-24">
        <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <motion.section 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="prose prose-slate lg:prose-lg max-w-none"
            >
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Mission</h2>
              <div className="text-slate-600 leading-relaxed text-justify space-y-6">
                <p>
                  The SAP BTP AI Learning Hub is a comprehensive resource designed to help developers, architects, and business professionals master the art of building AI-powered business solutions on SAP Business Technology Platform. In an era where artificial intelligence is transforming the enterprise landscape, our goal is to provide a structured, accessible, and deeply technical path to proficiency.
                </p>
                <p>
                  Whether you're just starting your AI journey or looking to deepen your expertise, this hub provides hands-on tutorials, best practices, and real-world examples to accelerate your learning. We believe that the best way to learn is by doing, which is why every tutorial is grounded in practical implementation and real-world business scenarios.
                </p>
                <p>
                  Our content is regularly updated to reflect the latest SAP BTP AI capabilities, including the Generative AI Hub, AI Core, Joule Studio, and Document AI services. We stay at the forefront of SAP's innovation to ensure you have the most relevant and up-to-date information at your fingertips.
                </p>
              </div>
            </motion.section>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid sm:grid-cols-3 gap-6"
            >
              {[
                { icon: BookOpen, title: "Hands-on", desc: "Step-by-step practical guides" },
                { icon: Code, title: "Ready-to-use", desc: "Production-grade code snippets" },
                { icon: Award, title: "Expertise", desc: "Best practices from the field" },
              ].map((item, i) => (
                <Card key={i} className="border-none shadow-sm bg-white">
                  <CardContent className="pt-6 text-center space-y-2">
                    <div className="inline-flex p-3 rounded-xl bg-blue-50 text-blue-600 mb-2">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-slate-900">{item.title}</h3>
                    <p className="text-sm text-slate-500">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </div>

          {/* Author Sidebar */}
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="overflow-hidden border-slate-200 shadow-xl">
                <div className="aspect-square relative overflow-hidden">
                  <img 
                    src="/sap-btp-ai-hub/images/author.jpg" 
                    alt="Andrew Gotora" 
                    className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <CardContent className="p-8 space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-slate-900">Andrew Gotora</h3>
                    <p className="text-blue-600 font-medium">SAP BTP & AI Specialist</p>
                  </div>
                  
                  <p className="text-slate-600 text-sm leading-relaxed text-justify">
                    Passionate about bridging the gap between complex enterprise technology and practical business value. With extensive experience in the SAP ecosystem, I focus on helping organizations leverage AI to drive innovation and efficiency.
                  </p>

                  <div className="space-y-3 pt-4">
                    <Button asChild className="w-full bg-[#0077B5] hover:bg-[#006097] text-white gap-2 py-6 text-lg">
                      <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="w-5 h-5" />
                        Connect on LinkedIn
                      </a>
                    </Button>
                    <Button variant="outline" asChild className="w-full gap-2 py-6 text-lg border-slate-200">
                      <a href="mailto:andrew.gotora@example.com">
                        <Mail className="w-5 h-5" />
                        Send a Message
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 text-white space-y-4 shadow-lg"
            >
              <h4 className="font-bold text-lg">Want to collaborate?</h4>
              <p className="text-blue-100 text-sm leading-relaxed">
                I'm always open to discussing new projects, technical challenges, or opportunities in the SAP AI space.
              </p>
              <a 
                href={linkedinUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-bold hover:underline"
              >
                Let's talk <ExternalLink className="w-4 h-4" />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
