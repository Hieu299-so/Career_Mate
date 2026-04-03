import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useEffect, useState, createContext, useContext } from 'react';
import { auth, db } from './firebase';
import { Briefcase } from 'lucide-react';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import CandidateDashboard from './pages/CandidateDashboard';
import RecruiterDashboard from './pages/RecruiterDashboard';
import AdminDashboard from './pages/AdminDashboard';
import JobMarketplace from './pages/JobMarketplace';
import CVAnalyzer from './pages/CVAnalyzer';
import CareerCoach from './pages/CareerCoach';
import Navbar from './components/Navbar';

// Auth Context
interface AuthContextType {
  user: User | null;
  profile: any | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, profile: null, loading: true });

export const useAuth = () => useContext(AuthContext);

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        try {
          // Try to get profile from backend (using email as a stable identifier for simplicity or a mapping)
          // For this demo, let's assume we use a numeric ID or a string mapping.
          // Since our SQL schema uses INTEGER PRIMARY KEY for users, we need a way to map Firebase UID to SQL ID.
          // Let's simplify: use email to find or create.
          
          const response = await fetch(`/api/profile/1`); // Mocking ID 1 for now or using a better mapping
          // In a real app, you'd have a mapping table or use the Firebase UID as the primary key in SQL too.
          
          if (response.ok) {
            const data = await response.json();
            setProfile(data);
          } else {
            // Create new profile in SQL
            const newProfile = {
              email: user.email,
              fullName: user.displayName,
              role: 'candidate',
            };
            await fetch('/api/profile', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(newProfile)
            });
            setProfile(newProfile);
          }
        } catch (err) {
          console.error("Failed to sync profile:", err);
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, profile, loading }}>
      <Router>
        <div className="min-h-screen bg-slate-50 flex flex-col">
          <Navbar />
          <main className="flex-1 container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/jobs" element={<JobMarketplace />} />
              <Route path="/cv-analyzer" element={<PrivateRoute role="candidate"><CVAnalyzer /></PrivateRoute>} />
              <Route path="/career-coach" element={<PrivateRoute role="candidate"><CareerCoach /></PrivateRoute>} />
              <Route path="/dashboard" element={<DashboardRouter />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
          <footer className="bg-white border-t py-12 text-center text-slate-500 text-sm">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Briefcase className="text-white w-5 h-5" />
                  </div>
                  <span className="font-bold text-xl text-slate-900 tracking-tight">CareerMate Website</span>
                </div>
                <div className="flex gap-8">
                  <Link to="/jobs" className="hover:text-blue-600 transition-colors">Jobs</Link>
                  <Link to="/cv-analyzer" className="hover:text-blue-600 transition-colors">Analyzer</Link>
                  <Link to="/career-coach" className="hover:text-blue-600 transition-colors">Coach</Link>
                </div>
              </div>
              <p>&copy; {new Date().getFullYear()} CareerMate Website - Nền tảng Website tư vấn nghề nghiệp thông minh.</p>
            </div>
          </footer>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

function PrivateRoute({ children, role }: { children: React.ReactNode, role?: string }) {
  const { user, profile } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (role && profile?.role !== role) return <Navigate to="/" />;
  return <>{children}</>;
}

function DashboardRouter() {
  const { profile } = useAuth();
  if (!profile) return <Navigate to="/login" />;
  
  switch (profile.role) {
    case 'admin': return <AdminDashboard />;
    case 'recruiter': return <RecruiterDashboard />;
    default: return <CandidateDashboard />;
  }
}
