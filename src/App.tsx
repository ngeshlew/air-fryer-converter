import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { ErrorBoundary } from './components/ErrorBoundary';
import { SidebarProvider } from '@/components/ui/animated-sidebar';
import { Dashboard } from './components/dashboard/Dashboard';
import { RecipeBrowser } from './components/recipes/RecipeBrowser';
import { RecipeDetail } from './components/recipes/RecipeDetail';
import { SettingsLayout } from './components/settings/SettingsLayout';
import './index.css';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="air-fryer-theme">
      <ErrorBoundary>
        <SidebarProvider>
          <Router>
            <div className="min-h-screen bg-background text-foreground">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/recipes" element={<RecipeBrowser />} />
                <Route path="/recipe/:id" element={<RecipeDetail />} />
                <Route path="/settings" element={<SettingsLayout />} />
              </Routes>
            </div>
          </Router>
          <Toaster />
        </SidebarProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;

