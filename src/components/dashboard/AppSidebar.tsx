// Animated Sidebar for Air Fryer Converter

import React from 'react';
import { useLocation } from 'react-router-dom';
import { Home, Book, Settings, AirVent } from 'lucide-react';
import {
  SidebarBody,
  SidebarLink,
} from '@/components/ui/animated-sidebar';

const navigationItems = [
  { 
    name: 'Home', 
    url: '/', 
    iconName: 'Home' as const
  },
  { 
    name: 'Recipes', 
    url: '/recipes', 
    iconName: 'Book' as const
  },
  { 
    name: 'Settings', 
    url: '/settings', 
    iconName: 'Settings' as const
  },
];

const iconComponents = {
  Home,
  Book,
  Settings,
};

export const Logo = () => {
  return (
    <div className="font-normal flex space-x-2 items-center text-sm text-black dark:text-white py-1 relative z-20">
      <div className="h-5 w-6 bg-[hsl(0,84%,60%)] rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0 flex items-center justify-center">
        <AirVent className="h-3 w-3 text-white" />
      </div>
      <span className="font-normal text-black dark:text-white whitespace-pre uppercase tracking-wide">
        Air Fryer
      </span>
    </div>
  );
};

export const AppSidebar: React.FC = () => {
  const location = useLocation();

  return (
    <SidebarBody className="justify-between gap-10">
      <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Logo />
        <div className="mt-8 flex flex-col gap-2">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.url;
            const IconComponent = iconComponents[item.iconName];
            return (
              <SidebarLink 
                key={item.name} 
                link={{
                  label: item.name,
                  href: item.url,
                  icon: <IconComponent className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
                }}
                isActive={isActive}
              />
            );
          })}
        </div>
      </div>
    </SidebarBody>
  );
};

