import { useState } from 'react';
import { motion } from 'motion/react';
import { Briefcase, Users, CheckCircle, Clock, Plus, Search, Filter, TrendingUp } from 'lucide-react';

export default function RecruiterDashboard() {
  const [activeTab, setActiveTab] = useState('jobs');

  return (
    <div className="space-y-12">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Recruiter Dashboard</h1>
          <p className="text-slate-500 text-lg">Manage your job postings and candidate pipeline.</p>
        </div>
        <button className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 flex items-center gap-3">
          <Plus className="w-6 h-6" />
          Post New Job
        </button>
      </header>

      <div className="grid lg:grid-cols-4 gap-8">
        <StatCard icon={<Briefcase className="text-blue-600" />} label="Active Jobs" value="8" color="bg-blue-50" />
        <StatCard icon={<Users className="text-purple-600" />} label="Total Applicants" value="156" color="bg-purple-50" />
        <StatCard icon={<CheckCircle className="text-green-600" />} label="Shortlisted" value="24" color="bg-green-50" />
        <StatCard icon={<Clock className="text-orange-600" />} label="Interviews" value="12" color="bg-orange-50" />
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="flex border-b border-slate-100 p-2">
          <TabButton active={activeTab === 'jobs'} onClick={() => setActiveTab('jobs')} label="Job Postings" />
          <TabButton active={activeTab === 'candidates'} onClick={() => setActiveTab('candidates')} label="Candidate Pipeline" />
        </div>

        <div className="p-8">
          {activeTab === 'jobs' ? (
            <div className="space-y-6">
              <JobRow title="Senior Java Developer" applicants={42} status="Active" date="Posted 3 days ago" />
              <JobRow title="Frontend Intern" applicants={112} status="Active" date="Posted 1 week ago" />
              <JobRow title="Product Designer" applicants={12} status="Closed" date="Closed 2 days ago" />
            </div>
          ) : (
            <div className="space-y-6">
              <CandidateRow name="Nguyen Quang Hieu" role="Java Developer" score={94} status="Shortlisted" />
              <CandidateRow name="Le Van A" role="Frontend Intern" score={88} status="Interviewing" />
              <CandidateRow name="Tran Thi B" role="Product Designer" score={72} status="Pending" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color }: { icon: React.ReactNode, label: string, value: string, color: string }) {
  return (
    <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-6">
      <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center`}>
        {icon}
      </div>
      <div>
        <p className="text-slate-500 text-sm font-medium uppercase tracking-widest">{label}</p>
        <p className="text-3xl font-bold text-slate-900">{value}</p>
      </div>
    </div>
  );
}

function TabButton({ active, onClick, label }: { active: boolean, onClick: () => void, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`px-8 py-4 font-bold text-sm transition-all rounded-2xl ${
        active ? 'bg-blue-50 text-blue-600' : 'text-slate-400 hover:text-slate-600'
      }`}
    >
      {label}
    </button>
  );
}

function JobRow({ title, applicants, status, date }: { title: string, applicants: number, status: string, date: string }) {
  return (
    <div className="flex items-center justify-between p-6 rounded-3xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100">
      <div className="flex items-center gap-6">
        <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center font-bold text-slate-400">
          {title[0]}
        </div>
        <div>
          <p className="font-bold text-slate-900 text-lg">{title}</p>
          <p className="text-sm text-slate-500 font-medium">{date} &bull; {applicants} applicants</p>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${
          status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'
        }`}>
          {status}
        </span>
        <button className="text-blue-600 font-bold text-sm hover:underline">View Details</button>
      </div>
    </div>
  );
}

function CandidateRow({ name, role, score, status }: { name: string, role: string, score: number, status: string }) {
  return (
    <div className="flex items-center justify-between p-6 rounded-3xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100">
      <div className="flex items-center gap-6">
        <div className="w-14 h-14 bg-slate-200 rounded-full overflow-hidden">
          <img src={`https://i.pravatar.cc/150?u=${name}`} alt={name} referrerPolicy="no-referrer" />
        </div>
        <div>
          <p className="font-bold text-slate-900 text-lg">{name}</p>
          <p className="text-sm text-slate-500 font-medium">{role}</p>
        </div>
      </div>
      <div className="flex items-center gap-8">
        <div className="text-center">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Match Score</p>
          <p className={`font-bold ${score > 90 ? 'text-green-600' : 'text-blue-600'}`}>{score}%</p>
        </div>
        <span className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs font-bold">
          {status}
        </span>
        <button className="px-6 py-2 bg-white border-2 border-slate-200 rounded-xl font-bold text-sm hover:border-blue-600 hover:text-blue-600 transition-all">
          Review CV
        </button>
      </div>
    </div>
  );
}
