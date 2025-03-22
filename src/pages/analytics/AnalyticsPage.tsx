
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatCard } from "@/components/dashboard/StatCard";
import { CalendarRange, ArrowUpRight, Clock, CheckCircle, AlertCircle, Users, Ticket } from "lucide-react";
import { TicketChart } from "@/components/dashboard/TicketChart";

// Mock data for charts
const ticketData = [
  { name: 'Jan', open: 65, resolved: 40 },
  { name: 'Feb', open: 59, resolved: 45 },
  { name: 'Mar', open: 80, resolved: 67 },
  { name: 'Apr', open: 81, resolved: 78 },
  { name: 'May', open: 56, resolved: 50 },
  { name: 'Jun', open: 55, resolved: 49 },
  { name: 'Jul', open: 40, resolved: 37 },
];

const responseTimeData = [
  { name: 'Mon', time: 3.4 },
  { name: 'Tue', time: 2.8 },
  { name: 'Wed', time: 4.2 },
  { name: 'Thu', time: 3.5 },
  { name: 'Fri', time: 2.6 },
  { name: 'Sat', time: 1.9 },
  { name: 'Sun', time: 1.5 },
];

const categoryData = [
  { name: 'Technical', value: 40 },
  { name: 'Billing', value: 30 },
  { name: 'Account', value: 20 },
  { name: 'Feature Request', value: 10 },
];

