import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Briefcase, FileText, MessageSquare, Sparkles, TrendingUp, Users } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 lg:pt-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-semibold tracking-wide uppercase">
              <Sparkles className="w-4 h-4" />
              AI-Powered Career Readiness
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 leading-[1.1] tracking-tight">
              Nền tảng <span className="text-blue-600">Website</span> Tư vấn Nghề nghiệp AI
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed max-w-xl">
              CareerMate Website giúp sinh viên và người mới đi làm định hướng sự nghiệp thông qua phân tích CV bằng AI, lộ trình học tập cá nhân hóa và kết nối việc làm thông minh.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/login" 
                className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
              >
                Start Your Journey
              </Link>
              <Link 
                to="/jobs" 
                className="px-8 py-4 bg-white text-slate-700 border-2 border-slate-200 rounded-xl font-bold text-lg hover:border-blue-600 hover:text-blue-600 transition-all"
              >
                Explore Jobs
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-blue-600/5 rounded-3xl blur-3xl -z-10"></div>
            <img 
              src="https://picsum.photos/seed/career/800/600" 
              alt="Career Growth" 
              className="rounded-3xl shadow-2xl border-8 border-white"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <TrendingUp className="text-green-600 w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Job Match Rate</p>
                <p className="text-2xl font-bold text-slate-900">94%</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">Everything you need to land your dream job</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">Our platform leverages cutting-edge AI to bridge the gap between your current skills and employer requirements.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<FileText className="w-6 h-6 text-blue-600" />}
            title="AI CV Analyzer"
            description="Upload your resume and get instant, detailed feedback on how to improve it for ATS and recruiters."
            link="/cv-analyzer"
          />
          <FeatureCard 
            icon={<MessageSquare className="w-6 h-6 text-purple-600" />}
            title="Career AI Coach"
            description="Chat with our AI expert for career consultation, skill recommendations, and mock interview practice."
            link="/career-coach"
          />
          <FeatureCard 
            icon={<Briefcase className="w-6 h-6 text-orange-600" />}
            title="Jobs Marketplace"
            description="Find entry-level jobs and internships that perfectly match your skills and career goals."
            link="/jobs"
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-slate-900 rounded-[3rem] p-12 lg:p-24 text-white">
        <div className="grid md:grid-cols-4 gap-12 text-center">
          <StatItem value="10k+" label="Active Students" />
          <StatItem value="500+" label="Partner Companies" />
          <StatItem value="25k+" label="AI CVs Analyzed" />
          <StatItem value="15k+" label="Successful Placements" />
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description, link }: { icon: React.ReactNode, title: string, description: string, link: string }) {
  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all space-y-6"
    >
      <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-900">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{description}</p>
      <Link to={link} className="inline-flex items-center text-blue-600 font-bold hover:gap-2 transition-all">
        Learn more <span>&rarr;</span>
      </Link>
    </motion.div>
  );
}

function StatItem({ value, label }: { value: string, label: string }) {
  return (
    <div className="space-y-2">
      <p className="text-4xl lg:text-5xl font-bold tracking-tighter">{value}</p>
      <p className="text-slate-400 font-medium uppercase tracking-widest text-xs">{label}</p>
    </div>
  );
}
