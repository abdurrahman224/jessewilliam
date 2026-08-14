import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, Sparkles } from 'lucide-react';

const FooterLayout = () => {


  // Home | Platform | Solutions | Pricing | About
  const navigation = [
    { id: 1, name: 'Home', href: '/' },
    { id: 3, name: 'Platform', href: '/platform' },
    { id: 4, name: 'Solutions', href: '/ai-innovation' },
    { id: 5, name: 'Pricing', href: '/pricing' },
    { id: 2, name: 'About', href: '/about' },
    { id: 6, name: 'Contact Us ', href: '/contact' },
  ];



  return (
    <footer className="bg-[#0d1832] text-white">
      <div className="mx-auto max-w-7xl px-4">
        {/* Brand */}
        <div className="flex flex-col items-center">
          <div className="mt-12 md:mt-20 flex items-center gap-2">
            {/* simple droplet mark */}
            <img src="/img/addvancedAi.png" alt="Deal Hunter Logo" className="h-auto w-50" />
          </div>

          {/* Socials */}
          {/* <div className="my-6 flex flex-col items-center gap-3">
            <div className="flex items-center gap-5 text-blue-200">
              <a href="#" aria-label="Facebook" className="transition hover:text-white">
                <Facebook className="h-8 w-8" />
              </a>
              <a href="#" aria-label="Twitter" className="transition hover:text-white">
                <Twitter className="h-8 w-8" />
              </a>
              <a href="#" aria-label="LinkedIn" className="transition hover:text-white">
                <Linkedin className="h-8 w-8" />
              </a>
              <a href="#" aria-label="Instagram" className="transition hover:text-white">
                <Instagram className="h-8 w-8" />
              </a>
            </div>
          </div> */}

          {/* Bottom row */}
          <div className="mt-5 md:mt-8 flex flex-col md:flex-row flex-wrap justify-center items-center gap-3 md:gap-6 text-center text-sm md:text-base tracking-wide">
            {navigation.map((item) => (
              <Link key={item.id ?? item.name} to={item.href} className="text-white hover:text-gray-500 transition-colors">
                {item.name}
              </Link>
            ))}
            {/* <Link to="/help" className="kro sem text-white hover:text-gray-500">
              Help
            </Link>
            <Link to="/privacy" className=" text-white hover:text-gray-500">
              Privacy Policy
            </Link>
            <Link to="/terms" className="kro sem text-white hover:text-gray-500">
              Terms & Condition
            </Link> */}
          </div>
          {/* thin divider */}
          <div className="my-4 w-full border-t border-white/10" />

          <div className="mb-4 w-full flex flex-col md:flex-row items-center md:justify-between gap-2 text-center md:text-left">
            <p className="text-sm text-gray-400">information@addvancedai.com</p>
            <p className="text-sm text-gray-400">
              Copyright © 2026 • <span className="font-semibold">Deal Hunter</span>
            </p>
          </div>
        </div>
      </div>
      {/* Floating  */}
      <div className="fixed right-50 bottom-6 z-50 hidden md:block">
        <Link
          to="/auth/login"
          className="group from-secondary flex items-center gap-3 rounded-full bg-gradient-to-r to-blue-600 px-4 py-2 text-white shadow-2xl transition-all duration-300 hover:scale-105 md:px-6 md:py-3"
        >
          <Sparkles className="h-5 w-5" />
          <span className="font-semibold">Get Started</span>
        </Link>
      </div>
    </footer>
    
  );
};

export default FooterLayout;
