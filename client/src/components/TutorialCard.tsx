import { Link } from "wouter";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, BarChart, ArrowRight, LucideIcon, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useProgress } from "@/hooks/useProgress";

interface TutorialCardProps {
  id: number;
  title: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  icon: LucideIcon;
  color: string;
  index: number;
}

export default function TutorialCard({
  id,
  title,
  description,
  difficulty,
  duration,
  icon: Icon,
  color,
  index,
}: TutorialCardProps) {
  const { isCompleted } = useProgress();
  const completed = isCompleted(id);
  const difficultyColor = {
    Beginner: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    Intermediate: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    Advanced: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <Card className="h-full flex flex-col overflow-hidden border-border/50 hover:border-primary/50 hover:shadow-lg transition-all duration-300 group">
        <div className={`h-2 w-full bg-gradient-to-r ${color}`} />
        <CardHeader className="pb-4">
          <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-xl bg-gradient-to-br ${color} bg-opacity-20`}>
              <Icon className="w-6 h-6 text-foreground/80" />
            </div>
            <div className="flex gap-2">
              {completed && (
                <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 gap-1">
                  <CheckCircle className="w-3 h-3" />
                  Completed
                </Badge>
              )}
              <Badge variant="secondary" className={difficultyColor[difficulty]}>
                {difficulty}
              </Badge>
            </div>
          </div>
          <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors">
            {title}
          </h3>
        </CardHeader>
        <CardContent className="flex-1 pb-4">
          <p className="text-muted-foreground text-sm leading-relaxed">
            {description}
          </p>
        </CardContent>
        <CardFooter className="pt-0 flex items-center justify-between border-t border-border/30 p-6 bg-muted/5">
          <div className="flex items-center text-xs text-muted-foreground font-medium">
            <Clock className="w-3.5 h-3.5 mr-1.5" />
            {duration}
          </div>
          <Link href={`/tutorials/${id}`}>
            <Button variant="ghost" size="sm" className="gap-1 hover:bg-primary hover:text-primary-foreground transition-colors">
              Start Learning
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
