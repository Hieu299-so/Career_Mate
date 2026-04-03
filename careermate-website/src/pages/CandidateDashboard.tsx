import { useAuth } from '../App';
import { motion } from 'motion/react';
import { FileText, MessageSquare, Briefcase, TrendingUp, CheckCircle, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CandidateDashboard() {
  const { profile } = useAuth();

  return (
    <div className="space-y-12">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Welcome back, {profile?.displayName?.split(' ')[0]}! 👋</h1>
          <p className="text-slate-500 text-lg">Here's what's happening with your career journey.</p>
        </div>
        <div className="flex gap-4">
          <Link to="/cv-analyzer" className="px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Analyze CV
          </Link>
          <Link to="/career-coach" className="px-6 py-3 bg-white text-slate-700 border-2 border-slate-200 rounded-2xl font-bold hover:border-blue-600 hover:text-blue-600 transition-all flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            AI Coach
          </Link>
        </div>
      </header>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Stats */}
        <div className="lg:col-span-2 grid sm:grid-cols-3 gap-6">
          <StatCard icon={<Briefcase className="text-blue-600" />} label="Applied Jobs" value="12" color="bg-blue-50" />
          <StatCard icon={<CheckCircle className="text-green-600" />} label="Shortlisted" value="4" color="bg-green-50" />
          <StatCard icon={<Clock className="text-orange-600" />} label="Pending" value="8" color="bg-orange-50" />
        </div>

        {/* Profile Completion */}
        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900">Profile Completion</h3>
            <span className="text-blue-600 font-bold">85%</span>
          </div>
          <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '85%' }}
              className="h-full bg-blue-600 rounded-full"
            />
          </div>
          <ul className="space-y-4">
            <li className="flex items-center gap-3 text-sm text-slate-600">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Upload CV
            </li>
            <li className="flex items-center gap-3 text-sm text-slate-600">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Add Skills
            </li>
            <li className="flex items-center gap-3 text-sm text-slate-600">
              <Clock className="w-4 h-4 text-orange-500" />
              Complete Bio
            </li>
          </ul>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Applications */}
        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900">Recent Applications</h3>
            <Link to="/jobs" className="text-blue-600 font-bold text-sm hover:underline">View all</Link>
          </div>
          <div className="space-y-6">
            <ApplicationItem company="Google" role="Software Engineer Intern" status="Shortlisted" date="2 days ago" />
            <ApplicationItem company="Meta" role="Frontend Developer" status="Pending" date="5 days ago" />
            <ApplicationItem company="Amazon" role="Cloud Architect" status="Reviewed" date="1 week ago" />
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="bg-slate-900 p-8 rounded-[2rem] text-white space-y-8">
          <div className="flex items-center gap-3">
            <TrendingUp className="text-blue-400 w-6 h-6" />
            <h3 className="text-xl font-bold">AI Career Insights</h3>
          </div>
          <div className="space-y-6">
            <div className="p-6 bg-white/5 rounded-2xl border border-white/10 space-y-2">
              <p className="font-bold text-blue-400">Skill Gap Detected</p>
              <p className="text-slate-400 text-sm leading-relaxed">
                Based on your target role as a "Full Stack Developer", we recommend learning **GraphQL** and **Docker** to increase your match score by 15%.
              </p>
            </div>
            <div className="p-6 bg-white/5 rounded-2xl border border-white/10 space-y-2">
              <p className="font-bold text-purple-400">Next Step Recommendation</p>
              <p className="text-slate-400 text-sm leading-relaxed">
                Your CV is strong in React! Try our **Mock Interview** module to practice behavioral questions for top tech companies.
              </p>
            </div>
          </div>
          <Link to="/career-coach" className="w-full py-4 bg-blue-600 rounded-xl font-bold text-center block hover:bg-blue-700 transition-all">
            Open AI Coach
          </Link>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color }: { icon: React.ReactNode, label: string, value: string, color: string }) {
  return (
    <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-6">
      <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center`}>
        {icon}
      </div>
      <div>
        <p className="text-slate-500 text-sm font-medium">{label}</p>
        <p className="text-2xl font-bold text-slate-900">{value}</p>
      </div>
    </div>
  );
}

function ApplicationItem({ company, role, status, date }: { company: string, role: string, status: string, date: string }) {
  const statusColors: any = {
    'Shortlisted': 'bg-green-100 text-green-700',
    'Pending': 'bg-orange-100 text-orange-700',
    'Reviewed': 'bg-blue-100 text-blue-700',
  };

  return (
    <div className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center font-bold text-slate-400">
          {company[0]}
        </div>
        <div>
          <p className="font-bold text-slate-900">{role}</p>
          <p className="text-sm text-slate-500">{company} &bull; {date}</p>
        </div>
      </div>
      <span className={`px-4 py-1 rounded-full text-xs font-bold ${statusColors[status]}`}>
        {status}
      </span>
    </div>
  );
}
