import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User2, ChevronDown } from 'lucide-react';
import Container from '../../components/ui/Container';
import Button from '../../components/ui/Button';

const NavbarLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Navigation items
  const navigation = [
    { id: 1, name: 'Home', href: '/' },
    { id: 3, name: 'Platform', href: '/platform' },
    { id: 4, name: 'Solutions', href: '/ai-innovation' },
    { id: 5, name: 'Pricing', href: '/pricing' },
    { id: 2, name: 'About', href: '/about' },
  ];

  const isActive = (path) => location.pathname === path;

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-blue-600 shadow-lg' : 'bg-blue-500'
      }`}
    >
      <Container>
        <div className="flex h-16 items-center justify-between lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 pl-4 lg:pl-0">
            <img
              src="/img/addvancedAi.png"
              alt="Logo"
              className="w-32 transition-all duration-300 md:w-36 lg:w-40"
            />
          </Link>

          {/* Desktop Navigation - Hidden on mobile */}
          <div className="hidden md:flex md:items-center md:space-x-1 lg:space-x-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`relative px-3 py-2 text-sm font-medium text-white transition-all duration-200 lg:text-base ${
                  isActive(item.href)
                    ? 'after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-8 after:-translate-x-1/2 after:rounded-full after:bg-white'
                    : 'rounded-md hover:bg-white/10'
                }`}
              >
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          {/* Desktop Right Side - Hidden on mobile */}
          <div className="hidden md:flex md:items-center md:space-x-3 lg:space-x-4">
            <Link
              to="/auth/login"
              className="flex items-center rounded-md px-3 py-2 text-sm text-white transition-all hover:bg-white/10 lg:text-base"
            >
              <User2 className="mr-1 h-4 w-4 lg:h-5 lg:w-5" />
              Log In
            </Link>
            <Link
              to="/auth/register"
              className="rounded-md px-3 py-2 text-sm text-white transition-all hover:bg-white/10 lg:text-base"
            >
              Join Free
            </Link>
            <Link
              to="/pricing"
              className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-blue-600 transition-all duration-200 hover:bg-blue-50 hover:shadow-md lg:text-base"
            >
              Purchase
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="pr-4 md:hidden">
            <Button
              onClick={() => setIsOpen(!isOpen)}
              variant="ghost"
              className="rounded-lg p-2 text-white transition-all hover:bg-white/10"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation - Optimized for mobile */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
            isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="space-y-2 border-t border-white/20 py-4">
            {/* Main Navigation */}
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center rounded-lg px-4 py-3 text-base font-medium transition-all ${
                  isActive(item.href)
                    ? 'bg-white/20 text-white'
                    : 'text-white/90 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span>{item.name}</span>
                {isActive(item.href) && (
                  <span className="ml-auto rounded-full bg-white/30 px-2 py-0.5 text-xs">
                    Active
                  </span>
                )}
              </Link>
            ))}

            {/* Divider */}
            <div className="my-3 border-t border-white/20"></div>

            {/* Auth Links - Mobile */}
            <Link
              to="/auth/login"
              onClick={() => setIsOpen(false)}
              className="flex items-center rounded-lg px-4 py-3 text-base font-medium text-white/90 transition-all hover:bg-white/10 hover:text-white"
            >
              <User2 className="mr-3 h-5 w-5" />
              Log In
            </Link>

            <Link
              to="/auth/register"
              onClick={() => setIsOpen(false)}
              className="flex items-center rounded-lg px-4 py-3 text-base font-medium text-white/90 transition-all hover:bg-white/10 hover:text-white"
            >
              Join Free
            </Link>

            {/* CTA Button - Mobile */}
            <div className="px-4 pt-3">
              <Link
                to="/pricing"
                onClick={() => setIsOpen(false)}
                className="block w-full rounded-lg bg-white px-4 py-3 text-center font-semibold text-blue-600 transition-all duration-200 hover:bg-blue-50 hover:shadow-md"
              >
                Purchase Now
              </Link>
            </div>
          </div>
        </div>
      </Container>

      {/* Overlay for mobile menu - Optional */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[-1] bg-black/20 backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </nav>
  );
};

export default NavbarLayout;
