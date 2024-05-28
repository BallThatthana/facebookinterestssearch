import { useState } from 'react';
import './App.css';
import SearchBar from './assets/components/searchBar';
import './index.css';

function App() {
  return (
    <div>
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
      
      <div id="topbar">
        <img src="/assets/images.png" id="ball-logo" alt="Logo"/>
        <span id="topbar-title"> Facebook Hidden Interest Search</span>
      </div>
      
      <p id="text-inputfield"></p>
      
      <div className="col-md-12 mx-auto" id="title-div">
        <h2 className="title">
          Facebook Hidden Interest Search Tool - Target the audience that most people don't know exist!
        </h2>
        <p className="title-ball">By Bon Thatthana</p>
      </div>
      
      <div className="col-md-8 mx-auto">
        <div>
          <h3 className="title">What is Facebook Hidden Interest</h3>
        </div>
        <p style={{ textAlign: 'center' }}>
          When we search for Facebook interests or target, it usually shows keyword's related interests.
        </p>
        <p style={{ textAlign: 'center' }}>
          However, not all available interests will be shown due to Facebook limit display to only up to 30 interests. Therefore most advertisers will use similar interests to target similar audiences!
        </p>
        <p style={{ textAlign: 'center' }}>
          This tool will help to extract all available interests, which you don't normally see in the suggested lists.
        </p>
      </div>
      
      <div className="container col-md-12 mx-auto" style={{ textAlign: 'center', margin: '60px 0' }}>
        <strong>
          <p id="sponsor-text">
            Please subscribe to my Youtube channel to support me <a href="https://www.youtube.com/channel/UCApfJLGPwZvp_Zqaigeo3TQ/join" target="_blank" rel="noopener noreferrer">here</a>
          </p>
        </strong>
      </div>
      
      {/* <div className="col-md-8 mx-auto dark" id="search-box">
        <div id="input-section" className="col-md-10 mx-auto">
          <input type="text" id="input" placeholder="Search for an interest here..." />
          <select id="lang" className="select" aria-label="Default select example" onChange={() => { switchLang(); switchLang1(); }}>
            <option className="select-option" value="th_TH">Thai</option>
            <option className="select-option" value="th_US">English</option>
          </select>
        </div>
        
        <div className="col-md-10 mx-auto" id="button">
          <button type="button" className="btn btn-primary" id="submit">Search</button>
          <button id="clear" className="btn btn-warning">Clear</button>
        </div>
      </div>
      
      <div id="interest-result" className="col-md-8 mx-auto">
        <div className="col-md-6 mx-auto" id="result">
          <h3 id="interest-title">
            Related interests<span id="title-interest"></span>
          </h3>
          <table id="table1" className="table-dark sortable">
            <thead id="thead" className="thead-striped">
              <tr>
                <th className="sorting" scope="col" style={{ width: '33.333%' }}>Interest</th>
                <th className="sorting" scope="col" style={{ width: '33.333%' }}>Max. size</th>
                <th className="sorting" scope="col" style={{ width: '33.333%' }}>Category</th>
              </tr>
            </thead>
          </table>
        </div>
        
        <div className="col-md-6 mx-auto" id="result1">
          <h3 id="suggestinterest-title">
            Suggested Interests<span id="title-suggestion"></span>
          </h3>
          <table id="table2" className="table-dark sortable">
            <thead id="thead1" className="thead-striped">
              <tr>
                <th scope="col" style={{ width: '50%' }}>Interest</th>
                <th scope="col" style={{ width: '50%' }}>Related</th>
              </tr>
            </thead>
          </table>
        </div>
      </div> */}
      
      <SearchBar/>
    </div>
  );
}

export default App;
