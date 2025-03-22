
import React, { useState, useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PaperclipIcon, Send, Smile, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Ticket } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

interface TicketChatProps {
  ticket: Ticket;
  statusBadge?: React.ReactNode;
  priorityBadge?: React.ReactNode;
  reassignButton?: React.ReactNode;
}

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: Date;
  isCurrentUser: boolean;
  attachments?: AttachmentFile[];
}

interface AttachmentFile {
  name: string;
  type: string;
  size: number;
  url: string;
  isImage?: boolean;
}

export function TicketChat({ ticket, statusBadge, priorityBadge, reassignButton }: TicketChatProps) {
  const [messageText, setMessageText] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      senderId: "support-1",
      senderName: "Jennifer Smith",
      content: "Hello! I'm assigned to help with your ticket. Could you provide more details about the issue?",
      timestamp: new Date(Date.now() - 86400000), // 1 day ago
      isCurrentUser: false,
    },
    {
      id: "2",
      senderId: "client-1",
      senderName: "You",
      content: "Thanks for responding. When I try to generate the report, I get an error that says 'Database connection failed'.",
      timestamp: new Date(Date.now() - 82800000), // 23 hours ago
      isCurrentUser: true,
    },
    {
      id: "3",
      senderId: "support-1",
      senderName: "Jennifer Smith",
      content: "I understand. Let me check the database connections. Can you try again in about 10 minutes?",
      timestamp: new Date(Date.now() - 79200000), // 22 hours ago
      isCurrentUser: false,
    },
    {
      id: "4",
      senderId: "client-1",
      senderName: "You",
      content: "I tried again but still getting the same error.",
      timestamp: new Date(Date.now() - 43200000), // 12 hours ago
      isCurrentUser: true,
    },
    {
      id: "5",
      senderId: "support-1",
      senderName: "Jennifer Smith",
      content: "We've identified the issue with the database connection. Our team is working on fixing it right now.",
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      isCurrentUser: false,
    },
  ]);

  // Scroll to bottom of messages when component mounts or messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize the chat view to show the latest messages
  useEffect(() => {
    scrollToBottom();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedFiles(prev => [...prev, ...filesArray]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSendMessage = () => {
    if (messageText.trim() === "" && selectedFiles.length === 0) return;
    
    // In a real application, you would send the message to an API here
    console.log("Sending message:", messageText);
    console.log("Attachments:", selectedFiles);
    
    // Convert File objects to AttachmentFile format
    const attachments: AttachmentFile[] = selectedFiles.map(file => {
      // Create an object URL for each file
      const url = URL.createObjectURL(file);
      
      return {
        name: file.name,
        type: file.type,
        size: file.size,
        url: url,
        isImage: file.type.startsWith('image/')
      };
    });
    
    // Add the new message to the messages state
    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: "client-1",
      senderName: "You",
      content: messageText,
      timestamp: new Date(),
      isCurrentUser: true,
      attachments: attachments.length > 0 ? attachments : undefined,
    };
    
    setMessages(prevMessages => [...prevMessages, newMessage]);
    
    // Clear inputs
    setMessageText("");
    setSelectedFiles([]);
    
    // Scroll to bottom after sending
    setTimeout(scrollToBottom, 100);
  };

  // Group messages by date
  const groupedMessages: { [date: string]: Message[] } = {};
  messages.forEach(message => {
    const dateStr = formatDate(message.timestamp);
    if (!groupedMessages[dateStr]) {
      groupedMessages[dateStr] = [];
    }
    groupedMessages[dateStr].push(message);
  });

  return (
    <Card className="flex flex-col h-full w-full overflow-hidden bg-white border shadow-md">
      <CardHeader className="border-b px-4 py-3 border-gray-200 flex flex-row items-center justify-between">
        <div className="flex items-center space-x-4">
          <CardTitle className="text-lg text-gray-800">Ticket Conversation</CardTitle>
          <div className="flex items-center gap-2">
            {statusBadge && statusBadge}
            {priorityBadge && priorityBadge}
            {reassignButton && reassignButton}
          </div>
        </div>
      </CardHeader>
      <div className="flex flex-col h-[calc(100%-70px)]">
        <ScrollArea className="flex-1 px-4">
          <CardContent className="py-4 space-y-4 flex flex-col">
            {Object.entries(groupedMessages).map(([date, messages]) => (
              <div key={date} className="space-y-3">
                <div className="relative py-2">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-white px-2 text-xs text-gray-500">
                      {date}
                    </span>
                  </div>
                </div>
                
                {messages.map(message => (
                  <div 
                    key={message.id}
                    className={`flex ${message.isCurrentUser ? 'justify-end' : 'justify-start'}`}
                  >
                    {!message.isCurrentUser && (
                      <Avatar className="h-8 w-8 mr-2 mt-1">
                        <AvatarFallback className="bg-blue-600/20 text-blue-700">
                          {message.senderName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div 
                      className={`max-w-[75%] rounded-lg p-3 ${
                        message.isCurrentUser 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {!message.isCurrentUser && (
                        <p className="text-xs font-medium mb-1 text-gray-600">{message.senderName}</p>
                      )}
                      <p>{message.content}</p>
                      
                      {/* Render attachments if they exist */}
                      {message.attachments && message.attachments.length > 0 && (
                        <div className="mt-2 space-y-2">
                          {message.attachments.map((file, index) => (
                            <div key={index} className={`rounded p-2 ${
                              message.isCurrentUser 
                                ? 'bg-blue-700 text-blue-100' 
                                : 'bg-gray-200 text-gray-800'
                            }`}>
                              {file.isImage ? (
                                <div>
                                  <div className="mb-1">
                                    <span className="text-xs font-medium">{file.name}</span>
                                  </div>
                                  <a href={file.url} target="_blank" rel="noopener noreferrer">
                                    <img 
                                      src={file.url} 
                                      alt={file.name} 
                                      className="max-w-full max-h-48 rounded object-contain" 
                                    />
                                  </a>
                                </div>
                              ) : (
                                <div className="flex items-center">
                                  <PaperclipIcon className="h-4 w-4 mr-2" />
                                  <div>
                                    <a 
                                      href={file.url} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="text-sm font-medium underline"
                                    >
                                      {file.name}
                                    </a>
                                    <p className="text-xs">
                                      {formatFileSize(file.size)}
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                      
                      <p className={`text-xs mt-1 ${
                        message.isCurrentUser 
                          ? 'text-blue-200' 
                          : 'text-gray-500'
                      }`}>
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </CardContent>
        </ScrollArea>
        
        <div className="p-4 border-t border-gray-200 mt-auto">
          {/* Attachment preview area */}
          {selectedFiles.length > 0 && (
            <div className="mb-3 p-2 border border-gray-200 rounded-md bg-gray-50">
              <div className="text-sm font-medium mb-2">Attachments ({selectedFiles.length})</div>
              <Table>
                <TableBody>
                  {selectedFiles.map((file, index) => (
                    <TableRow key={index} className="border-b last:border-0">
                      <TableCell className="py-2 pl-4">
                        <div className="flex items-center">
                          {file.type.startsWith('image/') ? (
                            <div className="w-10 h-10 rounded bg-gray-200 flex items-center justify-center overflow-hidden mr-3">
                              <img 
                                src={URL.createObjectURL(file)} 
                                alt={file.name} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-10 h-10 rounded bg-blue-100 flex items-center justify-center mr-3">
                              <PaperclipIcon className="h-5 w-5 text-blue-600" />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                            <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="w-10">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8" 
                          onClick={() => handleRemoveFile(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
          
          <div className="flex gap-2">
            <div className="flex space-x-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="icon" className="shrink-0 bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                    <Smile className="h-5 w-5" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent side="top" className="w-auto p-2 bg-white border border-gray-200">
                  <div className="flex gap-2 text-2xl">
                    {["😊", "👍", "🙏", "🤔", "👀", "❤️"].map(emoji => (
                      <button
                        key={emoji}
                        className="p-2 hover:bg-gray-100 rounded-md"
                        onClick={() => setMessageText(prev => prev + emoji)}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
              
              <Button variant="outline" size="icon" className="shrink-0 bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                <label htmlFor="ticket-file-upload" className="cursor-pointer">
                  <PaperclipIcon className="h-5 w-5" />
                  <input
                    id="ticket-file-upload"
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              </Button>
            </div>
            
            <Input
              placeholder="Type your message..."
              value={messageText}
              onChange={e => setMessageText(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              className="flex-1 bg-gray-50 border-gray-200 text-gray-800 placeholder:text-gray-500"
            />
            
            <Button onClick={handleSendMessage} size="icon" className="bg-blue-600 hover:bg-blue-700">
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
