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
  console.log(`[${new Date().toISOString()}] Prompt received (length: ${prompt.length}).`);

  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  if (!GEMINI_API_KEY) {
    console.error(`[${new Date().toISOString()}] Gemini API key not configured in environment variables.`);
    res.status(500).json({ error: 'Gemini API key not configured.' });
    return;
  }
  console.log(`[${new Date().toISOString()}] Gemini API key is present.`);

  // --- USING GEMMA 3 MODEL ---
  //
  // Set to the specific Gemma 3 model ID you want to use.
  // You've indicated 'gemma-3-27b-it'.
  //
  const modelName = 'gemma-3-27b-it'; // <-- Specific Gemma 3 model ID
  
  // The Gemini API endpoint. `v1beta` is generally used for newer models.
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${GEMINI_API_KEY}`;
  
  console.log(`[${new Date().toISOString()}] Using model: ${modelName}`);
  console.log(`[${new Date().toISOString()}] Target URL (key redacted): ${url.replace(GEMINI_API_KEY, "REDACTED_API_KEY")}`);
  // --- END OF MODEL CONFIGURATION ---

  const apiRequestBody = {
    contents: [{ parts: [{ text: prompt }] }],
    // Optional: You can add generationConfig if needed.
    // Check documentation for recommended settings for 'gemma-3-27b-it'.
    // generationConfig: {
    //   temperature: 0.7, 
    //   topP: 1.0,        
    //   topK: 40,         
    //   maxOutputTokens: 2048, // Gemma 3 models might have large context windows; adjust as needed.
    // },
    // Optional: Safety settings can also be configured.
    // safetySettings: [
    //   { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
    //   { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
    //   { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
    //   { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
    // ]
  };
  console.log(`[${new Date().toISOString()}] API Request Body for ${modelName}:`, JSON.stringify(apiRequestBody, null, 2));

  try {
    console.log(`[${new Date().toISOString()}] Attempting to fetch from API for model ${modelName}...`);
    const modelRes = await fetch(url, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(apiRequestBody)
    });

    console.log(`[${new Date().toISOString()}] Response status from API (${modelName}): ${modelRes.status}`);

    const responseText = await modelRes.text();
    // console.log(`[${new Date().toISOString()}] Raw response text from API (${modelName}): ${responseText}`);

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error(`[${new Date().toISOString()}] Failed to parse API response as JSON for ${modelName}. Parse Error:`, parseError);
      console.error(`[${new Date().toISOString()}] API response text that failed to parse (${modelName}):`, responseText);
      res.status(500).json({ error: `Failed to parse API response for ${modelName}.`, details: responseText });
      return;
    }

    if (!modelRes.ok) {
      console.error(`[${new Date().toISOString()}] API (${modelName}) returned an error. Status: ${modelRes.status}, Data:`, JSON.stringify(data, null, 2));
      const errorMessage = data?.error?.message || `API error with ${modelName}. Check server logs.`;
      const errorDetails = data?.error?.details || data;
      res.status(modelRes.status).json({ error: errorMessage, details: errorDetails });
      return;
    }

    console.log(`[${new Date().toISOString()}] Successfully received and parsed data from ${modelName}. Sending to frontend.`);
    res.status(200).json(data);

  } catch (err) {
    console.error(`[${new Date().toISOString()}] Error in try-catch block when calling ${modelName} (Network issue or other fetch-related error):`, err);
    res.status(500).json({ error: `Internal server error while contacting AI service: ${err.message}` });
  }
}
