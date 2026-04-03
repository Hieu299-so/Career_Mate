import { useState } from 'react';
import { Shield, Users, Briefcase, FileText, Settings, AlertCircle, CheckCircle, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-12">
      <header className="flex items-center gap-6">
        <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center shadow-xl shadow-slate-200">
          <Shield className="text-white w-8 h-8" />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Admin Control Center</h1>
          <p className="text-slate-500 text-lg font-medium">System monitoring and management.</p>
        </div>
      </header>

      <div className="grid lg:grid-cols-4 gap-8">
        <StatCard icon={<Users className="text-blue-600" />} label="Total Users" value="1,248" />
        <StatCard icon={<Briefcase className="text-purple-600" />} label="Active Jobs" value="342" />
        <StatCard icon={<FileText className="text-green-600" />} label="CVs Analyzed" value="5,892" />
        <StatCard icon={<TrendingUp className="text-orange-600" />} label="Monthly Growth" value="+24%" />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* System Health */}
        <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-10">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight">System Health</h3>
            <span className="px-4 py-1.5 bg-green-50 text-green-600 rounded-full text-xs font-bold flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              All Systems Operational
            </span>
          </div>
          
          <div className="space-y-8">
            <HealthItem label="AI Service (Gemini)" status="Healthy" latency="1.2s" />
            <HealthItem label="Database (Firestore)" status="Healthy" latency="45ms" />
            <HealthItem label="Auth Service" status="Healthy" latency="120ms" />
            <HealthItem label="Storage API" status="Healthy" latency="240ms" />
          </div>
        </div>

        {/* Recent Alerts */}
        <div className="bg-slate-900 p-10 rounded-[3rem] text-white space-y-10">
          <h3 className="text-2xl font-bold tracking-tight flex items-center gap-3">
            <AlertCircle className="text-orange-400 w-6 h-6" />
            Security Alerts
          </h3>
          <div className="space-y-6">
            <AlertItem title="New Recruiter Signup" desc="TechCorp requested verification" time="2m ago" type="info" />
            <AlertItem title="High Traffic Warning" desc="CV Analyzer usage spiked" time="15m ago" type="warning" />
            <AlertItem title="System Update" desc="V2.4.0 deployed successfully" time="1h ago" type="success" />
          </div>
          <button className="w-full py-4 bg-white/10 hover:bg-white/20 rounded-2xl font-bold transition-all border border-white/10">
            View All Logs
          </button>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-4">
      <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center">
        {icon}
      </div>
      <div>
        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{label}</p>
        <p className="text-3xl font-bold text-slate-900 tracking-tight">{value}</p>
      </div>
    </div>
  );
}

function HealthItem({ label, status, latency }: { label: string, status: string, latency: string }) {
  return (
    <div className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-100">
      <div className="flex items-center gap-4">
        <div className="w-3 h-3 bg-green-500 rounded-full shadow-[0_0_12px_rgba(34,197,94,0.5)]" />
        <p className="font-bold text-slate-700">{label}</p>
      </div>
      <div className="flex items-center gap-6">
        <span className="text-slate-400 font-medium text-sm">{latency}</span>
        <span className="text-green-600 font-bold text-sm">{status}</span>
      </div>
    </div>
  );
}

function AlertItem({ title, desc, time, type }: { title: string, desc: string, time: string, type: string }) {
  const colors: any = {
    info: 'bg-blue-400',
    warning: 'bg-orange-400',
    success: 'bg-green-400',
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${colors[type]}`} />
          <p className="font-bold text-sm">{title}</p>
        </div>
        <span className="text-[10px] text-slate-500 font-bold uppercase">{time}</span>
      </div>
      <p className="text-xs text-slate-400 leading-relaxed pl-4">{desc}</p>
    </div>
  );
}
