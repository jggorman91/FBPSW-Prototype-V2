// ===================================================================================
// DATA CONSTANTS & CONFIGURATION
// ===================================================================================

// --- FINAL API URL ---
// This is the updated URL for your deployed Google Cloud Function.
const CLOUD_FUNCTION_URL = 'https://us-central1-teacherbehaviorhubapp.cloudfunctions.net/askGemini';

const bipData = {
    "Physical Aggression": {
        antecedents: ["Challenging tasks", "Denial of requests", "Interruption of preferred activity", "Peer conflicts", "Protecting personal space/items", "Sensory overload", "Transitions", "Unwanted physical touch"].sort(),
        behaviors: ["Biting (others)", "Hitting", "Kicking", "Pinching", "Pulling hair (others)", "Pushing", "Scratching (others)", "Shoving", "Spitting (at others)", "Throwing objects (at people/property with intent to harm/disrupt)"].sort(),
        consequences: ["Adult attention (reprimand, comfort, intervention)", "Item/activity obtained", "Loss of privileges", "Peer avoidance/withdrawal", "Physical restraint (for safety)", "Removal from activity/area", "Task/demand escaped"].sort()
    },
    "Verbal Aggression": {
        antecedents: ["Denial of requests", "Feeling unheard/misunderstood", "Frustration with task", "Peer teasing/provocation", "Perceived unfairness", "Receiving corrections/reprimands", "Unexpected changes"].sort(),
        behaviors: ["Arguing/Defiance (verbal, e.g., \"No!\")", "Name-calling/Insults", "Sarcasm/Rude comments", "Swearing/Profanity", "Threats (verbal)", "Yelling/Screaming"].sort(),
        consequences: ["Adult attention (discussion, warning)", "Loss of privileges", "Peer reactions (laughter, arguing, fear)", "Reprimands (can be attention)", "Task/demand escaped or modified", "Time-outs"].sort()
    },
    "Self-Injurious Behavior": {
        antecedents: ["Denial of preferred item/activity", "Emotional distress (anxiety, frustration)", "High task demands", "Lack of stimulation/boredom", "Physical pain/discomfort (internal)", "Sensory discomfort/overload", "Transitions"].sort(),
        behaviors: ["Biting self", "Hair pulling (own)", "Head banging (against surface/self)", "Hitting self", "Picking skin/scabs", "Scratching self"].sort(),
        consequences: ["Access to sensory input (automatic reinforcement)", "Comfort/attention provided", "Escape from demand/social interaction", "Intervention for safety (physical block, removal)", "Task removal/postponement"].sort()
    },
    "Task Refusal / Noncompliance": {
        antecedents: ["Challenging/Difficult tasks", "Fatigue", "Lack of choice in task", "Long work periods", "Non-preferred tasks", "Transitions to non-preferred activity", "Unclear instructions"].sort(),
        behaviors: ["Arguing about task", "Asking to do something else", "Ignoring instructions/prompts", "Leaving work area (not elopement)", "Passively not starting task", "Putting head down", "Saying 'no' to requests"].sort(),
        consequences: ["Adult prompts/redirection (can be attention)", "Allowed to do preferred activity instead (escape)", "Break given", "Loss of reward/privilege if task incomplete", "Task postponed/removed", "Task simplification"].sort()
    },
    "Elopement (Running Away)": {
        antecedents: ["Non-preferred settings/activities", "Overstimulating environment", "To escape a demand or aversive situation", "To gain access to a preferred item/area/person outside current setting", "Transitions", "Unstructured times"].sort(),
        behaviors: ["Hiding from staff", "Leaving supervised area without permission", "Running away from staff/group"].sort(),
        consequences: ["Access to desired location/item (if successful elopement)", "Chased by staff (can be reinforcing)", "Increased one-on-one supervision", "Loss of privileges", "Return to original area/task (sometimes delayed)"].sort()
    },
    "Disruptive Behavior (Non-Aggressive)": {
        antecedents: ["Boring/Easy tasks", "Lack of engagement", "Seeking adult attention", "Seeking peer attention", "Transition periods", "Unstructured periods"].sort(),
        behaviors: ["Making noises (vocal, tapping, etc.)", "Out-of-seat (without permission)", "Playing with non-task items", "Talking out of turn/Interrupting", "Touching/bothering peers' belongings", "Wandering around (not elopement)"].sort(),
        consequences: ["Brief removal from group (if disruptive)", "Loss of rewards/points", "Peer attention (laughter, annoyance)", "Sent to a different seat", "Teacher attention (redirect, reprimand)"].sort()
    },
    "Off-Task Behavior": {
        antecedents: ["Distractions in environment", "Internal distractions (thoughts, fatigue)", "Lack of interest in task", "Long work periods without breaks", "Tasks too easy or too hard", "Unclear instructions"].sort(),
        behaviors: ["Daydreaming/Staring into space", "Doodling (unrelated to task)", "Fiddling with objects (non-task related)", "Getting up to do unrelated things (sharpen pencil repeatedly)", "Looking around the room (not at task)", "Slow task initiation/procrastination"].sort(),
        consequences: ["Less free time later", "Loss of privileges (if work not done)", "Natural consequence (work not completed, doesn't learn material)", "Prompts to focus from adult", "Task simplification (if too hard)"].sort()
    },
    "Property Destruction/Misuse": {
        antecedents: ["Denied access to desired items/activities", "Escape from task", "Frustration/Anger", "Seeking attention", "Unstructured moments"].sort(),
        behaviors: ["Breaking objects (pencils, crayons, toys)", "Drawing/writing on property (desks, walls, books)", "Tearing materials (books, worksheets)", "Throwing objects (not aimed at people, e.g., in frustration)"].sort(),
        consequences: ["Loss of item/access to similar items", "Reprimand/adult attention", "Required cleanup/restitution", "Task delayed or removed", "Time-out"].sort()
    },
    "General / Other": {
        antecedents: ["Academic demand", "Change in routine", "Correction/Feedback", "Denial of access", "Internal state (hungry, tired, anxious)", "Lack of attention", "Peer interaction (positive or negative)", "Presence of specific person/item", "Sensory input (loud noise, bright light)", "Social demand", "Transition", "Unstructured time"].sort(),
        behaviors: ["Crying", "Inappropriate physical contact (non-aggressive)", "Not following social rules", "Pacing", "Refusing to speak", "Whining", "Withdrawing from interaction", "(Specify in anecdotal notes)"].sort(),
        consequences: ["Access to preferred item/activity/person", "Adult attention (positive/negative)", "Comfort", "Escape/Avoidance of task/situation/person", "Ignoring", "Loss of privilege", "Peer attention (positive/negative)", "Removal from area", "Reprimand", "Redirection", "Sensory stimulation (automatic)", "Task modification"].sort()
    }
};

