// netlify/functions/facebookSearch.js

export const handler = async (event) => {
  // 1. Extract the query parameters sent from your React frontend
  const { type, keyword, locale, interestList } = event.queryStringParameters;
  
  // 2. Grab the secret token from Netlify's backend environment
  const apiToken = process.env.FB_ACCESS_TOKEN;

  if (!apiToken) {
    return { statusCode: 500, body: JSON.stringify({ error: "Missing API Token" }) };
  }

  try {
    let fbApiUrl;

    // 3. Construct the secure Facebook Graph URL based on the request type
    if (type === 'adinterestvalid' || type === 'adinterestsuggestion') {
      const listParam = interestList ? interestList : `["${encodeURIComponent(keyword)}"]`;
      fbApiUrl = `https://graph.facebook.com/search?type=${type}&interest_list=${listParam}&limit=1000&locale=${locale}&access_token=${apiToken}`;
    } else {
      fbApiUrl = `https://graph.facebook.com/search?type=${type}&q=${encodeURIComponent(keyword)}&limit=10000&locale=${locale}&access_token=${apiToken}`;
    }

    // 4. Fetch the data from Facebook
    const response = await fetch(fbApiUrl);
    const data = await response.json();

    // 5. Send the data back to your React app
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error("Serverless Function Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch data from Facebook API" }),
    };
  }
};