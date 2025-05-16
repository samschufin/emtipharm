// EMT-I PHARM Game Questions
const questionBank = [
    // Aspirin Questions
    {
        drug: "Aspirin",
        difficulty: "Easy",
        type: "multiple-choice",
        scenario: "54-year-old male with crushing chest pain, BP 138/84, no bleeding/allergy. What do you administer en route?",
        options: [
            "Chew 324 mg (4 × 81 mg) aspirin.",
            "Inject 325 mg aspirin IV.",
            "Administer 650 mg aspirin orally.",
            "No aspirin needed, chest pain is likely muscular."
        ],
        correctAnswer: "Chew 324 mg (4 × 81 mg) aspirin.",
        explanation: "Early ASA decreases mortality in acute coronary syndrome when no contraindication exists. Chewing helps with faster absorption."
    },
    {
        drug: "Aspirin",
        difficulty: "Medium",
        type: "multiple-choice",
        scenario: "Same patient took 325 mg ASA 20 min ago at home. What's your next step?",
        options: [
            "Do not repeat aspirin; document prior dose.",
            "Give another full dose since it's been 20 minutes.",
            "Administer half the dose (162 mg).",
            "Switch to nitroglycerin instead."
        ],
        correctAnswer: "Do not repeat aspirin; document prior dose.",
        explanation: "A single 160–325 mg pre-hospital dose suffices; extra dosing increases bleeding risk without added benefit."
    },

    // Albuterol Questions
    {
        drug: "Albuterol",
        difficulty: "Easy",
        type: "multiple-choice",
        scenario: "Adult with asthma flare, wheezing, SpO₂ 91%. What's the first-line medication and dose?",
        options: [
            "2.5 mg albuterol nebulized in 3 mL NS.",
            "5 mg albuterol nebulized in 5 mL NS.",
            "0.5 mg albuterol IM injection.",
            "1 mg albuterol IV push."
        ],
        correctAnswer: "2.5 mg albuterol nebulized in 3 mL NS.",
        explanation: "2.5 mg (0.5 mL of 0.5% solution) diluted to 3 mL normal saline is the standard EMS nebulizer dose for bronchospasm."
    },
    {
        drug: "Albuterol",
        difficulty: "Medium",
        type: "fill-in-blank",
        scenario: "Patient shows no relief after first nebulizer treatment. How soon can you repeat the treatment?",
        correctAnswer: "immediately",
        acceptableAnswers: ["immediately", "right away", "now", "at once", "0 minutes", "0 mins"],
        explanation: "Back-to-back nebulizer treatments are permitted in severe asthma. Continuous nebulization may be needed for severe symptoms."
    },

    // Amiodarone Questions
    {
        drug: "Amiodarone",
        difficulty: "Hard",
        type: "multiple-choice",
        scenario: "Pediatric 20 kg patient in pulseless VT. What's the appropriate amiodarone dose?",
        options: [
            "5 mg/kg (100 mg) IV/IO",
            "300 mg IV/IO",
            "150 mg IV/IO",
            "2.5 mg/kg (50 mg) IV/IO"
        ],
        correctAnswer: "5 mg/kg (100 mg) IV/IO",
        explanation: "Pediatric dose is weight-based at 5 mg/kg for pulseless VT/VF (maximum 300 mg per dose)."
    },

    // Atropine Questions
    {
        drug: "Atropine",
        difficulty: "Medium",
        type: "select-all",
        scenario: "Select all correct statements about atropine dosing in emergency situations:",
        options: [
            "Adult symptomatic bradycardia dose is 1 mg IV push",
            "Adult symptomatic bradycardia dose is 0.5 mg IV push",
            "Maximum total adult atropine dose is 3 mg",
            "Maximum total adult atropine dose is 6 mg",
            "Pediatric bradycardia dose is 0.02 mg/kg (0.1 mg minimum, 1 mg maximum)",
            "Pediatric bradycardia dose is 0.01 mg/kg (no minimum or maximum)"
        ],
        correctAnswers: [
            "Adult symptomatic bradycardia dose is 1 mg IV push",
            "Maximum total adult atropine dose is 3 mg",
            "Pediatric bradycardia dose is 0.02 mg/kg (0.1 mg minimum, 1 mg maximum)"
        ],
        explanation: "Atropine doses vary by indication: 1 mg for adult bradycardia (up to 3 mg total), and weight-based dosing for pediatrics at 0.02 mg/kg with minimum and maximum limits."
    },

    // Dextrose Questions
    {
        drug: "Dextrose",
        difficulty: "Easy",
        type: "multiple-choice",
        scenario: "Adult with blood glucose level of 28 mg/dL, IV established. What's the appropriate dose?",
        options: [
            "25 g D50 (50 mL of 50% solution)",
            "10 g D50 (20 mL of 50% solution)",
            "50 g D50 (100 mL of 50% solution)",
            "12.5 g D25 (50 mL of 25% solution)"
        ],
        correctAnswer: "25 g D50 (50 mL of 50% solution)",
        explanation: "25 g of D50 is the standard adult dose for severe hypoglycemia when IV access is available."
    },

    // Diphenhydramine Questions
    {
        drug: "Diphenhydramine",
        difficulty: "Hard",
        type: "fill-in-blank",
        scenario: "A 22 kg child presents with hives. What is the appropriate diphenhydramine dose in mg?",
        correctAnswer: "22",
        acceptableAnswers: ["22", "22 mg", "22mg", "21", "21 mg", "21mg", "23", "23 mg", "23mg", "20-25", "20-25 mg"],
        explanation: "Pediatric diphenhydramine dose is 1 mg/kg, so a 22 kg child would receive approximately 22 mg."
    },

    // Epinephrine 1:1,000 Questions
    {
        drug: "Epinephrine 1:1,000",
        difficulty: "Medium",
        type: "multiple-choice",
        scenario: "5-year-old child (20 kg) with anaphylaxis. What's the correct epinephrine 1:1,000 dose?",
        options: [
            "0.2 mg IM (0.01 mg/kg)",
            "0.3 mg IM in lateral thigh",
            "0.15 mg IM via autoinjector only",
            "0.1 mg IV push"
        ],
        correctAnswer: "0.2 mg IM (0.01 mg/kg)",
        explanation: "Pediatric epinephrine for anaphylaxis is weight-based at 0.01 mg/kg, which is 0.2 mg for a 20 kg child."
    },

    // Epinephrine 1:10,000 Questions
    {
        drug: "Epinephrine 1:10,000",
        difficulty: "Hard",
        type: "multiple-choice",
        scenario: "Pediatric cardiac arrest in a 15 kg child. What's the correct epinephrine 1:10,000 dose?",
        options: [
            "0.15 mg IV/IO (0.01 mg/kg)",
            "1 mg IV/IO",
            "0.3 mg IM",
            "0.075 mg IV/IO (0.005 mg/kg)"
        ],
        correctAnswer: "0.15 mg IV/IO (0.01 mg/kg)",
        explanation: "Pediatric epinephrine dose for cardiac arrest is 0.01 mg/kg (0.1 mL/kg of 1:10,000 solution)."
    },

    // Fentanyl Questions
    {
        drug: "Fentanyl",
        difficulty: "Easy",
        type: "matching",
        scenario: "Match the fentanyl doses with their clinical situations:",
        options: [
            "25-50 mcg IV/IO",
            "50-100 mcg IV/IO",
            "1-2 mcg/kg IV/IO",
            "3-4 mcg/kg IN"
        ],
        situations: [
            "Minor pain in hemodynamically stable adults",
            "Severe pain or trauma in adults",
            "Pediatric pain management (IV/IO route)",
            "Pediatric pain when no IV access available"
        ],
        correctPairs: [
            { option: "25-50 mcg IV/IO", situation: "Minor pain in hemodynamically stable adults" },
            { option: "50-100 mcg IV/IO", situation: "Severe pain or trauma in adults" },
            { option: "1-2 mcg/kg IV/IO", situation: "Pediatric pain management (IV/IO route)" },
            { option: "3-4 mcg/kg IN", situation: "Pediatric pain when no IV access available" }
        ],
        explanation: "Fentanyl dosing varies based on patient age, pain severity, and administration route. Lower doses (25-50 mcg) for stable adults with minor pain, higher doses (50-100 mcg) for severe pain, weight-based dosing for pediatrics with IV/IO (1-2 mcg/kg) or intranasal (3-4 mcg/kg) routes."
    },
    {
        drug: "Fentanyl",
        difficulty: "Medium",
        type: "multiple-choice",
        scenario: "What is the maximum recommended total adult dose of fentanyl in the prehospital setting?",
        options: [
            "200 mcg",
            "300 mcg",
            "100 mcg",
            "500 mcg"
        ],
        correctAnswer: "200 mcg",
        explanation: "The maximum total adult dose of fentanyl in the prehospital setting is typically 200 mcg to avoid adverse effects."
    },
    {
        drug: "Fentanyl",
        difficulty: "Hard",
        type: "fill-in-blank",
        scenario: "For pediatric patients, fentanyl dosing is weight-based. What is the appropriate dose range in mcg/kg?",
        correctAnswer: "1-4",
        acceptableAnswers: ["1-4", "1-4 mcg/kg", "1 to 4", "1 to 4 mcg/kg", "1-4mcg/kg"],
        explanation: "Pediatric fentanyl dosing is weight-based at 1-4 mcg/kg, carefully titrated to effect."
    },

    // Glucagon Questions
    {
        drug: "Glucagon",
        difficulty: "Medium",
        type: "multiple-choice",
        scenario: "Suspected beta-blocker overdose, HR 38, BP 70/40. What's the role of glucagon and dose?",
        options: [
            "3-5 mg IV bolus; may repeat",
            "1 mg IM only",
            "10 mg IV drip over 30 minutes",
            "0.5 mg sublingual"
        ],
        correctAnswer: "3-5 mg IV bolus; may repeat",
        explanation: "High-dose glucagon (3-5 mg IV) reverses beta-blocker induced bradycardia and hypotension through non-catecholamine pathways."
    },

    // Oral Glucose Questions
    {
        drug: "Oral Glucose",
        difficulty: "Easy",
        type: "multiple-choice",
        scenario: "Alert diabetic patient with blood glucose of 55 mg/dL who can swallow. What treatment should you administer?",
        options: [
            "15-20 g oral glucose gel",
            "25 g D50 IV",
            "1 mg glucagon IM",
            "500 mL normal saline IV"
        ],
        correctAnswer: "15-20 g oral glucose gel",
        explanation: "For alert patients who can swallow, oral glucose is the preferred treatment, following the '15 g, wait 15 min' rule."
    },

    // Naloxone Questions
    {
        drug: "Naloxone",
        difficulty: "Medium",
        type: "fill-in-blank",
        scenario: "You're administering intranasal naloxone to an unresponsive adult with suspected opioid overdose. What's the standard IN dose in mg?",
        correctAnswer: "2",
        acceptableAnswers: ["2", "2 mg", "2mg", "2.0", "2.0 mg", "2.0mg"],
        explanation: "The standard intranasal dose is 2 mg (typically 1 mg per nostril) for adults with suspected opioid overdose."
    },

    // Nitroglycerin Questions
    {
        drug: "Nitroglycerin",
        difficulty: "Hard",
        type: "multiple-choice",
        scenario: "Chest pain patient reports taking sildenafil (Viagra) 4 hours ago. Should you administer nitroglycerin?",
        options: [
            "Contraindicated—withhold nitroglycerin",
            "Give half the usual dose (0.2 mg)",
            "Give the standard dose (0.4 mg)",
            "Give double the dose (0.8 mg)"
        ],
        correctAnswer: "Contraindicated—withhold nitroglycerin",
        explanation: "PDE-5 inhibitors like sildenafil (Viagra) combined with nitroglycerin can cause severe, life-threatening hypotension. This combination is contraindicated."
    },

    // Ondansetron Questions
    {
        drug: "Ondansetron",
        difficulty: "Medium",
        type: "fill-in-blank",
        scenario: "A 4-year-old child weighing 20 kg is experiencing vomiting. What's the appropriate ondansetron dose in mg?",
        correctAnswer: "2",
        acceptableAnswers: ["2", "2 mg", "2mg", "2.0", "2.0 mg", "2.0mg"],
        explanation: "Pediatric ondansetron dose is 0.1 mg/kg, so a 20 kg child would receive 2 mg IV/IM."
    },

    // Oxygen Questions
    {
        drug: "Oxygen",
        difficulty: "Easy",
        type: "multiple-choice",
        scenario: "COPD patient with SpO₂ 88% on room air. What oxygen flow and device should you use?",
        options: [
            "2 L/min nasal cannula titrated to 90-94%",
            "15 L/min non-rebreather mask",
            "6 L/min nasal cannula",
            "No oxygen needed until SpO₂ drops below 85%"
        ],
        correctAnswer: "2 L/min nasal cannula titrated to 90-94%",
        explanation: "COPD patients are at risk for hypercapnic respiratory failure with high-flow oxygen. Start with low-flow and titrate to a target of 88-92%."
    },

    // Sodium Bicarbonate Questions
    {
        drug: "Sodium Bicarbonate",
        difficulty: "Hard",
        type: "select-all",
        scenario: "Select all correct pairings of sodium bicarbonate indications with their rationales:",
        options: [
            "TCA overdose - Narrows wide QRS complexes through alkalinization",
            "TCA overdose - Shifts potassium into cells temporarily",
            "Hyperkalemic arrest - Shifts potassium into cells temporarily",
            "Hyperkalemic arrest - Narrows wide QRS complexes through alkalinization",
            "Prolonged cardiac arrest - May help with severe acidosis after extended resuscitation",
            "Prolonged cardiac arrest - Increases effectiveness of vasopressors"
        ],
        correctAnswers: [
            "TCA overdose - Narrows wide QRS complexes through alkalinization",
            "Hyperkalemic arrest - Shifts potassium into cells temporarily",
            "Prolonged cardiac arrest - May help with severe acidosis after extended resuscitation"
        ],
        explanation: "Sodium bicarbonate has multiple uses: it narrows QRS in TCA overdose through alkalinization, shifts potassium into cells in hyperkalemia, and may help with acidosis during prolonged resuscitation."
    },

    // Scenario-based mixed questions
    {
        drug: "Multiple Drugs",
        difficulty: "Hard",
        type: "multiple-choice",
        scenario: "You arrive on scene to find a 68-year-old male with chest pain radiating to the left arm. He's pale, diaphoretic, with BP 160/100, HR 100, and currently on warfarin for atrial fibrillation. He mentions having dark, tarry stools yesterday. Which medication is contraindicated?",
        options: [
            "Aspirin",
            "Nitroglycerin",
            "Oxygen",
            "Fentanyl"
        ],
        correctAnswer: "Aspirin",
        explanation: "The patient has signs of GI bleeding (tarry stools) and is on an anticoagulant (warfarin). Aspirin would increase bleeding risk and is contraindicated."
    },
    {
        drug: "Multiple Drugs",
        difficulty: "Medium",
        type: "multiple-choice",
        scenario: "You're treating a 35-year-old with difficulty breathing after a bee sting. The patient has hives, facial swelling, and BP 88/60. After administering epinephrine, what's your next medication priority?",
        options: [
            "Secure airway, then administer diphenhydramine 50 mg IV",
            "Albuterol nebulizer treatment",
            "Ondansetron for potential nausea",
            "Atropine for potential bradycardia"
        ],
        correctAnswer: "Secure airway, then administer diphenhydramine 50 mg IV",
        explanation: "In anaphylaxis, after epinephrine, securing the airway is priority, followed by diphenhydramine as an important adjunct therapy to help with the histamine response."
    },
    
    // Additional Easy Questions
    {
        drug: "Oxygen",
        difficulty: "Easy",
        type: "multiple-choice",
        scenario: "Trauma patient with SpO₂ 92%, breathing rapidly. What oxygen delivery method is most appropriate?",
        options: [
            "15 L/min via non-rebreather mask",
            "2 L/min via nasal cannula",
            "No oxygen needed with SpO₂ > 90%",
            "Bag-valve mask only"
        ],
        correctAnswer: "15 L/min via non-rebreather mask",
        explanation: "Trauma patients should receive high-flow oxygen via non-rebreather mask to ensure adequate oxygenation during the stress response."
    },
    {
        drug: "Naloxone",
        difficulty: "Easy",
        type: "multiple-choice",
        scenario: "Unconscious patient with pinpoint pupils and respiratory rate of 6/min. First-line treatment?",
        options: [
            "2 mg naloxone intranasal",
            "50 mL D50 IV",
            "1 mg atropine IV",
            "100 mg thiamine IV"
        ],
        correctAnswer: "2 mg naloxone intranasal",
        explanation: "The signs suggest opioid overdose. Intranasal naloxone is a rapid, non-invasive route for first-line treatment."
    },

    // Select All That Apply Question Examples
    {
        drug: "Multiple",
        difficulty: "Medium",
        type: "select-all",
        scenario: "Select all medications that are classified as vasopressors:",
        options: [
            "Epinephrine",
            "Dopamine",
            "Albuterol",
            "Norepinephrine",
            "Aspirin",
            "Atropine"
        ],
        correctAnswers: [
            "Epinephrine",
            "Dopamine",
            "Norepinephrine"
        ],
        explanation: "Vasopressors increase blood pressure by causing vasoconstriction. Epinephrine, dopamine, and norepinephrine are all classified as vasopressors. Albuterol is a bronchodilator, aspirin is an antiplatelet/analgesic, and atropine is an anticholinergic."
    },
    {
        drug: "Multiple",
        difficulty: "Hard",
        type: "select-all",
        scenario: "Your patient is experiencing anaphylaxis. Select all appropriate medications for this emergency:",
        options: [
            "Epinephrine 1:1,000",
            "Diphenhydramine",
            "Albuterol",
            "Aspirin",
            "Atropine",
            "Methylprednisolone"
        ],
        correctAnswers: [
            "Epinephrine 1:1,000",
            "Diphenhydramine",
            "Albuterol",
            "Methylprednisolone"
        ],
        explanation: "Treatment for anaphylaxis includes: Epinephrine 1:1,000 (first-line), diphenhydramine (antihistamine), albuterol (for bronchospasm), and methylprednisolone (corticosteroid). Aspirin and atropine are not indicated for anaphylaxis."
    },
    {
        drug: "Multiple",
        difficulty: "Easy",
        type: "select-all",
        scenario: "Select all medications that are contraindicated in patients with sulfa allergies:",
        options: [
            "Bactrim (Trimethoprim/Sulfamethoxazole)",
            "Lasix (Furosemide)",
            "Aspirin",
            "Celebrex (Celecoxib)",
            "Epinephrine",
            "Morphine"
        ],
        correctAnswers: [
            "Bactrim (Trimethoprim/Sulfamethoxazole)",
            "Lasix (Furosemide)",
            "Celebrex (Celecoxib)"
        ],
        explanation: "Patients with sulfa allergies should avoid sulfonamide antibiotics like Bactrim and sometimes other sulfonamide-containing drugs like Lasix (furosemide) and Celebrex (celecoxib). Aspirin, epinephrine, and morphine do not contain sulfonamides."
    }
]; 