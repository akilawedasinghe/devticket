
import React from "react";
import {
  MessageSquare,
  TicketIcon,
  User2,
  CheckCircle,
  AlertCircle,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity } from "@/lib/types";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

interface ActivityFeedProps {
  activities: Activity[];
  className?: string;
  style?: React.CSSProperties;
}

export function ActivityFeed({ activities, className, style }: ActivityFeedProps) {
  // Get icon based on activity type
  const getActivityIcon = (type: Activity["type"]) => {
    switch (type) {
      case "ticket_created":
        return <TicketIcon className="h-4 w-4 text-blue-500" />;
      case "message_sent":
        return <MessageSquare className="h-4 w-4 text-indigo-500" />;
      case "user_registered":
        return <User2 className="h-4 w-4 text-emerald-500" />;
      case "status_changed":
        return <AlertCircle className="h-4 w-4 text-amber-500" />;
      case "ticket_assigned":
        return <Clock className="h-4 w-4 text-purple-500" />;
      case "ticket_resolved":
        return <CheckCircle className="h-4 w-4 text-emerald-500" />;
      default:
        return <TicketIcon className="h-4 w-4" />;
    }
  };

  // Get avatar color based on activity type
  const getAvatarColor = (type: Activity["type"]) => {
    switch (type) {
      case "ticket_created":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
      case "message_sent":
        return "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400";
      case "user_registered":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400";
      case "status_changed":
        return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
      case "ticket_assigned":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400";
      case "ticket_resolved":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  // Get activity title based on type and metadata
  const getActivityTitle = (activity: Activity) => {
    const { type, metadata } = activity;
    
    switch (type) {
      case "ticket_created":
        return `New ticket created: ${metadata?.ticketTitle || ""}`;
      case "message_sent":
        return `New message in ticket #${metadata?.ticketId}`;
      case "user_registered":
        return `New user registered: ${metadata?.userName || ""}`;
      case "status_changed":
        return `Ticket #${metadata?.ticketId} status changed to ${metadata?.newStatus || ""}`;
      case "ticket_assigned":
        return `Ticket #${metadata?.ticketId} assigned to ${metadata?.assigneeName || ""}`;
      case "ticket_resolved":
        return `Ticket #${metadata?.ticketId} marked as resolved`;
      default:
        return "Activity occurred";
    }
  };

  // Get subtitle information
  const getActivitySubtitle = (activity: Activity) => {
    const { metadata } = activity;
    
    if (activity.type === "ticket_created") {
      return `${metadata?.erpSystem || ""} - ${metadata?.department || ""}`;
    }
    
    if (activity.type === "status_changed") {
      return `From ${metadata?.oldStatus || ""} to ${metadata?.newStatus || ""}`;
    }
    
    if (metadata?.description) {
      return metadata.description;
    }
    
    return "";
  };

  return (
    <Card className={cn("h-full", className)} style={style}>
      <CardHeader className="pb-3 border-b">
        <CardTitle className="text-lg font-medium">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="max-h-[350px] overflow-y-auto scrollbar-none">
          {activities.length > 0 ? (
            <div className="divide-y">
              {activities.map((activity, index) => (
                <div
                  key={activity.id}
                  className="staggered-item flex items-start gap-4 p-4 transition-colors hover:bg-muted/50"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Avatar className={cn("h-9 w-9", getAvatarColor(activity.type))}>
                    <AvatarFallback className="flex items-center justify-center">
                      {getActivityIcon(activity.type)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {getActivityTitle(activity)}
                    </p>
                    {getActivitySubtitle(activity) && (
                      <p className="text-sm text-muted-foreground">
                        {getActivitySubtitle(activity)}
                      </p>
                    )}
                    <div className="flex items-center text-xs text-muted-foreground">
                      <span>{activity.user}</span>
                      <span className="mx-1">•</span>
                      <span>{formatDistanceToNow(activity.createdAt, { addSuffix: true })}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center py-8">
              <p className="text-sm text-muted-foreground">No recent activities</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
