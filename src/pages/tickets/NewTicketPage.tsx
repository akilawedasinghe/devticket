
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { TicketForm } from "@/components/tickets/TicketForm";
import { FileText, Plus, CheckCircle2, AlertCircle, HelpCircle } from "lucide-react";

const NewTicketPage = () => {
  const [open, setOpen] = useState(false);
  
  const handleSubmit = (values: any) => {
    console.log("Ticket submitted:", values);
    setOpen(false);
  };

  const ticketTypes = [
    {
      id: "technical",
      title: "Technical Issue",
      description: "Report problems with software, hardware or connectivity",
      icon: <AlertCircle className="h-10 w-10 text-amber-500" />,
      color: "bg-gradient-to-br from-amber-500/10 to-amber-600/5 border-amber-500/20",
      iconClass: "text-amber-500"
    },
    {
      id: "billing",
      title: "Billing Question",
      description: "Questions about invoices, payments or subscriptions",
      icon: <CheckCircle2 className="h-10 w-10 text-emerald-500" />,
      color: "bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border-emerald-500/20",
      iconClass: "text-emerald-500"
    },
    {
      id: "general",
      title: "General Inquiry",
      description: "Any other questions or information requests",
      icon: <HelpCircle className="h-10 w-10 text-blue-500" />,
      color: "bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20",
      iconClass: "text-blue-500"
    }
  ];

  return (
    <div className="w-full h-full min-h-screen bg-white dark:bg-gray-900 m-0 p-0">
      <div className="w-full px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2 text-gray-900 dark:text-white">
            Create New Ticket
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Submit a new support ticket to get the help you need
          </p>
          
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
            <div>
              <Card className="overflow-hidden border bg-white dark:bg-card shadow-md">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <FileText className="h-20 w-20 text-blue-500 mb-6" />
                    <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">Need Assistance?</h2>
                    <p className="text-gray-600 dark:text-gray-300 text-center mb-8 max-w-md">
                      Create a support ticket and our team will help you resolve your issue quickly and efficiently
                    </p>
                    <Dialog open={open} onOpenChange={setOpen}>
                      <DialogTrigger asChild>
                        <Button size="lg" className="gap-2 bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-blue-900/30 transition-all duration-300 w-full sm:w-auto">
                          <Plus className="h-4 w-4" /> Create Ticket
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-2xl bg-white dark:bg-gray-900 border dark:border-gray-800 shadow-2xl">
                        <DialogHeader>
                          <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">Create New Support Ticket</DialogTitle>
                          <DialogDescription className="text-gray-600 dark:text-gray-400">
                            Fill out the form below to submit a new support ticket.
                          </DialogDescription>
                        </DialogHeader>
                        <TicketForm onSubmit={handleSubmit} />
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Choose Ticket Type</h3>
              
              {ticketTypes.map((type) => (
                <Card 
                  key={type.id}
                  className={`overflow-hidden border hover:scale-102 transition-all duration-200 cursor-pointer shadow-md`}
                  onClick={() => setOpen(true)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-full bg-gray-100 dark:bg-gray-800`}>
                        {type.icon}
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-gray-900 dark:text-white">{type.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{type.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <p className="text-gray-500 text-sm mt-6 italic">
                Not sure what type of ticket to create? Choose "General Inquiry" and we'll direct your request to the right team.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewTicketPage;