const AnalyticsPage = () => {
  const { user } = useAuth();
  const [dateRange, setDateRange] = useState("week");
  
  return (
    <div className="bg-gradient-to-br from-blue-50 to-sky-100 dark:from-blue-900/20 dark:to-sky-900/30 w-full min-h-screen relative">
      {/* 3D Effect Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[30%] -right-[20%] w-[70%] h-[70%] rounded-full bg-blue-200/40 dark:bg-blue-400/10 blur-3xl"></div>
        <div className="absolute -bottom-[30%] -left-[20%] w-[70%] h-[70%] rounded-full bg-sky-200/40 dark:bg-sky-400/10 blur-3xl"></div>
        <div className="absolute top-[20%] left-[10%] w-[15%] h-[15%] rounded-full bg-white/50 dark:bg-white/5 blur-xl"></div>
      </div>
      
      <div className="w-full mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 px-4 pt-6">
          <h1 className="text-3xl font-bold tracking-tight animate-fade-in">
            Analytics
          </h1>
          <div className="flex items-center gap-2 mt-4 md:mt-0 animate-fade-in" style={{ animationDelay: "100ms" }}>
            <Tabs defaultValue={dateRange} onValueChange={setDateRange} className="tabs-left-aligned">
              <TabsList className="justify-start">
                <TabsTrigger value="week">Week</TabsTrigger>
                <TabsTrigger value="month">Month</TabsTrigger>
                <TabsTrigger value="quarter">Quarter</TabsTrigger>
                <TabsTrigger value="year">Year</TabsTrigger>
              </TabsList>
            </Tabs>
            <Card className="flex items-center gap-2 p-2 backdrop-blur-sm bg-white/70 dark:bg-white/5 border-0 shadow-md">
              <CalendarRange className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Last {dateRange}</span>
            </Card>
          </div>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6 px-4">
          <StatCard
            title="Total Tickets"
            value="487"
            description="Last 30 days"
            icon={<Ticket className="h-4 w-4" />}
            trend="up"
            trendValue={12}
            color="primary"
            className="animate-fade-in backdrop-blur-sm bg-white/70 dark:bg-white/5 shadow-xl hover:shadow-2xl transition-all duration-300 border-0"
            style={{ animationDelay: "200ms" }}
          />
          <StatCard
            title="Average Response Time"
            value="2.8 hrs"
            description="Last 30 days"
            icon={<Clock className="h-4 w-4" />}
            trend="down"
            trendValue={8}
            color="success"
            className="animate-fade-in backdrop-blur-sm bg-white/70 dark:bg-white/5 shadow-xl hover:shadow-2xl transition-all duration-300 border-0"
            style={{ animationDelay: "300ms" }}
          />
          <StatCard
            title="Resolution Rate"
            value="94%"
            description="Last 30 days"
            icon={<CheckCircle className="h-4 w-4" />}
            trend="up"
            trendValue={3}
            color="info"
            className="animate-fade-in backdrop-blur-sm bg-white/70 dark:bg-white/5 shadow-xl hover:shadow-2xl transition-all duration-300 border-0"
            style={{ animationDelay: "400ms" }}
          />
          <StatCard
            title="Unassigned Tickets"
            value="32"
            description="Need attention"
            icon={<AlertCircle className="h-4 w-4" />}
            trend="up"
            trendValue={5}
            color="warning"
            className="animate-fade-in backdrop-blur-sm bg-white/70 dark:bg-white/5 shadow-xl hover:shadow-2xl transition-all duration-300 border-0"
            style={{ animationDelay: "500ms" }}
          />
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 mb-6 px-4">
          <Card className="animate-fade-in backdrop-blur-sm bg-white/60 dark:bg-slate-800/60 border-0 shadow-xl hover:shadow-2xl transition-all duration-300" style={{ animationDelay: "600ms" }}>
            <CardHeader>
              <CardTitle>Ticket Volume</CardTitle>
              <CardDescription>Number of tickets opened vs. resolved</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <TicketChart
                  data={ticketData}
                  type="bar"
                  title=""
                  darkLabels={true}
                  className="h-full"
                />
              </div>
            </CardContent>
          </Card>
          
          <Card className="animate-fade-in backdrop-blur-sm bg-white/60 dark:bg-slate-800/60 border-0 shadow-xl hover:shadow-2xl transition-all duration-300" style={{ animationDelay: "700ms" }}>
            <CardHeader>
              <CardTitle>Average Response Time</CardTitle>
              <CardDescription>Time to first response in hours</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <TicketChart
                  data={responseTimeData}
                  type="line"
                  title=""
                  darkLabels={true}
                  className="h-full"
                />
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3 px-4 pb-8">
          <Card className="md:col-span-1 animate-fade-in backdrop-blur-sm bg-white/60 dark:bg-slate-800/60 border-0 shadow-xl hover:shadow-2xl transition-all duration-300" style={{ animationDelay: "800ms" }}>
            <CardHeader>
              <CardTitle>Tickets by Category</CardTitle>
              <CardDescription>Distribution of ticket types</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <TicketChart
                  data={categoryData}
                  type="pie"
                  title=""
                  darkLabels={true}
                  className="h-full"
                />
              </div>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-2 animate-fade-in backdrop-blur-sm bg-white/60 dark:bg-slate-800/60 border-0 shadow-xl hover:shadow-2xl transition-all duration-300" style={{ animationDelay: "900ms" }}>
            <CardHeader>
              <CardTitle>Top Support Agents</CardTitle>
              <CardDescription>Based on resolution time and satisfaction rating</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Sarah Johnson", tickets: 87, satisfaction: 4.9, responseTime: "1.8 hrs" },
                  { name: "Michael Chen", tickets: 74, satisfaction: 4.8, responseTime: "2.1 hrs" },
                  { name: "Alex Rodriguez", tickets: 62, satisfaction: 4.7, responseTime: "2.3 hrs" },
                  { name: "Emily Wilson", tickets: 59, satisfaction: 4.6, responseTime: "2.5 hrs" },
                ].map((agent, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 rounded-md border backdrop-blur-sm bg-white/70 dark:bg-white/5 shadow-md hover:shadow-lg transition-all">
                    <div className="font-bold text-xl text-muted-foreground">{index + 1}</div>
                    <div className="flex-1">
                      <h4 className="font-medium">{agent.name}</h4>
                      <div className="flex gap-4 text-sm text-muted-foreground">
                        <span>Tickets: {agent.tickets}</span>
                        <span>Rating: {agent.satisfaction}/5</span>
                        <span>Avg. Response: {agent.responseTime}</span>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <ArrowUpRight className={`h-5 w-5 ${index === 0 ? 'text-emerald-500' : 'text-muted-foreground'}`} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
