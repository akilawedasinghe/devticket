
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";

interface AvatarGroupProps {
  users: Array<{
    name: string;
    image?: string;
    email?: string;
  }>;
  limit?: number;
  size?: "sm" | "md" | "lg";
}

export function AvatarGroup({ users, limit = 3, size = "md" }: AvatarGroupProps) {
  const visibleUsers = users.slice(0, limit);
  const remainingCount = users.length - limit;

  const sizeClasses = {
    sm: "h-6 w-6 text-xs",
    md: "h-8 w-8 text-sm",
    lg: "h-10 w-10 text-base",
  };

  const offsetClasses = {
    sm: "-ml-1.5",
    md: "-ml-2",
    lg: "-ml-2.5",
  };

  return (
    <div className="flex">
      <TooltipProvider delayDuration={300}>
        {visibleUsers.map((user, index) => (
          <Tooltip key={index}>
            <TooltipTrigger asChild>
              <div
                className={`${index > 0 ? offsetClasses[size] : ""} ring-2 ring-background transition-transform hover:translate-y-[-2px]`}
              >
                <Avatar className={sizeClasses[size]}>
                  {user.image && <AvatarImage src={user.image} alt={user.name} />}
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p className="font-medium">{user.name}</p>
              {user.email && <p className="text-xs text-muted-foreground">{user.email}</p>}
            </TooltipContent>
          </Tooltip>
        ))}

        {remainingCount > 0 && (
          <Tooltip>
            <TooltipTrigger asChild>
              <div className={`${offsetClasses[size]} relative ring-2 ring-background`}>
                <Avatar className={sizeClasses[size]}>
                  <AvatarFallback className="bg-muted text-muted-foreground">
                    +{remainingCount}
                  </AvatarFallback>
                </Avatar>
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>{remainingCount} more {remainingCount === 1 ? 'user' : 'users'}</p>
            </TooltipContent>
          </Tooltip>
        )}
      </TooltipProvider>
    </div>
  );
}
