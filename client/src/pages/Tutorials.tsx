import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Zap, Brain, Users, FileText, Code2, Search } from "lucide-react";
import TutorialCard from "@/components/TutorialCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Certificate from "@/components/Certificate";
import { useProgress } from "@/hooks/useProgress";

const tutorials = [
  {
    id: 1,
    title: "Getting Started with SAP BTP Trial",
    description: "Learn how to set up your SAP BTP trial account and provision AI services.",
    difficulty: "Beginner" as const,
    duration: "15 min",
    icon: BookOpen,
    color: "from-blue-500 to-blue-600",
  },
  {
    id: 2,
    title: "Exploring the Generative AI Hub Playground",
    description: "Discover LLMs and craft effective prompts using the interactive playground.",
    difficulty: "Beginner" as const,
    duration: "20 min",
    icon: Zap,
    color: "from-amber-500 to-amber-600",
  },
  {
    id: 3,
    title: "Building a RAG Solution with SAP BTP",
    description: "Create a Retrieval-Augmented Generation system for context-aware answers.",
    difficulty: "Intermediate" as const,
    duration: "45 min",
    icon: Brain,
    color: "from-purple-500 to-purple-600",
  },
  {
    id: 4,
    title: "Creating AI Agents with Joule Studio",
    description: "Build intelligent agents that perform multi-step tasks autonomously.",
    difficulty: "Intermediate" as const,
    duration: "50 min",
    icon: Users,
    color: "from-green-500 to-green-600",
  },
  {
    id: 5,
    title: "Automating Document Processing",
    description: "Use SAP Document AI to extract and classify information automatically.",
    difficulty: "Intermediate" as const,
    duration: "40 min",
    icon: FileText,
    color: "from-red-500 to-red-600",
  },
  {
    id: 6,
    title: "Advanced Topics - Custom AI Models",
    description: "Build and deploy custom machine learning models on SAP BTP.",
    difficulty: "Advanced" as const,
    duration: "60 min",
    icon: Code2,
    color: "from-indigo-500 to-indigo-600",
  },
];

export default function Tutorials() {
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const { progress } = useProgress();

  const filteredTutorials = tutorials.filter((tutorial) => {
    const matchesSearch = tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tutorial.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = difficultyFilter === "all" || tutorial.difficulty === difficultyFilter;
    return matchesSearch && matchesDifficulty;
  });

  return (
    <div className="container py-12 md:py-20 space-y-12">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold tracking-tight"
        >
          Browse Tutorials
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-muted-foreground"
        >
          Explore our comprehensive collection of hands-on guides for SAP BTP AI.
        </motion.p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search tutorials..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
          <Certificate 
            completedCount={progress.completedTutorials.length} 
            totalCount={tutorials.length} 
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTutorials.map((tutorial, index) => (
          <TutorialCard key={tutorial.id} {...tutorial} index={index} />
        ))}
      </div>

      {filteredTutorials.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No tutorials found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
