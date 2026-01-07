import { useState, useRef, useEffect } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { Button } from "@/components/ui/button";
import { Download, Trash2, Database, Brain, Server, Globe, FileText, Cpu, Layers, Sparkles, Plus, MousePointer2, Share2, X } from "lucide-react";
import { toast } from "sonner";
import html2canvas from "html2canvas";
import { motion, AnimatePresence } from "framer-motion";

const COMPONENTS = [
  { id: "ai-core", name: "SAP AI Core", icon: Brain, color: "bg-blue-50 text-blue-600 border-blue-200" },
  { id: "hana", name: "HANA Vector Engine", icon: Database, color: "bg-green-50 text-green-600 border-green-200" },
  { id: "gen-ai", name: "Generative AI Hub", icon: Sparkles, color: "bg-purple-50 text-purple-600 border-purple-200" },
  { id: "dest", name: "Destination Service", icon: Globe, color: "bg-orange-50 text-orange-600 border-orange-200" },
  { id: "doc-ai", name: "Document AI", icon: FileText, color: "bg-red-50 text-red-600 border-red-200" },
  { id: "app", name: "CAP Application", icon: Server, color: "bg-slate-50 text-slate-600 border-slate-200" },
  { id: "joule", name: "Joule", icon: Cpu, color: "bg-indigo-50 text-indigo-600 border-indigo-200" },
  { id: "btp", name: "BTP Subaccount", icon: Layers, color: "bg-yellow-50 text-yellow-600 border-yellow-200" },
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
      className={`p-4 mb-3 rounded-xl border cursor-grab active:cursor-grabbing flex items-center gap-3 text-sm font-bold transition-all hover:shadow-md ${
        isDragging ? "opacity-50 scale-95" : "opacity-100"
      } ${color}`}
    >
      <div className="p-2 rounded-lg bg-white/50 shadow-sm">
        <Icon className="w-4 h-4" />
      </div>
      {name}
    </div>
  );
};

interface DroppedItem extends DraggableItemProps {
  uid: string;
  x: number;
  y: number;
}

interface Connection {
  from: string;
  to: string;
}

