
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { 
  ArrowLeft, AlertCircle, Clock, User as UserIcon, Tag, Calendar, 
  MessageSquare, PanelRight, ClipboardList 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { TicketChat } from "@/components/tickets/TicketChat";
import { useAuth } from "@/context/AuthContext";
import { Ticket, Department, ERPSystem } from "@/lib/types";
import { User as ImportedUser } from "@/lib/auth-types";

// Create a type that combines both interfaces for the mock data
type CombinedTicket = Ticket & {
  // Additional fields needed for backward compatibility
  created_by?: string;
  assigned_to?: string;
  created_at?: string;
  updated_at?: string;
  category?: string;
  reporter?: string;
  assignedAgent?: string;
};

const fetchTicket = async (id: string): Promise<CombinedTicket> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const createdDate = new Date(Date.now() - 86400000 * 2);
  const updatedDate = new Date(Date.now() - 3600000);
  
  return {
    id,
    title: "Database Connection Error in Reporting Module",
    description: "When trying to generate monthly reports, I get an error that says 'Database connection failed'. This happens consistently and prevents me from completing my work.",
    status: "in_progress" as const,
    priority: "high" as const,
    
    // Fields from types.ts Ticket interface
    erpSystem: "s4_hana" as ERPSystem,
    department: "finance" as Department,
    clientId: "user-123",
    createdAt: createdDate,
    updatedAt: updatedDate,
    supportId: "support-1",
    attachments: [],
    
    // Additional fields for backward compatibility and UI display
    created_by: "user-123",
    assigned_to: "support-1",
    created_at: createdDate.toISOString(),
    updated_at: updatedDate.toISOString(),
    category: "Technical Issue",
    reporter: "John Doe",
    assignedAgent: "Jennifer Smith"
  };
};

