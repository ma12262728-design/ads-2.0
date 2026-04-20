'use client';
import { useTheme } from 'next-themes';
import { Banner } from './banner';
import { Button } from './button';
import { Moon, Sun } from 'lucide-react';
import { useState } from 'react';

export function ThemeBanner() {
  const { theme, setTheme } = useTheme();
  const [show, setShow] = useState(true);

  if (!show) return null;

  const isDark = theme === 'dark';
  
  return (
    <div className="fixed bottom-24 right-6 z-50">
        <Banner
            show={show}
            onHide={() => setShow(false)}
            variant="premium"
            title={isDark ? "Try Light Mode" : "Try Dark Mode"}
            closable={true}
            action={
                <Button
                    onClick={() => setTheme(isDark ? 'light' : 'dark')}
                    className="flex items-center gap-2"
                    variant="liquid"
                    size="sm"
                >
                    {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                    {isDark ? "Light" : "Dark"}
                </Button>
            }
        />
    </div>
  );
}
