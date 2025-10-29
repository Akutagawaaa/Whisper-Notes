
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, PenLine, Search, User, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useNotes } from "@/context/NotesContext";
import { useAuth } from "@/context/AuthContext";
import { useThemes } from "@/context/ThemesContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const { addNote } = useNotes();
  const { user, isAuthenticated, logout } = useAuth();
  const { currentTheme } = useThemes();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleNewNote = () => {
    // This would typically open the note editor modal
    // but for simplicity, we'll navigate to the notes page
    if (location.pathname !== "/notes") {
      window.location.href = "/notes";
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Navigate to notes page with search query
      window.location.href = `/notes?search=${encodeURIComponent(searchTerm)}`;
    }
  };

  const isActive = (path: string) => {
    return location.pathname === path ? "text-ghibli-gold" : `${currentTheme.textColor} hover:text-ghibli-gold`;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "py-3 bg-ghibli-cream/80 backdrop-blur-md shadow-soft" 
          : "py-5 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <PenLine className="h-6 w-6 text-ghibli-gold" />
          <h1 className={`text-2xl font-heading font-bold ${currentTheme.textColor}`}>WhisperNotes</h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className={`transition-colors ${isActive("/")}`}>
            Home
          </Link>
          <Link to="/notes" className={`transition-colors ${isActive("/notes")}`}>
            My Notes
          </Link>
          <Link to="/themes" className={`transition-colors ${isActive("/themes")}`}>
            Themes
          </Link>
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 rounded-full bg-ghibli-beige/50 focus:bg-white focus:ring-2 focus:ring-ghibli-gold/30 outline-none transition-all w-[180px] focus:w-[220px]"
            />
          </form>
          {isAuthenticated ? (
            <>
              <Button className="btn-ghibli" onClick={handleNewNote}>New Note</Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{user?.name}</p>
                      <p className="w-[200px] truncate text-sm text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline" className="btn-outline">Sign In</Button>
              </Link>
              <Link to="/signup">
                <Button className="btn-ghibli">Sign Up</Button>
              </Link>
            </div>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6 text-ghibli-navy" />
          ) : (
            <Menu className="h-6 w-6 text-ghibli-navy" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-ghibli-cream/95 backdrop-blur-md"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
              <Link 
                to="/" 
                className={`py-2 px-4 rounded-md hover:bg-ghibli-beige transition-colors ${
                  location.pathname === "/" ? "bg-ghibli-beige/70 text-ghibli-gold" : "text-ghibli-navy"
                }`}
              >
                Home
              </Link>
              <Link 
                to="/notes" 
                className={`py-2 px-4 rounded-md hover:bg-ghibli-beige transition-colors ${
                  location.pathname === "/notes" ? "bg-ghibli-beige/70 text-ghibli-gold" : "text-ghibli-navy"
                }`}
              >
                My Notes
              </Link>
              <Link 
                to="/themes" 
                className={`py-2 px-4 rounded-md hover:bg-ghibli-beige transition-colors ${
                  location.pathname === "/themes" ? "bg-ghibli-beige/70 text-ghibli-gold" : "text-ghibli-navy"
                }`}
              >
                Themes
              </Link>
              <Link 
                to="/draw" 
                className={`py-2 px-4 rounded-md hover:bg-ghibli-beige transition-colors ${
                  location.pathname === "/draw" ? "bg-ghibli-beige/70 text-ghibli-gold" : "text-ghibli-navy"
                }`}
              >
                Draw
              </Link>
              <form onSubmit={handleSearch} className="relative mt-2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search notes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-full bg-ghibli-beige/70 focus:bg-white focus:ring-2 focus:ring-ghibli-gold/30 outline-none transition-all"
                />
              </form>
              {isAuthenticated ? (
                <>
                  <Button 
                    className="btn-ghibli mt-2 w-full" 
                    onClick={handleNewNote}
                  >
                    New Note
                  </Button>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-8 w-8 rounded-full bg-ghibli-gold/20 flex items-center justify-center">
                        <User className="h-4 w-4 text-ghibli-gold" />
                      </div>
                      <div>
                        <p className="font-medium text-ghibli-navy">{user?.name}</p>
                        <p className="text-xs text-gray-600">{user?.email}</p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      onClick={logout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </Button>
                  </div>
                </>
              ) : (
                <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
                  <Link to="/login" className="block">
                    <Button variant="outline" className="w-full">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/signup" className="block">
                    <Button className="btn-ghibli w-full">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
