import { useState, useEffect } from 'react';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { motion } from 'motion/react';
import { Search, MapPin, Briefcase, DollarSign, Filter, Sparkles, TrendingUp, CheckCircle, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  description: string;
  requirements: string;
  status: string;
  createdAt: string;
  matchScore?: number;
}

export default function JobMarketplace() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('/api/jobs');
        if (response.ok) {
          const jobsData = await response.json();
          if (jobsData.length > 0) {
            setJobs(jobsData);
            setSelectedJob(jobsData[0]);
          } else {
            // Fallback mock data if SQL is empty
            const mockJobs: Job[] = [
              {
                id: '1',
                title: 'Frontend Developer Intern',
                company: 'TechFlow Solutions',
                location: 'Ho Chi Minh City, VN',
                salary: '$500 - $800',
                description: 'We are looking for a passionate Frontend Developer Intern to join our team. You will work with React, Tailwind CSS, and modern web technologies.',
                requirements: 'Knowledge of React, HTML, CSS, and JavaScript. Good communication skills.',
                status: 'open',
                createdAt: new Date().toISOString(),
                matchScore: 92
              }
            ];
            setJobs(mockJobs);
            setSelectedJob(mockJobs[0]);
          }
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-12">
      <header className="text-center space-y-6">
        <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">Find your next <span className="text-blue-600">career move</span></h1>
        <div className="max-w-2xl mx-auto relative group">
          <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
            <Search className="w-6 h-6 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
          </div>
          <input 
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by job title, company, or keywords..."
            className="w-full py-5 pl-16 pr-8 bg-white border-2 border-slate-100 rounded-[2rem] focus:border-blue-600 focus:ring-0 transition-all text-lg font-medium shadow-xl shadow-slate-100"
          />
        </div>
      </header>

      <div className="grid lg:grid-cols-12 gap-8 h-[calc(100vh-24rem)]">
        {/* Job List */}
        <div className="lg:col-span-5 overflow-y-auto pr-4 space-y-4 scrollbar-hide">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <motion.div 
                key={job.id}
                whileHover={{ x: 4 }}
                onClick={() => setSelectedJob(job)}
                className={`p-6 rounded-3xl border-2 cursor-pointer transition-all space-y-4 ${
                  selectedJob?.id === job.id 
                    ? 'bg-blue-50 border-blue-600 shadow-lg shadow-blue-100' 
                    : 'bg-white border-slate-100 hover:border-blue-200'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center font-bold text-slate-400 border border-slate-100 shadow-sm">
                      {job.company[0]}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg">{job.title}</h3>
                      <p className="text-slate-500 font-medium">{job.company}</p>
                    </div>
                  </div>
                  {job.matchScore && (
                    <div className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-bold flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      {job.matchScore}% Match
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-slate-500 font-medium">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <DollarSign className="w-4 h-4" />
                    {job.salary}
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-24 space-y-4">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto">
                <Search className="w-8 h-8 text-slate-300" />
              </div>
              <p className="text-slate-400 font-bold">No jobs found matching your search.</p>
            </div>
          )}
        </div>

        {/* Job Detail */}
        <div className="lg:col-span-7 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-y-auto scrollbar-hide">
          {selectedJob ? (
            <div className="p-10 space-y-10">
              <header className="space-y-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center font-bold text-3xl text-slate-300 border border-slate-100">
                      {selectedJob.company[0]}
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{selectedJob.title}</h2>
                      <p className="text-xl text-slate-500 font-medium">{selectedJob.company}</p>
                    </div>
                  </div>
                  <button className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
                    Apply Now
                  </button>
                </div>
                <div className="flex flex-wrap gap-6 p-6 bg-slate-50 rounded-3xl border border-slate-100">
                  <DetailItem icon={<MapPin className="w-5 h-5" />} label="Location" value={selectedJob.location} />
                  <DetailItem icon={<DollarSign className="w-5 h-5" />} label="Salary" value={selectedJob.salary} />
                  <DetailItem icon={<Clock className="w-5 h-5" />} label="Posted" value="2 days ago" />
                  <DetailItem icon={<Briefcase className="w-5 h-5" />} label="Type" value="Full-time" />
                </div>
              </header>

              <div className="space-y-8">
                <section className="space-y-4">
                  <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    Job Description
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-lg">
                    {selectedJob.description}
                  </p>
                </section>

                <section className="space-y-4">
                  <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    Requirements
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-lg whitespace-pre-line">
                    {selectedJob.requirements}
                  </p>
                </section>
              </div>

              <div className="pt-10 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                        <img src={`https://i.pravatar.cc/150?u=${i}`} alt="User" referrerPolicy="no-referrer" />
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-slate-500 font-medium">12 people from your university applied</p>
                </div>
                <button className="text-slate-400 hover:text-blue-600 font-bold text-sm transition-colors">
                  Save for later
                </button>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-12 space-y-6">
              <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center">
                <Briefcase className="w-12 h-12 text-slate-200" />
              </div>
              <p className="text-xl font-bold text-slate-300">Select a job to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function DetailItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="text-blue-600">{icon}</div>
      <div>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{label}</p>
        <p className="text-slate-700 font-bold">{value}</p>
      </div>
    </div>
  );
}
