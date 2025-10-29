import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/context/AuthContext";
import { useThemes } from "@/context/ThemesContext";
import { PageTransition } from "@/components/PageTransition";
import { Eye, EyeOff, Loader2, ArrowLeft, BookOpen } from "lucide-react";
import WeatherBackground from "@/components/WeatherBackground";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const { currentTheme } = useThemes();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className={`min-h-screen relative ${currentTheme.backgroundGradient} ${currentTheme.textColor}`}>
        <div className="absolute inset-0 -z-10">
          <WeatherBackground className="h-full" />
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-8"
              >
                <Link to="/" className="inline-flex items-center gap-2 mb-6">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm opacity-70">Back to Home</span>
                </Link>

                <div className="flex items-center justify-center gap-3 mb-4">
                  <BookOpen className="h-8 w-8 text-ghibli-gold" />
                  <h1 className="text-3xl font-heading font-bold">WhisperNotes</h1>
                </div>
                <p className="text-sm opacity-70">Welcome back to your magical journal</p>
              </motion.div>

              {/* Login Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className={`${currentTheme.cardBackground} backdrop-blur-sm border-0 shadow-soft`}>
                  <CardHeader className="text-center">
                    <CardTitle className={`text-2xl font-heading ${currentTheme.cardTextColor}`}>
                      Sign In
                    </CardTitle>
                    <CardDescription className={currentTheme.cardTextColor}>
                      Enter your credentials to access your notes
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {error && (
                        <Alert className="border-red-200 bg-red-50">
                          <AlertDescription className="text-red-800">
                            {error}
                          </AlertDescription>
                        </Alert>
                      )}

                      <div className="space-y-2">
                        <Label htmlFor="email" className={currentTheme.cardTextColor}>
                          Email
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="bg-white/50 border-gray-200 focus:border-ghibli-gold"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="password" className={currentTheme.cardTextColor}>
                          Password
                        </Label>
                        <div className="relative">
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="bg-white/50 border-gray-200 focus:border-ghibli-gold pr-10"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4 text-gray-500" />
                            ) : (
                              <Eye className="h-4 w-4 text-gray-500" />
                            )}
                          </Button>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        className="w-full btn-ghibli"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Signing In...
                          </>
                        ) : (
                          "Sign In"
                        )}
                      </Button>
                    </form>

                    <div className="mt-6 text-center">
                      <p className={`text-sm ${currentTheme.cardTextColor} opacity-70`}>
                        Don't have an account?{" "}
                        <Link
                          to="/signup"
                          className="text-ghibli-gold hover:text-ghibli-terracotta font-medium transition-colors"
                        >
                          Sign up here
                        </Link>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Demo Credentials */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-6 text-center"
              >
                <Card className={`${currentTheme.cardBackground} backdrop-blur-sm border-0 shadow-soft`}>
                  <CardContent className="pt-6">
                    <p className={`text-sm ${currentTheme.cardTextColor} opacity-70 mb-2`}>
                      Demo Credentials (for testing):
                    </p>
                    <div className="text-xs space-y-1">
                      <p className={currentTheme.cardTextColor}>
                        <strong>Email:</strong> demo@whispernotes.com
                      </p>
                      <p className={currentTheme.cardTextColor}>
                        <strong>Password:</strong> demo123
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-3 text-xs"
                      onClick={() => {
                        setEmail("demo@whispernotes.com");
                        setPassword("demo123");
                      }}
                    >
                      Use Demo Credentials
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Login;
