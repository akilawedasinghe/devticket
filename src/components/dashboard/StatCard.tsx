
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { StatCard as StatCardType } from "@/lib/types";

export function StatCard({
  title,
  value,
  description,
  icon,
  trend,
  trendValue,
  color = "default",
  className,
  ...props
}: StatCardType & React.HTMLAttributes<HTMLDivElement>) {
  const colorClasses = {
    default: "bg-gradient-to-br from-card to-background border",
    primary: "bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 dark:from-blue-900/20 dark:to-blue-800/20 dark:border-blue-800/50",
    success: "bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200 dark:from-emerald-900/20 dark:to-emerald-800/20 dark:border-emerald-800/50",
    warning: "bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200 dark:from-amber-900/20 dark:to-amber-800/20 dark:border-amber-800/50",
    danger: "bg-gradient-to-br from-rose-50 to-rose-100 border-rose-200 dark:from-rose-900/20 dark:to-rose-800/20 dark:border-rose-800/50",
    info: "bg-gradient-to-br from-sky-50 to-sky-100 border-sky-200 dark:from-sky-900/20 dark:to-sky-800/20 dark:border-sky-800/50",
  };

  const iconColorClasses = {
    default: "text-primary",
    primary: "text-blue-600 dark:text-blue-400",
    success: "text-emerald-600 dark:text-emerald-400",
    warning: "text-amber-600 dark:text-amber-400",
    danger: "text-rose-600 dark:text-rose-400",
    info: "text-sky-600 dark:text-sky-400",
  };

  const trendIcon = trend === "up" ? (
    <ArrowUpIcon className="h-4 w-4 text-emerald-500" />
  ) : (
    <ArrowDownIcon className="h-4 w-4 text-rose-500" />
  );

  const trendClass = trend === "up" ? "text-emerald-500" : "text-rose-500";

  return (
    <Card
      className={cn(
        "transition-all duration-300 overflow-hidden hover:shadow-md",
        colorClasses[color],
        className
      )}
      {...props}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
        {icon && <div className={cn("p-2 rounded-full bg-background", iconColorClasses[color])}>{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
        {(description || trendValue) && (
          <CardDescription className="mt-2 flex items-center gap-1">
            {description}
            {trendValue && (
              <span className="flex items-center gap-1 ml-2">
                <span className={cn("font-medium", trendClass)}>
                  {trendIcon}
                </span>
                <span className={cn("font-medium", trendClass)}>
                  {trendValue}%
                </span>
              </span>
            )}
          </CardDescription>
        )}
      </CardContent>
    </Card>
  );
}
