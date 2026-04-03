import { useState } from 'react';
import { motion } from 'motion/react';
import { FileText, Sparkles, CheckCircle, AlertCircle, TrendingUp, Upload, Loader2 } from 'lucide-react';
import { analyzeCV } from '../services/gemini';
import { useAuth } from '../App';

export default function CVAnalyzer() {
  const [cvText, setCvText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const { profile } = useAuth();

  const handleAnalyze = async () => {
    if (!cvText.trim() || !profile?.uid) return;
    setIsAnalyzing(true);
    try {
      const analysis = await analyzeCV(profile.uid, cvText);
      setResult(analysis);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      <header className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-bold tracking-wide uppercase">
          <Sparkles className="w-4 h-4" />
          AI-Powered Analysis
        </div>
        <h1 className="text-4xl font-bold text-slate-900 tracking-tight">AI CV Analyzer</h1>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
          Paste your CV text below to get instant feedback on your resume's strengths, weaknesses, and improvement areas.
        </p>
      </header>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Input Section */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                Your CV Content
              </h3>
              <span className="text-xs text-slate-400 font-medium uppercase tracking-widest">Text Format</span>
            </div>
            <textarea 
              value={cvText}
              onChange={(e) => setCvText(e.target.value)}
              placeholder="Paste your CV text here..."
              className="w-full h-96 p-6 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-600 focus:ring-0 transition-all text-slate-700 leading-relaxed resize-none"
            />
            <button 
              onClick={handleAnalyze}
              disabled={isAnalyzing || !cvText.trim()}
              className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  Analyzing your CV...
                </>
              ) : (
                <>
                  <Sparkles className="w-6 h-6" />
                  Analyze Now
                </>
              )}
            </button>
          </div>
        </div>

        {/* Result Section */}
        <div className="space-y-8">
          {result ? (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              {/* Score Card */}
              <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between">
                <div className="space-y-2">
                  <h3 className="font-bold text-slate-900">Overall Score</h3>
                  <p className="text-slate-500 text-sm">Based on industry standards</p>
                </div>
                <div className="relative w-24 h-24 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90">
                    <circle 
                      cx="48" cy="48" r="40" 
                      className="stroke-slate-100 fill-none" 
                      strokeWidth="8" 
                    />
                    <circle 
                      cx="48" cy="48" r="40" 
                      className="stroke-blue-600 fill-none" 
                      strokeWidth="8" 
                      strokeDasharray={251.2}
                      strokeDashoffset={251.2 - (251.2 * result.score) / 100}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute text-2xl font-bold text-slate-900">{result.score}%</span>
                </div>
              </div>

              {/* Strengths & Weaknesses */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-green-50 p-6 rounded-3xl border border-green-100 space-y-4">
                  <h4 className="font-bold text-green-800 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Strengths
                  </h4>
                  <ul className="space-y-2">
                    {result.strengths.map((s: string, i: number) => (
                      <li key={i} className="text-sm text-green-700 flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 bg-green-400 rounded-full shrink-0" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-red-50 p-6 rounded-3xl border border-red-100 space-y-4">
                  <h4 className="font-bold text-red-800 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Weaknesses
                  </h4>
                  <ul className="space-y-2">
                    {result.weaknesses.map((w: string, i: number) => (
                      <li key={i} className="text-sm text-red-700 flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 bg-red-400 rounded-full shrink-0" />
                        {w}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-6">
                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  AI Recommendations
                </h3>
                <div className="space-y-4">
                  {result.recommendations.map((r: string, i: number) => (
                    <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-sm text-slate-700 leading-relaxed">
                      {r}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-12 border-4 border-dashed border-slate-100 rounded-[3rem] space-y-6">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center">
                <Upload className="w-10 h-10 text-slate-300" />
              </div>
              <div className="space-y-2">
                <p className="text-xl font-bold text-slate-400 tracking-tight">No Analysis Yet</p>
                <p className="text-slate-400 text-sm max-w-xs">
                  Paste your CV content on the left and click "Analyze Now" to see the magic happen.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
