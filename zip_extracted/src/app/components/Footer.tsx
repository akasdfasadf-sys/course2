import { Link } from 'react-router';
import { BookOpen, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-blue-600 p-2 rounded-lg">
                <BookOpen className="size-6 text-white" />
              </div>
              <span className="font-bold text-xl text-white">LearnHub</span>
            </div>
            <p className="text-sm mb-4">
              Empowering learners worldwide with high-quality online courses and expert instructors.
            </p>
            <div className="flex gap-3">
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Facebook className="size-5" />
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Twitter className="size-5" />
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Instagram className="size-5" />
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Linkedin className="size-5" />
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Youtube className="size-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
              <li><Link to="/courses" className="hover:text-blue-400 transition-colors">All Courses</Link></li>
              <li><Link to="/my-learning" className="hover:text-blue-400 transition-colors">My Learning</Link></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Become an Instructor</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-white mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Web Development</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Data Science</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Design</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Business</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>&copy; 2026 LearnHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
