import { useState, useEffect } from "react";
import { Search, Command, FileText, ArrowRight } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import Fuse from "fuse.js";

// Mock data for search - in a real app, this would be generated from the markdown files
const searchData = [
  {
    id: 1,
    title: "Getting Started with SAP BTP Trial",
    content: "Create and activate a SAP BTP trial account. Navigate the SAP BTP cockpit interface. Provision AI services for development.",
    type: "Tutorial",
    path: "/tutorials/1"
  },
  {
    id: 2,
    title: "Exploring the Generative AI Hub Playground",
    content: "Access and navigate the Generative AI Hub interface. Understand the capabilities of different Large Language Models (LLMs). Craft effective prompts.",
    type: "Tutorial",
    path: "/tutorials/2"
  },
  {
    id: 3,
    title: "Building a RAG Solution with SAP BTP",
    content: "Understand RAG architecture and its benefits. Set up a document repository on SAP BTP. Integrate SAP Document AI. Query business data with LLM.",
    type: "Tutorial",
    path: "/tutorials/3"
  },
  {
    id: 4,
    title: "Creating AI Agents with Joule Studio",
    content: "Build intelligent agents that perform multi-step tasks autonomously. Configure agent capabilities and integrations.",
    type: "Tutorial",
    path: "/tutorials/4"
  },
  {
    id: 5,
    title: "Automating Document Processing",
    content: "Use SAP Document AI to extract and classify information automatically. Set up document schemas and extraction templates.",
    type: "Tutorial",
    path: "/tutorials/5"
  },
  {
    id: 6,
    title: "Advanced Topics - Custom AI Models",
    content: "Build and deploy custom machine learning models on SAP BTP. Containerize models and deploy to SAP AI Core.",
    type: "Tutorial",
    path: "/tutorials/6"
  },
  {
    id: 7,
    title: "Interactive Playground",
    content: "Test OData and REST APIs directly in the browser. Experiment with code snippets for Python and JavaScript.",
    type: "Tool",
    path: "/playground"
  }
];

const fuse = new Fuse(searchData, {
  keys: ["title", "content"],
  threshold: 0.3,
});

export function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(searchData);

  useEffect(() => {
    if (query.trim() === "") {
      setResults(searchData);
    } else {
      const searchResults = fuse.search(query);
      setResults(searchResults.map(result => result.item));
    }
  }, [query]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="relative h-9 w-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2 text-muted-foreground"
        >
          <Search className="h-4 w-4 xl:mr-2" />
          <span className="hidden xl:inline-flex">Search...</span>
          <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 xl:flex">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0 gap-0 max-w-2xl">
        <div className="flex items-center border-b px-3">
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <Input
            className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground border-none focus-visible:ring-0"
            placeholder="Type to search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="max-h-[300px] overflow-y-auto p-2">
          {results.length === 0 ? (
            <p className="p-4 text-sm text-muted-foreground text-center">No results found.</p>
          ) : (
            <div className="space-y-1">
              {results.map((item) => (
                <Link key={item.id} href={item.path}>
                  <a
                    className="flex items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground cursor-pointer group"
                    onClick={() => setOpen(false)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-md border bg-muted">
                        {item.type === "Tool" ? <Command className="h-4 w-4" /> : <FileText className="h-4 w-4" />}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium">{item.title}</span>
                        <span className="text-xs text-muted-foreground line-clamp-1">{item.content}</span>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-50" />
                  </a>
                </Link>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
