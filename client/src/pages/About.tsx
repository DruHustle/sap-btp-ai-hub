import { motion } from "framer-motion";
import { Linkedin, Mail, ExternalLink, Award, BookOpen, Code, Sparkles } from "lucide-react";
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3 h-3" />
              <span>Our Story</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900">
              About the <span className="text-blue-600">Learning Hub</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Empowering the next generation of SAP developers with cutting-edge AI knowledge and hands-on expertise.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container py-16 md:py-24 space-y-20">
        {/* Mission Section */}
        <div className="max-w-4xl mx-auto">
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="prose prose-slate lg:prose-lg max-w-none"
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Our Mission</h2>
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
            className="grid sm:grid-cols-3 gap-6 mt-16"
          >
            {[
              { icon: BookOpen, title: "Hands-on", desc: "Step-by-step practical guides" },
              { icon: Code, title: "Ready-to-use", desc: "Production-grade code snippets" },
              { icon: Award, title: "Expertise", desc: "Best practices from the field" },
            ].map((item, i) => (
              <Card key={i} className="border-slate-200 shadow-sm bg-white hover:shadow-md transition-shadow">
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

        {/* Author Section - Horizontal at the bottom */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <div className="bg-white rounded-[2rem] border border-slate-200 shadow-xl overflow-hidden">
            <div className="p-8 md:p-12 flex flex-col md:flex-row items-center gap-10">
              {/* LinkedIn Style Profile Picture */}
              <div className="relative flex-shrink-0">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-2xl overflow-hidden">
                  <img 
                    src="/sap-btp-ai-hub/images/author.jpg" 
                    alt="Andrew Gotora" 
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>

              <div className="flex-1 space-y-6 text-center md:text-left">
                <div className="space-y-2">
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                    <h3 className="text-3xl font-bold text-slate-900">Andrew Gotora</h3>
                    <Badge className="bg-blue-50 text-blue-600 border-blue-100 px-3 py-1 w-fit mx-auto md:mx-0">
                      SAP BTP & AI Specialist
                    </Badge>
                  </div>
                  <p className="text-slate-500 font-medium">Helping organizations bridge the gap between AI and Business Value</p>
                </div>
                
                <p className="text-slate-600 leading-relaxed text-justify max-w-2xl">
                  Passionate about bridging the gap between complex enterprise technology and practical business value. With extensive experience in the SAP ecosystem, I focus on helping organizations leverage AI to drive innovation and efficiency. I believe in the power of community and continuous learning to shape the future of enterprise software.
                </p>

                <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
                  <Button asChild className="bg-[#0077B5] hover:bg-[#006097] text-white gap-2 rounded-xl px-6 py-6 h-auto">
                    <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="w-5 h-5" />
                      Connect on LinkedIn
                    </a>
                  </Button>
                  <Button variant="outline" asChild className="gap-2 rounded-xl px-6 py-6 h-auto border-slate-200 hover:bg-slate-50">
                    <a href="mailto:andrewgotora@yahoo.com">
                      <Mail className="w-5 h-5" />
                      Send a Message
                    </a>
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Bottom Collaboration Bar */}
            <div className="bg-slate-900 p-6 text-center">
              <p className="text-slate-400 text-sm">
                Interested in collaborating on SAP BTP AI projects? 
                <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 font-bold ml-2 hover:underline inline-flex items-center gap-1">
                  Let's connect <ExternalLink className="w-3 h-3" />
                </a>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function Badge({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}>
      {children}
    </span>
  );
}
