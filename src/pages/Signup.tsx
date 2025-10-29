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
import { Eye, EyeOff, Loader2, ArrowLeft, BookOpen, Check } from "lucide-react";
import WeatherBackground from "@/components/WeatherBackground";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { signup } = useAuth();
  const { currentTheme } = useThemes();
  const navigate = useNavigate();

  const validatePassword = (password: string) => {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return {
      minLength,
      hasUpperCase,
      hasLowerCase,
      hasNumbers,
      hasSpecialChar,
      isValid: minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar,
    };
  };

  const passwordValidation = validatePassword(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!passwordValidation.isValid) {
      setError("Password does not meet requirements");
      return;
    }

    setIsLoading(true);

    try {
      await signup(name, email, password);
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Signup failed");
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
                <p className="text-sm opacity-70">Join the magical world of note-taking</p>
              </motion.div>

              {/* Signup Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className={`${currentTheme.cardBackground} backdrop-blur-sm border-0 shadow-soft`}>
                  <CardHeader className="text-center">
                    <CardTitle className={`text-2xl font-heading ${currentTheme.cardTextColor}`}>
                      Create Account
                    </CardTitle>
                    <CardDescription className={currentTheme.cardTextColor}>
                      Start your magical journaling journey
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
                        <Label htmlFor="name" className={currentTheme.cardTextColor}>
                          Full Name
                        </Label>
                        <Input
                          id="name"
                          type="text"
                          placeholder="Your full name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          className="bg-white/50 border-gray-200 focus:border-ghibli-gold"
                        />
                      </div>

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
                            placeholder="Create a strong password"
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

                        {/* Password Requirements */}
                        {password && (
                          <div className="space-y-1 text-xs">
                            <div className={`flex items-center gap-2 ${passwordValidation.minLength ? 'text-green-600' : 'text-gray-500'}`}>
                              <Check className="h-3 w-3" />
                              At least 8 characters
                            </div>
                            <div className={`flex items-center gap-2 ${passwordValidation.hasUpperCase ? 'text-green-600' : 'text-gray-500'}`}>
                              <Check className="h-3 w-3" />
                              One uppercase letter
                            </div>
                            <div className={`flex items-center gap-2 ${passwordValidation.hasLowerCase ? 'text-green-600' : 'text-gray-500'}`}>
                              <Check className="h-3 w-3" />
                              One lowercase letter
                            </div>
                            <div className={`flex items-center gap-2 ${passwordValidation.hasNumbers ? 'text-green-600' : 'text-gray-500'}`}>
                              <Check className="h-3 w-3" />
                              One number
                            </div>
                            <div className={`flex items-center gap-2 ${passwordValidation.hasSpecialChar ? 'text-green-600' : 'text-gray-500'}`}>
                              <Check className="h-3 w-3" />
                              One special character
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword" className={currentTheme.cardTextColor}>
                          Confirm Password
                        </Label>
                        <div className="relative">
                          <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="bg-white/50 border-gray-200 focus:border-ghibli-gold pr-10"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="h-4 w-4 text-gray-500" />
                            ) : (
                              <Eye className="h-4 w-4 text-gray-500" />
                            )}
                          </Button>
                        </div>
                        {confirmPassword && password !== confirmPassword && (
                          <p className="text-xs text-red-600">Passwords do not match</p>
                        )}
                      </div>

                      <Button
                        type="submit"
                        className="w-full btn-ghibli"
                        disabled={isLoading || !passwordValidation.isValid || password !== confirmPassword}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Creating Account...
                          </>
                        ) : (
                          "Create Account"
                        )}
                      </Button>
                    </form>

                    <div className="mt-6 text-center">
                      <p className={`text-sm ${currentTheme.cardTextColor} opacity-70`}>
                        Already have an account?{" "}
                        <Link
                          to="/login"
                          className="text-ghibli-gold hover:text-ghibli-terracotta font-medium transition-colors"
                        >
                          Sign in here
                        </Link>
                      </p>
                    </div>
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

export default Signup;
