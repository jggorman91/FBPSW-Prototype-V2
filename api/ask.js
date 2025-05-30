// api/ask.js
export default async function handler(req, res) {
  console.log("------------------------------------------------------");
  console.log(`[${new Date().toISOString()}] /api/ask function invoked.`);

  if (req.method !== 'POST') {
    console.log(`[${new Date().toISOString()}] Method not allowed: ${req.method}`);
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  console.log(`[${new Date().toISOString()}] Method is POST, proceeding.`);

  const { prompt } = req.body;
  if (!prompt) {
    console.log(`[${new Date().toISOString()}] Prompt is missing from request body.`);
    res.status(400).json({ error: 'Prompt is required.' });
    return;
  }
  // Avoid logging the full prompt if it's very long or sensitive, just confirm presence
  console.log(`[${new Date().toISOString()}] Prompt received (length: ${prompt.length}).`);

  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  if (!GEMINI_API_KEY) {
    console.error(`[${new Date().toISOString()}] Gemini API key not configured in environment variables.`);
    res.status(500).json({ error: 'Gemini API key not configured.' });
    return;
  }
  console.log(`[${new Date().toISOString()}] Gemini API key is present.`);

  const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${GEMINI_API_KEY}`;
  const apiRequestBody = { // Renamed from 'body' to avoid confusion
    contents: [{ parts: [{ text: prompt }] }]
  };
  console.log(`[${new Date().toISOString()}] Constructed Gemini API URL (key redacted): ${url.replace(GEMINI_API_KEY, "REDACTED_API_KEY")}`);
  // console.log(`[${new Date().toISOString()}] Gemini API request body:`, JSON.stringify(apiRequestBody)); // Uncomment if you need to see the full body

  try {
    console.log(`[${new Date().toISOString()}] Attempting to fetch from Gemini API...`);
    const geminiRes = await fetch(url, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(apiRequestBody)
    });

    console.log(`[${new Date().toISOString()}] Response status from Gemini API: ${geminiRes.status}`);

    // IMPORTANT: Try to get text first to see if it's even JSON, in case Gemini errors out with non-JSON
    const responseText = await geminiRes.text();
    console.log(`[${new Date().toISOString()}] Raw response text from Gemini API: ${responseText}`);

    let data;
    try {
      data = JSON.parse(responseText); // Now try to parse it
    } catch (parseError) {
      console.error(`[${new Date().toISOString()}] Failed to parse Gemini API response as JSON. Parse Error:`, parseError);
      console.error(`[${new Date().toISOString()}] Gemini API response text that failed to parse:`, responseText);
      res.status(500).json({ error: 'Failed to parse Gemini API response.', details: responseText });
      return;
    }
    
    // If geminiRes.ok is false, Gemini returned an error JSON
    if (!geminiRes.ok) {
      console.error(`[${new Date().toISOString()}] Gemini API returned an error. Status: ${geminiRes.status}, Data:`, JSON.stringify(data, null, 2));
      // Forward the error structure from Gemini, if available
      res.status(geminiRes.status).json(data.error ? { error: data.error.message, details: data.error.details } : data);
      return;
    }

    console.log(`[${new Date().toISOString()}] Successfully received and parsed data from Gemini. Sending to frontend.`);
    // console.log(`[${new Date().toISOString()}] Data from Gemini (to be sent to frontend):`, JSON.stringify(data, null, 2)); // Uncomment to see data
    res.status(200).json(data);

  } catch (err) {
    console.error(`[${new Date().toISOString()}] Error in try-catch block (network issue calling Gemini, or other fetch-related error):`, err);
    res.status(500).json({ error: `Internal server error: ${err.message}` });
  }
}
