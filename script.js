async function askGemini() {
  const prompt = document.getElementById('userPrompt').value;

  const res = await fetch('https://us-central1-teacherbehaviorhubapp.cloudfunctions.net/askGemini', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt })
  });

  const data = await res.json();
  const output = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response from Gemini.';
  document.getElementById('responseOutput').innerText = output;
}