
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { NotesProvider } from "@/context/NotesContext";
import { NotebooksProvider } from "@/context/NotebooksContext";
import { ThemesProvider } from "@/context/ThemesContext";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Notes from "./pages/Notes";
import Themes from "./pages/Themes";
import Draw from "./pages/Draw";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <ThemesProvider>
          <NotesProvider>
            <NotebooksProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <AnimatePresence mode="wait">
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/themes" element={<Themes />} />
                    <Route path="/notes" element={
                      <ProtectedRoute>
                        <Notes />
                      </ProtectedRoute>
                    } />
                    <Route path="/draw" element={
                      <ProtectedRoute>
                        <Draw />
                      </ProtectedRoute>
                    } />
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </AnimatePresence>
              </BrowserRouter>
            </NotebooksProvider>
          </NotesProvider>
        </ThemesProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