const Canvas = () => {
  const [items, setItems] = useState<DroppedItem[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [connectingFrom, setConnectingFrom] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop(() => ({
    accept: "component",
    drop: (item: DraggableItemProps, monitor) => {
      const offset = monitor.getClientOffset();
      const canvasRect = canvasRef.current?.getBoundingClientRect();
      
      if (offset && canvasRect) {
        const x = offset.x - canvasRect.left;
        const y = offset.y - canvasRect.top;
        
        setItems((prev) => [
          ...prev,
          { ...item, uid: Math.random().toString(36).substr(2, 9), x: x - 90, y: y - 25 },
        ]);
      }
    },
  }));

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (connectingFrom && canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [connectingFrom]);

  const removeItem = (uid: string) => {
    setItems((prev) => prev.filter((item) => item.uid !== uid));
    setConnections((prev) => prev.filter((conn) => conn.from !== uid && conn.to !== uid));
  };

  const handleConnect = (uid: string) => {
    if (!connectingFrom) {
      setConnectingFrom(uid);
      toast.info("Drag or click another component to connect");
    } else if (connectingFrom === uid) {
      setConnectingFrom(null);
    } else {
      const exists = connections.some(
        (c) => (c.from === connectingFrom && c.to === uid) || (c.from === uid && c.to === connectingFrom)
      );
      
      if (!exists) {
        setConnections((prev) => [...prev, { from: connectingFrom, to: uid }]);
      }
      setConnectingFrom(null);
    }
  };

  const exportImage = async () => {
    if (canvasRef.current) {
      const canvas = await html2canvas(canvasRef.current, {
        backgroundColor: "#f8fafc",
        scale: 2,
      });
      const data = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = data;
      link.download = "sap-btp-architecture.png";
      link.click();
      toast.success("Architecture diagram exported!");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-auto lg:h-[750px] border border-slate-200 rounded-[2.5rem] overflow-hidden bg-white shadow-2xl">
      {/* Sidebar */}
      <div className="w-full lg:w-80 border-b lg:border-b-0 lg:border-r p-8 bg-slate-50/50 overflow-y-auto">
        <div className="space-y-8">
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-6">Components</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
              {COMPONENTS.map((comp) => (
                <DraggableItem key={comp.id} {...comp} />
              ))}
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-200">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-6">Actions</h3>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
              <Button variant="outline" className="w-full justify-start gap-2 rounded-2xl border-slate-200 py-6" onClick={() => { setItems([]); setConnections([]); }}>
                <Trash2 className="w-4 h-4 text-red-500" />
                Clear
              </Button>
              <Button className="w-full justify-start gap-2 rounded-2xl bg-blue-600 hover:bg-blue-700 py-6" onClick={exportImage}>
                <Download className="w-4 h-4" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Canvas Area */}
      <div className="flex-1 relative min-h-[600px] lg:min-h-0 bg-slate-50 overflow-hidden">
        <div 
          id="canvas"
          ref={(node) => {
            drop(node);
            (canvasRef as any).current = node;
          }}
          className="absolute inset-0"
          style={{ 
            backgroundImage: "radial-gradient(#e2e8f0 2px, transparent 2px)", 
            backgroundSize: "40px 40px" 
          }}
        >
          {/* SVG Layer for Connections */}
          <svg className="absolute inset-0 pointer-events-none w-full h-full">
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
              </marker>
            </defs>
            
            {/* Active connection line */}
            {connectingFrom && (
              <line 
                x1={items.find(i => i.uid === connectingFrom)!.x + 90}
                y1={items.find(i => i.uid === connectingFrom)!.y + 25}
                x2={mousePos.x}
                y2={mousePos.y}
                stroke="#3b82f6"
                strokeWidth="3"
                strokeDasharray="6"
                className="animate-[dash_1s_linear_infinite]"
              />
            )}

            {connections.map((conn, idx) => {
              const fromItem = items.find((i) => i.uid === conn.from);
              const toItem = items.find((i) => i.uid === conn.to);
              if (!fromItem || !toItem) return null;
              
              return (
                <motion.line 
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  key={idx} 
                  x1={fromItem.x + 90} y1={fromItem.y + 25} 
                  x2={toItem.x + 90} y2={toItem.y + 25} 
                  stroke="#3b82f6" 
                  strokeWidth="2.5" 
                  markerEnd="url(#arrowhead)"
                />
              );
            })}
          </svg>

          {items.length === 0 && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 pointer-events-none space-y-6">
              <div className="p-8 rounded-full bg-white shadow-xl border border-slate-100">
                <MousePointer2 className="w-12 h-12 text-blue-600" />
              </div>
              <div className="text-center space-y-2">
                <p className="text-xl font-bold text-slate-900">Architecture Canvas</p>
                <p className="text-slate-500">Drag components here to start designing</p>
              </div>
            </div>
          )}
          
          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                key={item.uid}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className={`absolute p-4 rounded-2xl border-2 shadow-xl flex items-center gap-3 text-sm font-bold cursor-pointer group transition-all ${
                  connectingFrom === item.uid ? "border-blue-500 ring-4 ring-blue-500/20" : "border-white"
                } ${item.color} bg-white`}
                style={{ left: item.x, top: item.y, width: "180px" }}
                onClick={() => handleConnect(item.uid)}
              >
                <div className="p-2 rounded-lg bg-white shadow-sm">
                  <item.icon className="w-4 h-4" />
                </div>
                <span className="truncate flex-1">{item.name}</span>
                
                <div className="absolute -top-3 -right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleConnect(item.uid); }}
                    className="p-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-transform hover:scale-110"
                    title="Connect"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); removeItem(item.uid); }}
                    className="p-2 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-transform hover:scale-110"
                    title="Remove"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      
      <style>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -12;
          }
        }
      `}</style>
    </div>
  );
};

export default function ArchitectureBuilder() {
  const isMobile = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
  
  return (
    <DndProvider backend={isMobile ? TouchBackend : HTML5Backend} options={{ enableMouseEvents: true }}>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-blue-600 p-6 rounded-3xl text-white shadow-lg shadow-blue-200">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
              <Share2 className="w-6 h-6" />
            </div>
            <div>
              <p className="font-bold text-lg">Interactive Designer</p>
              <p className="text-blue-100 text-sm">Click the <Plus className="inline w-3 h-3" /> icon on a component to start drawing a connection line.</p>
            </div>
          </div>
          {/* Legend */}
          <div className="flex gap-4 text-xs font-bold uppercase tracking-widest opacity-80">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-white" />
              <span>Component</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-0.5 bg-white border-t-2 border-dashed" />
              <span>Flow</span>
            </div>
          </div>
        </div>
        <Canvas />
      </div>
    </DndProvider>
  );
}
