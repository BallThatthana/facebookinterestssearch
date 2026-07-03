import { useState } from 'react';
import './index.css';
import SearchBar from './../src/assets/components/searchBar';

function App() {
  // State lifted or synced to display localized workflow advice
  const [activeVector, setActiveVector] = useState('adinterest');

  // Contextual tips dictionary matching your SearchBar tool vectors
  const toolGuides = {
    adinterest: {
      title: "Core Interests Mining",
      badge: "Scale Audience",
      desc: "Bypasses the standard Meta Ads Manager interface limit of 25-30 results. It returns hundreds of deep semantic niches, complete with their exact upper-bound audience sizes so you can group low-competition ad sets together.",
      steps: ["Type a broad industry term (e.g., 'Fitness').", "Review sizes and click 'Find Related' to dig into hidden branches.", "Copy names straight into your campaign targeting mix."]
    },
    adjobtitle: {
      title: "B2B Job Title Mapping",
      badge: "Laser Intent",
      desc: "Perfect for account-based marketing (ABM) and hyper-specific B2B offers. This pulls registered professional designations directly from user profiles, returning valid API IDs that bypass noisy keyword matching.",
      steps: ["Input standard professions or seniority words ('Manager', 'Surgeon').", "Isolate accurate target roles without general consumer spillover.", "Use the unique ID strings for pristine target definitions."]
    },
    adeducationmajor: {
      title: "Academic Focus Discovery",
      badge: "Demographic Core",
      desc: "Isolates university majors, degrees, and core fields of study. Highly effective for life-event marketing, student-tier validation, certification courses, and specialized recruitment streams.",
      steps: ["Query general academic vectors ('Bio', 'Finance', 'Law').", "Extract precise student streams that standard interest boxes miss.", "Build demographic stacks utilizing the verified Graph IDs."]
    },
    adinterestvalid: {
      title: "Real-Time Parameter Validation",
      badge: "API Sanity Check",
      desc: "Avoid broken campaigns or dead targeting structures. Run exact phrase matches directly against Meta’s active code architecture to ensure your selected terms are structurally valid, active, and currently billable.",
      steps: ["Input exact targeting strings you intend to deploy.", "Verify the status marker returns a green 'Valid' response.", "Confirm names match syntax precisely before uploading ad copies."]
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-800 font-sans flex flex-col items-center">
      
      {/* Google Tag Manager (noscript) */}
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-TT4M9TR"
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        ></iframe>
      </noscript>
      
      {/* 1. Sleek Top Navigation Bar */}
      <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/assets/images.png" alt="Logo" className="w-8 h-8 rounded" />
            <span className="text-base sm:text-lg md:text-xl font-extrabold text-slate-900 tracking-tight">
              Meta InterestExplorer
            </span>
          </div>
          <a 
            href="https://bonthatthana.netlify.app" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            By Bon Thatthana
          </a>
        </div>
      </header>

      {/* Main Content Workspace */}
      <main className="flex-grow w-full max-w-4xl mx-auto px-4 py-12 flex flex-col items-center">
        
        {/* 2. SaaS-Style Hero Section */}
        <div className="text-center max-w-2xl mb-10">
          <div className="inline-flex items-center justify-center px-3 py-1 mb-5 text-xs font-bold tracking-widest uppercase text-indigo-700 bg-indigo-100 rounded-full border border-indigo-200">
            Enterprise Marketing Suite
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-5">
            Target the audiences <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">competitors miss.</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-light">
            Stop competing for the same oversaturated default suggestions. Tap directly into the Meta Graph API to reveal hidden, low-competition targeting matrices across interests, job roles, and academics globally.
          </p>
        </div>

        {/* 3. The Core App Container */}
        <div className="w-full bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-6 sm:p-10 mb-8 relative z-10">
          {/* We pass setActiveVector down so the landing page knows what instructions to render */}
          <SearchBar onVectorChange={setActiveVector} />
        </div>

        {/* 4. Contextual Instructions & Tool Guide Panel */}
        <div className="w-full bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm mb-8 transition-all duration-300">
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <span className="text-xl">💡</span>
              <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                Tool Guide: {toolGuides[activeVector].title}
              </h3>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-md border border-indigo-100 uppercase tracking-wider">
              {toolGuides[activeVector].badge}
            </span>
          </div>
          
          <p className="text-sm text-slate-600 leading-relaxed mb-6">
            {toolGuides[activeVector].desc}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {toolGuides[activeVector].steps.map((step, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex gap-3 items-start">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-600 text-white font-mono text-xs font-bold flex items-center justify-center">
                  {idx + 1}
                </span>
                <span className="text-xs text-slate-700 leading-relaxed font-medium">
                  {step}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Educational Callout Box */}
        <div className="w-full bg-blue-50/50 border border-blue-100 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-start shadow-inner">
          <div className="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shadow-sm">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-2 tracking-tight">The "Hidden Interest" Advantage</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              When advertisers search for targeting profiles in the native Meta Ads Manager UI, the dashboard caps options to ~25 competitive results. This tool makes raw server requests to bypass those UI constraints, surfacing thousands of hyper-specific parameters that drive down your Cost Per Click (CPC) and dramatically increase conversion relevance.
            </p>
          </div>
        </div>

      </main>

      {/* 6. Minimalist Footer */}
      <footer className="w-full border-t border-slate-200 bg-white py-8 mt-auto">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} <a href="https://bonthatthana.netlify.app" target='_blank' rel="noopener noreferrer" className="font-semibold hover:text-indigo-600 transition-colors">Bon Thatthana</a>. Engineered with React, Meta Graph Developer Sandbox & Tailwind CSS.
          </p>
        </div>
      </footer>
      
    </div>
  );
}

export default App;