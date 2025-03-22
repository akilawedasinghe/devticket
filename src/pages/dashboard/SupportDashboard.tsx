
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/dashboard/StatCard";
import { Button } from "@/components/ui/button";
import { TicketIcon, MessageSquareIcon, BookOpenIcon, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { TicketChart } from "@/components/dashboard/TicketChart";

const SupportDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const actionCards = [
    {
      title: "My Assigned Tickets",
      description: "View tickets assigned to you",
      icon: <TicketIcon className="h-10 w-10" />,
      action: () => navigate("/tickets"),
      bgClass: "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800/40",
      iconClass: "bg-blue-100 dark:bg-blue-800/30 text-blue-600 dark:text-blue-400",
    },
    {
      title: "Open Tickets",
      description: "View unassigned tickets",
      icon: <TicketIcon className="h-10 w-10" />,
      action: () => navigate("/tickets/open"),
      bgClass: "bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800/40",
      iconClass: "bg-purple-100 dark:bg-purple-800/30 text-purple-600 dark:text-purple-400",
    },
    {
      title: "Client Communications",
      description: "Message with clients",
      icon: <MessageSquareIcon className="h-10 w-10" />,
      action: () => navigate("/chat"),
      bgClass: "bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 border-emerald-200 dark:border-emerald-800/40",
      iconClass: "bg-emerald-100 dark:bg-emerald-800/30 text-emerald-600 dark:text-emerald-400",
    },
    {
      title: "Knowledge Base",
      description: "Access support resources",
      icon: <BookOpenIcon className="h-10 w-10" />,
      action: () => navigate("/knowledge"),
      bgClass: "bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 border-amber-200 dark:border-amber-800/40",
      iconClass: "bg-amber-100 dark:bg-amber-800/30 text-amber-600 dark:text-amber-400",
    },
  ];
  
  // Mock data for charts
  const ticketTrendsData = [
    { name: "Mon", open: 4, resolved: 2 },
    { name: "Tue", open: 3, resolved: 4 },
    { name: "Wed", open: 5, resolved: 3 },
    { name: "Thu", open: 7, resolved: 5 },
    { name: "Fri", open: 2, resolved: 6 },
    { name: "Sat", open: 1, resolved: 2 },
    { name: "Sun", open: 3, resolved: 1 },
  ];
  
  const ticketCategoriesData = [
    { name: "Technical", value: 35 },
    { name: "Billing", value: 25 },
    { name: "Account", value: 15 },
    { name: "Feature", value: 20 },
    { name: "Other", value: 5 },
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50 to-sky-100 dark:from-blue-900/20 dark:to-sky-900/30 w-full h-full min-h-screen relative pb-8">
      {/* 3D Effect Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[30%] -right-[20%] w-[70%] h-[70%] rounded-full bg-blue-200/40 dark:bg-blue-400/10 blur-3xl"></div>
        <div className="absolute -bottom-[30%] -left-[20%] w-[70%] h-[70%] rounded-full bg-sky-200/40 dark:bg-sky-400/10 blur-3xl"></div>
        <div className="absolute top-[20%] left-[10%] w-[15%] h-[15%] rounded-full bg-white/50 dark:bg-white/5 blur-xl"></div>
      </div>
      
      <div className="w-full mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 pt-6 px-4">
          <div className="animate-fade-in">
            <h1 className="text-3xl font-bold tracking-tight mb-2 text-slate-900 dark:text-slate-50">
              Welcome, {user?.name || "Support Agent"}
            </h1>
            <p className="text-slate-600 dark:text-slate-300">Monitor and manage support tickets</p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0 animate-fade-in" style={{ animationDelay: "100ms" }}>
            <Button 
              onClick={() => navigate("/tickets")}
              className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all duration-300"
            >
              <TicketIcon className="mr-2 h-4 w-4" />
              View Tickets
            </Button>
          </div>
        </div>
        
        {/* Stats summary */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-6 px-4">
          <StatCard
            title="Assigned to You"
            value={7}
            color="warning"
            className="animate-fade-in backdrop-blur-sm bg-white/70 dark:bg-white/5 shadow-xl hover:shadow-2xl transition-all duration-300 border-0"
            style={{ animationDelay: "200ms" }}
          />
          <StatCard
            title="Completed Today"
            value={3}
            color="success"
            className="animate-fade-in backdrop-blur-sm bg-white/70 dark:bg-white/5 shadow-xl hover:shadow-2xl transition-all duration-300 border-0"
            style={{ animationDelay: "300ms" }}
          />
          <StatCard
            title="Avg. Response Time"
            value="2.5 hrs"
            color="info"
            className="animate-fade-in backdrop-blur-sm bg-white/70 dark:bg-white/5 shadow-xl hover:shadow-2xl transition-all duration-300 border-0"
            style={{ animationDelay: "400ms" }}
          />
          <StatCard
            title="Client Satisfaction"
            value="4.8/5"
            trend="up"
            trendValue={2}
            color="success"
            className="animate-fade-in backdrop-blur-sm bg-white/70 dark:bg-white/5 shadow-xl hover:shadow-2xl transition-all duration-300 border-0"
            style={{ animationDelay: "500ms" }}
          />
        </div>
        
        {/* Charts */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 mb-6 px-4">
          <TicketChart 
            data={ticketTrendsData} 
            type="bar" 
            title="Ticket Trends (Last 7 Days)" 
            description="Open vs. Resolved tickets"
            className="animate-fade-in hover:shadow-2xl transition-all duration-300 backdrop-blur-sm bg-white/60 dark:bg-slate-800/60 border-0"
            style={{ animationDelay: "600ms" }}
          />
          <TicketChart 
            data={ticketCategoriesData} 
            type="pie" 
            title="Ticket Categories" 
            description="Distribution by type"
            className="animate-fade-in hover:shadow-2xl transition-all duration-300 backdrop-blur-sm bg-white/60 dark:bg-slate-800/60 border-0"
            style={{ animationDelay: "700ms" }}
          />
        </div>
        
        <h2 className="text-2xl font-semibold mt-8 mb-6 text-slate-900 dark:text-slate-50 animate-fade-in px-4" style={{ animationDelay: "800ms" }}>Quick Actions</h2>
        
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 px-4">
          {actionCards.map((item, index) => (
            <Card 
              key={index} 
              className={`overflow-hidden backdrop-blur-sm hover:scale-105 transition-all duration-300 cursor-pointer animate-fade-in border-0 shadow-xl bg-white/70 dark:bg-white/5`} 
              onClick={item.action}
              style={{ animationDelay: `${900 + index * 100}ms` }}
            >
              <CardHeader className="flex flex-row items-start space-y-0 pb-2">
                <CardTitle className="text-xl font-bold text-slate-800 dark:text-slate-50">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-full ${item.iconClass}`}>
                    {item.icon}
                  </div>
                  <CardDescription className="text-base text-slate-600 dark:text-slate-300">{item.description}</CardDescription>
                </div>
                <Button variant="secondary" className="w-full mt-4 font-medium shadow-md hover:shadow-lg">
                  Continue
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SupportDashboard;
