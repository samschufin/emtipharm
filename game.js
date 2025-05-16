// EMT-I PHARM Game Logic
document.addEventListener('DOMContentLoaded', () => {
    // Game elements
    const titleScreen = document.getElementById('title-screen');
    const gameScreen = document.getElementById('game-screen');
    const resultsScreen = document.getElementById('results-screen');
    const startButton = document.getElementById('start-button');
    const scoreDisplay = document.getElementById('score');
    const questionCounter = document.getElementById('question-counter');
    const difficultyLevel = document.getElementById('difficulty-level');
    const scenarioText = document.getElementById('scenario-text');
    const optionsContainer = document.getElementById('options-container');
    const multipleChoice = document.getElementById('multiple-choice');
    const selectAll = document.getElementById('select-all');
    const selectAllOptionsContainer = document.getElementById('select-all-options-container');
    const submitSelectAll = document.getElementById('submit-select-all');
    const fillInBlank = document.getElementById('fill-in-blank');
    const blankAnswer = document.getElementById('blank-answer');
    const submitBlank = document.getElementById('submit-blank');
    const termMatching = document.getElementById('term-matching');
    const termsContainer = document.getElementById('terms-container');
    const definitionsContainer = document.getElementById('definitions-container');
    const feedbackContainer = document.getElementById('feedback-container');
    const feedbackText = document.getElementById('feedback-text');
    const nextQuestionButton = document.getElementById('next-question');
    const finalScore = document.getElementById('final-score');
    const resultMessage = document.getElementById('result-message');
    const playAgainButton = document.getElementById('play-again');
    const progressBar = document.getElementById('progress-bar');
    const ambulance = document.getElementById('ambulance');
    const progressContainer = document.getElementById('progress-container');

    // Create submit button for multiple choice questions
    const submitMultipleChoice = document.createElement('button');
    submitMultipleChoice.id = 'submit-multiple-choice';
    submitMultipleChoice.textContent = 'Submit';
    submitMultipleChoice.addEventListener('click', checkMultipleChoiceAnswer);
    multipleChoice.appendChild(submitMultipleChoice);

    // Create submit button for term matching questions
    const submitTermMatching = document.createElement('button');
    submitTermMatching.id = 'submit-term-matching';
    submitTermMatching.textContent = 'Submit';
    submitTermMatching.addEventListener('click', checkTermMatchSubmit);
    termMatching.appendChild(submitTermMatching);

    // Game state
    let currentQuestions = [];
    let currentQuestionIndex = 0;
    let score = 0;
    let correctAnswers = 0;
    let currentDifficulty = 'Easy'; // Track current difficulty level
    let consecutiveCorrect = 0;     // Track consecutive correct answers
    let consecutiveWrong = 0;       // Track consecutive wrong answers
    let selectedTerm = null;
    let selectedDefinition = null;
    let matchedPairs = 0;
    let totalPairs = 0;
    let ambulanceInterval;
    let selectedOption = null;      // Track selected multiple choice option

    // Start game
    startButton.addEventListener('click', startGame);
    
    // Next question button
    nextQuestionButton.addEventListener('click', () => {
        feedbackContainer.classList.add('hidden');
        currentQuestionIndex++;
        
        // Check if we've gone through all questions currently in the pool
        if (currentQuestionIndex < currentQuestions.questions.length) {
            displayQuestion();
        } else if (currentQuestionIndex < 20) {
            // If we've gone through all questions in the pool but need more to reach 20
            // Get the next question based on adaptive difficulty
            const nextQuestion = getNextQuestion();
            
            // Add it to the questions array
            currentQuestions.questions.push(nextQuestion);
            
            // Display the new question
            displayQuestion();
        } else {
            // If we've reached 20 questions, show results
            showResults();
        }
    });
    
    // Submit answer for select-all-that-apply
    submitSelectAll.addEventListener('click', checkSelectAllAnswer);
    
    // Submit answer for fill-in-blank
    submitBlank.addEventListener('click', checkFillInBlankAnswer);
    
    // Play again button
    playAgainButton.addEventListener('click', startGame);

    // Prepare questions for the adaptive difficulty system
    function prepareProgressiveQuestions() {
        // Split questions by difficulty
        const easyQuestions = questionBank.filter(q => q.difficulty === 'Easy');
        const mediumQuestions = questionBank.filter(q => q.difficulty === 'Medium');
        const hardQuestions = questionBank.filter(q => q.difficulty === 'Hard');
        
        // Shuffle each array
        const shuffledEasy = [...easyQuestions].sort(() => 0.5 - Math.random());
        const shuffledMedium = [...mediumQuestions].sort(() => 0.5 - Math.random());
        const shuffledHard = [...hardQuestions].sort(() => 0.5 - Math.random());
        
        // Initialize with easy questions to start with
        // We'll dynamically select more questions based on player performance
        // We ensure there are enough questions of each difficulty to cover all 20 questions
        // even if player performs exceptionally well or poorly
        
        // Select all questions but keep them separated by difficulty
        const easyPool = shuffledEasy;
        const mediumPool = shuffledMedium;
        const hardPool = shuffledHard;
        
        // Start with first 5 easy questions to begin the game
        const initialQuestions = easyPool.slice(0, 5);
        
        // We'll add more questions dynamically based on performance
        // using the remaining pools of questions
        
        return {
            questions: initialQuestions,
            remainingEasy: easyPool.slice(5),
            remainingMedium: mediumPool,
            remainingHard: hardPool
        };
    }

    // Add ambulance "driving" animation
    function startAmbulanceAnimation() {
        // Clear any existing interval
        if (ambulanceInterval) {
            clearInterval(ambulanceInterval);
        }
        
        // Make sure the ambulance is properly positioned
        ambulance.style.left = '5px';
        
        // Ensure hospital is positioned properly
        const hospital = document.getElementById('hospital');
        
        // Create bouncing animation for ambulance
        let animationStep = 0;
        const bounceSteps = 20; // More steps for smoother animation
        const bounceHeight = 8; // Increased bounce height for larger ambulance
        
        ambulanceInterval = setInterval(() => {
            // Calculate vertical position using sine wave for smooth bouncing
            const bounce = Math.sin(animationStep / bounceSteps * Math.PI) * bounceHeight;
            // Add slight rotation to simulate vehicle suspension
            const rotation = (bounce > 0) ? 1.5 : -1.5;
            
            // Apply the transform - translateY for bounce, rotate for suspension effect
            ambulance.style.transform = `translateY(calc(-50% - ${bounce}px)) rotate(${rotation}deg)`;
            
            // Increment the animation step
            animationStep = (animationStep + 1) % (bounceSteps * 2);
        }, 50); // Faster interval for smoother animation
    }

    // Start the game
    function startGame() {
        // Reset game state
        currentQuestionIndex = 0;
        score = 0;
        correctAnswers = 0;
        consecutiveCorrect = 0;
        consecutiveWrong = 0;
        currentDifficulty = 'Easy';
        scoreDisplay.textContent = `Score: ${score}`;
        progressBar.style.width = '0%';
        
        // Reset ambulance position
        ambulance.style.left = '5px';
        ambulance.style.visibility = 'visible';
        
        // Get questions pool with adaptive difficulty
        currentQuestions = prepareProgressiveQuestions();
        
        // Hide title screen, show game screen
        titleScreen.classList.add('hidden');
        resultsScreen.classList.add('hidden');
        gameScreen.classList.remove('hidden');
        
        // Start ambulance animation
        startAmbulanceAnimation();
        
        // Display first question
        displayQuestion();
    }

    // Display current question
    function displayQuestion() {
        const question = currentQuestions.questions[currentQuestionIndex];
        questionCounter.textContent = `Question: ${currentQuestionIndex + 1}/20`;
        difficultyLevel.textContent = `Difficulty: ${question.difficulty}`;
        scenarioText.textContent = question.scenario;
        
        // Hide all question types first
        multipleChoice.classList.add('hidden');
        selectAll.classList.add('hidden');
        fillInBlank.classList.add('hidden');
        termMatching.classList.add('hidden');
        
        // Display the question based on its type
        switch (question.type) {
            case 'multiple-choice':
                displayMultipleChoice(question);
                break;
            case 'select-all':
                displaySelectAll(question);
                break;
            case 'fill-in-blank':
                displayFillInBlank(question);
                break;
            case 'term-matching':
                displayTermMatching(question);
                break;
        }
    }

    // Display multiple choice question
    function displayMultipleChoice(question) {
        multipleChoice.classList.remove('hidden');
        optionsContainer.innerHTML = '';
        selectedOption = null; // Reset selected option
        
        // Shuffle options to randomize order
        const shuffledOptions = [...question.options].sort(() => 0.5 - Math.random());
        
        shuffledOptions.forEach(option => {
            const optionElement = document.createElement('div');
            optionElement.classList.add('option');
            optionElement.textContent = option;
            optionElement.addEventListener('click', () => {
                // Remove 'selected' class from all options
                document.querySelectorAll('.option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                
                // Add 'selected' class to this option
                optionElement.classList.add('selected');
                
                // Store the selected option
                selectedOption = option;
            });
            
            optionsContainer.appendChild(optionElement);
        });
        
        // Make sure the submit button is visible and re-attached after clearing container
        multipleChoice.appendChild(submitMultipleChoice);
    }

    // Display select-all-that-apply question
    function displaySelectAll(question) {
        selectAll.classList.remove('hidden');
        selectAllOptionsContainer.innerHTML = '';
        
        // Shuffle options to randomize order
        const shuffledOptions = [...question.options].sort(() => 0.5 - Math.random());
        
        shuffledOptions.forEach(option => {
            const optionElement = document.createElement('div');
            optionElement.classList.add('select-option');
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = `option-${option.replace(/\s+/g, '-')}`;
            checkbox.value = option;
            
            const label = document.createElement('label');
            label.htmlFor = checkbox.id;
            label.textContent = option;
            
            optionElement.appendChild(checkbox);
            optionElement.appendChild(label);
            selectAllOptionsContainer.appendChild(optionElement);
        });
    }

    // Display fill-in-blank question
    function displayFillInBlank(question) {
        fillInBlank.classList.remove('hidden');
        blankAnswer.value = '';
        blankAnswer.focus();
        
        // Press Enter to submit
        blankAnswer.addEventListener('keyup', function(event) {
            if (event.key === 'Enter') {
                checkFillInBlankAnswer();
            }
        });
    }

    // Display term matching question
    function displayTermMatching(question) {
        termMatching.classList.remove('hidden');
        termsContainer.innerHTML = '';
        definitionsContainer.innerHTML = '';
        selectedTerm = null;
        selectedDefinition = null;
        matchedPairs = 0;
        totalPairs = question.terms.length;
        
        // Shuffle terms and definitions
        const shuffledTerms = [...question.terms].sort(() => 0.5 - Math.random());
        const shuffledDefinitions = [...question.definitions].sort(() => 0.5 - Math.random());
        
        // Create term elements
        shuffledTerms.forEach(term => {
            const termElement = document.createElement('div');
            termElement.classList.add('term');
            termElement.textContent = term;
            termElement.dataset.term = term;
            termElement.addEventListener('click', () => {
                // Skip if already matched
                if (termElement.classList.contains('matched')) return;
                
                // Remove 'selected' class from all terms
                document.querySelectorAll('.term').forEach(t => {
                    if (!t.classList.contains('matched')) {
                        t.classList.remove('selected');
                    }
                });
                
                // Add 'selected' class to this term
                termElement.classList.add('selected');
                selectedTerm = term;
            });
            
            termsContainer.appendChild(termElement);
        });
        
        // Create definition elements
        shuffledDefinitions.forEach(definition => {
            const definitionElement = document.createElement('div');
            definitionElement.classList.add('definition');
            definitionElement.textContent = definition;
            definitionElement.dataset.definition = definition;
            definitionElement.addEventListener('click', () => {
                // Skip if already matched
                if (definitionElement.classList.contains('matched')) return;
                
                // Remove 'selected' class from all definitions
                document.querySelectorAll('.definition').forEach(d => {
                    if (!d.classList.contains('matched')) {
                        d.classList.remove('selected');
                    }
                });
                
                // Add 'selected' class to this definition
                definitionElement.classList.add('selected');
                selectedDefinition = definition;
            });
            
            definitionsContainer.appendChild(definitionElement);
        });

        // Make sure the submit button is visible and re-attached after clearing container
        termMatching.appendChild(submitTermMatching);
    }

    // Submit button handler for term matching
    function checkTermMatchSubmit() {
        if (!selectedTerm || !selectedDefinition) return;
        
        const question = currentQuestions.questions[currentQuestionIndex];
        checkTermMatch(question);
    }

    // Check term match
    function checkTermMatch(question) {
        // Find the selected term and definition elements
        const termElement = document.querySelector(`.term.selected`);
        const definitionElement = document.querySelector(`.definition.selected`);
        
        // Sanity check that both elements exist
        if (!termElement || !definitionElement) return;
        
        // Find the term index in the question's terms array
        const termIndex = question.terms.indexOf(selectedTerm);
        
        // Check if the selected definition matches the term
        const isCorrect = question.definitions[termIndex] === selectedDefinition;
        
        if (isCorrect) {
            // Mark this pair as matched
            termElement.classList.remove('selected');
            definitionElement.classList.remove('selected');
            termElement.classList.add('matched');
            definitionElement.classList.add('matched');
            
            // Clear selections
            selectedTerm = null;
            selectedDefinition = null;
            
            // Increment matched pairs
            matchedPairs++;
            
            // Check if all pairs are matched
            if (matchedPairs === totalPairs) {
                // All pairs matched, this question is correct
                // Update the score
                const pointValue = question.difficulty === 'Easy' ? 1 : (question.difficulty === 'Medium' ? 2 : 3);
                score += pointValue;
                scoreDisplay.textContent = `Score: ${score}`;
                correctAnswers++;
                
                // Update consecutive counters
                consecutiveCorrect++;
                consecutiveWrong = 0;
                
                // Show feedback
                showFeedback(true, question.explanation);
                
                // Update progress
                updateProgress();
            }
        } else {
            // Show that match was incorrect
            termElement.classList.add('incorrect');
            definitionElement.classList.add('incorrect');
            
            // Remove incorrect styling after a delay
            setTimeout(() => {
                termElement.classList.remove('incorrect', 'selected');
                definitionElement.classList.remove('incorrect', 'selected');
                selectedTerm = null;
                selectedDefinition = null;
            }, 800);
            
            // If all attempts have been made but not all pairs are matched
            // Consider this as a failed attempt at the entire question
            if (termElement.dataset.attempts === undefined) {
                termElement.dataset.attempts = '1';
            } else {
                termElement.dataset.attempts = (parseInt(termElement.dataset.attempts) + 1).toString();
            }
            
            // If player has made excessive attempts, consider question failed
            if (parseInt(termElement.dataset.attempts) >= 5) {
                // Update consecutive counters
                consecutiveCorrect = 0;
                consecutiveWrong++;
                
                // Show feedback
                showFeedback(false, question.explanation);
                
                // Update progress
                updateProgress();
            }
        }
    }

    // Check multiple choice answer
    function checkMultipleChoiceAnswer() {
        // If no option is selected, do nothing
        if (!selectedOption) return;
        
        const question = currentQuestions.questions[currentQuestionIndex];
        const isCorrect = selectedOption === question.correctAnswer;
        
        // Update the score
        if (isCorrect) {
            // Scoring based on difficulty (Easy = 1 point, Medium = 2 points, Hard = 3 points)
            const pointValue = question.difficulty === 'Easy' ? 1 : (question.difficulty === 'Medium' ? 2 : 3);
            score += pointValue;
            scoreDisplay.textContent = `Score: ${score}`;
            correctAnswers++;
            
            // Update consecutive counters
            consecutiveCorrect++;
            consecutiveWrong = 0;
        } else {
            // Update consecutive counters
            consecutiveCorrect = 0;
            consecutiveWrong++;
        }
        
        // Show feedback
        showFeedback(isCorrect, question.explanation);
        
        // Update progress
        updateProgress();
    }

    // Check select-all-that-apply answer
    function checkSelectAllAnswer() {
        const question = currentQuestions.questions[currentQuestionIndex];
        const selectedOptions = [];
        
        // Get all selected options
        document.querySelectorAll('#select-all-options-container input[type="checkbox"]:checked').forEach(checkbox => {
            selectedOptions.push(checkbox.value);
        });
        
        // Check if selected options match the correct answers
        // The arrays need to have the same length and contain the same items
        const isCorrect = 
            selectedOptions.length === question.correctAnswers.length && 
            selectedOptions.every(option => question.correctAnswers.includes(option));
        
        // Update the score
        if (isCorrect) {
            // Scoring based on difficulty (Easy = 1 point, Medium = 2 points, Hard = 3 points)
            const pointValue = question.difficulty === 'Easy' ? 1 : (question.difficulty === 'Medium' ? 2 : 3);
            score += pointValue;
            scoreDisplay.textContent = `Score: ${score}`;
            correctAnswers++;
            
            // Update consecutive counters
            consecutiveCorrect++;
            consecutiveWrong = 0;
        } else {
            // Update consecutive counters
            consecutiveCorrect = 0;
            consecutiveWrong++;
        }
        
        // Show feedback
        showFeedback(isCorrect, question.explanation);
        
        // Update progress
        updateProgress();
    }

    // Check fill-in-blank answer
    function checkFillInBlankAnswer() {
        const question = currentQuestions.questions[currentQuestionIndex];
        const userAnswer = blankAnswer.value.trim().toLowerCase();
        const isCorrect = question.acceptableAnswers.some(answer => 
            userAnswer === answer.toLowerCase());
        
        // Update the score
        if (isCorrect) {
            // Scoring based on difficulty (Easy = 1 point, Medium = 2 points, Hard = 3 points)
            const pointValue = question.difficulty === 'Easy' ? 1 : (question.difficulty === 'Medium' ? 2 : 3);
            score += pointValue;
            scoreDisplay.textContent = `Score: ${score}`;
            correctAnswers++;
            
            // Update consecutive counters
            consecutiveCorrect++;
            consecutiveWrong = 0;
        } else {
            // Update consecutive counters
            consecutiveCorrect = 0;
            consecutiveWrong++;
        }
        
        // Show feedback
        showFeedback(isCorrect, question.explanation);
        
        // Update progress
        updateProgress();
    }

    // Show feedback modal
    function showFeedback(isCorrect, explanation) {
        feedbackText.innerHTML = `
            <div class="${isCorrect ? 'correct' : 'incorrect'}">
                <p><strong>${isCorrect ? 'Correct!' : 'Incorrect'}</strong></p>
                <p>${explanation}</p>
            </div>
        `;
        
        feedbackContainer.classList.remove('hidden');
    }

    // Update progress bar
    function updateProgress() {
        const progress = ((currentQuestionIndex + 1) / 20) * 100;
        progressBar.style.width = `${progress}%`;
        
        // Get the hospital element for distance calculation
        const hospital = document.getElementById('hospital');
        
        // Position the ambulance based on progress
        const containerWidth = progressContainer.clientWidth;
        const progressWidth = (progress / 100) * containerWidth;
        const ambulanceWidth = ambulance.width || 120; // Updated to double size
        const hospitalWidth = (hospital && hospital.width) || 60; // Updated for better visibility
        
        // Make sure the ambulance doesn't go past the hospital
        const maxPosition = containerWidth - ambulanceWidth - hospitalWidth - 30; // Extra margin increased
        const position = Math.min(progressWidth, maxPosition);
        
        // Update the ambulance position with a smoother animation
        if (position > 5) {
            ambulance.style.transition = 'left 0.5s ease-in-out';
            ambulance.style.left = `${position}px`;
        } else {
            ambulance.style.left = '5px';
        }
        
        // Make ambulance blink when it reaches hospital at the end
        if (progress >= 100) {
            setTimeout(() => {
                // Ambulance reached hospital - make it blink
                clearInterval(ambulanceInterval);
                let blinkCount = 0;
                const blinkInterval = setInterval(() => {
                    ambulance.style.visibility = ambulance.style.visibility === 'hidden' ? 'visible' : 'hidden';
                    blinkCount++;
                    if (blinkCount > 5) {
                        clearInterval(blinkInterval);
                        ambulance.style.visibility = 'visible';
                    }
                }, 300);
            }, 500);
        }
    }

    // Show results screen
    function showResults() {
        // Stop ambulance animation
        if (ambulanceInterval) {
            clearInterval(ambulanceInterval);
        }
        
        gameScreen.classList.add('hidden');
        resultsScreen.classList.remove('hidden');
        
        const maxScore = 20 * 3; // If all hard questions were answered correctly
        const percentage = Math.round((score / maxScore) * 100);
        
        finalScore.textContent = `Your Score: ${score} points (${correctAnswers}/20 questions correct)`;
        
        if (percentage >= 90) {
            resultMessage.textContent = "Amazing! You're ready for the field!";
        } else if (percentage >= 75) {
            resultMessage.textContent = "Great job! You've got a strong understanding of EMT medications.";
        } else if (percentage >= 60) {
            resultMessage.textContent = "Good effort! Keep studying to improve your knowledge.";
        } else {
            resultMessage.textContent = "You need more practice. Keep studying your medications!";
        }
    }

    // Update function to get next question based on adaptive difficulty
    function getNextQuestion() {
        const pools = currentQuestions;
        let nextQuestion;
        
        // Logic for difficulty progression based on player performance
        if (consecutiveCorrect >= 2) {
            // Player got 2-3 questions correct in a row, increase difficulty
            consecutiveCorrect = 0;
            consecutiveWrong = 0;
            
            if (currentDifficulty === 'Easy' && pools.remainingMedium.length > 0) {
                currentDifficulty = 'Medium';
                nextQuestion = pools.remainingMedium.shift();
            } else if (currentDifficulty === 'Medium' && pools.remainingHard.length > 0) {
                currentDifficulty = 'Hard';
                nextQuestion = pools.remainingHard.shift();
            } else if (pools.remainingEasy.length > 0) {
                // If we can't increase difficulty, use a question from current level
                nextQuestion = getQuestionFromCurrentLevel(pools);
            } else {
                // Fallback if no more questions at desired level
                nextQuestion = getAnyRemainingQuestion(pools);
            }
            
        } else if (consecutiveWrong >= 2) {
            // Player got 2 questions wrong at current level, decrease difficulty
            consecutiveCorrect = 0;
            consecutiveWrong = 0;
            
            if (currentDifficulty === 'Hard' && pools.remainingMedium.length > 0) {
                currentDifficulty = 'Medium';
                nextQuestion = pools.remainingMedium.shift();
            } else if (currentDifficulty === 'Medium' && pools.remainingEasy.length > 0) {
                currentDifficulty = 'Easy';
                nextQuestion = pools.remainingEasy.shift();
            } else {
                // If we can't decrease difficulty, use a question from current level
                nextQuestion = getQuestionFromCurrentLevel(pools);
            }
            
        } else {
            // Occasionally mix in an easier question (20% chance)
            // This keeps the game from getting too consistently difficult
            const mixEasier = Math.random() < 0.2;
            
            if (mixEasier && currentDifficulty !== 'Easy' && pools.remainingEasy.length > 0) {
                nextQuestion = pools.remainingEasy.shift();
            } else {
                // Otherwise use a question from current level
                nextQuestion = getQuestionFromCurrentLevel(pools);
            }
        }
        
        return nextQuestion;
    }
    
    // Helper function to get a question from current difficulty level
    function getQuestionFromCurrentLevel(pools) {
        if (currentDifficulty === 'Easy' && pools.remainingEasy.length > 0) {
            return pools.remainingEasy.shift();
        } else if (currentDifficulty === 'Medium' && pools.remainingMedium.length > 0) {
            return pools.remainingMedium.shift();
        } else if (currentDifficulty === 'Hard' && pools.remainingHard.length > 0) {
            return pools.remainingHard.shift();
        } else {
            // If no questions at current level, get any remaining question
            return getAnyRemainingQuestion(pools);
        }
    }
    
    // Helper function to get any remaining question
    function getAnyRemainingQuestion(pools) {
        if (pools.remainingEasy.length > 0) {
            return pools.remainingEasy.shift();
        } else if (pools.remainingMedium.length > 0) {
            return pools.remainingMedium.shift();
        } else if (pools.remainingHard.length > 0) {
            return pools.remainingHard.shift();
        } else {
            // No more questions available - this shouldn't happen
            // but just in case, create a simple emergency question
            return {
                difficulty: 'Easy',
                type: 'multiple-choice',
                scenario: 'Emergency fallback question: What medication would you administer for chest pain?',
                options: ['Aspirin', 'Epinephrine', 'Narcan', 'Atropine'],
                correctAnswer: 'Aspirin',
                explanation: 'Aspirin is indicated for chest pain suspected to be cardiac in origin.'
            };
        }
    }
}); 