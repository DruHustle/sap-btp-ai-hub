import { Link } from "wouter";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, ArrowRight, LucideIcon, CheckCircle } from "lucide-react";
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
    Beginner: "bg-green-500/10 text-green-400 border-green-500/20",
    Intermediate: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    Advanced: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <Card className="h-full flex flex-col overflow-hidden bg-[#00264D] border-white/5 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 group">
        <div className={`h-1.5 w-full bg-gradient-to-r ${color}`} />
        <CardHeader className="pb-4">
          <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-xl bg-white/5 border border-white/10 group-hover:border-blue-500/30 transition-colors`}>
              <Icon className="w-6 h-6 text-blue-400" />
            </div>
            <div className="flex gap-2">
              {completed && (
                <Badge variant="secondary" className="bg-green-500/10 text-green-400 border-green-500/20 gap-1">
                  <CheckCircle className="w-3 h-3" />
                  Done
                </Badge>
              )}
              <Badge variant="secondary" className={difficultyColor[difficulty]}>
                {difficulty}
              </Badge>
            </div>
          </div>
          <h3 className="text-xl font-bold leading-tight text-white group-hover:text-blue-400 transition-colors">
            {title}
          </h3>
        </CardHeader>
        <CardContent className="flex-1 pb-4">
          <p className="text-slate-400 text-sm leading-relaxed">
            {description}
          </p>
        </CardContent>
        <CardFooter className="pt-0 flex items-center justify-between border-t border-white/5 p-6 bg-white/5">
          <div className="flex items-center text-xs text-slate-400 font-medium">
            <Clock className="w-3.5 h-3.5 mr-1.5 text-blue-400" />
            {duration}
          </div>
          <Button asChild variant="ghost" size="sm" className="gap-1 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 transition-colors font-bold">
            <Link href={`/tutorials/${id}`}>
              Start
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
