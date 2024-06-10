import { useState } from 'react';
import './index.css';
import SearchBar from './../src/assets/components/searchBar';

function App() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center">
      {/* Google Tag Manager (noscript) */}
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-TT4M9TR"
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        ></iframe>
      </noscript>
      {/* End Google Tag Manager (noscript) */}
      
      <div id="topbar" className="w-full flex justify-center items-center py-4 bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100">
        <img src="/assets/images.png" alt="Logo" className="w-16 h-16 mr-4"/>
        <span className="text-lg xs:text-2xl font-bold text-gray-800">Facebook Hidden Interest Search</span>
      </div>

      <div className="w-full text-center mt-8 px-4 sm:px-0">
        <h2 className="text-2xl font-semibold text-gray-700">
          Target the audience that most people don't know exist!
        </h2>
        <p className="mt-2 text-lg text-gray-600">By Bon Thatthana</p>
      </div>

      <div className="w-full sm:w-2/3 text-center mt-8 px-4 sm:px-0 pb-4">
        <h3 className="text-lg font-semibold text-gray-700">What is Facebook Hidden Interest</h3>
        <p className="mt-4 text-sm text-gray-600">
          When searching for Facebook interests, only up to 30 related interests are displayed, limiting the options. This tool helps uncover all available interests that aren't normally visible in the suggested lists, allowing advertisers to target unique audiences.
        </p>
      </div>

      <SearchBar />

      {/* Footer */}
      <footer className="w-full max-w-2xl text-center py-4 mx-auto">
        <p className="text-gray-600">&copy; 2024 Bon Thatthana. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
