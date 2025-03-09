import { useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertUserSchema } from "@shared/schema";

export default function AuthPage() {
  const [, setLocation] = useLocation();
  const { user, loginMutation, registerMutation } = useAuth();

  const loginForm = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const registerForm = useForm({
    resolver: zodResolver(insertUserSchema),
    defaultValues: {
      username: "",
      password: "",
      fullName: "",
      title: "",
      bio: "",
      expertise: [],
      goals: [],
      isMentor: false,
    },
  });

  useEffect(() => {
    if (user) {
      // Redirect to the HTML page directly
      window.location.href = "/assets/page1.html";
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-50 to-pink-100">
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <a href="/" className="font-['Pacifico'] text-2xl text-[#FF6B6B]">
                ElevateHer
              </a>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-16 min-h-screen grid md:grid-cols-2">
        <div className="flex items-center justify-center p-8">
          <Card className="w-full max-w-md bg-white shadow-xl">
            <CardHeader>
              <h1 className="text-2xl font-semibold text-gray-900">Welcome to ElevateHer</h1>
              <p className="text-gray-600">Your journey to career growth starts here</p>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="register">Register</TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                  <form
                    onSubmit={loginForm.handleSubmit((data) =>
                      loginMutation.mutate(data)
                    )}
                    className="space-y-4"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        {...loginForm.register("username")}
                        className="w-full px-4 py-2 rounded-button border-gray-200"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        {...loginForm.register("password")}
                        className="w-full px-4 py-2 rounded-button border-gray-200"
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-[#FF6B6B] hover:bg-[#FF6B6B]/90"
                      disabled={loginMutation.isPending}
                    >
                      {loginMutation.isPending ? "Logging in..." : "Login"}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="register">
                  <form
                    onSubmit={registerForm.handleSubmit((data) =>
                      registerMutation.mutate(data)
                    )}
                    className="space-y-4"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="reg-username">Username</Label>
                      <Input
                        id="reg-username"
                        {...registerForm.register("username")}
                        className="w-full px-4 py-2 rounded-button border-gray-200"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reg-password">Password</Label>
                      <Input
                        id="reg-password"
                        type="password"
                        {...registerForm.register("password")}
                        className="w-full px-4 py-2 rounded-button border-gray-200"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        {...registerForm.register("fullName")}
                        className="w-full px-4 py-2 rounded-button border-gray-200"
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-[#FF6B6B] hover:bg-[#FF6B6B]/90"
                      disabled={registerMutation.isPending}
                    >
                      {registerMutation.isPending ? "Creating Account..." : "Create Account"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="hidden md:flex items-center justify-center p-8 bg-gradient-to-r from-pink-100 to-pink-200">
          <div className="max-w-md space-y-6 text-center">
            <h2 className="text-4xl font-bold text-gray-900">
              Empower Your Career Journey
            </h2>
            <p className="text-xl text-gray-600">
              Connect with mentors, develop new skills, and join a community of
              ambitious women shaping the future.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="p-4 bg-white rounded-xl shadow-sm">
                <div className="text-3xl font-bold text-[#FF6B6B]">500+</div>
                <div className="text-sm text-gray-600">Expert Mentors</div>
              </div>
              <div className="p-4 bg-white rounded-xl shadow-sm">
                <div className="text-3xl font-bold text-[#FF6B6B]">10k+</div>
                <div className="text-sm text-gray-600">Success Stories</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
