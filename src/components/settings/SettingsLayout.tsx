// Settings Page Component

import React from 'react';
import { AppSidebar } from '@/components/dashboard/AppSidebar';
import { Header } from '@/components/dashboard/Header';
import { MobileNav } from '@/components/layout/MobileNav';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTheme } from '@/components/theme-provider';

export const SettingsLayout: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="lg:flex w-screen">
      <div className="hidden lg:block">
        <AppSidebar />
      </div>

      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        <Header />

        <main className="flex-1 p-4 lg:p-8 pb-20 lg:pb-8">
          <div className="mx-auto max-w-2xl space-y-6">
            <div>
              <h1 className="text-3xl font-bold uppercase tracking-wide mb-2">
                Settings
              </h1>
              <p className="text-muted-foreground">
                Customize your air fryer converter experience
              </p>
            </div>

            {/* Appearance Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>
                  Customize how the app looks
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="theme">Theme</Label>
                  <Select value={theme} onValueChange={setTheme}>
                    <SelectTrigger id="theme">
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">
                    Choose your preferred theme appearance
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* About */}
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
                <CardDescription>
                  Information about Air Fryer Converter
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>
                  <strong className="text-foreground">Version:</strong> 1.0.0
                </p>
                <p>
                  <strong className="text-foreground">Description:</strong> Convert oven cooking
                  instructions to air fryer settings and discover recipes from UK supermarkets.
                </p>
                <p>
                  <strong className="text-foreground">Features:</strong> Temperature and time
                  conversion, recipe browser, cooking tips.
                </p>
              </CardContent>
            </Card>
          </div>
        </main>

        <MobileNav />
      </div>
    </div>
  );
};

