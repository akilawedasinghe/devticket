
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ArrowRight, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserRole } from "@/lib/types";

interface LoginFormValues {
  email: string;
  password: string;
}

export default function Login() {
  const { login, isAuthenticated, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<UserRole>("client");

  const form = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      const result = await login(data.email, data.password);

      if (result) {
        toast({
          title: "Login successful",
          description: "You have been logged in successfully.",
        });

        // Navigation will be handled by the auth redirect
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: (error as Error).message || "Invalid credentials",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Redirect if already authenticated
  if (isAuthenticated) {
    // Redirect to appropriate dashboard
    let redirectPath = '/dashboard/client'; // default
    if (user?.role === 'admin') {
      redirectPath = '/dashboard/admin';
    } else if (user?.role === 'support') {
      redirectPath = '/dashboard/support';
    }
    return <Navigate to={redirectPath} replace />;
  }

  const setDefaultEmail = (role: UserRole) => {
    let email = "";

    switch (role) {
      case "admin":
        email = "admin@example.com";
        break;
      case "support":
        email = "support@example.com";
        break;
      case "client":
        email = "client@example.com";
        break;
    }

    form.setValue("email", email);
    form.setValue("password", "password"); // Any password works in demo mode
  };

  const loginAsDemoUser = async (role: UserRole) => {
    setIsLoading(true);
    try {
      let email = "";
      switch (role) {
        case "admin":
          email = "admin@example.com";
          break;
        case "support":
          email = "support@example.com";
          break;
        case "client":
          email = "client@example.com";
          break;
      }
      
      const result = await login(email, "password");
      if (result) {
        toast({
          title: "Demo login successful",
          description: `Logged in as ${role}`,
        });
      }
    } catch (error) {
      toast({
        title: "Demo login failed",
        description: (error as Error).message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <div className="absolute inset-0 bg-grid-black/[0.02] -z-10" />
      <div className="w-full max-w-md animate-fade-in">
        <div className="flex items-center justify-center mb-8">
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-foreground">
            <img
              src="/lovable-uploads/ad5f4ca3-93c0-436d-bbf3-b60ca083ed67.png"
              alt="Symetrix Logo"
              className="h-8 w-8 object-contain"
            />
            <span>symetrix360 Portal</span>
          </Link>
        </div>

        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Welcome back</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>

          <Tabs
            defaultValue="client"
            className="w-full"
            onValueChange={(value) => {
              setActiveTab(value as UserRole);
              setDefaultEmail(value as UserRole);
            }}
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="client">Client</TabsTrigger>
              <TabsTrigger value="support">Support</TabsTrigger>
              <TabsTrigger value="admin">Admin</TabsTrigger>
            </TabsList>

            <TabsContent value="client" className="mt-4">
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="email"
                      rules={{
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="client@example.com"
                              type="email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      rules={{ required: "Password is required" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="••••••••"
                              type="password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? "Logging in..." : "Log in"}
                    </Button>
                  </form>
                </Form>

                <div className="mt-4 text-center">
                  <p className="text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <Link
                      to="/register"
                      className="font-medium text-primary hover:underline inline-flex items-center"
                    >
                      Register <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </p>
                </div>
              </CardContent>
            </TabsContent>

            <TabsContent value="support" className="mt-4">
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="email"
                      rules={{
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="support@example.com"
                              type="email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      rules={{ required: "Password is required" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="••••••••"
                              type="password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? "Logging in..." : "Log in"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </TabsContent>

            <TabsContent value="admin" className="mt-4">
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="email"
                      rules={{
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="admin@example.com"
                              type="email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      rules={{ required: "Password is required" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="••••••••"
                              type="password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? "Logging in..." : "Log in"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </TabsContent>
          </Tabs>

          <CardFooter className="flex flex-col border-t pt-4">
            <div className="text-center text-sm text-muted-foreground mb-4">
              <p className="font-semibold mb-2">Quick Demo Login</p>
              <div className="flex flex-wrap gap-2 justify-center">
                <Button variant="outline" size="sm" onClick={() => loginAsDemoUser('client')} disabled={isLoading}>
                  <Key className="h-3 w-3 mr-1" /> Client
                </Button>
                <Button variant="outline" size="sm" onClick={() => loginAsDemoUser('support')} disabled={isLoading}>
                  <Key className="h-3 w-3 mr-1" /> Support
                </Button>
                <Button variant="outline" size="sm" onClick={() => loginAsDemoUser('admin')} disabled={isLoading}>
                  <Key className="h-3 w-3 mr-1" /> Admin
                </Button>
              </div>
            </div>
            
            <div className="text-center text-xs text-muted-foreground">
              <p>Demo accounts:</p>
              <div className="mt-1 space-y-1">
                <p>Admin: admin@example.com or director@example.com</p>
                <p>Support: support@example.com or sarah.tech@example.com</p>
                <p>Client: client@example.com or john.smith@company.com</p>
                <p className="font-semibold">Any password works in demo mode</p>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
