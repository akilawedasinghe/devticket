
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Search, Filter, ArrowUpDown, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { format } from "date-fns";

const mockTickets = [
  { 
    id: "TK-1001", 
    title: "Cannot access reporting module", 
    status: "open", 
    priority: "high", 
    created: "2023-06-15T14:30:00", 
    assignee: "Sarah Johnson" 
  },
  { 
    id: "TK-1002", 
    title: "Error when generating invoices", 
    status: "in-progress", 
    priority: "medium", 
    created: "2023-06-14T09:45:00", 
    assignee: "Michael Chen" 
  },
  { 
    id: "TK-1003", 
    title: "User permission issue for admin panel", 
    status: "open", 
    priority: "high", 
    created: "2023-06-13T16:20:00", 
    assignee: "Unassigned" 
  },
  { 
    id: "TK-1004", 
    title: "Data import functionality not working", 
    status: "resolved", 
    priority: "low", 
    created: "2023-06-10T11:15:00", 
    assignee: "Sarah Johnson" 
  },
  { 
    id: "TK-1005", 
    title: "Dashboard widgets not updating in real-time", 
    status: "in-progress", 
    priority: "medium", 
    created: "2023-06-09T13:50:00", 
    assignee: "Michael Chen" 
  },
];

type SortOption = "newest" | "oldest" | "priority" | "title";
type FilterOption = "all" | "assigned" | "unassigned" | "high" | "medium" | "low";

const TicketsPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [filterBy, setFilterBy] = useState<FilterOption>("all");
  const [filteredTickets, setFilteredTickets] = useState(mockTickets);
  
  useEffect(() => {
    let result = [...mockTickets];
    
    if (activeTab !== "all") {
      result = result.filter(ticket => ticket.status === activeTab);
    }
    
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(ticket => 
        ticket.title.toLowerCase().includes(searchLower) || 
        ticket.id.toLowerCase().includes(searchLower)
      );
    }
    
    switch(filterBy) {
      case "assigned":
        result = result.filter(ticket => ticket.assignee !== "Unassigned");
        break;
      case "unassigned":
        result = result.filter(ticket => ticket.assignee === "Unassigned");
        break;
      case "high":
        result = result.filter(ticket => ticket.priority === "high");
        break;
      case "medium":
        result = result.filter(ticket => ticket.priority === "medium");
        break;
      case "low":
        result = result.filter(ticket => ticket.priority === "low");
        break;
    }
    
    result.sort((a, b) => {
      switch(sortBy) {
        case "newest":
          return new Date(b.created).getTime() - new Date(a.created).getTime();
        case "oldest":
          return new Date(a.created).getTime() - new Date(b.created).getTime();
        case "priority": {
          const priorityValues = { high: 3, medium: 2, low: 1 };
          return priorityValues[b.priority as keyof typeof priorityValues] - 
                 priorityValues[a.priority as keyof typeof priorityValues];
        }
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });
    
    setFilteredTickets(result);
  }, [searchTerm, activeTab, sortBy, filterBy]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge className="bg-blue-500">Open</Badge>;
      case "in-progress":
        return <Badge className="bg-amber-500">In Progress</Badge>;
      case "resolved":
        return <Badge className="bg-emerald-500">Resolved</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };
  
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High</Badge>;
      case "medium":
        return <Badge className="bg-amber-500">Medium</Badge>;
      case "low":
        return <Badge className="bg-emerald-500">Low</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "MMM d, yyyy 'at' h:mm a");
  };

  return (
    <div className="w-full h-full min-h-screen bg-white dark:bg-gray-900 m-0 p-0">
      <div className="w-full px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-3xl font-bold tracking-tight">
            Tickets
          </h1>
          <Button 
            onClick={() => navigate("/tickets/new")} 
            className="mt-4 md:mt-0"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            New Ticket
          </Button>
        </div>
        
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle>Find Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search tickets..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Filter className="mr-2 h-4 w-4" />
                      Filter
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-56">
                    <DropdownMenuItem onClick={() => {
                      setFilterBy("all");
                      toast({ title: "Filter applied", description: "Showing all tickets" });
                    }}>
                      <div className="flex items-center justify-between w-full">
                        <span>All Tickets</span>
                        {filterBy === "all" && <Check className="h-4 w-4" />}
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {
                      setFilterBy("assigned");
                      toast({ title: "Filter applied", description: "Showing assigned tickets" });
                    }}>
                      <div className="flex items-center justify-between w-full">
                        <span>Assigned Only</span>
                        {filterBy === "assigned" && <Check className="h-4 w-4" />}
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {
                      setFilterBy("unassigned");
                      toast({ title: "Filter applied", description: "Showing unassigned tickets" });
                    }}>
                      <div className="flex items-center justify-between w-full">
                        <span>Unassigned Only</span>
                        {filterBy === "unassigned" && <Check className="h-4 w-4" />}
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {
                      setFilterBy("high");
                      toast({ title: "Filter applied", description: "Showing high priority tickets" });
                    }}>
                      <div className="flex items-center justify-between w-full">
                        <span>High Priority</span>
                        {filterBy === "high" && <Check className="h-4 w-4" />}
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {
                      setFilterBy("medium");
                      toast({ title: "Filter applied", description: "Showing medium priority tickets" });
                    }}>
                      <div className="flex items-center justify-between w-full">
                        <span>Medium Priority</span>
                        {filterBy === "medium" && <Check className="h-4 w-4" />}
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {
                      setFilterBy("low");
                      toast({ title: "Filter applied", description: "Showing low priority tickets" });
                    }}>
                      <div className="flex items-center justify-between w-full">
                        <span>Low Priority</span>
                        {filterBy === "low" && <Check className="h-4 w-4" />}
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <ArrowUpDown className="mr-2 h-4 w-4" />
                      Sort
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-56">
                    <DropdownMenuItem onClick={() => {
                      setSortBy("newest");
                      toast({ title: "Sort applied", description: "Sorting by newest first" });
                    }}>
                      <div className="flex items-center justify-between w-full">
                        <span>Newest First</span>
                        {sortBy === "newest" && <Check className="h-4 w-4" />}
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {
                      setSortBy("oldest");
                      toast({ title: "Sort applied", description: "Sorting by oldest first" });
                    }}>
                      <div className="flex items-center justify-between w-full">
                        <span>Oldest First</span>
                        {sortBy === "oldest" && <Check className="h-4 w-4" />}
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {
                      setSortBy("priority");
                      toast({ title: "Sort applied", description: "Sorting by priority" });
                    }}>
                      <div className="flex items-center justify-between w-full">
                        <span>Priority (High to Low)</span>
                        {sortBy === "priority" && <Check className="h-4 w-4" />}
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {
                      setSortBy("title");
                      toast({ title: "Sort applied", description: "Sorting alphabetically by title" });
                    }}>
                      <div className="flex items-center justify-between w-full">
                        <span>Title (A-Z)</span>
                        {sortBy === "title" && <Check className="h-4 w-4" />}
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4 flex justify-start overflow-x-auto pb-px scrollbar-none">
            <TabsTrigger value="all">All Tickets</TabsTrigger>
            <TabsTrigger value="open">Open</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="resolved">Resolved</TabsTrigger>
          </TabsList>
          
          <div className="space-y-4">
            {filteredTickets.length === 0 ? (
              <Card className="p-8">
                <div className="text-center">
                  <p className="text-lg font-medium">No tickets found</p>
                  <p className="text-muted-foreground mt-1">Try adjusting your search or filters</p>
                  <Button 
                    className="mt-4" 
                    variant="outline" 
                    onClick={() => {
                      setSearchTerm("");
                      setFilterBy("all");
                      setSortBy("newest");
                      setActiveTab("all");
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              </Card>
            ) : (
              <Card>
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="w-[100px]">Ticket ID</TableHead>
                      <TableHead className="w-[40%]">Title</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Assignee</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTickets.map((ticket) => (
                      <TableRow 
                        key={ticket.id}
                        className="hover:bg-gray-50 cursor-pointer"
                        onClick={() => navigate(`/tickets/${ticket.id}`)}
                      >
                        <TableCell className="font-mono text-sm text-muted-foreground">
                          {ticket.id}
                        </TableCell>
                        <TableCell className="font-medium">
                          {ticket.title}
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(ticket.status)}
                        </TableCell>
                        <TableCell>
                          {getPriorityBadge(ticket.priority)}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {formatDateTime(ticket.created)}
                        </TableCell>
                        <TableCell className="text-sm">
                          {ticket.assignee === "Unassigned" ? 
                            <span className="text-muted-foreground">Unassigned</span> : 
                            ticket.assignee}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            )}
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default TicketsPage;
