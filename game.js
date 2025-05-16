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
    const feedbackContainer = document.getElementById('feedback-container');
    const feedbackText = document.getElementById('feedback-text');
    const nextQuestionButton = document.getElementById('next-question');
    const finalScore = document.getElementById('final-score');
    const resultMessage = document.getElementById('result-message');
    const playAgainButton = document.getElementById('play-again');
    const progressBar = document.getElementById('progress-bar');
    const ambulance = document.getElementById('ambulance');
    const progressContainer = document.getElementById('progress-container');
    
    // Add matching question type elements
    const matching = document.getElementById('matching');
    const matchingOptionsContainer = document.getElementById('matching-options-container');
    const matchingSituationsContainer = document.getElementById('matching-situations-container');
    const submitMatching = document.getElementById('submit-matching');

    // Create submit button for multiple choice questions
    const submitMultipleChoice = document.createElement('button');
    submitMultipleChoice.id = 'submit-multiple-choice';
    submitMultipleChoice.textContent = 'Submit';
    submitMultipleChoice.addEventListener('click', checkMultipleChoiceAnswer);
    multipleChoice.appendChild(submitMultipleChoice);

    // Game state
    let currentQuestions = [];
    let currentQuestionIndex = 0;
    let score = 0;
    let correctAnswers = 0;
    let currentDifficulty = 'Easy'; // Track current difficulty level
    let consecutiveCorrect = 0;     // Track consecutive correct answers
    let consecutiveWrong = 0;       // Track consecutive wrong answers
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
        matching.classList.add('hidden');
        
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
            case 'matching':
                displayMatching(question);
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

    // Display matching question
    function displayMatching(question) {
        matching.classList.remove('hidden');
        matchingOptionsContainer.innerHTML = '';
        matchingSituationsContainer.innerHTML = '';
        
        // Create the options container (left side)
        const optionsDiv = document.createElement('div');
        optionsDiv.classList.add('matching-column');
        
        // Create the situations container (right side)
        const situationsDiv = document.createElement('div');
        situationsDiv.classList.add('matching-column');
        
        // Create a container for the selected pairs
        const pairsContainer = document.createElement('div');
        pairsContainer.id = 'matching-pairs-container';
        pairsContainer.classList.add('matching-pairs');
        
        // Create option elements (left side)
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.classList.add('matching-option');
            optionElement.textContent = option;
            optionElement.dataset.option = option;
            optionElement.dataset.selected = 'false';
            
            optionElement.addEventListener('click', function() {
                // Reset all options selection state
                document.querySelectorAll('.matching-option').forEach(opt => {
                    opt.classList.remove('selected');
                    opt.dataset.selected = 'false';
                });
                
                // Select this option
                this.classList.add('selected');
                this.dataset.selected = 'true';
                
                // Check if a situation is also selected
                const selectedSituation = document.querySelector('.matching-situation[data-selected="true"]');
                if (selectedSituation) {
                    // Create a pair
                    addMatchingPair(this.dataset.option, selectedSituation.dataset.situation);
                    
                    // Reset selections
                    this.classList.remove('selected');
                    this.dataset.selected = 'false';
                    selectedSituation.classList.remove('selected');
                    selectedSituation.dataset.selected = 'false';
                }
            });
            
            optionsDiv.appendChild(optionElement);
        });
        
        // Create situation elements (right side)
        question.situations.forEach((situation, index) => {
            const situationElement = document.createElement('div');
            situationElement.classList.add('matching-situation');
            situationElement.textContent = situation;
            situationElement.dataset.situation = situation;
            situationElement.dataset.selected = 'false';
            
            situationElement.addEventListener('click', function() {
                // Reset all situations selection state
                document.querySelectorAll('.matching-situation').forEach(sit => {
                    sit.classList.remove('selected');
                    sit.dataset.selected = 'false';
                });
                
                // Select this situation
                this.classList.add('selected');
                this.dataset.selected = 'true';
                
                // Check if an option is also selected
                const selectedOption = document.querySelector('.matching-option[data-selected="true"]');
                if (selectedOption) {
                    // Create a pair
                    addMatchingPair(selectedOption.dataset.option, this.dataset.situation);
                    
                    // Reset selections
                    this.classList.remove('selected');
                    this.dataset.selected = 'false';
                    selectedOption.classList.remove('selected');
                    selectedOption.dataset.selected = 'false';
                }
            });
            
            situationsDiv.appendChild(situationElement);
        });
        
        // Add the columns to the containers
        matchingOptionsContainer.appendChild(optionsDiv);
        matchingSituationsContainer.appendChild(situationsDiv);
        
        // Add the pairs container
        matching.appendChild(pairsContainer);
        
        // Function to add a matching pair
        function addMatchingPair(option, situation) {
            // Check if the pair already exists
            const existingPairs = document.querySelectorAll('.matching-pair');
            for (const pair of existingPairs) {
                if (pair.dataset.option === option || pair.dataset.situation === situation) {
                    // Remove the existing pair if either the option or situation is being reused
                    pair.remove();
                }
            }
            
            // Create the pair element
            const pairElement = document.createElement('div');
            pairElement.classList.add('matching-pair');
            pairElement.dataset.option = option;
            pairElement.dataset.situation = situation;
            
            // Create option part
            const optionPart = document.createElement('div');
            optionPart.classList.add('pair-option');
            optionPart.textContent = option;
            
            // Create arrow
            const arrow = document.createElement('div');
            arrow.classList.add('pair-arrow');
            arrow.textContent = '→';
            
            // Create situation part
            const situationPart = document.createElement('div');
            situationPart.classList.add('pair-situation');
            situationPart.textContent = situation;
            
            // Create remove button
            const removeButton = document.createElement('button');
            removeButton.classList.add('pair-remove');
            removeButton.innerHTML = '&times;';
            removeButton.addEventListener('click', function() {
                pairElement.remove();
            });
            
            // Add parts to the pair element
            pairElement.appendChild(optionPart);
            pairElement.appendChild(arrow);
            pairElement.appendChild(situationPart);
            pairElement.appendChild(removeButton);
            
            // Add the pair to the container
            pairsContainer.appendChild(pairElement);
        }
        
        // Add submit button
        if (!submitMatching.parentNode) {
            matching.appendChild(submitMatching);
        }
        
        // Add event listener for submit button
        submitMatching.onclick = checkMatchingAnswer;
    }
    
    // Check matching answer
    function checkMatchingAnswer() {
        const question = currentQuestions.questions[currentQuestionIndex];
        const pairs = document.querySelectorAll('.matching-pair');
        
        // If not all pairs have been created, don't check yet
        if (pairs.length < question.correctPairs.length) {
            alert("Please match all options with their situations.");
            return;
        }
        
        // Check if all pairs are correct
        let isCorrect = true;
        for (const pair of pairs) {
            const option = pair.dataset.option;
            const situation = pair.dataset.situation;
            
            // Find if this pair is in the correct pairs
            const correctPair = question.correctPairs.find(cp => 
                cp.option === option && cp.situation === situation
            );
            
            if (!correctPair) {
                isCorrect = false;
                break;
            }
        }
        
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
        
        // Check if selected options match correct answers
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
        
        // Check if the user's answer matches any of the acceptable answers
        const isCorrect = question.acceptableAnswers.some(answer => 
            userAnswer === answer.toLowerCase()
        );
        
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

    // Show feedback after answering
    function showFeedback(isCorrect, explanation) {
        feedbackContainer.classList.remove('hidden');
        feedbackText.textContent = isCorrect ? 
            `Correct! ${explanation}` : 
            `Incorrect. ${explanation}`;
        feedbackContainer.className = isCorrect ? 'feedback correct' : 'feedback incorrect';
    }

    // Update progress bar and ambulance position
    function updateProgress() {
        const progress = (currentQuestionIndex + 1) / 20 * 100;
        progressBar.style.width = `${progress}%`;
        
        // Calculate ambulance position
        // We want the ambulance to move from 5px to about 90% of the container width
        const containerWidth = progressContainer.offsetWidth;
        const maxAmbulanceTravel = containerWidth * 0.9;
        const ambulancePosition = (progress / 100) * maxAmbulanceTravel;
        
        // Apply the new position
        ambulance.style.left = `${ambulancePosition}px`;
        
        // Adjust difficulty based on performance
        if (consecutiveCorrect >= 3) {
            // Increase difficulty if player gets 3 consecutive correct answers
            if (currentDifficulty === 'Easy') {
                currentDifficulty = 'Medium';
            } else if (currentDifficulty === 'Medium') {
                currentDifficulty = 'Hard';
            }
            // Reset counter
            consecutiveCorrect = 0;
        } else if (consecutiveWrong >= 2) {
            // Decrease difficulty if player gets 2 consecutive wrong answers
            if (currentDifficulty === 'Hard') {
                currentDifficulty = 'Medium';
            } else if (currentDifficulty === 'Medium') {
                currentDifficulty = 'Easy';
            }
            // Reset counter
            consecutiveWrong = 0;
        }
    }

    // Show final results
    function showResults() {
        // Hide game screen, show results screen
        gameScreen.classList.add('hidden');
        resultsScreen.classList.remove('hidden');
        
        // Calculate percentage score
        const percentage = Math.round((correctAnswers / 20) * 100);
        finalScore.textContent = `${correctAnswers}/20 (${percentage}%)`;
        
        // Determine result message based on score
        if (percentage >= 90) {
            resultMessage.textContent = "Outstanding! You're ready for the field!";
        } else if (percentage >= 80) {
            resultMessage.textContent = "Great job! Just a bit more study needed.";
        } else if (percentage >= 70) {
            resultMessage.textContent = "Good effort! Review the medications you missed.";
        } else {
            resultMessage.textContent = "More study needed. Keep practicing!";
        }
        
        // Stop ambulance animation
        if (ambulanceInterval) {
            clearInterval(ambulanceInterval);
        }
    }

    // Get next question based on adaptive difficulty
    function getNextQuestion() {
        // Get the pools of remaining questions
        const pools = {
            easy: currentQuestions.remainingEasy,
            medium: currentQuestions.remainingMedium,
            hard: currentQuestions.remainingHard
        };
        
        // Select a question based on the current difficulty level
        let question;
        
        // Try to get a question from the current difficulty level
        question = getQuestionFromCurrentLevel(pools);
        
        // If no questions available at the current difficulty, get any remaining question
        if (!question) {
            question = getAnyRemainingQuestion(pools);
        }
        
        // If still no question (unlikely), create a default question
        if (!question) {
            console.warn("No more questions available in the question bank!");
            // Create a default emergency question
            question = {
                drug: "Emergency",
                difficulty: "Medium",
                type: "multiple-choice",
                scenario: "What's the universal emergency number in the US?",
                options: ["911", "999", "112", "000"],
                correctAnswer: "911",
                explanation: "911 is the universal emergency number in the United States."
            };
        }
        
        return question;
    }

    // Get a question from the current difficulty level
    function getQuestionFromCurrentLevel(pools) {
        const pool = currentDifficulty === 'Easy' ? pools.easy : 
                    (currentDifficulty === 'Medium' ? pools.medium : pools.hard);
        
        if (pool && pool.length > 0) {
            // Get the first question from the pool
            const question = pool.shift();
            return question;
        }
        
        return null;
    }

    // Get any remaining question from any difficulty level
    function getAnyRemainingQuestion(pools) {
        // Try each difficulty level in order of preference
        const difficultyLevels = ['easy', 'medium', 'hard'];
        
        for (const level of difficultyLevels) {
            if (pools[level] && pools[level].length > 0) {
                return pools[level].shift();
            }
        }
        
        return null;
    }
}); 