const developmentalLevels = { /* ... Your developmental levels data ... */ };

// --- DOM ELEMENT REFERENCES ---
const studentAgeInput = document.getElementById('studentAge');
const studentGradeSelect = document.getElementById('studentGrade');
const strengthsInterestsResiliencyInput = document.getElementById('strengthsInterestsResiliency');
const reinforcerPreferencesInput = document.getElementById('reinforcerPreferences');
const behavioralSkillsSelect = document.getElementById('behavioralSkillsSelect');
const socialSkillsSelect = document.getElementById('socialSkillsSelect');
const pragmaticLanguageSkillsSelect = document.getElementById('pragmaticLanguageSkillsSelect');
const anecdotalInput = document.getElementById('anecdotal');
const referralInput = document.getElementById('referral');
const generateBIPButton = document.getElementById('generateBIPButton');
const generateBIPSpinner = document.getElementById('generateBIPSpinner');
const bipOutputDiv = document.getElementById('bipOutput');
const bipFunctionHypothesis = document.getElementById('bipFunctionHypothesis');
const bipAntecedentStrategies = document.getElementById('bipAntecedentStrategies');
const bipShortTermBehaviors = document.getElementById('bipShortTermBehaviors');
const bipTeachingStrategies = document.getElementById('bipTeachingStrategies');
const bipReinforcementShortTerm = document.getElementById('bipReinforcementShortTerm');
const bipLongTermBehaviors = document.getElementById('bipLongTermBehaviors');
const bipResponseStrategies = document.getElementById('bipResponseStrategies');
const sessionStatusDisplay = document.getElementById('sessionStatusDisplay');
const addReferralYes = document.getElementById('addReferralYes');
const addReferralNo = document.getElementById('addReferralNo');
const referralInfoContainer = document.getElementById('referralInfoContainer');
const behaviorsContainer = document.getElementById('behaviorsContainer');
const addBehaviorPatternBtn = document.getElementById('addBehaviorPatternBtn');

