import { ReactNode } from 'react';
import Logo from './Logo';
import Navigation from './Navigation';
import ScrollIndicator from './ScrollIndicator';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ScrollIndicator />
      <Logo />
      <Navigation />
      <main className="relative">
        {children}
      </main>
    </div>
  );
};

export default Layout;