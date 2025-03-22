
import React from "react";
import { Ticket } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";
import { AlertTriangle, Clock, CheckCircle2, XCircle, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface TicketItemProps {
  ticket: Ticket;
  view?: "compact" | "detailed";
}

export function TicketItem({ ticket, view = "detailed" }: TicketItemProps) {
  // Helpers for rendering ticket properties
  const getStatusIcon = (status: Ticket["status"]) => {
    switch (status) {
      case "open":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case "in_progress":
        return <Clock className="h-4 w-4 text-blue-500" />;
      case "resolved":
        return <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
      case "closed":
        return <XCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusText = (status: Ticket["status"]) => {
    switch (status) {
      case "open":
        return "Open";
      case "in_progress":
        return "In Progress";
      case "resolved":
        return "Resolved";
      case "closed":
        return "Closed";
    }
  };

  const getPriorityBadge = (priority: Ticket["priority"]) => {
    const variants = {
      low: "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
      medium: "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
      high: "bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
      critical: "bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
    };
    
    const labels = {
      low: "Low",
      medium: "Medium",
      high: "High",
      critical: "Critical",
    };
    
    return (
      <Badge variant="outline" className={variants[priority]}>
        {labels[priority]}
      </Badge>
    );
  };

  const getERPSystemBadge = (system: Ticket["erpSystem"]) => {
    const variants = {
      s4_hana: "bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
      sap_bydesign: "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
      acumatica: "bg-sky-50 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400",
    };
    
    const labels = {
      s4_hana: "S/4 HANA",
      sap_bydesign: "SAP ByDesign",
      acumatica: "Acumatica",
    };
    
    return (
      <Badge variant="outline" className={variants[system]}>
        {labels[system]}
      </Badge>
    );
  };

  const getDepartmentBadge = (dept: Ticket["department"]) => {
    const labels = {
      finance: "Finance",
      procurement: "Procurement",
      sales: "Sales",
      manufacturing: "Manufacturing",
      field_services: "Field Services",
      construction: "Construction",
      project_management: "Project Management",
      other: "Other",
    };
    
    return (
      <Badge variant="outline" className="bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {labels[dept]}
      </Badge>
    );
  };

  if (view === "compact") {
    return (
      <div className="group relative rounded-lg border border-border p-4 transition-all hover:shadow-md hover:bg-muted/20 animate-enter">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border bg-background">
              {getStatusIcon(ticket.status)}
            </div>
            <div>
              <h3 className="font-medium leading-none text-foreground">
                <Link
                  to={`/tickets/${ticket.id}`}
                  className="after:absolute after:inset-0 hover:underline"
                >
                  {ticket.title}
                </Link>
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                #{ticket.id} · {formatDistanceToNow(ticket.createdAt, { addSuffix: true })}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {getPriorityBadge(ticket.priority)}
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Link to={`/tickets/${ticket.id}`}>
                <ArrowUpRight className="h-4 w-4" />
                <span className="sr-only">View ticket</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative rounded-lg border border-border p-4 transition-all hover:shadow-md hover:bg-muted/20 animate-enter">
      <div className="grid gap-4 md:grid-cols-6">
        <div className="md:col-span-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border bg-background">
              {getStatusIcon(ticket.status)}
            </div>
            <div>
              <h3 className="font-medium leading-none">
                <Link
                  to={`/tickets/${ticket.id}`}
                  className="after:absolute after:inset-0 hover:underline"
                >
                  {ticket.title}
                </Link>
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                #{ticket.id} · {formatDistanceToNow(ticket.createdAt, { addSuffix: true })}
              </p>
            </div>
          </div>
          <div className="mt-2 line-clamp-2 text-sm text-muted-foreground">
            {ticket.description}
          </div>
        </div>
        <div className="flex flex-col items-start justify-center gap-2 md:col-span-2 md:items-end">
          <div className="flex flex-wrap gap-2">
            {getPriorityBadge(ticket.priority)}
            <Badge variant="secondary">{getStatusText(ticket.status)}</Badge>
          </div>
          <div className="flex flex-wrap gap-2">
            {getERPSystemBadge(ticket.erpSystem)}
            {getDepartmentBadge(ticket.department)}
          </div>
          <Button
            size="sm"
            variant="ghost"
            className="mt-2 hidden md:flex"
            asChild
          >
            <Link to={`/tickets/${ticket.id}`}>
              View details
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