let behaviorPatternIndex = 0;

// --- CORE API AND DATA GATHERING FUNCTIONS ---

async function getBehaviorPlan(studentDataObject) {
    generateBIPSpinner.classList.remove('hidden');
    generateBIPButton.disabled = true;
    sessionStatusDisplay.textContent = "Generating...";
    hidePlanOutput();

    try {
        const response = await fetch(CLOUD_FUNCTION_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(studentDataObject),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Server error: ${response.status}. ${errorText}`);
        }
        
        const geminiResponse = await response.json();
        const planText = geminiResponse.text;

        if (planText) {
            const sections = parsePlanSections(planText);
            showPlanSections(sections);
            sessionStatusDisplay.textContent = "Active (AI Generated)";
        } else {
            throw new Error("The AI responded, but no valid plan text was found.");
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

function createStudentDataPayload() {
    const behaviorBlocksData = [];
    document.querySelectorAll('.behavior-block').forEach((block) => {
        const blockIndex = block.dataset.behaviorIndex;
        const typeSelect = document.getElementById(`behaviorTypeSelect_${blockIndex}`);
        const antecedentSelect = document.getElementById(`antecedentSelect_${blockIndex}`);
        const behaviorSpecificSelect = document.getElementById(`behaviorSelect_${blockIndex}`);
        const consequenceSelect = document.getElementById(`consequenceSelect_${blockIndex}`);
        const behaviorType = (typeSelect.value === "Other" || typeSelect.value === "General / Other") ? document.getElementById(`behaviorTypeOther_${blockIndex}`).value : typeSelect.value;
        const antecedent = (antecedentSelect.value === "Other") ? document.getElementById(`antecedentOther_${blockIndex}`).value : antecedentSelect.value;
        const specificBehavior = (behaviorSpecificSelect.value === "Other") ? document.getElementById(`behaviorSpecificOther_${blockIndex}`).value : behaviorSpecificSelect.value;
        const consequence = (consequenceSelect.value === "Other") ? document.getElementById(`consequenceOther_${blockIndex}`).value : consequenceSelect.value;
        if (behaviorType || antecedent || specificBehavior || consequence) {
            behaviorBlocksData.push({ type: behaviorType, antecedent, specificBehavior, consequence });
        }
    });

    return {
        age: studentAgeInput.value || 'Not specified',
        grade: studentGradeSelect.value || 'Not specified',
        strengths: strengthsInterestsResiliencyInput.value || 'Not specified',
        reinforcers: reinforcerPreferencesInput.value || 'Not specified',
        anecdotalNotes: anecdotalInput.value || 'No specific anecdotal notes provided.',
        referralInfo: addReferralYes.checked ? (referralInput.value || 'Yes, but no details provided.') : '',
        behavioralLevel: behavioralSkillsSelect.value || 'Not specified',
        socialLevel: socialSkillsSelect.value || 'Not specified',
        pragmaticLevel: pragmaticLanguageSkillsSelect.value || 'Not specified',
        behaviorPatterns: behaviorBlocksData
    };
}

// --- UI HELPER FUNCTIONS ---

function parsePlanSections(planText) {
    const sectionKeys = ["Function Hypothesis Statement", "Antecedent Strategies", "Short-term Replacement Behaviors", "Teaching Strategies for Short-term Replacement Behaviors", "Reinforcement Strategies for Short-term Replacement Behaviors", "Long-term Replacement Behaviors", "Response Strategies for Problem Behavior"];
    const sections = {};
    let currentKey = null;
    const lines = planText.split('\n');
    lines.forEach(line => {
        const trimmedLine = line.trim();
        const matchedKey = sectionKeys.find(key => new RegExp(`^\\*?\\*?${key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\*?\\*?:`).test(trimmedLine));
        if (matchedKey) {
            currentKey = matchedKey;
            sections[currentKey] = trimmedLine.substring(trimmedLine.indexOf(':') + 1).trim();
        } else if (currentKey) {
            sections[currentKey] += '\n' + line;
        }
    });
    for (const key in sections) {
        sections[key] = sections[key].trim();
    }
    return sections;
}

function showPlanSections(sections) {
    const fallbackMsg = "The AI generated a response, but this section was either empty or could not be parsed correctly.";
    bipFunctionHypothesis.innerHTML = (sections["Function Hypothesis Statement"] || fallbackMsg).replace(/\n/g, '<br />');
    bipAntecedentStrategies.innerHTML = (sections["Antecedent Strategies"] || fallbackMsg).replace(/\n/g, '<br />');
    bipShortTermBehaviors.innerHTML = (sections["Short-term Replacement Behaviors"] || fallbackMsg).replace(/\n/g, '<br />');
    bipTeachingStrategies.innerHTML = (sections["Teaching Strategies for Short-term Replacement Behaviors"] || fallbackMsg).replace(/\n/g, '<br />');
    bipReinforcementShortTerm.innerHTML = (sections["Reinforcement Strategies for Short-term Replacement Behaviors"] || fallbackMsg).replace(/\n/g, '<br />');
    bipLongTermBehaviors.innerHTML = (sections["Long-term Replacement Behaviors"] || fallbackMsg).replace(/\n/g, '<br />');
    bipResponseStrategies.innerHTML = (sections["Response Strategies for Problem Behavior"] || fallbackMsg).replace(/\n/g, '<br />');
    bipOutputDiv.classList.remove('hidden');
}

function showErrorOutput(msg) {
    bipFunctionHypothesis.textContent = msg;
    bipAntecedentStrategies.textContent = '';
    bipShortTermBehaviors.textContent = '';
    bipTeachingStrategies.textContent = '';
    bipReinforcementShortTerm.textContent = '';
    bipLongTermBehaviors.textContent = '';
    bipResponseStrategies.textContent = '';
    bipOutputDiv.classList.remove('hidden');
}

function hidePlanOutput() {
    if (bipOutputDiv) bipOutputDiv.classList.add('hidden');
}

function populateSelectWithOptions(selectElement, optionsArray, defaultOptionText) {
    selectElement.innerHTML = `<option value="">${defaultOptionText}</option>`;
    if (optionsArray) {
        optionsArray.forEach(optionText => {
            const option = document.createElement('option');
            option.value = optionText;
            option.textContent = optionText;
            selectElement.appendChild(option);
        });
    }
    selectElement.insertAdjacentHTML('beforeend', '<option value="Other">Other (Specify)</option>');
}

function createBehaviorBlock() {
    const blockIndex = behaviorPatternIndex++;
    const behaviorBlockDiv = document.createElement('div');
    behaviorBlockDiv.className = 'behavior-block';
    behaviorBlockDiv.dataset.behaviorIndex = blockIndex;
    behaviorBlockDiv.innerHTML = `<div class="behavior-block-header"><h3 class="text-lg font-semibold text-gray-700">Behavior Pattern ${blockIndex + 1}</h3>${blockIndex > 0 ? '<button type="button" class="add-remove-btn remove"><i class="fas fa-times mr-2"></i> Remove</button>' : ''}</div><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label for="behaviorTypeSelect_${blockIndex}" class="block text-gray-700 text-sm font-semibold mb-2">Behavior Type</label><select id="behaviorTypeSelect_${blockIndex}" data-other-target="behaviorTypeOther_${blockIndex}"></select><input type="text" id="behaviorTypeOther_${blockIndex}" class="other-input" placeholder="Specify Behavior Type"></div><div><label for="antecedentSelect_${blockIndex}" class="block text-gray-700 text-sm font-semibold mb-2">Antecedent</label><select id="antecedentSelect_${blockIndex}" data-other-target="antecedentOther_${blockIndex}"></select><input type="text" id="antecedentOther_${blockIndex}" class="other-input" placeholder="Specify Antecedent"></div><div><label for="behaviorSelect_${blockIndex}" class="block text-gray-700 text-sm font-semibold mb-2">Specific Behavior</label><select id="behaviorSelect_${blockIndex}" data-other-target="behaviorSpecificOther_${blockIndex}"></select><input type="text" id="behaviorSpecificOther_${blockIndex}" class="other-input" placeholder="Specify Specific Behavior"></div><div><label for="consequenceSelect_${blockIndex}" class="block text-gray-700 text-sm font-semibold mb-2">Typical Consequence</label><select id="consequenceSelect_${blockIndex}" data-other-target="consequenceOther_${blockIndex}"></select><input type="text" id="consequenceOther_${blockIndex}" class="other-input" placeholder="Specify Consequence"></div></div>`;
    behaviorsContainer.insertBefore(behaviorBlockDiv, addBehaviorPatternBtn);
    const behaviorTypeSelect = document.getElementById(`behaviorTypeSelect_${blockIndex}`);
    const antecedentSelect = document.getElementById(`antecedentSelect_${blockIndex}`);
    const behaviorSpecificSelect = document.getElementById(`behaviorSelect_${blockIndex}`);
    const consequenceSelect = document.getElementById(`consequenceSelect_${blockIndex}`);
    populateSelectWithOptions(behaviorTypeSelect, Object.keys(bipData), "Select Behavior Type");
    populateSelectWithOptions(antecedentSelect, bipData["General / Other"].antecedents, "Select Antecedent");
    populateSelectWithOptions(behaviorSpecificSelect, bipData["General / Other"].behaviors, "Select Specific Behavior");
    populateSelectWithOptions(consequenceSelect, bipData["General / Other"].consequences, "Select Consequence");
    [behaviorTypeSelect, antecedentSelect, behaviorSpecificSelect, consequenceSelect].forEach(selectEl => {
        selectEl.addEventListener('change', function () {
            const otherInput = document.getElementById(this.dataset.otherTarget);
            this.value === "Other" ? otherInput.classList.add('active') : otherInput.classList.remove('active');
        });
    });
    behaviorTypeSelect.addEventListener('change', function () {
        const relatedData = bipData[this.value];
        if (relatedData) {
            populateSelectWithOptions(antecedentSelect, relatedData.antecedents, "Select Antecedent");
            populateSelectWithOptions(behaviorSpecificSelect, relatedData.behaviors, "Select Specific Behavior");
            populateSelectWithOptions(consequenceSelect, relatedData.consequences, "Select Consequence");
        }
    });
    if (blockIndex > 0) {
        behaviorBlockDiv.querySelector('.remove').addEventListener('click', () => {
            behaviorBlockDiv.remove();
        });
    }
}

// --- EVENT LISTENERS ---

generateBIPButton.addEventListener('click', () => {
    const studentData = createStudentDataPayload();
    console.log("Sending this data payload to the Cloud Function service:", studentData);
    getBehaviorPlan(studentData);
});

addBehaviorPatternBtn.addEventListener('click', createBehaviorBlock);
addReferralYes.addEventListener('change', () => referralInfoContainer.classList.remove('hidden'));
addReferralNo.addEventListener('change', () => referralInfoContainer.classList.add('hidden'));

document.addEventListener('DOMContentLoaded', () => {
    createBehaviorBlock();
});
