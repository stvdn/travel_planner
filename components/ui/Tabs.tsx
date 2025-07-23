import * as React from "react";
import * as RadixTabs from '@radix-ui/react-tabs'; // Renamed to avoid collision with our 'Tabs' export
import { cn } from "@/lib/utils";

// 1. Tabs Root Component (Maps to RadixTabs.Root)
const Tabs = React.forwardRef<
    React.ElementRef<typeof RadixTabs.Root>,
    React.ComponentPropsWithoutRef<typeof RadixTabs.Root>
>(({ className, ...props }, ref) => (
    <RadixTabs.Root
        ref={ref}
        className={cn(
            "w-full", // Base styles for the entire tab container
            className
        )}
        {...props}
    />
));
Tabs.displayName = RadixTabs.Root.displayName;

// 2. TabsList Component (Maps to RadixTabs.List)
const TabsList = React.forwardRef<
    React.ElementRef<typeof RadixTabs.List>,
    React.ComponentPropsWithoutRef<typeof RadixTabs.List>
>(({ className, ...props }, ref) => (
    <RadixTabs.List
        ref={ref}
        className={cn(
            "rounded-lg p-1", // Styles for the tab group background
            className
        )}
        {...props}
    />
));
TabsList.displayName = RadixTabs.List.displayName;

// 3. TabsTrigger Component (Maps to RadixTabs.Trigger)
const TabsTrigger = React.forwardRef<
    React.ElementRef<typeof RadixTabs.Trigger>,
    React.ComponentPropsWithoutRef<typeof RadixTabs.Trigger>
>(({ className, ...props }, ref) => (
    <RadixTabs.Trigger
        ref={ref}
        className={cn(
            "bg-neutral-100 flex-1 px-4 py-1 rounded-md text-sm font-light transition-colors duration-200 ease-in-out cursor-pointer",
            "data-[state=active]:bg-neutral-400 data-[state=active]:text-white", // Active state using theme colors
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2", // Focus styling
            className
        )}
        {...props}
    />
));
TabsTrigger.displayName = RadixTabs.Trigger.displayName;

// 4. TabsContent Component (Maps to RadixTabs.Content)
const TabsContent = React.forwardRef<
    React.ElementRef<typeof RadixTabs.Content>,
    React.ComponentPropsWithoutRef<typeof RadixTabs.Content>
>(({ className, ...props }, ref) => (
    <RadixTabs.Content
        ref={ref}
        className={cn(
            "mt-4 p-2", // Default padding for content area
            className
        )}
        {...props}
    />
));
TabsContent.displayName = RadixTabs.Content.displayName;

// Export all components
export { Tabs, TabsList, TabsTrigger, TabsContent };