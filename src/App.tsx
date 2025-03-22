
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { AuthProvider } from "@/context/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminRegister from "./pages/AdminRegister";
import NotFound from "./pages/NotFound";
import Index from "./pages/Index";

// Dashboard pages
import ClientDashboard from "./pages/dashboard/ClientDashboard";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import SupportDashboard from "./pages/dashboard/SupportDashboard";

// Feature pages
import TicketsPage from "./pages/tickets/TicketsPage";
import NewTicketPage from "./pages/tickets/NewTicketPage";
import KnowledgePage from "./pages/knowledge/KnowledgePage";
import UsersPage from "./pages/users/UsersPage";
import AnalyticsPage from "./pages/analytics/AnalyticsPage";
import ProfilePage from "./pages/profile/ProfilePage";
import NotificationsPage from "./pages/notifications/NotificationsPage";
import SettingsPage from "./pages/settings/SettingsPage";
import TicketDetailPage from "./pages/tickets/TicketDetailPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin-register" element={<AdminRegister />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/" element={<Index />} />
            
            {/* Protected routes with MainLayout */}
            <Route element={<MainLayout />}>
              {/* Dashboard routes */}
              <Route path="dashboard/client" element={<ClientDashboard />} />
              <Route path="dashboard/admin" element={<AdminDashboard />} />
              <Route path="dashboard/support" element={<SupportDashboard />} />
              
              {/* Add a redirect from /dashboard to the appropriate dashboard */}
              <Route path="dashboard" element={<Navigate to="/dashboard/client" replace />} />
              
              {/* Ticket routes - all flat without dropdown */}
              <Route path="tickets" element={<TicketsPage />} />
              <Route path="tickets/new" element={<NewTicketPage />} />
              <Route path="tickets/:id" element={<TicketDetailPage />} />
              
              {/* Other feature routes */}
              <Route path="notifications" element={<NotificationsPage />} />
              <Route path="knowledge" element={<KnowledgePage />} />
              <Route path="users" element={<UsersPage />} />
              <Route path="analytics" element={<AnalyticsPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
            
            {/* Fallback route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
