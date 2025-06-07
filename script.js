// --- DATA CONSTANTS (Pulled from your original HTML) ---
const bipData = {
    "Physical Aggression": {
        antecedents: ["Challenging tasks", "Denial of requests", "Interruption of preferred activity", "Peer conflicts", "Protecting personal space/items", "Sensory overload", "Transitions", "Unwanted physical touch"].sort(),
        behaviors: ["Biting (others)", "Hitting", "Kicking", "Pinching", "Pulling hair (others)", "Pushing", "Scratching (others)", "Shoving", "Spitting (at others)", "Throwing objects (at people/property with intent to harm/disrupt)"].sort(),
        consequences: ["Adult attention (reprimand, comfort, intervention)", "Item/activity obtained", "Loss of privileges", "Peer avoidance/withdrawal", "Physical restraint (for safety)", "Removal from activity/area", "Task/demand escaped"].sort()
    },
    // ... all your other bipData categories ...
    "General / Other": {
        antecedents: ["Academic demand", "Change in routine", "Correction/Feedback", "Denial of access", "Internal state (hungry, tired, anxious)", "Lack of attention", "Peer interaction (positive or negative)", "Presence of specific person/item", "Sensory input (loud noise, bright light)", "Social demand", "Transition", "Unstructured time"].sort(),
        behaviors: ["Crying", "Inappropriate physical contact (non-aggressive)", "Not following social rules", "Pacing", "Refusing to speak", "Whining", "Withdrawing from interaction", "(Specify in anecdotal notes)"].sort(),
        consequences: ["Access to preferred item/activity/person", "Adult attention (positive/negative)", "Comfort", "Escape/Avoidance of task/situation/person", "Ignoring", "Loss of privilege", "Peer attention (positive/negative)", "Removal from area", "Reprimand", "Redirection", "Sensory stimulation (automatic)", "Task modification"].sort()
    }
};
const developmentalLevels = { /* ... paste your full developmentalLevels object here ... */ };
const gradeLevelContexts = { /* ... paste your full gradeLevelContexts object here ... */ };


// --- DOM ELEMENT REFERENCES ---
// ... (Your existing list of const variables getting elements by ID) ...
const generateBIPButton = document.getElementById('generateBIPButton');
const generateBIPSpinner = document.getElementById('generateBIPSpinner');
const sessionStatusDisplay = document.getElementById('sessionStatusDisplay');
const bipOutputDiv = document.getElementById('bipOutput');


// --- CORE FUNCTIONS ---

/**
 * Sends a student data OBJECT to the backend Cloud Function.
 * @param {object} studentDataObject - A JSON object containing all the user's input.
 */
async function getBehaviorPlan(studentDataObject) {
    generateBIPSpinner.classList.remove('hidden');
    generateBIPButton.disabled = true;
    sessionStatusDisplay.textContent = "Generating...";
    // ... (Your other UI update logic here) ...

    try {
        const apiUrl = 'https://us-central1-teacherbehaviorhubapp.cloudfunctions.net/askGemini';

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(studentDataObject), // Send the data object
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Server error: ${response.status}. ${errorText}`);
        }

        const geminiResponse = await response.json();
        const planText = geminiResponse?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (planText) {
            // Your logic to parse and display the plan
            const sections = parsePlanSections(planText);
            showPlanSections(sections);
            sessionStatusDisplay.textContent = "Active (AI Generated)";
        } else {
            throw new Error("AI responded, but no valid plan text was found.");
        }

    } catch (error) {
        console.error("Failed to get behavior plan:", error);
        showErrorOutput(`A critical error occurred: ${error.message}`);
        sessionStatusDisplay.textContent = "Generation Failed";
    } finally {
        generateBIPSpinner.classList.add('hidden');
        generateBIPButton.disabled = false;
    }
}

/**
 * Gathers all data from the form into a clean JavaScript object.
 * @returns {object} The student data payload to be sent to the backend.
 */
function createStudentDataPayload() {
    const behaviorBlocksData = [];
    document.querySelectorAll('.behavior-block').forEach((block, index) => {
        const typeSelect = document.getElementById(`behaviorTypeSelect_${index}`);
        const antecedentSelect = document.getElementById(`antecedentSelect_${index}`);
        const behaviorSpecificSelect = document.getElementById(`behaviorSelect_${index}`);
        const consequenceSelect = document.getElementById(`consequenceSelect_${index}`);

        const behaviorType = (typeSelect.value === "Other" || typeSelect.value === "General / Other") ? document.getElementById(`behaviorTypeOther_${index}`).value : typeSelect.value;
        const antecedent = (antecedentSelect.value === "Other") ? document.getElementById(`antecedentOther_${index}`).value : antecedentSelect.value;
        const specificBehavior = (behaviorSpecificSelect.value === "Other") ? document.getElementById(`behaviorSpecificOther_${index}`).value : behaviorSpecificSelect.value;
        const consequence = (consequenceSelect.value === "Other") ? document.getElementById(`consequenceOther_${index}`).value : consequenceSelect.value;
        
        if (behaviorType || antecedent || specificBehavior || consequence) {
            behaviorBlocksData.push({ type: behaviorType, antecedent, specificBehavior, consequence });
        }
    });

    const payload = {
        age: document.getElementById('studentAge').value || 'Not specified',
        grade: document.getElementById('studentGrade').value || 'Not specified',
        strengths: document.getElementById('strengthsInterestsResiliency').value || 'Not specified',
        reinforcers: document.getElementById('reinforcerPreferences').value || 'Not specified',
        anecdotalNotes: document.getElementById('anecdotal').value || 'No specific anecdotal notes provided.',
        behavioralLevel: document.getElementById('behavioralSkillsSelect').value || 'Not specified',
        socialLevel: document.getElementById('socialSkillsSelect').value || 'Not specified',
        pragmaticLevel: document.getElementById('pragmaticLanguageSkillsSelect').value || 'Not specified',
        behaviorPatterns: behaviorBlocksData
    };

    return payload;
}


// --- HELPER & UI FUNCTIONS (parsePlanSections, showPlanSections, createBehaviorBlock, etc.) ---
// ... (Paste all your other helper functions from the original HTML file here) ...
// For example:
function parsePlanSections(planText) { /* ... your existing code ... */ }
function showPlanSections(sections) { /* ... your existing code ... */ }
function showErrorOutput(msg) { /* ... your existing code ... */ }
function createBehaviorBlock() { /* ... your existing code ... */ }
// ... and so on for all other functions.


// --- EVENT LISTENERS ---

// This is the main trigger for the application
generateBIPButton.addEventListener('click', () => {
    // 1. Gather the user's data from the form into a clean object.
    const studentData = createStudentDataPayload();

    console.log("Sending this data payload to the Cloud Function:", studentData);

    // 2. Send that small data object to the backend function.
    getBehaviorPlan(studentData);
});

// ... (Your other event listeners for new plan, exports, modals, etc. go here) ...
document.addEventListener('DOMContentLoaded', () => {
    // Your logic to set up the initial state of the page
    // e.g., createBehaviorBlock(), loadFormData(), setupInfoModals()
});
