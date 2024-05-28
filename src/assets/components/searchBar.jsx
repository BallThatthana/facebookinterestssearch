import { useState } from 'react';
import '../../index.css';

function SearchBar() {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState([]);

  const apiToken = import.meta.env.VITE_FB_TOKEN;

  console.log("API Token:", apiToken);

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

  console.log("keyword", keyword);

  return (
    <div className='search-section mx-auto'>
      <div className='searchbar rounded-xl'>
        <form className="form py-6 px-6" onSubmit={searchInterest}>
          <h3 className="pb-6 text-sm">Search Interest</h3>
          <span>
            <input onChange={handleChange} name="keyword" id="keyword" value={keyword} placeholder='Type in a keyword'/>
            <button onClick={searchInterest} id="seach-btn" className='bg-blue-500'>Click to Search</button>
          </span>
        </form>
      </div>
      {results.length > 0 && (
        <div className='search-results mx-auto w-50 bg-grey-200 mt-4'>
          <h2 className='text-center bg-black text-white'>Results</h2>
          <div className='table-container'>
            <table className='table-auto mx-auto mt-6 w-75'>
              <thead>
                <tr>
                  <th className='w-1/3'>Interest</th>
                  <th className='w-1/3'>Size</th>
                  <th className='w-1/3'>Topic</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result) => (
                  <tr key={result.id}>
                    <td>{result.name}</td>
                    <td>{result.audience_size_upper_bound}</td>
                    <td>{result.topic}</td>
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
