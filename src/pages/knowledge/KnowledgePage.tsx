
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronRight, 
  Clock, 
  Search, 
  ThumbsUp, 
  Filter, 
  BookOpen, 
  FileQuestion, 
  Book, 
  Lightbulb,
  FilePlus,
  Mail,
  Database
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface Article {
  id: number;
  title: string;
  description: string;
  category: string;
  views: number;
  helpful: number;
  dateUpdated: string;
  erpSystem?: string;
}

const articles: Article[] = [
  {
    id: 1,
    title: "Getting Started with Your Support Portal",
    description: "Learn how to set up your account, manage preferences, and submit your first ticket.",
    category: "Getting Started",
    views: 3240,
    helpful: 156,
    dateUpdated: "2 days ago"
  },
  {
    id: 2,
    title: "Understanding Priority Levels for Support Tickets",
    description: "Learn about different priority levels and how they affect response times.",
    category: "Ticketing System",
    views: 1890,
    helpful: 124,
    dateUpdated: "1 week ago"
  },
  {
    id: 3,
    title: "S/4 HANA Finance Module Overview",
    description: "A comprehensive guide to the finance module in SAP S/4 HANA.",
    category: "ERP Systems",
    views: 2150,
    helpful: 178,
    dateUpdated: "3 days ago",
    erpSystem: "s4_hana"
  },
  {
    id: 4,
    title: "Common SAP ByDesign Configuration Issues",
    description: "Troubleshooting guide for typical configuration problems in SAP ByDesign.",
    category: "Troubleshooting",
    views: 1675,
    helpful: 142,
    dateUpdated: "1 week ago",
    erpSystem: "sap_bydesign"
  },
  {
    id: 5,
    title: "Acumatica Reporting Best Practices",
    description: "Learn how to create effective reports in Acumatica ERP.",
    category: "Best Practices",
    views: 1230,
    helpful: 98,
    dateUpdated: "5 days ago",
    erpSystem: "acumatica"
  },
  {
    id: 6,
    title: "S/4 HANA Implementation Checklist",
    description: "Key considerations and steps for a successful S/4 HANA implementation.",
    category: "Implementation",
    views: 1845,
    helpful: 156,
    dateUpdated: "2 weeks ago",
    erpSystem: "s4_hana"
  },
  {
    id: 7,
    title: "SAP ByDesign User Access Management",
    description: "Guide to managing user roles and permissions in SAP ByDesign.",
    category: "Security",
    views: 1320,
    helpful: 110,
    dateUpdated: "1 week ago",
    erpSystem: "sap_bydesign"
  },
  {
    id: 8,
    title: "Acumatica Integration Options",
    description: "Overview of integration approaches for connecting Acumatica with other systems.",
    category: "Integration",
    views: 1580,
    helpful: 132,
    dateUpdated: "3 days ago",
    erpSystem: "acumatica"
  }
];

const categories = [
  { name: "Getting Started", count: 8, icon: BookOpen },
  { name: "Ticketing System", count: 15, icon: FileQuestion },
  { name: "ERP Systems", count: 12, icon: Database },
  { name: "Troubleshooting", count: 12, icon: Lightbulb },
  { name: "Best Practices", count: 7, icon: Book },
  { name: "Implementation", count: 5, icon: Book },
  { name: "Security", count: 6, icon: Book },
  { name: "Integration", count: 4, icon: Book },
];

const erpSystems = [
  { name: "S/4 HANA", code: "s4_hana", icon: Database },
  { name: "SAP ByDesign", code: "sap_bydesign", icon: Database },
  { name: "Acumatica", code: "acumatica", icon: Database },
];

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().min(1, "Please select a category"),
  erpSystem: z.string().optional(),
});

const KnowledgePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [activeErpTab, setActiveErpTab] = useState("all");
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const [isCreateArticleDialogOpen, setIsCreateArticleDialogOpen] = useState(false);
  const { user } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      erpSystem: "",
    },
  });

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        article.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = activeTab === "all" || article.category.toLowerCase() === activeTab.toLowerCase();
    
    const matchesErp = activeErpTab === "all" || article.erpSystem === activeErpTab;
    
    return matchesSearch && matchesCategory && matchesErp;
  });

  const handleSupportRequest = () => {
    setIsContactDialogOpen(false);
    toast({
      title: "Support request submitted",
      description: "Our team will get back to you shortly",
    });
  };

  const onSubmitArticle = (values: z.infer<typeof formSchema>) => {
    console.log("New article:", values);
    
    const newArticle: Article = {
      id: articles.length + 1,
      title: values.title,
      description: values.description,
      category: values.category,
      views: 0,
      helpful: 0,
      dateUpdated: "Just now",
      erpSystem: values.erpSystem,
    };
    
    toast({
      title: "Article created",
      description: "Your new knowledge base article has been published",
    });
    
    setIsCreateArticleDialogOpen(false);
    form.reset();
  };

  const isAdminOrSupport = user?.role === "admin" || user?.role === "support";

  const getErpSystem = (code?: string) => {
    if (!code) return "";
    const system = erpSystems.find(sys => sys.code === code);
    return system ? system.name : "";
  };

  return (
    <div className="w-full h-full p-0 m-0 overflow-hidden bg-white">
      <div className="w-full mx-auto py-6 px-4 relative z-10 left-aligned-content">
        <div className="flex flex-wrap items-center justify-between mb-8 mt-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-800 animate-fade-in">
            Knowledge Base
          </h1>
          <div className="flex space-x-4">
            {isAdminOrSupport && (
              <Dialog open={isCreateArticleDialogOpen} onOpenChange={setIsCreateArticleDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <FilePlus className="mr-2 h-4 w-4" />
                    Create Article
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[525px]">
                  <DialogHeader>
                    <DialogTitle>Create New Knowledge Base Article</DialogTitle>
                    <DialogDescription>
                      Add a new article to help users find solutions to common problems.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmitArticle)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                              <Input placeholder="Article title" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Article description"
                                className="min-h-[100px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="category"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Category</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select category" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {categories.map((category) => (
                                    <SelectItem key={category.name} value={category.name}>
                                      {category.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="erpSystem"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>ERP System</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select ERP system" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="s4_hana">S/4 HANA</SelectItem>
                                  <SelectItem value="sap_bydesign">SAP ByDesign</SelectItem>
                                  <SelectItem value="acumatica">Acumatica</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <DialogFooter>
                        <Button type="submit">Create Article</Button>
                      </DialogFooter>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
        
        <div className="relative mx-auto max-w-3xl mb-8">
          <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
          <Input 
            type="text" 
            placeholder="Search for articles, guides, and solutions..."
            className="bg-white py-3 px-12 h-14 text-lg rounded-xl shadow-sm focus-visible:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button variant="outline" className="absolute right-2 top-2 h-10 bg-white">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* ERP System Tabs */}
        <div className="mb-6">
          <Tabs defaultValue="all" value={activeErpTab} onValueChange={setActiveErpTab} className="w-full">
            <div className="flex justify-center border-b">
              <TabsList className="mb-0 bg-transparent">
                <TabsTrigger 
                  value="all"
                  className="py-2 px-4 data-[state=active]:border-b-2 data-[state=active]:border-primary"
                >
                  All ERP Systems
                </TabsTrigger>
                {erpSystems.map((system) => (
                  <TabsTrigger 
                    key={system.code} 
                    value={system.code}
                    className="py-2 px-4 data-[state=active]:border-b-2 data-[state=active]:border-primary"
                  >
                    <system.icon className="h-4 w-4 mr-2 inline" />
                    {system.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
          </Tabs>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 pt-0">
                <Button 
                  variant="ghost" 
                  className={`w-full justify-start ${activeTab === "all" ? "bg-slate-100" : ""}`}
                  onClick={() => setActiveTab("all")}
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  <span>All Articles</span>
                  <Badge className="ml-auto">{articles.length}</Badge>
                </Button>
                
                {categories.map((category) => (
                  <Button 
                    key={category.name} 
                    variant="ghost" 
                    className={`w-full justify-start ${activeTab === category.name.toLowerCase() ? "bg-slate-100" : ""}`}
                    onClick={() => setActiveTab(category.name.toLowerCase())}
                  >
                    <category.icon className="h-4 w-4 mr-2" />
                    <span>{category.name}</span>
                    <Badge className="ml-auto">{category.count}</Badge>
                  </Button>
                ))}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Need help?</CardTitle>
                <CardDescription>
                  Can't find what you're looking for? Our support team is ready to help.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Dialog open={isContactDialogOpen} onOpenChange={setIsContactDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full">
                      <Mail className="mr-2 h-4 w-4" />
                      Contact Support
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Contact Support</DialogTitle>
                      <DialogDescription>
                        Describe your issue and our team will get back to you as soon as possible.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input id="subject" placeholder="Brief description of your issue" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea id="message" placeholder="Provide details about your question or issue" className="min-h-[120px]" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={handleSupportRequest}>Submit Request</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          </div>
          
          <div className="lg:col-span-3">
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full tabs-left-aligned">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All</TabsTrigger>
                {categories.map((category) => (
                  <TabsTrigger key={category.name} value={category.name.toLowerCase()}>
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              <TabsContent value={activeTab} className="mt-0">
                <div className="space-y-4">
                  {filteredArticles.length > 0 ? (
                    filteredArticles.map((article) => (
                      <Card key={article.id} className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <Badge className="mb-2">{article.category}</Badge>
                              {article.erpSystem && (
                                <Badge variant="outline" className="ml-2 mb-2">
                                  {getErpSystem(article.erpSystem)}
                                </Badge>
                              )}
                              <CardTitle className="text-lg">{article.title}</CardTitle>
                            </div>
                            <ChevronRight className="h-5 w-5 text-gray-400" />
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600">{article.description}</p>
                        </CardContent>
                        <CardFooter className="border-t pt-3 text-sm text-gray-500 flex justify-between">
                          <div className="flex space-x-4">
                            <span className="flex items-center">
                              <ThumbsUp className="h-4 w-4 mr-1" />
                              {article.helpful} helpful
                            </span>
                            <span className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              Updated {article.dateUpdated}
                            </span>
                          </div>
                          <span>{article.views} views</span>
                        </CardFooter>
                      </Card>
                    ))
                  ) : (
                    <Card>
                      <CardHeader>
                        <CardTitle>No results found</CardTitle>
                        <CardDescription>
                          Try adjusting your search or filter to find what you're looking for.
                        </CardDescription>
                      </CardHeader>
                      <CardFooter>
                        <Button variant="outline" onClick={() => {
                          setSearchTerm("");
                          setActiveTab("all");
                          setActiveErpTab("all");
                        }}>
                          Clear filters
                        </Button>
                      </CardFooter>
                    </Card>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnowledgePage;
