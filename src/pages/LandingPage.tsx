
import React from "react";
import { Link } from "react-router-dom";
import { 
  ShieldCheck, 
  MessageSquareText, 
  PieChart, 
  Users, 
  Layers, 
  BadgeCheck,
  ArrowRight,
  Headset,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

export default function LandingPage() {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Hero Section */}
      <header className="relative bg-gradient-to-br from-primary/10 via-background to-background pt-12 pb-24 md:pt-20 md:pb-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full filter blur-3xl opacity-70"></div>
          <div className="absolute top-60 -left-20 w-60 h-60 bg-primary/20 rounded-full filter blur-3xl opacity-50"></div>
        </div>
        
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center pb-12">
            <div className="flex items-center gap-2">
              <img 
                src="/lovable-uploads/ad5f4ca3-93c0-436d-bbf3-b60ca083ed67.png" 
                alt="Symetrix Logo" 
                className="h-8 w-8 object-contain"
              />
              <span className="text-2xl font-bold">symetrix360 Portal</span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button variant="ghost" size={isMobile ? "sm" : "default"}>
                  Log in
                </Button>
              </Link>
              <Link to="/register">
                <Button size={isMobile ? "sm" : "default"}>
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
                <span className="text-primary">Streamlined</span> Support
                <Sparkles className="inline-block ml-2 h-8 w-8 text-primary animate-pulse" />
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                Efficiently manage and resolve your system tickets with our comprehensive support platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register">
                  <Button size="lg" className="group w-full sm:w-auto">
                    Get Started <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/admin-register">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Register Support Team <ShieldCheck className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="flex-1 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <div className="bg-white/50 backdrop-blur-sm border rounded-2xl shadow-lg p-6 animate-scale-in" style={{ animationDelay: "0.6s" }}>
                <div className="grid grid-cols-2 gap-4">
                  <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-none shadow hover:shadow-md transition-all hover:scale-105">
                    <CardContent className="p-4 flex flex-col items-center text-center">
                      <MessageSquareText className="h-8 w-8 text-primary mb-3" />
                      <h3 className="font-medium">Ticket Management</h3>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-none shadow hover:shadow-md transition-all hover:scale-105">
                    <CardContent className="p-4 flex flex-col items-center text-center">
                      <Headset className="h-8 w-8 text-primary mb-3" />
                      <h3 className="font-medium">Live Support</h3>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-none shadow hover:shadow-md transition-all hover:scale-105">
                    <CardContent className="p-4 flex flex-col items-center text-center">
                      <PieChart className="h-8 w-8 text-primary mb-3" />
                      <h3 className="font-medium">Analytics</h3>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-none shadow hover:shadow-md transition-all hover:scale-105">
                    <CardContent className="p-4 flex flex-col items-center text-center">
                      <Users className="h-8 w-8 text-primary mb-3" />
                      <h3 className="font-medium">User Management</h3>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in" style={{ animationDelay: "0.8s" }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Comprehensive Support Features</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to manage your support requests efficiently
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <MessageSquareText className="h-10 w-10 text-primary" />,
                title: "Ticket Management",
                description: "Create, track, and resolve support tickets with an intuitive interface."
              },
              {
                icon: <Headset className="h-10 w-10 text-primary" />,
                title: "Live Chat Support",
                description: "Connect with support agents in real-time for immediate assistance."
              },
              {
                icon: <PieChart className="h-10 w-10 text-primary" />,
                title: "Analytics Dashboard",
                description: "Gain insights into support performance and system health."
              },
              {
                icon: <Layers className="h-10 w-10 text-primary" />,
                title: "Knowledge Base",
                description: "Access documentation and solutions to common issues."
              },
              {
                icon: <Users className="h-10 w-10 text-primary" />,
                title: "User Management",
                description: "Manage users, roles, and permissions within your organization."
              },
              {
                icon: <BadgeCheck className="h-10 w-10 text-primary" />,
                title: "Priority Support",
                description: "Escalate critical issues for faster resolution."
              }
            ].map((feature, index) => (
              <Card key={index} className="h-full border rounded-xl shadow-sm hover:shadow-md transition-shadow animate-fade-in" style={{ animationDelay: `${1 + index * 0.1}s` }}>
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="mb-4 p-3 bg-primary/10 rounded-full w-fit">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground flex-grow">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-background relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 -right-20 w-60 h-60 bg-primary/20 rounded-full filter blur-3xl opacity-50"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/10 rounded-full filter blur-3xl opacity-70"></div>
        </div>
        
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to streamline your support?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of companies already using our platform to manage their support needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" className="group w-full sm:w-auto">
                  Create client account <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/admin-register">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Register as support team <ShieldCheck className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-white py-12 border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <img 
                src="/lovable-uploads/ad5f4ca3-93c0-436d-bbf3-b60ca083ed67.png" 
                alt="Symetrix Logo" 
                className="h-6 w-6 object-contain"
              />
              <span className="text-xl font-bold">symetrix360 Portal</span>
            </div>
            <div className="flex gap-6">
              <Link to="/login" className="text-muted-foreground hover:text-foreground transition-colors">
                Login
              </Link>
              <Link to="/register" className="text-muted-foreground hover:text-foreground transition-colors">
                Register
              </Link>
              <Link to="/admin-register" className="text-muted-foreground hover:text-foreground transition-colors">
                Staff Registration
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} symetrix360 Portal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
