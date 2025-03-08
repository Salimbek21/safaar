"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Moon, Sun, Monitor, ChevronRight } from "lucide-react";

interface ThemeSwitcherProps {
  className?: string;
}

export function ThemeSwitcher({ className }: ThemeSwitcherProps) {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  const getThemeLabel = () => {
    if (theme === "dark") return "Dark";
    if (theme === "light") return "Light";
    return "System";
  };

  const getThemeIcon = () => {
    if (theme === "dark")
      return <Moon className="h-5 w-5 text-muted-foreground mr-3" />;
    if (theme === "light")
      return <Sun className="h-5 w-5 text-muted-foreground mr-3" />;
    return <Monitor className="h-5 w-5 text-muted-foreground mr-3" />;
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <button className="w-full flex items-center justify-between p-4 hover:bg-muted/50">
          <div className="flex items-center">
            {getThemeIcon()}
            <span>Theme: {getThemeLabel()}</span>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </button>
      </DrawerTrigger>
      <DrawerContent className="px-4">
        <DrawerHeader className="text-left">
          <DrawerTitle>Appearance</DrawerTitle>
          <DrawerDescription>
            Choose your preferred theme appearance
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4">
          <RadioGroup
            defaultValue={theme || "system"}
            onValueChange={(value) => {
              setTheme(value);
            }}
            className="gap-4"
          >
            <div className="flex items-center space-x-2 border rounded-lg p-4">
              <RadioGroupItem value="system" id="system" />
              <Label
                htmlFor="system"
                className="flex items-center cursor-pointer"
              >
                <Monitor className="h-5 w-5 mr-3" />
                <div>
                  <p className="font-medium">System</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Follow system appearance
                  </p>
                </div>
              </Label>
            </div>
            <div className="flex items-center space-x-2 border rounded-lg p-4">
              <RadioGroupItem value="light" id="light" />
              <Label
                htmlFor="light"
                className="flex items-center cursor-pointer"
              >
                <Sun className="h-5 w-5 mr-3" />
                <div>
                  <p className="font-medium">Light</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Use light theme
                  </p>
                </div>
              </Label>
            </div>
            <div className="flex items-center space-x-2 border rounded-lg p-4">
              <RadioGroupItem value="dark" id="dark" />
              <Label
                htmlFor="dark"
                className="flex items-center cursor-pointer"
              >
                <Moon className="h-5 w-5 mr-3" />
                <div>
                  <p className="font-medium">Dark</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Use dark theme
                  </p>
                </div>
              </Label>
            </div>
          </RadioGroup>
        </div>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
