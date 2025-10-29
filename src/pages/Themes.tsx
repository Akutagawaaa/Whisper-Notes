
import { PageTransition } from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import ThemeSelector from "@/components/ThemeSelector";
import { useThemes } from "@/context/ThemesContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Palette, Moon, Sun, Monitor } from "lucide-react";
import { Link } from "react-router-dom";
import WeatherBackground from "@/components/WeatherBackground";

const Themes = () => {
  const { currentTheme, setDarkMode } = useThemes();
  
  return (
    <PageTransition>
      <div className={`min-h-screen relative ${currentTheme.backgroundGradient} ${currentTheme.textColor}`}>
        <div className="absolute inset-0 -z-10">
          <WeatherBackground className="h-full" />
        </div>
        
        <Navbar />
        
        <main className="container mx-auto px-4 pt-32 pb-20">
          <div className="flex items-center gap-4 mb-8">
            <Link to="/">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <span className={`inline-block ${currentTheme.accentTextColor} bg-opacity-10 px-3 py-1 rounded-full text-sm font-medium mb-2`}
                    style={{ backgroundColor: `${currentTheme.accentColor}20` }}>
                Personalization
              </span>
              <h1 className={`text-3xl md:text-4xl font-heading font-bold ${currentTheme.textColor}`}>
                Themes & Appearance
              </h1>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className={`${currentTheme.cardBackground} backdrop-blur-sm rounded-xl p-6 shadow-soft mb-8`}>
                <div className="flex items-center gap-3 mb-4">
                  <Palette className={`h-5 w-5 ${currentTheme.accentTextColor}`} />
                  <h2 className={`text-xl font-heading font-semibold ${currentTheme.cardTextColor}`}>
                    Theme Collection
                  </h2>
                </div>
                <p className={`${currentTheme.cardTextColor} opacity-70 mb-6`}>
                  Select a theme that reflects your mood and inspiration. Each theme is carefully crafted to evoke the magical world of Studio Ghibli.
                </p>
                
                <ThemeSelector />
              </div>
            </div>
            
            <div>
              <div className={`${currentTheme.cardBackground} backdrop-blur-sm rounded-xl p-6 shadow-soft mb-8`}>
                <div className="flex items-center gap-3 mb-4">
                  <Sun className={`h-5 w-5 ${currentTheme.accentTextColor}`} />
                  <h2 className={`text-xl font-heading font-semibold ${currentTheme.cardTextColor}`}>
                    Appearance
                  </h2>
                </div>
                
                <div className="space-y-4">
                  <p className={`${currentTheme.cardTextColor} opacity-70 mb-4`}>
                    Choose your preferred appearance mode:
                  </p>
                  
                  <Button 
                    variant="outline" 
                    className={`w-full justify-start ${!currentTheme.darkMode ? 'bg-ghibli-gold/10 border-ghibli-gold' : ''}`}
                    onClick={() => setDarkMode(false)}
                  >
                    <Sun className="mr-2 h-4 w-4" />
                    Light Mode
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className={`w-full justify-start ${currentTheme.darkMode ? 'bg-ghibli-navy/20 border-ghibli-forest' : ''}`}
                    onClick={() => setDarkMode(true)}
                  >
                    <Moon className="mr-2 h-4 w-4" />
                    Dark Mode
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => {
                      // Auto mode - could use system preference
                      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                      setDarkMode(prefersDark);
                    }}
                  >
                    <Monitor className="mr-2 h-4 w-4" />
                    Auto (System)
                  </Button>
                </div>
              </div>
              
              <div className={`${currentTheme.cardBackground} backdrop-blur-sm rounded-xl p-6 shadow-soft`}>
                <h3 className={`text-lg font-heading font-semibold ${currentTheme.cardTextColor} mb-3`}>
                  Preview
                </h3>
                <div className={`aspect-video rounded-lg overflow-hidden relative ${currentTheme.cardBackground}`}>
                  <div className="absolute inset-0 p-4">
                    <div className={`h-3 w-20 rounded-full mb-2 ${currentTheme.textColor} opacity-20`}></div>
                    <div className={`h-2 w-32 rounded-full mb-4 ${currentTheme.textColor} opacity-10`}></div>
                    
                    <div className={`h-16 w-full rounded-lg mb-3 ${currentTheme.cardBackground} opacity-50`}></div>
                    
                    <div className={`h-16 w-full rounded-lg ${currentTheme.cardBackground} opacity-50`}></div>
                    
                    <div className="absolute bottom-4 right-4 h-8 w-8 rounded-full"
                      style={{ backgroundColor: currentTheme.primaryColor }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </PageTransition>
  );
};

export default Themes;
