import { useEffect, useState } from "react";
import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, Calendar, Share2, Printer, CheckCircle, GraduationCap, BookOpen } from "lucide-react";
import { Streamdown } from "streamdown";
import { toast } from "sonner";
import { useProgress } from "@/hooks/useProgress";
import Mermaid from "@/components/Mermaid";
import Quiz from "@/components/Quiz";
import CodeBlock from "@/components/CodeBlock";
import { quizzes } from "@/data/quizzes";

// This would typically come from a CMS or API
// For now, we'll fetch the markdown content from the public folder or use the TUTORIALS.md content
// Since we have a single TUTORIALS.md file, we'll simulate fetching individual tutorial content
// In a real app, we'd split these into separate MD files

export default function TutorialDetail() {
  const [match, params] = useRoute("/tutorials/:id");
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [readingTime, setReadingTime] = useState(0);
  const { markAsCompleted, isCompleted } = useProgress();

  const tutorialId = params?.id;
  const id = tutorialId ? parseInt(tutorialId) : 0;
  const completed = isCompleted(id);
  const quizQuestions = quizzes[id as keyof typeof quizzes];

  useEffect(() => {
    async function fetchTutorial() {
      if (!tutorialId) return;

      try {
        setLoading(true);
        // In a production environment, we would fetch specific markdown files
        // For this demo, we'll load the main TUTORIALS.md and parse out the specific tutorial
        // This is a workaround to avoid restructuring the entire project's data source right now
        const baseUrl = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;
        const response = await fetch(`${baseUrl}TUTORIALS.md`);
        
        if (!response.ok) {
          // Fallback if file is not in public root (it might be in src or elsewhere in dev)
          // For the purpose of this demo, we'll use a hardcoded fallback if fetch fails
          // or try to fetch from the raw GitHub URL if deployed
          throw new Error("Failed to load tutorial content");
        }

        const text = await response.text();
        
        // Parse the specific tutorial based on ID
        // We look for "## Tutorial X:" headers
        const tutorialRegex = new RegExp(`## Tutorial ${tutorialId}:(.*?)(?=## Tutorial \\d+:|---|$)`, "gs");
        const match = tutorialRegex.exec(text);

        if (match && match[0]) {
          setContent(match[0]);
          
          // Calculate reading time (approx 200 words per minute)
          const words = match[0].trim().split(/\s+/).length;
          setReadingTime(Math.ceil(words / 200));
        } else {
          setError("Tutorial not found");
        }
      } catch (err) {
        console.error(err);
        // Fallback content for demo purposes if file fetch fails (common in some dev environments)
        setContent(`# Tutorial ${tutorialId}\n\nContent is loading from the repository... \n\nIf you see this, please ensure TUTORIALS.md is in the public folder.`);
      } finally {
        setLoading(false);
      }
    }

    fetchTutorial();
  }, [tutorialId]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard");
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="container py-20 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Tutorial Not Found</h2>
        <p className="text-muted-foreground mb-8">The tutorial you're looking for doesn't exist or couldn't be loaded.</p>
        <Link href="/tutorials">
          <Button>Back to Tutorials</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-12 max-w-4xl">
      <div className="mb-8 flex justify-between items-center">
        <Link href="/tutorials">
          <Button variant="ghost" size="sm" className="gap-2 pl-0 hover:bg-transparent hover:text-primary">
            <ArrowLeft className="w-4 h-4" />
            Back to Tutorials
          </Button>
        </Link>
        
        {readingTime > 0 && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/30 px-3 py-1 rounded-full">
            <BookOpen className="w-4 h-4" />
            <span>{readingTime} min read</span>
          </div>
        )}
      </div>

      <article className="prose prose-slate dark:prose-invert lg:prose-lg max-w-none mb-12">
        {/* We render the markdown content here */}
        {/* Note: In a real app, we'd parse the title/metadata separately */}
        <Streamdown
          components={{
            code: ({ className, children, ...props }: any) => {
              const match = /language-(\w+)/.exec(className || "");
              if (match && match[1] === "mermaid") {
                return <Mermaid chart={String(children).replace(/\n$/, "")} />;
              }
              return (
                <CodeBlock className={className} {...props}>
                  {children}
                </CodeBlock>
              );
            },
          }}
        >
          {content}
        </Streamdown>
      </article>

      {quizQuestions && !showQuiz && !completed && (
        <div className="my-12 p-8 bg-muted/30 rounded-xl border border-border text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <GraduationCap className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-2xl font-bold mb-2">Ready to test your knowledge?</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Take a quick quiz to verify your understanding of this tutorial's concepts.
          </p>
          <Button size="lg" onClick={() => setShowQuiz(true)}>
            Start Quiz
          </Button>
        </div>
      )}

      {showQuiz && quizQuestions && (
        <div className="my-12">
          <Quiz 
            tutorialId={id} 
            questions={quizQuestions} 
            onComplete={() => {
              markAsCompleted(id);
              toast.success("Tutorial completed! Great job!");
              setShowQuiz(false);
            }} 
          />
        </div>
      )}

      <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex gap-4">
          <Button variant="outline" size="sm" onClick={handleShare} className="gap-2">
            <Share2 className="w-4 h-4" />
            Share
          </Button>
          <Button variant="outline" size="sm" onClick={handlePrint} className="gap-2">
            <Printer className="w-4 h-4" />
            Print
          </Button>
        </div>
        
        <div className="flex gap-4">
          <Button 
            variant={completed ? "secondary" : "default"}
            onClick={() => {
              markAsCompleted(id);
              toast.success("Tutorial marked as completed!");
            }}
            className="gap-2"
            disabled={completed}
          >
            <CheckCircle className="w-4 h-4" />
            {completed ? "Completed" : "Mark as Complete"}
          </Button>
          <Link href="/tutorials">
            <Button variant="outline">Next Tutorial</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
