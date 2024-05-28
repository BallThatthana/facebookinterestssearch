import { useState } from 'react';
import '../../index.css';

function SearchBar() {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState([]);

  const apiToken = import.meta.env.VITE_FB_TOKEN;

  function handleChange(event) {
    setKeyword(event.target.value);
  }

  async function searchInterest(event) {
    event.preventDefault();
    try {
      let ad_interest_url = new URL(`https://graph.facebook.com/search?type=adinterest&q=${keyword}&limit=10000&locale=en_EN&access_token=${apiToken}`);
      const interest_result = await fetch(ad_interest_url);
      const result = await interest_result.json();
      setResults(result.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="min-h-screen w-full mt-4 px-4 sm:px-0 flex flex-col items-center p-10 bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100">
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-8">
        <form className="space-y-6" onSubmit={searchInterest}>
          <h3 className="text-lg font-medium text-gray-700">Search Interest</h3>
          <div className="flex items-center space-x-4">
            <input
              onChange={handleChange}
              name="keyword"
              id="keyword"
              value={keyword}
              placeholder="Type in a keyword"
              className="flex-1 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="submit"
              className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              Search
            </button>
          </div>
        </form>
      </div>
      
      {results.length > 0 && (
        <div className="w-full max-w-2xl mt-8">
          <h2 className="text-xl font-semibold text-gray-700 text-center">Results</h2>
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-purple-500 text-white">
                <tr>
                  <th className="px-3 py-3">Interest</th>
                  <th className="px-3 py-3">Size</th>
                  <th className="px-3 py-3">Topic</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result) => (
                  <tr key={result.id} className="border-t">
                    <td className="px-4 py-4 text-sm text-center">{result.name}</td>
                    <td className="px-4 py-4 text-sm text-center">{result.audience_size_upper_bound}</td>
                    <td className="px-4 py-4 text-sm text-center">{result.topic}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
