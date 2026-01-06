import { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, Trash2, Database, Brain, Server, Globe, FileText, Cpu, Layers, Sparkles } from "lucide-react";
import { toast } from "sonner";
import html2canvas from "html2canvas";

const COMPONENTS = [
  { id: "ai-core", name: "SAP AI Core", icon: Brain, color: "bg-blue-100 text-blue-600 border-blue-200" },
  { id: "hana", name: "HANA Vector Engine", icon: Database, color: "bg-green-100 text-green-600 border-green-200" },
  { id: "gen-ai", name: "Generative AI Hub", icon: Sparkles, color: "bg-purple-100 text-purple-600 border-purple-200" },
  { id: "dest", name: "Destination Service", icon: Globe, color: "bg-orange-100 text-orange-600 border-orange-200" },
  { id: "doc-ai", name: "Document AI", icon: FileText, color: "bg-red-100 text-red-600 border-red-200" },
  { id: "app", name: "CAP Application", icon: Server, color: "bg-slate-100 text-slate-600 border-slate-200" },
  { id: "joule", name: "Joule", icon: Cpu, color: "bg-indigo-100 text-indigo-600 border-indigo-200" },
  { id: "btp", name: "BTP Subaccount", icon: Layers, color: "bg-yellow-100 text-yellow-600 border-yellow-200" },
];

interface DraggableItemProps {
  id: string;
  name: string;
  icon: any;
  color: string;
}

const DraggableItem = ({ id, name, icon: Icon, color }: DraggableItemProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "component",
    item: { id, name, icon: Icon, color },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag as unknown as React.RefObject<HTMLDivElement>}
      className={`p-3 mb-2 rounded-lg border cursor-move flex items-center gap-2 text-sm font-medium transition-all ${
        isDragging ? "opacity-50" : "opacity-100"
      } ${color}`}
    >
      <Icon className="w-4 h-4" />
      {name}
    </div>
  );
};

interface DroppedItem extends DraggableItemProps {
  uid: string;
  x: number;
  y: number;
}

const Canvas = () => {
  const [items, setItems] = useState<DroppedItem[]>([]);

  const [, drop] = useDrop(() => ({
    accept: "component",
    drop: (item: DraggableItemProps, monitor) => {
      const offset = monitor.getClientOffset();
      const canvasRect = document.getElementById("canvas")?.getBoundingClientRect();
      
      if (offset && canvasRect) {
        const x = offset.x - canvasRect.left;
        const y = offset.y - canvasRect.top;
        
        setItems((prev) => [
          ...prev,
          { ...item, uid: Math.random().toString(36).substr(2, 9), x, y },
        ]);
      }
    },
  }));

  const removeItem = (uid: string) => {
    setItems((prev) => prev.filter((item) => item.uid !== uid));
  };

  const exportImage = async () => {
    const element = document.getElementById("canvas");
    if (element) {
      const canvas = await html2canvas(element);
      const data = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = data;
      link.download = "sap-btp-architecture.png";
      link.click();
      toast.success("Architecture diagram exported!");
    }
  };

  return (
    <div className="flex flex-col h-[600px] border rounded-xl overflow-hidden bg-background">
      <div className="p-4 border-b bg-muted/30 flex justify-between items-center">
        <h3 className="font-semibold">Architecture Builder</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setItems([])}>
            <Trash2 className="w-4 h-4 mr-2" />
            Clear
          </Button>
          <Button size="sm" onClick={exportImage}>
            <Download className="w-4 h-4 mr-2" />
            Export PNG
          </Button>
        </div>
      </div>
      
      <div className="flex flex-1 overflow-hidden">
        <div className="w-64 border-r p-4 bg-muted/10 overflow-y-auto">
          <p className="text-xs font-semibold text-muted-foreground mb-4 uppercase tracking-wider">Components</p>
          {COMPONENTS.map((comp) => (
            <DraggableItem key={comp.id} {...comp} />
          ))}
        </div>
        
        <div 
          id="canvas"
          ref={drop as unknown as React.RefObject<HTMLDivElement>}
          className="flex-1 relative bg-slate-50 dark:bg-slate-900/50 overflow-hidden"
          style={{ 
            backgroundImage: "radial-gradient(#cbd5e1 1px, transparent 1px)", 
            backgroundSize: "20px 20px" 
          }}
        >
          {items.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground pointer-events-none">
              <p>Drag components here to build your architecture</p>
            </div>
          )}
          
          {items.map((item) => (
            <div
              key={item.uid}
              className={`absolute p-3 rounded-lg border shadow-sm flex items-center gap-2 text-sm font-medium ${item.color}`}
              style={{ left: item.x, top: item.y }}
            >
              <item.icon className="w-4 h-4" />
              {item.name}
              <button 
                onClick={() => removeItem(item.uid)}
                className="ml-2 p-1 hover:bg-black/10 rounded-full"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function ArchitectureBuilder() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Canvas />
    </DndProvider>
  );
}
