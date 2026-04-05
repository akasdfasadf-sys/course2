import { Link } from 'react-router';
import { BookOpen, Search, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/home" className="flex items-center gap-2">
            <div className="bg-blue-600 text-white p-2 rounded-lg">
              <BookOpen className="w-6 h-6" />
            </div>
            <span className="text-xl font-semibold">Bilim Merkezi</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link to="/home" className="text-gray-700 hover:text-blue-600 transition-colors">
              Baş sahypa
            </Link>
            <Link to="/courses" className="text-gray-700 hover:text-blue-600 transition-colors">
              Kurslar
            </Link>
            <Link to="/my-learning" className="text-gray-700 hover:text-blue-600 transition-colors">
              Meniň kurslarym
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-sm text-gray-700">
              <User className="w-4 h-4" />
              <span>{user?.firstName} {user?.lastName}</span>
            </div>
            <button 
              onClick={logout}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              title="Çykyş"
            >
              <LogOut className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}