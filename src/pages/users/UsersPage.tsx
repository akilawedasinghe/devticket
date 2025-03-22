
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Plus, Search, ArrowUpDown, Download, Trash2, Edit, Eye } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/components/ui/use-toast";
import { User } from "@/lib/types";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

// Mock user data
const initialUsers = [
  { id: "1", name: "Sarah Johnson", email: "sarah.johnson@example.com", role: "client", status: "active", company: "Tech Solutions Inc.", lastActive: "2 hours ago", erpSystem: "s4_hana" },
  { id: "2", name: "Michael Brown", email: "michael.brown@example.com", role: "client", status: "active", company: "Acme Corp", lastActive: "1 day ago", erpSystem: "sap_bydesign" },
  { id: "3", name: "Emily Davis", email: "emily.davis@example.com", role: "client", status: "inactive", company: "Global Systems Ltd.", lastActive: "3 days ago", erpSystem: "acumatica" },
  { id: "4", name: "Jennifer Smith", email: "jennifer.smith@example.com", role: "support", status: "active", company: "Our Company", lastActive: "Just now" },
  { id: "5", name: "David Clark", email: "david.clark@example.com", role: "support", status: "active", company: "Our Company", lastActive: "5 hours ago" },
  { id: "6", name: "Robert Wilson", email: "robert.wilson@example.com", role: "client", status: "active", company: "Innovative Tech", lastActive: "4 hours ago", erpSystem: "s4_hana" },
  { id: "7", name: "Lisa Anderson", email: "lisa.anderson@example.com", role: "support", status: "active", company: "Our Company", lastActive: "1 hour ago" },
  { id: "8", name: "James Taylor", email: "james.taylor@example.com", role: "admin", status: "active", company: "Our Company", lastActive: "3 hours ago" },
];

// Mock team members data
const initialTeamMembers = [
  { id: "4", name: "Jennifer Smith", email: "jennifer.smith@example.com", role: "support", department: "Technical Support", status: "active", lastActive: "Just now" },
  { id: "5", name: "David Clark", email: "david.clark@example.com", role: "support", department: "Customer Success", status: "active", lastActive: "5 hours ago" },
  { id: "7", name: "Lisa Anderson", email: "lisa.anderson@example.com", role: "support", department: "Technical Support", status: "active", lastActive: "1 hour ago" },
  { id: "8", name: "James Taylor", email: "james.taylor@example.com", role: "admin", department: "Management", status: "active", lastActive: "3 hours ago" },
];

type UserDialogAction = "add" | "edit" | "view";

