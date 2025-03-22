
import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export type NotificationType = "info" | "success" | "warning" | "error";

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  timestamp: Date;
  linkTo?: string;
  category: "ticket" | "chat" | "system" | "user";
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, "id" | "isRead" | "timestamp">) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotification: (id: string) => void;
  clearAllNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationProvider");
  }
  return context;
};

// Mock notifications for demonstration
const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "New Ticket Assigned",
    message: "Ticket #1234 has been assigned to you",
    type: "info",
    isRead: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    linkTo: "/tickets",
    category: "ticket"
  },
  {
    id: "2",
    title: "Chat Message",
    message: "New message from Sarah Johnson",
    type: "info",
    isRead: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    linkTo: "/chat",
    category: "chat"
  },
  {
    id: "3",
    title: "System Update",
    message: "System maintenance scheduled for tonight",
    type: "warning",
    isRead: true,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    category: "system"
  },
  {
    id: "4",
    title: "Ticket Resolved",
    message: "Ticket #1228 has been marked as resolved",
    type: "success",
    isRead: true,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    linkTo: "/tickets",
    category: "ticket"
  },
  {
    id: "5",
    title: "New User Registered",
    message: "John Smith has registered as a new client",
    type: "info",
    isRead: true,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    linkTo: "/users",
    category: "user"
  }
];

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const { toast } = useToast();

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const addNotification = (notification: Omit<Notification, "id" | "isRead" | "timestamp">) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      isRead: false,
      timestamp: new Date()
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    
    // Show toast for new notification
    toast({
      title: notification.title,
      description: notification.message,
      duration: 5000,
    });
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, isRead: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, isRead: true }))
    );
  };

  const clearNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      addNotification,
      markAsRead,
      markAllAsRead,
      clearNotification,
      clearAllNotifications
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

