import React from "react";
import * as Icons from "lucide-react";

interface LucideIconProps {
  name: string;
  className?: string;
  size?: number;
}

export function LucideIcon({ name, className = "", size }: LucideIconProps) {
  // Safe lookup for dynamic icon rendering
  const IconComponent = (Icons as any)[name];

  if (!IconComponent) {
    // Return a fallback search or file icon if name is missing
    return <Icons.HelpCircle className={className} size={size} />;
  }

  return <IconComponent className={className} size={size} />;
}
