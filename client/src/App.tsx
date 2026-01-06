import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Playground from "./pages/Playground";
import Tutorials from "./pages/Tutorials";
import TutorialDetail from "./pages/TutorialDetail";
import Architecture from "./pages/Architecture";
import { Router as WouterRouter } from "wouter"; // 1. Import Router as WouterRouter
import { useHashLocation } from "wouter/use-hash-location";


/**
 * SAP BTP AI Learning Hub - Main App
 * Design: Modern Enterprise Minimalism
 * Theme: Light mode (white background with SAP blue accents)
 */

function Router() {
  return (
    
    <WouterRouter hook={useHashLocation}>
      <Layout>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/tutorials" component={Tutorials} />
          <Route path="/tutorials/:id" component={TutorialDetail} />
          <Route path="/playground" component={Playground} />
          <Route path="/architecture" component={Architecture} />
          <Route path="/404" component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </WouterRouter>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster position="top-center" richColors />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
export default App;
