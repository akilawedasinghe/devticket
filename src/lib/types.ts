// Common types used throughout the application

export type UserRole = 'admin' | 'client' | 'support';

export type ERPSystem = 's4_hana' | 'sap_bydesign' | 'acumatica';

export type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed';

export type TicketPriority = 'low' | 'medium' | 'high' | 'critical';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  createdAt: Date;
  erpSystem?: ERPSystem;
  status?: 'active' | 'inactive';
}

export type Department = 
  | 'finance' 
  | 'procurement' 
  | 'sales' 
  | 'manufacturing' 
  | 'field_services' 
  | 'construction' 
  | 'project_management' 
  | 'other';

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  erpSystem: ERPSystem;
  department: Department;
  clientId: string;
  supportId?: string;
  attachments?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  id: string;
  ticketId: string;
  senderId: string;
  content: string;
  createdAt: Date;
}

export interface Activity {
  id: string;
  type: 'ticket_created' | 'status_changed' | 'message_sent' | 'user_registered' | 'ticket_assigned' | 'ticket_resolved';
  ticketId?: string;
  userId?: string;
  user: string; // Added this property
  metadata?: Record<string, any>;
  createdAt: Date;
}

export interface Dashboard {
  openTickets: number;
  inProgressTickets: number;
  resolvedTickets: number;
  closedTickets: number;
  totalTickets: number;
  activeUsers: number;
  avgResolutionTime: number;
  recentActivities: Activity[];
}

export interface StatCard {
  title: string;
  value: number | string;
  description?: string;
  icon?: React.ReactNode;
  trend?: 'up' | 'down';
  trendValue?: number;
  color?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
}
