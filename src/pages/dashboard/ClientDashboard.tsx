
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/dashboard/StatCard";
import { Button } from "@/components/ui/button";
import { TicketIcon, BookOpenIcon, User2, ArrowRight, PlusCircle, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { TicketChart } from "@/components/dashboard/TicketChart";

const ClientDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  const actionCards = [
    {
      title: "Submit Ticket",
      description: "Create a new support ticket",
      icon: <PlusCircle className="h-10 w-10 text-blue-500" />,
      action: () => navigate("/tickets/new"),
      bgClass: "bg-gradient-to-br from-blue-600/10 to-blue-700/5 hover:from-blue-600/20 hover:to-blue-700/10 border-blue-700/20",
      iconClass: "bg-blue-900/30 text-blue-400",
    },
    {
      title: "My Tickets",
      description: "View your existing tickets",
      icon: <TicketIcon className="h-10 w-10 text-purple-500" />,
      action: () => navigate("/tickets"),
      bgClass: "bg-gradient-to-br from-purple-600/10 to-purple-700/5 hover:from-purple-600/20 hover:to-purple-700/10 border-purple-700/20",
      iconClass: "bg-purple-900/30 text-purple-400",
    },
    {
      title: "Account Settings",
      description: "Manage your account",
      icon: <User2 className="h-10 w-10 text-emerald-500" />,
      action: () => navigate("/profile"),
      bgClass: "bg-gradient-to-br from-emerald-600/10 to-emerald-700/5 hover:from-emerald-600/20 hover:to-emerald-700/10 border-emerald-700/20", 
      iconClass: "bg-emerald-900/30 text-emerald-400",
    },
  ];
  
  // Mock data for charts
  const ticketStatusData = [
    { name: "Open", value: 3 },
    { name: "In Progress", value: 2 },
    { name: "Resolved", value: 15 },
    { name: "Closed", value: 5 },
  ];
  
  const ticketHistoryData = [
    { name: "Jan", tickets: 2 },
    { name: "Feb", tickets: 1 },
    { name: "Mar", tickets: 3 },
    { name: "Apr", tickets: 0 },
    { name: "May", tickets: 5 },
    { name: "Jun", tickets: 4 },
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50 to-sky-100 dark:from-blue-900/20 dark:to-sky-900/30 w-full min-h-screen relative">
      {/* 3D Effect Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[30%] -right-[20%] w-[70%] h-[70%] rounded-full bg-blue-200/40 dark:bg-blue-400/10 blur-3xl"></div>
        <div className="absolute -bottom-[30%] -left-[20%] w-[70%] h-[70%] rounded-full bg-sky-200/40 dark:bg-sky-400/10 blur-3xl"></div>
        <div className="absolute top-[20%] left-[10%] w-[15%] h-[15%] rounded-full bg-white/50 dark:bg-white/5 blur-xl"></div>
      </div>
      
      <div className="w-full mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pt-8 px-4">
          <div className="animate-fade-in">
            <h1 className="text-2xl md:text-4xl font-bold tracking-tight mb-2 text-gray-800 dark:text-white">
              Welcome, {user?.name || "Client"}
            </h1>
            <p className="text-sm md:text-base text-gray-600 dark:text-slate-400">Here's an overview of your support tickets and account</p>
          </div>
          <div className="mt-4 md:mt-0 animate-fade-in flex gap-3 w-full md:w-auto" style={{ animationDelay: "100ms" }}>
            <Button 
              onClick={() => navigate("/tickets")}
              variant="outline"
              className="text-sm flex-1 md:flex-none bg-white/80 dark:bg-slate-800/50 text-gray-700 dark:text-slate-200 border-gray-200 dark:border-slate-700 hover:bg-gray-100 dark:hover:bg-slate-700/70"
            >
              View Tickets
            </Button>
            <Button 
              onClick={() => navigate("/tickets/new")}
              className="text-sm flex-1 md:flex-none bg-blue-600 hover:bg-blue-700 text-white gap-2"
            >
              <PlusCircle className="h-4 w-4" />
              New Ticket
            </Button>
          </div>
        </div>
        
        {/* Stats summary */}
        <div className="grid gap-3 md:gap-4 grid-cols-2 md:grid-cols-4 my-6 md:my-8 px-4">
          <StatCard
            title="Open Tickets"
            value={3}
            color="warning"
            className="animate-fade-in backdrop-blur-sm bg-white/70 dark:bg-white/5 shadow-xl hover:shadow-2xl transition-all duration-300 border border-amber-200/50 dark:border-amber-900/20"
            style={{ animationDelay: "200ms" }}
          />
          <StatCard
            title="In Progress"
            value={2}
            color="info"
            className="animate-fade-in backdrop-blur-sm bg-white/70 dark:bg-white/5 shadow-xl hover:shadow-2xl transition-all duration-300 border border-blue-200/50 dark:border-blue-900/20"
            style={{ animationDelay: "300ms" }}
          />
          <StatCard
            title="Resolved"
            value={15}
            color="success"
            className="animate-fade-in backdrop-blur-sm bg-white/70 dark:bg-white/5 shadow-xl hover:shadow-2xl transition-all duration-300 border border-emerald-200/50 dark:border-emerald-900/20"
            style={{ animationDelay: "400ms" }}
          />
          <StatCard
            title="Unassigned"
            value={2}
            icon={<AlertCircle className="h-4 w-4" />}
            color="warning"
            className="animate-fade-in backdrop-blur-sm bg-white/70 dark:bg-white/5 shadow-xl hover:shadow-2xl transition-all duration-300 border border-amber-200/50 dark:border-amber-900/20"
            style={{ animationDelay: "500ms" }}
          />
        </div>
        
        {/* Charts */}
        <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 mb-6 md:mb-8 px-4">
          <TicketChart 
            data={ticketStatusData} 
            type="pie" 
            title="Your Ticket Status" 
            description="Distribution by current status"
            darkLabels={true}
            className="animate-fade-in backdrop-blur-sm bg-white/70 dark:bg-white/5 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200/80 dark:border-slate-700/30 h-[250px] md:h-auto"
            style={{ animationDelay: "600ms" }}
          />
          <TicketChart 
            data={ticketHistoryData} 
            type="bar" 
            title="Ticket History (6 Months)" 
            description="Number of tickets submitted"
            darkLabels={true}
            className="animate-fade-in backdrop-blur-sm bg-white/70 dark:bg-white/5 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200/80 dark:border-slate-700/30 h-[250px] md:h-auto"
            style={{ animationDelay: "700ms" }}
          />
        </div>
        
        <h2 className="text-xl md:text-2xl font-semibold mt-6 md:mt-8 mb-4 md:mb-6 text-gray-800 dark:text-white animate-fade-in px-4" style={{ animationDelay: "800ms" }}>
          Quick Actions
        </h2>
        
        <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-4 pb-8">
          {actionCards.map((item, index) => (
            <Card 
              key={index} 
              className={`overflow-hidden backdrop-blur-sm bg-white/70 dark:bg-white/5 hover:scale-105 transition-all duration-300 cursor-pointer animate-fade-in shadow-lg hover:shadow-xl border border-gray-200/80 dark:border-slate-700/30`}
              onClick={item.action}
              style={{ animationDelay: `${900 + index * 100}ms` }}
            >
              <CardContent className="p-3 md:p-4 pt-4 md:pt-6">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className={`p-2 md:p-3 rounded-full ${item.iconClass}`}>
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-white">{item.title}</h3>
                    <p className="text-xs md:text-sm text-gray-600 dark:text-slate-400">{item.description}</p>
                  </div>
                </div>
                <div className="flex justify-end mt-3 md:mt-4">
                  <Button variant="ghost" size="sm" className="text-sm text-gray-700 hover:text-gray-900 dark:text-slate-300 dark:hover:text-white hover:bg-blue-50 dark:hover:bg-slate-800/60">
                    Continue <ArrowRight className="ml-2 h-3 w-3 md:h-4 md:w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
