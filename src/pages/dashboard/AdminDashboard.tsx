
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/dashboard/StatCard";
import { Button } from "@/components/ui/button";
import { TicketIcon, UserCog, BarChart3Icon, BookOpenIcon, ExternalLink, Plus, Activity, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { TicketChart } from "@/components/dashboard/TicketChart";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { Activity as ActivityType } from "@/lib/types";

// Mock data for charts
const ticketsByDepartment = [
  { name: "Finance", value: 38 },
  { name: "Sales", value: 22 },
  { name: "Procurement", value: 15 },
  { name: "Manufacturing", value: 25 },
];

const ticketsByStatus = [
  {
    name: "Jan",
    Open: 30,
    "In Progress": 25,
    Resolved: 20,
  },
  {
    name: "Feb",
    Open: 25,
    "In Progress": 30,
    Resolved: 22,
  },
  {
    name: "Mar",
    Open: 35,
    "In Progress": 28,
    Resolved: 32,
  },
  {
    name: "Apr",
    Open: 40,
    "In Progress": 35,
    Resolved: 28,
  },
  {
    name: "May",
    Open: 30,
    "In Progress": 42,
    Resolved: 38,
  },
  {
    name: "Jun",
    Open: 42,
    "In Progress": 35,
    Resolved: 45,
  },
];

// Mock activity data
const recentActivities: ActivityType[] = [
  {
    id: "1",
    type: "ticket_created",
    user: "John Doe",
    createdAt: new Date(Date.now() - 1000 * 60 * 10), // 10 minutes ago
    metadata: {
      ticketId: "TK-1023",
      ticketTitle: "Report generation error",
      erpSystem: "SAP ByDesign",
      department: "Finance",
    }
  },
  {
    id: "2",
    type: "user_registered",
    user: "System",
    createdAt: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
    metadata: {
      userName: "Sarah Miller",
      userRole: "client",
      company: "Acme Corp",
    }
  },
  {
    id: "3",
    type: "ticket_resolved",
    user: "Mike Johnson",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
    metadata: {
      ticketId: "TK-1021",
      ticketTitle: "User access issue",
      assigneeName: "Mike Johnson",
    }
  },
  {
    id: "4",
    type: "message_sent",
    user: "Laura Anderson",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    metadata: {
      ticketId: "TK-1020",
      messagePreview: "I've implemented the fix as suggested...",
    }
  },
];

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const actionCards = [
    {
      title: "Tickets Overview",
      description: "Manage all tickets",
      icon: <TicketIcon className="h-5 w-5 text-white" />,
      action: () => navigate("/tickets"),
      bgColor: "from-blue-600 to-blue-700",
    },
    {
      title: "User Management",
      description: "Manage users and roles",
      icon: <UserCog className="h-5 w-5 text-white" />,
      action: () => navigate("/users"),
      bgColor: "from-purple-600 to-purple-700",
    },
    {
      title: "Analytics",
      description: "View system analytics",
      icon: <BarChart3Icon className="h-5 w-5 text-white" />,
      action: () => navigate("/analytics"),
      bgColor: "from-emerald-600 to-emerald-700",
    },
    {
      title: "Knowledge Management",
      description: "Manage knowledge base content",
      icon: <BookOpenIcon className="h-5 w-5 text-white" />,
      action: () => navigate("/knowledge"),
      bgColor: "from-amber-600 to-amber-700",
    },
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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 pt-6">
          <div className="animate-fade-in px-4">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
              Welcome, {user?.name || "Admin"}
            </h1>
            <p className="text-slate-600 dark:text-slate-300 mt-1">Here's an overview of your support system</p>
          </div>
          
          <div className="flex flex-wrap gap-2 px-4 animate-fade-in mt-4 md:mt-0" style={{ animationDelay: "100ms" }}>
            <Button 
              onClick={() => navigate("/tickets/new")}
              size="sm"
              className="bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 dark:from-slate-700 dark:to-slate-800 dark:hover:from-slate-600 dark:hover:to-slate-700 shadow-md hover:shadow-lg transition-all duration-300"
            >
              <Plus className="mr-2 h-4 w-4" />
              New Ticket
            </Button>
            <Button 
              onClick={() => navigate("/tickets")}
              variant="outline"
              size="sm"
              className="shadow-md hover:shadow-lg transition-all duration-300 border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <Activity className="mr-2 h-4 w-4" />
              View All Activity
            </Button>
          </div>
        </div>
        
        {/* Stats summary */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 px-4">
          <StatCard
            title="Open Tickets"
            value={42}
            color="warning"
            className="animate-fade-in backdrop-blur-sm bg-white/70 dark:bg-white/5 shadow-xl hover:shadow-2xl transition-all duration-300 border-0"
            style={{ animationDelay: "200ms" }}
          />
          <StatCard
            title="Users"
            value={156}
            trend="up"
            trendValue={12}
            className="animate-fade-in backdrop-blur-sm bg-white/70 dark:bg-white/5 shadow-xl hover:shadow-2xl transition-all duration-300 border-0"
            style={{ animationDelay: "300ms" }}
          />
          <StatCard
            title="Avg. Resolution Time"
            value="1.8 days"
            color="info"
            className="animate-fade-in backdrop-blur-sm bg-white/70 dark:bg-white/5 shadow-xl hover:shadow-2xl transition-all duration-300 border-0"
            style={{ animationDelay: "400ms" }}
          />
          <StatCard
            title="Unassigned Tickets"
            value={16}
            icon={<AlertCircle className="h-4 w-4" />}
            color="warning"
            trend="up"
            trendValue={3}
            className="animate-fade-in backdrop-blur-sm bg-white/70 dark:bg-white/5 shadow-xl hover:shadow-2xl transition-all duration-300 border-0"
            style={{ animationDelay: "500ms" }}
          />
        </div>
        
        {/* Dashboard Charts */}
        <div className="grid gap-6 mt-6 lg:grid-cols-7 px-4">
          <div className="lg:col-span-4">
            <Card className="animate-fade-in shadow-xl hover:shadow-2xl transition-all duration-300 backdrop-blur-sm bg-white/60 dark:bg-slate-800/60 border-0" style={{ animationDelay: "600ms" }}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center justify-between text-slate-800 dark:text-white">
                  Ticket Volume
                  <Button variant="ghost" size="sm" className="h-8 px-2 text-xs hover:bg-slate-200 dark:hover:bg-slate-700">
                    <span>View Report</span>
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </Button>
                </CardTitle>
                <CardDescription>Ticket volume by status over time</CardDescription>
              </CardHeader>
              <CardContent>
                <TicketChart 
                  data={ticketsByStatus} 
                  type="bar" 
                  title="" 
                  darkLabels={true}
                  className="animate-fade-in"
                  style={{ animationDelay: "650ms" }}
                />
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-3">
            <Card className="animate-fade-in shadow-xl hover:shadow-2xl transition-all duration-300 backdrop-blur-sm bg-white/60 dark:bg-slate-800/60 border-0" style={{ animationDelay: "700ms" }}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium text-slate-800 dark:text-white">Tickets by Department</CardTitle>
                <CardDescription>Distribution of tickets across departments</CardDescription>
              </CardHeader>
              <CardContent className="animate-fade-in" style={{ animationDelay: "750ms" }}>
                <TicketChart 
                  data={ticketsByDepartment} 
                  type="pie" 
                  title="" 
                  darkLabels={true}
                  style={{ animationDelay: "800ms" }}
                />
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6 px-4 pb-8">
          <div className="lg:col-span-2">
            <ActivityFeed 
              activities={recentActivities} 
              className="backdrop-blur-sm bg-white/60 dark:bg-slate-800/60 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 h-full animate-fade-in rounded-xl overflow-hidden"
              style={{ animationDelay: "850ms" }}
            />
          </div>
          
          <div className="lg:col-span-1">
            <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white animate-fade-in" style={{ animationDelay: "900ms" }}>Quick Actions</h2>
            <div className="space-y-4">
              {actionCards.map((item, index) => (
                <div 
                  key={index} 
                  className={`rounded-xl p-4 bg-gradient-to-r ${item.bgColor} text-white shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer animate-fade-in hover:translate-x-1`}
                  style={{ animationDelay: `${950 + index * 100}ms` }}
                  onClick={item.action}
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0 mr-4 h-10 w-10 rounded-lg bg-white/20 flex items-center justify-center">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-sm text-white/80">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
