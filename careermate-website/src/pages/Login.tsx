import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { motion } from 'motion/react';
import { Briefcase, Chrome } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-12 rounded-[3rem] shadow-2xl border border-slate-100 max-w-md w-full text-center space-y-10"
      >
        <div className="mx-auto w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200">
          <Briefcase className="text-white w-8 h-8" />
        </div>
        
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Welcome Back</h1>
          <p className="text-slate-500 leading-relaxed">
            Join thousands of students and recruiters on CareerMate.
          </p>
        </div>

        <div className="space-y-4">
          <button 
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-4 py-4 px-6 bg-white border-2 border-slate-200 rounded-2xl font-bold text-slate-700 hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50 transition-all group"
          >
            <Chrome className="w-6 h-6 text-slate-400 group-hover:text-blue-600 transition-colors" />
            Continue with Google
          </button>
          
          <p className="text-xs text-slate-400 px-8">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>

        <div className="pt-8 border-t border-slate-100">
          <p className="text-sm text-slate-500">
            Are you a recruiter? <span className="text-blue-600 font-bold cursor-pointer hover:underline">Contact us</span> for an enterprise account.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
