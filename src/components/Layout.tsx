import { ReactNode } from 'react';
import { ExternalLink } from 'lucide-react';
import Logo from './Logo';
import Navigation from './Navigation';
import ScrollIndicator from './ScrollIndicator';
import { Button } from './ui/button';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ScrollIndicator />
      <Logo />
      <Navigation />
      
      {/* Resume Button */}
      <div className="fixed top-8 right-8 z-50">
        <Button
          variant="outline"
          size="sm"
          asChild
          className="bg-background/80 backdrop-blur-sm border-border hover:bg-accent"
        >
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <span className="hidden sm:inline">Resume</span>
            <ExternalLink size={16} />
          </a>
        </Button>
      </div>
      
      <main className="relative">
        {children}
      </main>
    </div>
  );
};

export default Layout;