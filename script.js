/**
 * This is the main script file for the BIP Generator application.
 * It handles the API call to Gemini and updates the webpage.
 */

/**
 * This function sends a prompt to the backend, calls the Gemini API,
 * and handles the nested response to display the result on the webpage.
 *
 * @param {string} fullPromptText - The complete prompt text to be sent to the AI.
 */
async function getBehaviorPlan(fullPromptText) {
  // Get references to the HTML elements
  const submitButton = document.getElementById('submit-button');
  const loadingIndicator = document.getElementById('loading-indicator');
  const resultContainer = document.getElementById('result-container');

  // Set up the UI for loading
  if(submitButton) submitButton.disabled = true;
  if(loadingIndicator) loadingIndicator.style.display = 'block';
  if(resultContainer) resultContainer.innerHTML = '';

  try {
    // Call your backend cloud function
    const apiUrl = 'https://us-central1-teacherbehaviorhubapp.cloudfunctions.net/askGemini';

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: fullPromptText }),
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status} ${response.statusText}`);
    }

    const geminiResponse = await response.json();

    // Safely extract the text from the nested Gemini response
    const planText = geminiResponse?.candidates?.[0]?.content?.parts?.[0]?.text;

    // Display the result or a specific error message
    if (planText) {
      // Replace newline characters (\n) with HTML line breaks (<br>) for proper formatting
      if(resultContainer) resultContainer.innerHTML = planText.replace(/\n/g, '<br>');
      console.log("Success! Plan extracted and displayed.");
    } else {
      console.error("Could not extract text. Full Gemini response:", geminiResponse);
      if(resultContainer) resultContainer.innerText = 'The AI responded, but no valid plan was found. This can happen with sensitive topics or safety blocks. Please check the console for the full AI response.';
    }

  } catch (error) {
    // Handle any network or code errors
    console.error("Failed to get behavior plan:", error);
    if(resultContainer) resultContainer.innerText = 'A critical error occurred. Please check the console for details and try again.';
  } finally {
    // Clean up the UI, this runs whether it succeeded or failed
    if(submitButton) submitButton.disabled = false;
    if(loadingIndicator) loadingIndicator.style.display = 'none';
  }
}

// This "listens" for a click on your button
document.getElementById('submit-button').addEventListener('click', () => {
  // =======================================================================
  // IMPORTANT: This is where you will gather all the data from your
  // dropdown menus and text fields to build the final prompt string.
  // The long text you've been sending in your logs needs to be constructed here.
  // =======================================================================
  
  // For demonstration, we'll use a placeholder prompt.
  // REPLACE THIS with the real prompt from your page.
  const fullPromptFromPage = "Act as an expert Board Certified Behavior Analyst (BCBA)..."; 

  // Call the main function to get the plan
  getBehaviorPlan(fullPromptFromPage);
});
