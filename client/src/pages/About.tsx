import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="container py-20 md:py-32">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">About This Learning Hub</h1>
        <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
            <p>
              The SAP BTP AI Learning Hub is a comprehensive resource designed to help developers, architects, and business professionals master the art of building AI-powered business solutions on SAP Business Technology Platform.
              Whether you're just starting your AI journey or looking to deepen your expertise, this hub provides hands-on tutorials, best practices, and real-world examples to accelerate your learning.
            </p>
            <p>
              Our content is regularly updated to reflect the latest SAP BTP AI capabilities, including the Generative AI Hub, AI Core, Joule Studio, and Document AI services.
            </p>
            <p>
              The Learning Hub was curated and developed by Andrew Gotora. Andrew Gotora is technology professional with diverse expertise including electronics, IoT, software engineering and AI.
            </p>
          
          <div className="pt-8 border-t border-gray-100 mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p>
              To democratize AI knowledge within the SAP ecosystem and empower the community to build intelligent, enterprise-grade applications that solve real-world business challenges.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
