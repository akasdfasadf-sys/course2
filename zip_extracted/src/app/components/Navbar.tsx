import { Link, useLocation } from 'react-router';
import { BookOpen, Search, ShoppingCart, User, Menu } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useState } from 'react';

export function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <BookOpen className="size-6 text-white" />
            </div>
            <span className="font-bold text-xl">LearnHub</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              to="/" 
              className={`${isActive('/') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'} transition-colors`}
            >
              Home
            </Link>
            <Link 
              to="/courses" 
              className={`${isActive('/courses') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'} transition-colors`}
            >
              Courses
            </Link>
            <Link 
              to="/my-learning" 
              className={`${isActive('/my-learning') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'} transition-colors`}
            >
              My Learning
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
              <Input 
                type="search" 
                placeholder="Search for courses..." 
                className="pl-10"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="size-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="size-5" />
            </Button>
            <Button>Sign In</Button>
          </div>

          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="size-6" />
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col gap-4">
              <Link 
                to="/" 
                className={`${isActive('/') ? 'text-blue-600' : 'text-gray-700'} px-4 py-2`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/courses" 
                className={`${isActive('/courses') ? 'text-blue-600' : 'text-gray-700'} px-4 py-2`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Courses
              </Link>
              <Link 
                to="/my-learning" 
                className={`${isActive('/my-learning') ? 'text-blue-600' : 'text-gray-700'} px-4 py-2`}
                onClick={() => setMobileMenuOpen(false)}
              >
                My Learning
              </Link>
              <div className="px-4">
                <Input type="search" placeholder="Search courses..." />
              </div>
              <div className="px-4">
                <Button className="w-full">Sign In</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
