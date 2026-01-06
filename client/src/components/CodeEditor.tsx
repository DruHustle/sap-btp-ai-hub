import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Copy, Download, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

interface CodeEditorProps {
  title: string;
  description?: string;
  language: 'python' | 'javascript' | 'bash' | 'sql';
  defaultCode: string;
  onExecute?: (code: string) => void;
  showLineNumbers?: boolean;
  readOnly?: boolean;
}

export default function CodeEditor({
  title,
  description,
  language,
  defaultCode,
  onExecute,
  showLineNumbers = true,
  readOnly = false,
}: CodeEditorProps) {
  const [code, setCode] = useState(defaultCode);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success('Code copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const ext = language === 'python' ? 'py' : language === 'bash' ? 'sh' : language === 'sql' ? 'sql' : 'js';
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `code.${ext}`;
    a.click();
  };

  const handleReset = () => {
    setCode(defaultCode);
    toast.success('Code reset to default');
  };

  const getLanguageLabel = () => {
    const labels: Record<string, string> = {
      python: 'Python',
      javascript: 'JavaScript',
      bash: 'Bash',
      sql: 'SQL',
    };
    return labels[language] || language;
  };

  const getLanguageColor = () => {
    const colors: Record<string, string> = {
      python: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100',
      javascript: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100',
      bash: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100',
      sql: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100',
    };
    return colors[language] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Card className="overflow-hidden border-border">
      <div className="bg-muted p-4 border-b border-border space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="font-semibold text-foreground">{title}</h3>
            {description && <p className="text-sm text-muted-foreground">{description}</p>}
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getLanguageColor()}`}>
            {getLanguageLabel()}
          </span>
        </div>
      </div>

      <div className="relative bg-background">
        {showLineNumbers && (
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-muted border-r border-border text-muted-foreground text-xs font-mono flex flex-col items-center pt-4 select-none">
            {code.split('\n').map((_, i) => (
              <div key={i} className="h-6 flex items-center justify-center w-full">
                {i + 1}
              </div>
            ))}
          </div>
        )}

        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          readOnly={readOnly}
          className={`w-full font-mono text-sm p-4 ${showLineNumbers ? 'pl-16' : 'pl-4'} bg-background text-foreground border-0 resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-96`}
          spellCheck="false"
        />
      </div>

      <div className="bg-muted p-4 border-t border-border flex gap-2 flex-wrap">
        <Button
          onClick={handleCopy}
          variant="outline"
          size="sm"
          className="gap-2"
        >
          <Copy className="w-4 h-4" />
          {copied ? 'Copied!' : 'Copy'}
        </Button>
        <Button
          onClick={handleDownload}
          variant="outline"
          size="sm"
          className="gap-2"
        >
          <Download className="w-4 h-4" />
          Download
        </Button>
        <Button
          onClick={handleReset}
          variant="outline"
          size="sm"
          className="gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </Button>
        {onExecute && (
          <Button
            onClick={() => onExecute(code)}
            className="gap-2 ml-auto"
          >
            Execute
          </Button>
        )}
      </div>
    </Card>
  );
}
