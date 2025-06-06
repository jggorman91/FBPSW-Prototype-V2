export const bipData = {
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
            "General / Other": { // For when behavior type is "Other"
                antecedents: [
                    "Academic demand", "Change in routine", "Correction/Feedback", "Denial of access",
                    "Internal state (hungry, tired, anxious)", "Lack of attention", "Peer interaction (positive or negative)",
                    "Presence of specific person/item", "Sensory input (loud noise, bright light)",
                    "Social demand", "Transition", "Unstructured time"
                ].sort(),
                behaviors: [ // User will rely more on anecdotal notes for "Other" behaviors
                    "Crying", "Inappropriate physical contact (non-aggressive)", "Not following social rules",
                    "Pacing", "Refusing to speak", "Whining", "Withdrawing from interaction",
                    "(Specify in anecdotal notes)"
                ].sort(),
                consequences: [
                    "Access to preferred item/activity/person", "Adult attention (positive/negative)", "Comfort",
                    "Escape/Avoidance of task/situation/person", "Ignoring", "Loss of privilege",
                    "Peer attention (positive/negative)", "Removal from area", "Reprimand", "Redirection",
                    "Sensory stimulation (automatic)", "Task modification"
                ].sort()
            }
        };
