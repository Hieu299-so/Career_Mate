import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { useAuth } from '../App';
import { LogOut, User, Briefcase, FileText, MessageSquare, Shield } from 'lucide-react';

export default function Navbar() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/');
  };

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Briefcase className="text-white w-5 h-5" />
          </div>
          <span className="font-bold text-xl text-slate-900 tracking-tight">CareerMate Website</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link to="/jobs" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Jobs</Link>
          {profile?.role === 'candidate' && (
            <>
              <Link to="/cv-analyzer" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">CV Analyzer</Link>
              <Link to="/career-coach" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">AI Coach</Link>
            </>
          )}
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <Link to="/dashboard" className="flex items-center gap-2 text-slate-700 hover:text-blue-600 font-medium">
                {profile?.role === 'admin' ? <Shield className="w-4 h-4" /> : <User className="w-4 h-4" />}
                <span className="hidden sm:inline">{profile?.displayName || 'Dashboard'}</span>
              </Link>
              <button 
                onClick={handleLogout}
                className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-all"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <Link 
              to="/login" 
              className="px-5 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-all shadow-sm"
            >
              Get Started
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
