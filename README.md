# EMT-I PHARM Game

An interactive 8-bit style game to help EMT-I students learn medications through scenarios and questions.

## Overview

This game helps you study the medications learned in an EMT-I program through fun, interactive questions. The game features:

- 20 questions per game that progress from Easy to Medium to Hard
- Multiple question types (multiple choice, fill-in-blank, term matching)
- Submit button for every question type to confirm your answer
- Helpful explanations for both correct and incorrect answers
- 8-bit retro gaming style with an ambulance that moves along a progress bar
- Scoring based on difficulty (Easy = 1 point, Medium = 2 points, Hard = 3 points)

## How to Run the Game

### Method 1: Using Node.js (Recommended)

1. Make sure you have [Node.js](https://nodejs.org/) installed on your computer
2. Open a command prompt or terminal in the game folder
3. Run the server with the command:
   ```
   node server.js
   ```
4. Open your web browser and go to: http://localhost:3000

### Method 2: Open Directly in Browser

Simply double-click on the `index.html` file to open it directly in your web browser.

## How to Play

1. Click the "START GAME" button on the title screen
2. Read each scenario carefully
3. Select your answer:
   - For multiple choice: Click the correct option
   - For fill-in-blank: Type your answer
   - For term matching: Click a term, then click the matching definition
4. Click the "Submit" button to confirm your answer
5. After answering, you'll see feedback explaining the correct answer
6. Click "Next Question" to continue
7. The game will start with easy questions and progress to more difficult ones
8. Watch the ambulance move along the progress bar as you advance
9. After 20 questions, you'll see your final score and feedback

## Progress Bar with Ambulance and Hospital

The game features an 8-bit style progress tracker:

- An ambulance icon starts on the left side of the progress bar
- A hospital icon appears on the right side of the progress bar
- As you answer questions, the ambulance "drives" toward the hospital
- The ambulance has a subtle bouncing animation to create visual interest
- The progress bar represents your journey through the 20 questions
- When you complete all questions, the ambulance reaches the hospital and blinks to celebrate

This visual element adds fun to the learning experience while clearly showing how far you've progressed through the game.

## Question Types

The game includes the following types of questions:

1. **Multiple Choice**: Select the best option from the given choices and click the Submit button
2. **Select All That Apply**: Choose all correct options from a list and click the Submit button
3. **Fill in the Blank**: Type in the correct answer (dosage, medication, etc.) and click the Submit button

Questions focus on important medication knowledge:
- Dosing questions (proper medication amounts and concentrations)
- Drug Classification questions (understanding medication categories)
- Contraindication questions (when medications should NOT be given)

Each question is presented with a clinical scenario to help you understand the real-world application of these medications.

## Difficulty Progression

The game features an adaptive difficulty system that responds to your performance:

- Questions start at Easy difficulty
- Getting 2-3 consecutive correct answers advances you to a higher difficulty level
- Getting 2 consecutive wrong answers at a difficulty level moves you back down a level
- Lower-level questions are occasionally mixed in to maintain engagement and reinforce learning
- This dynamic progression ensures the game remains challenging but not frustrating

This adaptive approach helps you build confidence with basic concepts while gradually introducing more complex scenarios based on your demonstrated knowledge.

## Medications Covered

- Aspirin
- Albuterol
- Amiodarone
- Atropine
- Dextrose
- Diazepam
- Diphenhydramine
- Epinephrine (1:1,000 and 1:10,000)
- Fentanyl
- Glucagon
- Oral Glucose
- Ipratropium Bromide
- Lidocaine
- Atropine/2-PAM (Mark-1 Kit)
- Morphine
- Naloxone
- Nitroglycerin
- Ondansetron
- Oxygen
- Sodium Bicarbonate

## Credits

This game was created to help EMT-I students learn medications through interactive scenarios based on the EMT-I curriculum. 