const UsersPage = () => {
  const { user: currentUser, getAllUsers, createUser, updateUser, deleteUser } = useAuth();
  const [activeTab, setActiveTab] = useState("all-users");
  const [userDialogOpen, setUserDialogOpen] = useState(false);
  const [userDialogAction, setUserDialogAction] = useState<UserDialogAction>("add");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [users, setUsers] = useState(initialUsers);
  const [teamMembers, setTeamMembers] = useState(initialTeamMembers);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    company: "",
    department: "",
    status: "active",
    erpSystem: ""
  });
  const [searchTerm, setSearchTerm] = useState("");

  const openAddUserDialog = () => {
    setFormData({
      name: "",
      email: "",
      role: "",
      company: "",
      department: "",
      status: "active",
      erpSystem: ""
    });
    setUserDialogAction("add");
    setUserDialogOpen(true);
  };

  const openEditUserDialog = (user: any) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      company: user.company || "",
      department: user.department || "",
      status: user.status || "active",
      erpSystem: user.erpSystem || ""
    });
    setUserDialogAction("edit");
    setUserDialogOpen(true);
  };

  const openViewUserDialog = (user: any) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      company: user.company || "",
      department: user.department || "",
      status: user.status || "active",
      erpSystem: user.erpSystem || ""
    });
    setUserDialogAction("view");
    setUserDialogOpen(true);
  };

  const confirmDeleteUser = (user: any) => {
    setSelectedUser(user);
    setDeleteDialogOpen(true);
  };

  const handleDeleteUser = () => {
    // In a real app, this would call an API
    const newUsers = users.filter(u => u.id !== selectedUser.id);
    const newTeamMembers = teamMembers.filter(u => u.id !== selectedUser.id);
    
    setUsers(newUsers);
    setTeamMembers(newTeamMembers);
    
    toast({
      title: "User deleted",
      description: `${selectedUser.name} has been removed from the system.`
    });
    
    setDeleteDialogOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmitUser = () => {
    if (userDialogAction === "add") {
      // Add new user
      const newUser = {
        id: (users.length + 1).toString(),
        name: formData.name,
        email: formData.email,
        role: formData.role,
        company: formData.company,
        department: formData.department,
        status: formData.status,
        lastActive: "Just now",
        erpSystem: formData.role === "client" ? formData.erpSystem : undefined
      };
      
      setUsers([...users, newUser]);
      
      // If it's a team member, add to team members too
      if (formData.role === "admin" || formData.role === "support") {
        setTeamMembers([...teamMembers, newUser]);
      }
      
      toast({
        title: "User created",
        description: `${formData.name} has been added successfully.`
      });
    } else if (userDialogAction === "edit") {
      // Update existing user
      const updatedUsers = users.map(u => 
        u.id === selectedUser.id 
          ? { ...u, ...formData, erpSystem: formData.role === "client" ? formData.erpSystem : undefined }
          : u
      );
      
      const updatedTeamMembers = teamMembers.map(u => 
        u.id === selectedUser.id 
          ? { ...u, ...formData }
          : u
      );
      
      setUsers(updatedUsers);
      setTeamMembers(updatedTeamMembers);
      
      toast({
        title: "User updated",
        description: `${formData.name}'s information has been updated.`
      });
    }
    
    setUserDialogOpen(false);
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.company && user.company.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredTeamMembers = teamMembers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.department && user.department.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredClients = filteredUsers.filter(user => user.role === "client");

  const isFormValid = () => {
    return formData.name && formData.email && formData.role && 
           (formData.role !== "client" || (formData.role === "client" && formData.company && formData.erpSystem));
  };

  const getERPSystemName = (code?: string) => {
    if (!code) return "";
    switch (code) {
      case "s4_hana": return "S/4 HANA";
      case "sap_bydesign": return "SAP ByDesign";
      case "acumatica": return "Acumatica";
      default: return code;
    }
  };

  return (
    <div className="w-full h-full p-0 m-0 overflow-hidden bg-white">
      <div className="w-full h-full mx-auto py-6 px-4 relative z-10">
        <div className="flex flex-wrap items-center justify-between mb-6">
          <h1 className="text-3xl font-bold tracking-tight mr-3 text-gray-800">
            User Management
          </h1>
          <div className="flex items-center space-x-2">
            <Button variant="outline" className="h-10">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button className="h-10" onClick={openAddUserDialog}>
              <Plus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </div>
        </div>

        <Card className="mb-6 border shadow-sm overflow-hidden">
          <CardHeader className="pb-4 border-b">
            <div className="flex items-center justify-between">
              <CardTitle>Users</CardTitle>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search users..."
                    className="pl-8 bg-white w-[240px] h-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full tabs-left-aligned">
              <div className="border-b px-4">
                <TabsList className="mt-2">
                  <TabsTrigger value="all-users">All Users</TabsTrigger>
                  <TabsTrigger value="team-members">Team Members</TabsTrigger>
                  <TabsTrigger value="clients">Clients</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="all-users" className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>ERP System</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8 border">
                                <AvatarImage src={null} />
                                <AvatarFallback className="bg-primary/10 text-primary">
                                  {user.name.split(" ").map((n) => n[0]).join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{user.name}</div>
                                <div className="text-sm text-gray-500">{user.email}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={
                              user.role === "admin" ? "bg-purple-50 text-purple-700 border-purple-200" :
                              user.role === "support" ? "bg-blue-50 text-blue-700 border-blue-200" :
                              "bg-gray-50 text-gray-700 border-gray-200"
                            }>
                              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>{user.company || "—"}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={user.status === "active" 
                              ? "bg-green-50 text-green-700 border-green-200" 
                              : "bg-red-50 text-red-700 border-red-200"
                            }>
                              {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>{getERPSystemName(user.erpSystem) || "—"}</TableCell>
                          <TableCell>{user.lastActive}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="ghost" size="icon" onClick={() => openViewUserDialog(user)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => openEditUserDialog(user)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => confirmDeleteUser(user)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                          No users found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TabsContent>
              
              <TabsContent value="team-members" className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTeamMembers.length > 0 ? (
                      filteredTeamMembers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8 border">
                                <AvatarImage src={null} />
                                <AvatarFallback className="bg-primary/10 text-primary">
                                  {user.name.split(" ").map((n) => n[0]).join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{user.name}</div>
                                <div className="text-sm text-gray-500">{user.email}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={
                              user.role === "admin" ? "bg-purple-50 text-purple-700 border-purple-200" :
                              user.role === "support" ? "bg-blue-50 text-blue-700 border-blue-200" :
                              "bg-gray-50 text-gray-700 border-gray-200"
                            }>
                              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>{user.department}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={user.status === "active" 
                              ? "bg-green-50 text-green-700 border-green-200" 
                              : "bg-red-50 text-red-700 border-red-200"
                            }>
                              {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>{user.lastActive}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="ghost" size="icon" onClick={() => openViewUserDialog(user)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => openEditUserDialog(user)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => confirmDeleteUser(user)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                          No team members found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TabsContent>
              
              <TabsContent value="clients" className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>ERP System</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredClients.length > 0 ? (
                      filteredClients.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8 border">
                                <AvatarImage src={null} />
                                <AvatarFallback className="bg-primary/10 text-primary">
                                  {user.name.split(" ").map((n) => n[0]).join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{user.name}</div>
                                <div className="text-sm text-gray-500">{user.email}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{user.company}</TableCell>
                          <TableCell>{getERPSystemName(user.erpSystem)}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={user.status === "active" 
                              ? "bg-green-50 text-green-700 border-green-200" 
                              : "bg-red-50 text-red-700 border-red-200"
                            }>
                              {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>{user.lastActive}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="ghost" size="icon" onClick={() => openViewUserDialog(user)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => openEditUserDialog(user)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => confirmDeleteUser(user)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                          No clients found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* User Dialog (for Add/Edit/View) */}
      <Dialog open={userDialogOpen} onOpenChange={setUserDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {userDialogAction === "add" ? "Add New User" : 
               userDialogAction === "edit" ? "Edit User" : "User Details"}
            </DialogTitle>
            <DialogDescription>
              {userDialogAction === "add" ? "Create a new user account." : 
               userDialogAction === "edit" ? "Update user information." : "View user details."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input 
                id="name" 
                className="col-span-3" 
                value={formData.name}
                onChange={handleInputChange}
                readOnly={userDialogAction === "view"}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input 
                id="email" 
                className="col-span-3" 
                value={formData.email}
                onChange={handleInputChange}
                readOnly={userDialogAction === "view"}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Role
              </Label>
              <div className="col-span-3">
                {userDialogAction === "view" ? (
                  <Input 
                    id="role" 
                    value={formData.role.charAt(0).toUpperCase() + formData.role.slice(1)}
                    readOnly
                  />
                ) : (
                  <Select 
                    value={formData.role} 
                    onValueChange={(value) => handleSelectChange("role", value)}
                  >
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="client">Client</SelectItem>
                      <SelectItem value="support">Support</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </div>
            </div>

            {(formData.role === "client" || userDialogAction === "view" && selectedUser?.role === "client") && (
              <>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="company" className="text-right">
                    Company
                  </Label>
                  <Input 
                    id="company" 
                    className="col-span-3" 
                    value={formData.company}
                    onChange={handleInputChange}
                    readOnly={userDialogAction === "view"}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="erpSystem" className="text-right">
                    ERP System
                  </Label>
                  <div className="col-span-3">
                    {userDialogAction === "view" ? (
                      <Input 
                        id="erpSystem" 
                        value={getERPSystemName(formData.erpSystem)}
                        readOnly
                      />
                    ) : (
                      <Select 
                        value={formData.erpSystem} 
                        onValueChange={(value) => handleSelectChange("erpSystem", value)}
                      >
                        <SelectTrigger id="erpSystem">
                          <SelectValue placeholder="Select ERP system" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="s4_hana">S/4 HANA</SelectItem>
                          <SelectItem value="sap_bydesign">SAP ByDesign</SelectItem>
                          <SelectItem value="acumatica">Acumatica</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                </div>
              </>
            )}

            {(formData.role === "support" || formData.role === "admin" || 
              userDialogAction === "view" && (selectedUser?.role === "support" || selectedUser?.role === "admin")) && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="department" className="text-right">
                  Department
                </Label>
                <Input 
                  id="department" 
                  className="col-span-3" 
                  value={formData.department}
                  onChange={handleInputChange}
                  readOnly={userDialogAction === "view"}
                />
              </div>
            )}

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <div className="col-span-3">
                {userDialogAction === "view" ? (
                  <Input 
                    id="status" 
                    value={formData.status.charAt(0).toUpperCase() + formData.status.slice(1)}
                    readOnly
                  />
                ) : (
                  <Select 
                    value={formData.status} 
                    onValueChange={(value) => handleSelectChange("status", value)}
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setUserDialogOpen(false)}>
              {userDialogAction === "view" ? "Close" : "Cancel"}
            </Button>
            {userDialogAction !== "view" && (
              <Button 
                type="button" 
                onClick={handleSubmitUser}
                disabled={!isFormValid()}
              >
                {userDialogAction === "add" ? "Create User" : "Update User"}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the user <span className="font-medium">{selectedUser?.name}</span>. 
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteUser} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default UsersPage;
