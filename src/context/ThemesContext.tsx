
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

export type ThemeType = {
  id: string;
  name: string;
  description: string;
  image: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundImage?: string;
  darkMode?: boolean;
  // Mode-specific styling
  backgroundGradient: string;
  textColor: string;
  cardBackground: string;
  cardTextColor: string;
  accentTextColor: string;
};

interface ThemesContextType {
  themes: ThemeType[];
  currentTheme: ThemeType;
  setCurrentTheme: (theme: ThemeType) => void;
  setDarkMode: (isDark: boolean) => void; // Added this method
  isLoading: boolean;
}

const GhibliThemes: ThemeType[] = [
  {
    id: "default",
    name: "Ghibli Meadows",
    description: "The default Ghibli-inspired theme with peaceful sky blues and warm beige tones",
    image: "howl-sky",
    primaryColor: "#A4C6E7",
    secondaryColor: "#F7EFE2",
    accentColor: "#E6C17A",
    backgroundGradient: "bg-gradient-to-b from-ghibli-sky-light to-ghibli-beige",
    textColor: "text-ghibli-navy",
    cardBackground: "bg-white/80",
    cardTextColor: "text-ghibli-navy",
    accentTextColor: "text-ghibli-terracotta",
  },
  {
    id: "totoro-forest",
    name: "Totoro's Forest",
    description: "Lush greens and earth tones inspired by My Neighbor Totoro",
    image: "totoro-forest",
    primaryColor: "#8CAB93",
    secondaryColor: "#F7EFE2",
    accentColor: "#D4A28B",
    backgroundGradient: "bg-gradient-to-b from-green-100 to-green-50",
    textColor: "text-green-900",
    cardBackground: "bg-green-50/90",
    cardTextColor: "text-green-900",
    accentTextColor: "text-green-700",
  },
  {
    id: "spirited-bath",
    name: "Spirited Bathhouse",
    description: "Rich reds and golds inspired by the bathhouse in Spirited Away",
    image: "spirited-bath",
    primaryColor: "#D4A28B",
    secondaryColor: "#F7EFE2",
    accentColor: "#E6C17A",
    backgroundGradient: "bg-gradient-to-b from-red-100 to-orange-50",
    textColor: "text-red-900",
    cardBackground: "bg-red-50/90",
    cardTextColor: "text-red-900",
    accentTextColor: "text-red-700",
  },
  {
    id: "kiki-delivery",
    name: "Kiki's Delivery",
    description: "Purple skies and soft pinks inspired by Kiki's Delivery Service",
    image: "kiki-delivery",
    primaryColor: "#E6BAB7",
    secondaryColor: "#F7EFE2",
    accentColor: "#A4C6E7",
    backgroundGradient: "bg-gradient-to-b from-purple-100 to-pink-50",
    textColor: "text-purple-900",
    cardBackground: "bg-purple-50/90",
    cardTextColor: "text-purple-900",
    accentTextColor: "text-purple-700",
  },
  {
    id: "ghibli-night",
    name: "Ghibli Night",
    description: "A soothing dark theme for nighttime journaling",
    image: "howl-sky",
    primaryColor: "#1F2937",
    secondaryColor: "#374151",
    accentColor: "#F8D078",
    darkMode: true,
    backgroundGradient: "bg-gradient-to-b from-ghibli-navy to-gray-900",
    textColor: "text-ghibli-cream",
    cardBackground: "bg-ghibli-navy/60",
    cardTextColor: "text-ghibli-cream",
    accentTextColor: "text-ghibli-amber",
  },
];

const ThemesContext = createContext<ThemesContextType | undefined>(undefined);

const STORAGE_KEY = "ghibli_theme";

export const ThemesProvider = ({ children }: { children: ReactNode }) => {
  const [themes] = useState<ThemeType[]>(GhibliThemes);
  const [currentTheme, setCurrentTheme] = useState<ThemeType>(GhibliThemes[0]);
  const [isLoading, setIsLoading] = useState(true);

  // Load theme preference from localStorage on initial render
  useEffect(() => {
    const loadTheme = () => {
      try {
        const storedTheme = localStorage.getItem(STORAGE_KEY);
        if (storedTheme) {
          const themeData = JSON.parse(storedTheme);
          const foundTheme = themes.find(t => t.id === themeData.id);
          if (foundTheme) {
            setCurrentTheme(foundTheme);
            
            // Apply theme to document
            if (foundTheme.darkMode) {
              document.documentElement.classList.add('dark');
            } else {
              document.documentElement.classList.remove('dark');
            }
            
            // Apply theme colors to CSS variables
            document.documentElement.style.setProperty('--theme-primary', foundTheme.primaryColor);
            document.documentElement.style.setProperty('--theme-secondary', foundTheme.secondaryColor);
            document.documentElement.style.setProperty('--theme-accent', foundTheme.accentColor);
            
            // Apply theme mode classes to body
            document.body.className = document.body.className.replace(/theme-\w+/g, '');
            document.body.classList.add(`theme-${foundTheme.id}`);
          }
        }
      } catch (error) {
        console.error("Failed to load theme:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTheme();
  }, [themes]);

  // Save theme preference to localStorage whenever it changes
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(currentTheme));
      
      // Apply theme to document
      if (currentTheme.darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      
      // Apply theme colors to CSS variables
      document.documentElement.style.setProperty('--theme-primary', currentTheme.primaryColor);
      document.documentElement.style.setProperty('--theme-secondary', currentTheme.secondaryColor);
      document.documentElement.style.setProperty('--theme-accent', currentTheme.accentColor);
      
      // Apply theme mode classes to body
      document.body.className = document.body.className.replace(/theme-\w+/g, '');
      document.body.classList.add(`theme-${currentTheme.id}`);
    }
  }, [currentTheme, isLoading]);

  // Add the setDarkMode method
  const setDarkMode = (isDark: boolean) => {
    setCurrentTheme({
      ...currentTheme,
      darkMode: isDark
    });
  };

  const value = {
    themes,
    currentTheme,
    setCurrentTheme,
    setDarkMode, // Add to context value
    isLoading
  };

  return <ThemesContext.Provider value={value}>{children}</ThemesContext.Provider>;
};

export const useThemes = () => {
  const context = useContext(ThemesContext);
  if (context === undefined) {
    throw new Error("useThemes must be used within a ThemesProvider");
  }
  return context;
};
