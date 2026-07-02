import { useState } from 'react';

function SearchBar({ onVectorChange }) {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [searched, setSearched] = useState(false);
  const [locale, setLocale] = useState('en_US');
  const [searchType, setSearchType] = useState('adinterest');
  const [visibleCount, setVisibleCount] = useState(10);
  const [activeParent, setActiveParent] = useState(null);

  const apiToken = import.meta.env.VITE_FB_TOKEN;

  // Fully expanded global market language map supported by Facebook Graph API
  const languageOptions = [
    { name: 'English (US/Global)', code: 'en_US' },
    { name: 'English (UK)', code: 'en_GB' },
    { name: 'Español (Spanish)', code: 'es_ES' },
    { name: 'Español (Latin America)', code: 'es_LA' },
    { name: 'Português (Portuguese - Brazil)', code: 'pt_BR' },
    { name: 'Português (Portuguese - Portugal)', code: 'pt_PT' },
    { name: 'Français (French)', code: 'fr_FR' },
    { name: 'Deutsch (German)', code: 'de_DE' },
    { name: 'Italiano (Italian)', code: 'it_IT' },
    { name: 'Nederlands (Dutch)', code: 'nl_NL' },
    { name: 'Türkçe (Turkish)', code: 'tr_TR' },
    { name: 'Polski (Polish)', code: 'pl_PL' },
    { name: 'Русский (Russian)', code: 'ru_RU' },
    { name: 'ไทย (Thai)', code: 'th_TH' },
    { name: 'Tiếng Việt (Vietnamese)', code: 'vi_VN' },
    { name: 'Bahasa Indonesia (Indonesian)', code: 'id_ID' },
    { name: 'Bahasa Melayu (Malay)', code: 'ms_MY' },
    { name: '日本語 (Japanese)', code: 'ja_JP' },
    { name: '한국어 (Korean)', code: 'ko_KR' },
    { name: '简体中文 (Simplified Chinese)', code: 'zh_CN' },
    { name: '繁體中文 (Traditional Chinese - HK/TW)', code: 'zh_TW' },
    { name: 'हिन्दी (Hindi)', code: 'hi_IN' },
    { name: 'العربية (Arabic)', code: 'ar_AR' },
    { name: 'עברית (Hebrew)', code: 'he_IL' },
    { name: 'Ελληνικά (Greek)', code: 'el_GR' },
    { name: 'Svenska (Swedish)', code: 'sv_SE' },
    { name: 'Norsk (Norwegian)', code: 'no_NO' },
    { name: 'Dansk (Danish)', code: 'da_DK' },
    { name: 'Suomi (Finnish)', code: 'fi_FI' },
    { name: 'Čeština (Czech)', code: 'cs_CZ' },
    { name: 'Magyar (Hungarian)', code: 'hu_HU' },
    { name: 'Română (Romanian)', code: 'ro_RO' },
    { name: 'Українська (Ukrainian)', code: 'uk_UA' }
  ];

  const searchTypeOptions = [
    { name: '🎯 Core Interests', value: 'adinterest' },
    { name: '💼 Job Titles', value: 'adjobtitle' },
    { name: '🎓 Major Studies', value: 'adeducationmajor' },
    { name: '✅ Exact Validation', value: 'adinterestvalid' }
  ];

  function handleChange(event) {
    setKeyword(event.target.value);
  }

  // Notifies App.jsx parent component when the active tool guide needs to update
  function handleTypeChange(event) {
    const selectedValue = event.target.value;
    setSearchType(selectedValue);
    if (onVectorChange) {
      onVectorChange(selectedValue);
    }
  }

  async function searchInterest(event) {
    event.preventDefault();
    if (!keyword.trim()) return;

    setIsLoading(true);
    setSearched(true);
    setVisibleCount(10);
    setActiveParent(null);
    
    try {
      let ad_interest_url;

      // Handle the strict array input requirement for the validation endpoint
      if (searchType === 'adinterestvalid') {
        ad_interest_url = new URL(
          `https://graph.facebook.com/search?type=adinterestvalid&interest_list=["${encodeURIComponent(keyword)}"]&locale=${locale}&access_token=${apiToken}`
        );
      } else {
        // Standard query endpoint for interests, job titles, and majors
        ad_interest_url = new URL(
          `https://graph.facebook.com/search?type=${searchType}&q=${encodeURIComponent(keyword)}&limit=10000&locale=${locale}&access_token=${apiToken}`
        );
      }

      const interest_result = await fetch(ad_interest_url);
      const result = await interest_result.json();
      setResults(result.data || []);
      console.log("results", result);
    } catch (error) {
      console.error("Error fetching data from FB API:", error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchDeepSuggestions(interestId, interestName) {
    setIsSuggesting(true);
    setVisibleCount(10);
    setActiveParent(interestName);
    
    try {
      let suggestions_url = new URL(
        `https://graph.facebook.com/search?type=adinterestsuggestion&interest_list=["${interestId}"]&limit=1000&locale=${locale}&access_token=${apiToken}`
      );
      const suggestions_result = await fetch(suggestions_url);
      const result = await suggestions_result.json();
      setResults(result.data || []);
      console.log("results", result);
    } catch (error) {
      console.error("Error fetching deep suggestions:", error);
    } finally {
      setIsSuggesting(false);
    }
  }

  const visibleResults = results.slice(0, visibleCount);

  const formatNumber = (num) => {
    return num ? num.toLocaleString() : 'N/A';
  };

  return (
    <div className="w-full space-y-8">
      {/* Configuration Form Panel */}
      <form onSubmit={searchInterest} className="w-full">
        <div className="flex flex-col gap-4">
          
          {/* Input field and action buttons row */}
          <div className="flex flex-col sm:flex-row gap-3 items-center w-full">
            <div className="relative flex-grow w-full">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                onChange={handleChange}
                name="keyword"
                id="keyword"
                value={keyword}
                placeholder={`Search ${searchTypeOptions.find(o => o.value === searchType)?.name.split(' ')[1]}...`}
                className="w-full pl-11 pr-4 py-3 h-12 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-slate-50/50 text-slate-800 transition"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || isSuggesting || !keyword.trim()}
              className="w-full sm:w-auto px-8 h-12 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all flex items-center justify-center min-w-[140px]"
            >
              {isLoading ? 'Searching...' : 'Find Targets'}
            </button>
          </div>

          {/* Filtering Toggles Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 pl-1">
                Targeting Vector Stream
              </label>
              <select
                value={searchType}
                onChange={handleTypeChange}
                className="w-full h-11 px-3 border border-slate-200 rounded-xl bg-slate-50/50 text-slate-700 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition cursor-pointer"
              >
                {searchTypeOptions.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 pl-1">
                API Locale Language
              </label>
              <select
                value={locale}
                onChange={(e) => setLocale(e.target.value)}
                className="w-full h-11 px-3 border border-slate-200 rounded-xl bg-slate-50/50 text-slate-700 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition cursor-pointer max-h-40"
              >
                {languageOptions.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

        </div>
      </form>

      {/* Loading States */}
      {(isLoading || isSuggesting) && (
        <div className="flex flex-col items-center justify-center py-12 text-slate-400 space-y-3">
          <p className="text-sm font-medium animate-pulse">
            {isSuggesting ? `Generating hidden niches for "${activeParent}"...` : 'Filtering Marketing Graph Matrix...'}
          </p>
        </div>
      )}

      {/* Empty State Fallback */}
      {!isLoading && !isSuggesting && searched && results.length === 0 && (
        <div className="text-center py-12 border border-dashed border-slate-200 rounded-xl bg-slate-50/30">
          <p className="text-slate-500 font-medium">No target layers discovered for "{keyword}".</p>
          <p className="text-xs text-slate-400 mt-1">Try switching categories or expanding your keyword terms.</p>
        </div>
      )}

      {/* Dynamic Results Grid Display */}
      {!isLoading && !isSuggesting && results.length > 0 && (
        <div className="w-full space-y-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
              {activeParent ? `💡 Suggestions Related to: ${activeParent}` : `Displaying Matches (${results.length} found)`}
            </h3>
            {activeParent && (
              <button 
                onClick={() => { setActiveParent(null); setResults([]); setSearched(false); }}
                className="text-xs font-semibold text-indigo-600 hover:underline text-left"
              >
                ← Back to main keyword query
              </button>
            )}
          </div>
          
          <div className="overflow-x-auto border border-slate-100 rounded-xl bg-white shadow-inner">
            <table className="min-w-full divide-y divide-slate-100 text-left">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-xs font-semibold">
                <tr>
                  <th scope="col" className="px-6 py-3.5">Target Layer Match</th>
                  <th scope="col" className="px-6 py-3.5">Audience Size / ID</th>
                  <th scope="col" className="px-6 py-3.5">Core Category Path</th>
                  {searchType === 'adinterest' && !activeParent && (
                    <th scope="col" className="px-6 py-3.5 text-right">Deep Suggestions</th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white text-sm text-slate-700">
                {visibleResults.map((result) => (
                  <tr key={result.id} className="hover:bg-indigo-50/20 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900">{result.name}</td>
                    <td className="px-6 py-4 font-mono text-xs text-slate-600">
                      {result.audience_size_upper_bound || result.audience_size
                        ? formatNumber(result.audience_size_upper_bound || result.audience_size)
                        : result.id
                      }
                    </td>
                    <td className="px-6 py-4">
                      {result.topic || result.valid === true || result.valid === false ? (
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          result.valid === false ? 'bg-rose-50 text-rose-700 border border-rose-100' : 'bg-slate-100 text-slate-800'
                        }`}>
                          {result.topic || (result.valid === true ? '✅ Valid Match' : result.valid === false ? '❌ Unusable' : 'General')}
                        </span>
                      ) : (
                        <span className="text-slate-400 italic text-xs">Direct API Hook</span>
                      )}
                    </td>
                    {searchType === 'adinterest' && !activeParent && (
                      <td className="px-6 py-4 text-right">
                        <button
                          type="button"
                          onClick={() => fetchDeepSuggestions(result.id, result.name)}
                          className="text-xs font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition"
                        >
                          Find Related →
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Load More Button Container */}
          {visibleCount < results.length && (
            <div className="flex justify-center pt-2">
              <button
                type="button"
                onClick={() => setVisibleCount(prev => prev + 10)}
                className="px-6 py-2.5 border border-slate-200 hover:border-indigo-600 hover:text-indigo-600 text-slate-600 font-semibold text-sm rounded-xl transition bg-white shadow-sm"
              >
                Load More Results
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;