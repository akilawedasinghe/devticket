
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthContext";
import { Camera, User, Mail, Phone, Building, MapPin, Shield, Bell, Lock, LogOut } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const ProfilePage = () => {
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarSrc, setAvatarSrc] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("personal");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setAvatarSrc(result);
        localStorage.setItem('userAvatar', result);
        toast({
          title: "Profile photo updated",
          description: "Your profile photo has been successfully updated.",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Load avatar from localStorage on component mount
  React.useEffect(() => {
    const savedAvatar = localStorage.getItem('userAvatar');
    if (savedAvatar) {
      setAvatarSrc(savedAvatar);
    }
  }, []);

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleNavClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="w-full h-full min-h-screen bg-white p-0 m-0">
      <div className="w-full py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              My Profile
            </h1>
            <p className="text-muted-foreground">
              Manage your account details and preferences
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="col-span-1 md:row-span-2 h-fit">
            <CardHeader className="text-center">
              <div className="flex flex-col items-center">
                <div className="relative group">
                  <Avatar className="h-24 w-24 mb-2">
                    {avatarSrc ? (
                      <AvatarImage src={avatarSrc} alt="Profile" />
                    ) : (
                      <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                        {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div 
                    className="absolute bottom-1 right-1 rounded-full p-1.5 bg-primary text-white cursor-pointer hover:bg-primary/90 transition-all"
                    onClick={triggerFileInput}
                  >
                    <Camera className="h-4 w-4" />
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      className="hidden" 
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
                <CardTitle className="mt-2">{user?.name || 'User'}</CardTitle>
                <CardDescription>{user?.email || 'user@example.com'}</CardDescription>
              </div>
              <div className="mt-4">
                <Button className="w-full" variant="outline" onClick={triggerFileInput}>
                  <Camera className="mr-2 h-4 w-4" /> Change Photo
                </Button>
              </div>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6">
              <nav className="flex flex-col space-y-1">
                <Button 
                  variant={activeTab === "personal" ? "default" : "ghost"} 
                  className="justify-start"
                  onClick={() => handleNavClick("personal")}
                >
                  <User className="mr-2 h-4 w-4" /> Personal Information
                </Button>
                <Button 
                  variant={activeTab === "security" ? "default" : "ghost"} 
                  className="justify-start"
                  onClick={() => handleNavClick("security")}
                >
                  <Shield className="mr-2 h-4 w-4" /> Security
                </Button>
                <Button 
                  variant={activeTab === "notifications" ? "default" : "ghost"} 
                  className="justify-start"
                  onClick={() => handleNavClick("notifications")}
                >
                  <Bell className="mr-2 h-4 w-4" /> Notifications
                </Button>
                <Button 
                  variant={activeTab === "privacy" ? "default" : "ghost"} 
                  className="justify-start"
                  onClick={() => handleNavClick("privacy")}
                >
                  <Lock className="mr-2 h-4 w-4" /> Privacy
                </Button>
              </nav>
            </CardContent>
            <Separator />
            <CardFooter className="pt-4">
              <Button variant="outline" className="w-full text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10">
                <LogOut className="mr-2 h-4 w-4" /> Sign Out
              </Button>
            </CardFooter>
          </Card>
          
          <div className="col-span-1 md:col-span-3 space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full grid grid-cols-3">
                <TabsTrigger value="personal">Personal Info</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
              </TabsList>
              
              <TabsContent value="personal" className="space-y-4 pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>
                      Update your personal details
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <div className="flex space-x-2">
                          <User className="h-4 w-4 my-auto text-muted-foreground" />
                          <Input id="name" defaultValue={user?.name || 'John Doe'} />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <div className="flex space-x-2">
                          <Mail className="h-4 w-4 my-auto text-muted-foreground" />
                          <Input id="email" defaultValue={user?.email || 'john.doe@example.com'} />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="flex space-x-2">
                          <Phone className="h-4 w-4 my-auto text-muted-foreground" />
                          <Input id="phone" defaultValue="+1 (555) 123-4567" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company">Company</Label>
                        <div className="flex space-x-2">
                          <Building className="h-4 w-4 my-auto text-muted-foreground" />
                          <Input id="company" defaultValue="Acme Inc." />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <div className="flex space-x-2">
                        <MapPin className="h-4 w-4 my-auto text-muted-foreground" />
                        <Textarea id="address" defaultValue="123 Main St, Suite 456, Anytown, CA 12345" />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>Save Changes</Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Preferences</CardTitle>
                    <CardDescription>
                      Manage your account preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Email Notifications</Label>
                        <CardDescription>Receive email notifications for account activity</CardDescription>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Two-Factor Authentication</Label>
                        <CardDescription>Add an extra layer of security to your account</CardDescription>
                      </div>
                      <Switch />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="security" className="pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>
                      Manage your security preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input id="current-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>Update Password</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="notifications" className="pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>
                      Manage how you receive notifications
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Email Notifications</Label>
                        <CardDescription>Receive notifications via email</CardDescription>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Browser Notifications</Label>
                        <CardDescription>Receive notifications in your browser</CardDescription>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>SMS Notifications</Label>
                        <CardDescription>Receive notifications via text message</CardDescription>
                      </div>
                      <Switch />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>Save Preferences</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="privacy" className="pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Privacy Settings</CardTitle>
                    <CardDescription>
                      Manage your privacy preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Profile Visibility</Label>
                        <CardDescription>Allow other users to view your profile</CardDescription>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Data Sharing</Label>
                        <CardDescription>Share usage data to improve our services</CardDescription>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>Save Privacy Settings</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
