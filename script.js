/**
 * This function sends a prompt to your backend, calls the Gemini API,
 * and handles the nested response to display the result on your webpage.
 *
 * @param {string} fullPromptText - The complete prompt text to be sent to the AI.
 */
async function getBehaviorPlan(fullPromptText) {
  // --- 1. Get references to your HTML elements ---
  const submitButton = document.getElementById('submit-button'); // ID of your "Generate Plan" button
  const loadingIndicator = document.getElementById('loading-indicator'); // ID of a loading spinner/text
  const resultContainer = document.getElementById('result-container'); // ID of the div where the plan will be displayed

  // --- 2. Set up the UI for loading ---
  // Disable the button to prevent multiple clicks
  if(submitButton) submitButton.disabled = true;
  // Show the loading indicator
  if(loadingIndicator) loadingIndicator.style.display = 'block';
  // Clear any previous results
  if(resultContainer) resultContainer.innerHTML = '';

  try {
    // --- 3. Call your backend cloud function ---
    const apiUrl = 'https://us-central1-teacherbehaviorhubapp.cloudfunctions.net/askGemini';

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // Send the prompt inside a JSON object, as your backend likely expects this
      body: JSON.stringify({ prompt: fullPromptText }),
    });

    // Check for server errors (e.g., your cloud function crashed)
    if (!response.ok) {
      throw new Error(`Server error: ${response.status} ${response.statusText}`);
    }

    // The response from your cloud function is the Gemini API response
    const geminiResponse = await response.json();

    // --- 4. Safely extract the text from the nested Gemini response ---
    // This is the key fix: using optional chaining (?.) to navigate the object
    const planText = geminiResponse?.candidates?.[0]?.content?.parts?.[0]?.text;

    // --- 5. Display the result or an error ---
    if (planText) {
      // Success! We found the text. Display it.
      // We are replacing newline characters (\n) with <br> tags for proper HTML formatting.
      if(resultContainer) resultContainer.innerHTML = planText.replace(/\n/g, '<br>');
    } else {
      // The response was valid, but we couldn't find the text.
      // This can happen if the AI's safety filters block the response.
      console.error("Could not extract text. Full Gemini response:", geminiResponse);
      if(resultContainer) resultContainer.innerText = 'The AI was unable to generate a plan for this request. This may be due to safety filters or the nature of the prompt. Please try modifying your request.';
    }

  } catch (error) {
    // --- 6. Handle any network or code errors ---
    console.error("Failed to get behavior plan:", error);
    if(resultContainer) resultContainer.innerText = 'An error occurred while trying to generate the plan. Please check the console for details and try again.';
  } finally {
    // --- 7. Clean up the UI ---
    // This code runs whether the request succeeded or failed
    if(submitButton) submitButton.disabled = false;
    if(loadingIndicator) loadingIndicator.style.display = 'none';
  }
}

// --- EXAMPLE USAGE ---
// You would call this function when the user clicks a button.
// For example:

// document.getElementById('submit-button').addEventListener('click', () => {
//   const prompt = "Act as an expert..."; // Get the full prompt from your form inputs
//   getBehaviorPlan(prompt);
// });
