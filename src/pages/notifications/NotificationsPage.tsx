
import React, { useState } from "react";
import { useNotifications } from "@/context/NotificationContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDistanceToNow } from "date-fns";
import { Check, TicketIcon, MessageSquare, AlertCircle, UserCog, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const NotificationsPage = () => {
  const { notifications, markAsRead, markAllAsRead, clearNotification, clearAllNotifications } = useNotifications();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  // Get icon based on notification category
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "ticket":
        return <TicketIcon className="h-4 w-4" />;
      case "chat":
        return <MessageSquare className="h-4 w-4" />;
      case "user":
        return <UserCog className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  // Get color based on notification type
  const getTypeColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-500 text-white";
      case "warning":
        return "bg-yellow-500 text-white";
      case "error":
        return "bg-red-500 text-white";
      default:
        return "bg-blue-500 text-white";
    }
  };

  const filteredNotifications = notifications
    .filter(notification => {
      // Search filter
      const includesSearchTerm = 
        notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notification.message.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Category filter
      const matchesCategory = filter === "all" || notification.category === filter;
      
      // Read/unread filter on tabs
      return includesSearchTerm && matchesCategory;
    });

  const unreadNotifications = filteredNotifications.filter(n => !n.isRead);
  const readNotifications = filteredNotifications.filter(n => n.isRead);

  return (
    <div className="bg-3d-blue w-full h-full min-h-screen">
      <div className="bg-3d-blue-effect"></div>
      <div className="w-full py-6 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-3xl font-bold tracking-tight mb-4 md:mb-0">
            Notifications
          </h1>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={markAllAsRead}
              disabled={!unreadNotifications.length}
            >
              <Check className="mr-2 h-4 w-4" />
              Mark all as read
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={clearAllNotifications}
              disabled={!notifications.length}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Clear all
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="relative w-full md:w-64">
                <Input
                  placeholder="Search notifications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <Select 
                value={filter} 
                onValueChange={setFilter}
              >
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Filter by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All categories</SelectItem>
                  <SelectItem value="ticket">Tickets</SelectItem>
                  <SelectItem value="chat">Chat</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">
                  All
                  <Badge className="ml-2" variant="secondary">{filteredNotifications.length}</Badge>
                </TabsTrigger>
                <TabsTrigger value="unread">
                  Unread
                  <Badge className="ml-2" variant="secondary">{unreadNotifications.length}</Badge>
                </TabsTrigger>
                <TabsTrigger value="read">
                  Read
                  <Badge className="ml-2" variant="secondary">{readNotifications.length}</Badge>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-6">
                {renderNotificationList(filteredNotifications)}
              </TabsContent>
              
              <TabsContent value="unread" className="mt-6">
                {renderNotificationList(unreadNotifications)}
              </TabsContent>
              
              <TabsContent value="read" className="mt-6">
                {renderNotificationList(readNotifications)}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
  
  function renderNotificationList(notifications) {
    if (notifications.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-12">
          <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground text-center">No notifications found</p>
        </div>
      );
    }
    
    return (
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div 
            key={notification.id} 
            className={`p-4 rounded-md border ${!notification.isRead ? 'bg-accent/50' : ''}`}
          >
            <div className="flex items-start gap-4">
              <div className={`p-2 rounded-full ${getTypeColor(notification.type)}`}>
                {getCategoryIcon(notification.category)}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <h3 className="font-medium">{notification.title}</h3>
                    <p className="text-sm text-muted-foreground">{notification.message}</p>
                  </div>
                  {!notification.isRead && (
                    <Badge variant="outline" className="bg-primary/10 text-primary text-xs">
                      New
                    </Badge>
                  )}
                </div>
                <div className="text-xs text-muted-foreground mt-2">
                  {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                </div>
                <div className="flex gap-2 mt-3">
                  {notification.linkTo && (
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      onClick={() => {
                        markAsRead(notification.id);
                        navigate(notification.linkTo || "/");
                      }}
                    >
                      View details
                    </Button>
                  )}
                  {!notification.isRead && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => markAsRead(notification.id)}
                    >
                      Mark as read
                    </Button>
                  )}
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => clearNotification(notification.id)}
                  >
                    Dismiss
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
};

export default NotificationsPage;
