import { Link, useLocation } from "wouter";
import { Brain, Github, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { SearchDialog } from "./SearchDialog";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/tutorials", label: "Tutorials" },
    { href: "/playground", label: "Playground" },
    { href: "/architecture", label: "Architecture" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans text-foreground">
      {/* Navigation Bar */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-2 transition-opacity hover:opacity-80 cursor-pointer">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Brain className="w-6 h-6 text-primary" />
              </div>
              <span className="text-xl font-bold tracking-tight">SAP BTP AI Hub</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-6 mr-4">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <div
                    className={`text-sm font-medium transition-colors hover:text-primary cursor-pointer ${
                      location === link.href || (link.href !== "/" && location.startsWith(link.href))
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    {link.label}
                  </div>
                </Link>
              ))}
            </div>
            <SearchDialog />
            <div className="h-6 w-px bg-border/50 mx-2" />
            <ThemeToggle />
            <a
              href="https://github.com/DruHustle/sap-btp-ai-hub"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <SearchDialog />
            <ThemeToggle />
            <button
              className="p-2 text-muted-foreground hover:text-foreground"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-border bg-background"
          >
            <div className="container py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <div
                    className={`text-sm font-medium py-2 transition-colors cursor-pointer ${
                      location === link.href ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {link.label}
                  </div>
                </Link>
              ))}
              <a
                href="https://github.com/DruHustle/sap-btp-ai-hub"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground py-2"
              >
                <Github className="w-4 h-4" />
                GitHub Repository
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={location}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30">
        <div className="container py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-primary" />
                <span className="font-bold">SAP BTP AI Hub</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Master AI business solutions on SAP Business Technology Platform.
                Built for developers, by developers.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Learn</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/tutorials"><span className="hover:text-primary cursor-pointer">All Tutorials</span></Link></li>
                <li><Link href="/playground"><span className="hover:text-primary cursor-pointer">Interactive Playground</span></Link></li>
                <li><Link href="/architecture"><span className="hover:text-primary cursor-pointer">Architecture Builder</span></Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="https://help.sap.com/docs/btp" target="_blank" rel="noreferrer" className="hover:text-primary">SAP BTP Documentation</a></li>
                <li><a href="https://help.sap.com/docs/sap-ai-core" target="_blank" rel="noreferrer" className="hover:text-primary">SAP AI Core</a></li>
                <li><a href="https://community.sap.com" target="_blank" rel="noreferrer" className="hover:text-primary">SAP Community</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="https://github.com/DruHustle" target="_blank" rel="noreferrer" className="hover:text-primary">GitHub</a></li>
                <li><a href="#" className="hover:text-primary">Twitter</a></li>
                <li><a href="#" className="hover:text-primary">LinkedIn</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© 2026 SAP BTP AI Learning Hub. Open source educational project.</p>
            <p>Not affiliated with SAP SE.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