export default function TicketDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const { user, getAllUsers } = useAuth();
  const [supportUsers, setSupportUsers] = useState<ImportedUser[]>([]);
  
  useEffect(() => {
    const loadSupportUsers = async () => {
      try {
        const users = await getAllUsers();
        setSupportUsers(users.filter(u => u.role === 'support'));
      } catch (error) {
        console.error("Failed to load support users:", error);
      }
    };
    
    loadSupportUsers();
  }, [getAllUsers]);
  
  const { data: ticket, isLoading, error } = useQuery({
    queryKey: ['ticket', id],
    queryFn: () => fetchTicket(id || ''),
    enabled: !!id
  });
  
  if (isLoading) {
    return <TicketSkeleton />;
  }
  
  if (error || !ticket) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <Link to="/tickets" className="flex items-center text-blue-600 hover:text-blue-800">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to tickets
          </Link>
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center py-12">
              <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Ticket Not Found</h2>
              <p className="text-gray-600 mb-6">The ticket you're looking for doesn't exist or there was an error loading it.</p>
              <Button asChild>
                <Link to="/tickets">View All Tickets</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getStatusBadge = () => {
    const statusMap: Record<string, { color: string; label: string }> = {
      'open': { color: 'bg-blue-100 text-blue-800', label: 'Open' },
      'in_progress': { color: 'bg-yellow-100 text-yellow-800', label: 'In Progress' },
      'resolved': { color: 'bg-green-100 text-green-800', label: 'Resolved' },
      'closed': { color: 'bg-gray-100 text-gray-800', label: 'Closed' }
    };
    
    const status = statusMap[ticket.status as keyof typeof statusMap] || statusMap.open;
    
    return (
      <Badge className={`${status.color} hover:${status.color}`}>
        {status.label}
      </Badge>
    );
  };
  
  const getPriorityBadge = () => {
    const priorityMap: Record<string, { color: string; label: string }> = {
      'low': { color: 'bg-gray-100 text-gray-800', label: 'Low' },
      'medium': { color: 'bg-blue-100 text-blue-800', label: 'Medium' },
      'high': { color: 'bg-orange-100 text-orange-800', label: 'High' },
      'urgent': { color: 'bg-red-100 text-red-800', label: 'Urgent' }
    };
    
    const priority = priorityMap[ticket.priority as keyof typeof priorityMap] || priorityMap.medium;
    
    return (
      <Badge className={`${priority.color} hover:${priority.color}`}>
        {priority.label}
      </Badge>
    );
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <Link to="/tickets" className="flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to tickets
        </Link>
        <div className="flex space-x-2">
          <Button variant="outline">Edit Ticket</Button>
          <Button variant="destructive">Close Ticket</Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{ticket?.title}</CardTitle>
          <CardDescription>Ticket #{ticket?.id}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2 sm:gap-4">
              <div className="flex items-center">
                <div className="mr-2 text-gray-500">Status:</div>
                {getStatusBadge()}
              </div>
              <div className="flex items-center">
                <div className="mr-2 text-gray-500">Priority:</div>
                {getPriorityBadge()}
              </div>
              <div className="flex items-center">
                <div className="mr-2 text-gray-500">Category:</div>
                <Badge variant="outline" className="text-gray-800">{ticket?.category}</Badge>
              </div>
            </div>
            
            <Separator />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Reported By</h3>
                  <div className="flex items-center">
                    <UserIcon className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-gray-900">{ticket?.reporter}</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Created On</h3>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-gray-900">
                      {ticket?.created_at ? formatDate(ticket.created_at) : formatDate(ticket.createdAt.toISOString())}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Assigned To</h3>
                  <div className="flex items-center">
                    <UserIcon className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-gray-900">{ticket?.assignedAgent || "Unassigned"}</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Last Updated</h3>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-gray-900">
                      {ticket?.updated_at ? formatDate(ticket.updated_at) : formatDate(ticket.updatedAt.toISOString())}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Description</h3>
              <p className="text-gray-800 whitespace-pre-wrap">{ticket?.description}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="conversation" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="conversation" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Conversation
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex items-center gap-2">
            <ClipboardList className="h-4 w-4" />
            Activity Log
          </TabsTrigger>
          <TabsTrigger value="attachments" className="flex items-center gap-2">
            <PanelRight className="h-4 w-4" />
            Attachments
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="conversation" className="w-full mt-4">
          <TicketChat 
            ticket={ticket as any} 
            statusBadge={getStatusBadge()} 
            priorityBadge={getPriorityBadge()} 
          />
        </TabsContent>
        
        <TabsContent value="activity" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Activity Log</CardTitle>
              <CardDescription>Track all activities related to this ticket</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="min-w-fit pt-1">
                    <span className="flex h-2 w-2 rounded-full bg-blue-600"></span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Ticket assigned to Jennifer Smith</p>
                    <p className="text-xs text-gray-500">Today at 10:30 AM</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="min-w-fit pt-1">
                    <span className="flex h-2 w-2 rounded-full bg-yellow-600"></span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Status changed to In Progress</p>
                    <p className="text-xs text-gray-500">Yesterday at 2:15 PM</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="min-w-fit pt-1">
                    <span className="flex h-2 w-2 rounded-full bg-green-600"></span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Ticket created</p>
                    <p className="text-xs text-gray-500">
                      {ticket?.created_at ? formatDate(ticket.created_at) : formatDate(ticket.createdAt.toISOString())}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="attachments" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Attachments</CardTitle>
              <CardDescription>Files uploaded to this ticket</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-gray-500">No attachments have been uploaded yet.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function TicketSkeleton() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <Skeleton className="h-6 w-32" />
        <div className="flex space-x-2">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-28" />
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-5 w-32 mt-2" />
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex flex-wrap gap-4">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-24" />
            </div>
            <Separator />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-6 w-40" />
                </div>
                <div>
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-6 w-44" />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-6 w-40" />
                </div>
                <div>
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-6 w-44" />
                </div>
              </div>
            </div>
            <Separator />
            <div>
              <Skeleton className="h-4 w-32 mb-2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full mt-2" />
              <Skeleton className="h-4 w-3/4 mt-2" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="mt-4">
        <Skeleton className="h-12 w-full mb-4" />
        <div className="border rounded-lg p-6">
          <Skeleton className="h-[60vh] w-full" />
        </div>
      </div>
    </div>
  );
}
