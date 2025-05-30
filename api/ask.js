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

  // --- MODIFICATION HERE ---
  // Changed model from gemini-1.5-pro to gemini-1.5-flash
  const modelName = 'gemini-1.5-flash'; // Or you could use 'gemini-1.0-pro' for its known free tier
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${GEMINI_API_KEY}`;
  // Note: For some models or features, the endpoint might be v1 instead of v1beta.
  // Check the official documentation for gemini-1.5-flash if v1beta gives issues.
  // For generativelanguage.googleapis.com, v1 is usually for stable, v1beta for newer features/models.
  // As of recent info, gemini-1.5-flash typically uses v1beta or the specific model endpoint like models/gemini-1.5-flash-latest
  // Let's try with the more specific model name if just "gemini-1.5-flash" isn't precise enough for the v1beta endpoint:
  // const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`;
  // However, often the base name is sufficient. The previous code used v1 with 1.5-pro.
  // The pricing page shows `gemini-1.5-flash` is a recognized model.
  // The `v1` endpoint is generally for GA models, `v1beta` for preview. Let's stick to `v1` for consistency if Flash is GA.
  // If `gemini-1.5-flash` is considered stable, `v1` should work.
  // const url = `https://generativelanguage.googleapis.com/v1/models/${modelName}:generateContent?key=${GEMINI_API_KEY}`;
  // Given the original code used v1 for 1.5-pro, let's try v1 for 1.5-flash first.
  // Update: The Gemini API documentation often points to v1beta for the latest models including 1.5 Flash.
  // If you encounter issues, try "models/gemini-1.5-flash-latest" or "models/gemini-1.5-flash-001" (if specific versions are needed)

  console.log(`[${new Date().toISOString()}] Using model: ${modelName}`);
  // --- END OF MODIFICATION ---

  const apiRequestBody = {
    contents: [{ parts: [{ text: prompt }] }]
    // You might want to add generationConfig here if needed, e.g.,
    // generationConfig: {
    //   temperature: 0.7,
    //   topP: 1,
    //   topK: 1,
    //   maxOutputTokens: 2048, // Adjust as needed
    // },
    // safetySettings: [ // Adjust safety settings if default is too restrictive or too lenient
    //   { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
    //   { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
    //   { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
    //   { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
    // ]
  };
  console.log(`[${new Date().toISOString()}] Constructed Gemini API URL (key redacted): ${url.replace(GEMINI_API_KEY, "REDACTED_API_KEY")}`);

  try {
    console.log(`[${new Date().toISOString()}] Attempting to fetch from Gemini API...`);
    const geminiRes = await fetch(url, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(apiRequestBody)
    });

    console.log(`[${new Date().toISOString()}] Response status from Gemini API: ${geminiRes.status}`);

    const responseText = await geminiRes.text();
    // console.log(`[${new Date().toISOString()}] Raw response text from Gemini API: ${responseText}`); // Potentially very verbose

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error(`[${new Date().toISOString()}] Failed to parse Gemini API response as JSON. Parse Error:`, parseError);
      console.error(`[${new Date().toISOString()}] Gemini API response text that failed to parse:`, responseText);
      res.status(500).json({ error: 'Failed to parse Gemini API response.', details: responseText });
      return;
    }

    if (!geminiRes.ok) {
      console.error(`[${new Date().toISOString()}] Gemini API returned an error. Status: ${geminiRes.status}, Data:`, JSON.stringify(data, null, 2));
      res.status(geminiRes.status).json(data.error ? { error: data.error.message, details: data.error.details } : data);
      return;
    }

    console.log(`[${new Date().toISOString()}] Successfully received and parsed data from Gemini. Sending to frontend.`);
    res.status(200).json(data);

  } catch (err) {
    console.error(`[${new Date().toISOString()}] Error in try-catch block (network issue calling Gemini, or other fetch-related error):`, err);
    res.status(500).json({ error: `Internal server error: ${err.message}` });
  }
}
