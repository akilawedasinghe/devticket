
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ERPSystem, Department, TicketPriority } from "@/lib/types";
import { toast } from "@/components/ui/use-toast";

interface TicketFormValues {
  title: string;
  description: string;
  erpSystem: ERPSystem;
  department: Department;
  priority: TicketPriority;
}

interface TicketFormProps {
  onSubmit: (values: TicketFormValues) => void;
  isLoading?: boolean;
}

export function TicketForm({ onSubmit, isLoading = false }: TicketFormProps) {
  const form = useForm<TicketFormValues>({
    defaultValues: {
      title: "",
      description: "",
      erpSystem: "s4_hana",
      department: "finance",
      priority: "medium",
    },
  });

  const handleSubmit = (values: TicketFormValues) => {
    try {
      onSubmit(values);
      form.reset();
      toast({
        title: "Ticket submitted",
        description: "Your ticket has been successfully submitted.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error submitting your ticket. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 animate-fade-in">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ticket Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter a descriptive title" {...field} />
              </FormControl>
              <FormDescription>
                Provide a clear and concise title for your issue.
              </FormDescription>
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
                  placeholder="Please describe the issue in detail"
                  rows={5}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Include any relevant details, error messages, or steps to reproduce.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-6 sm:grid-cols-3">
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

          <FormField
            control={form.control}
            name="department"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Department</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="procurement">Procurement</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="field_services">Field Services</SelectItem>
                    <SelectItem value="construction">Construction</SelectItem>
                    <SelectItem value="project_management">Project Management</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Priority</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full sm:w-auto" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit Ticket"}
        </Button>
      </form>
    </Form>
  );
}
