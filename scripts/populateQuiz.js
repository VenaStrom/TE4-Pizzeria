const populateQuiz = () => {
    let currentQuestionIndex = 0;

    const quizContainer = document.getElementById('question-container');
    

    function displayQuestion() {
        quizContainer.innerHTML = ''; // Clear previous content

        const quizItem = quizData[currentQuestionIndex];
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('mt-3','row', 'justify-content-center');
        questionDiv.innerHTML = `
            <div class="col-10 col-sm-4">
                <h5 class="Montserrat" id="question">${quizItem.question}</h5>
                <form class="quiz-form Montserrat">
                    ${quizItem.answers.map((answer, index) => `
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="answer" id="radioBox${index}" value="${answer}">
                            <label class="form-check-label fst-italic ms-1 Montserrat" id="answer${index}" for="radioBox${index}">
                                ${answer}
                            </label>
                        </div>
                    `).join('')}
                </form>
                <button class="pt-2 btn custom-btn d-block mx-auto" id="quiz-button">
                    <svg xmlns="http://www.w3.org/2000/svg" class="custom-icon" viewBox="0 0 320 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#ffffff" d="M34.5 239L228.9 44.7c9.4-9.4 24.6-9.4 33.9 0l22.7 22.7c9.4 9.4 9.4 24.5 0 33.9L131.5 256l154 154.8c9.3 9.4 9.3 24.5 0 33.9l-22.7 22.7c-9.4 9.4-24.6 9.4-33.9 0L34.5 273c-9.4-9.4-9.4-24.6 0-33.9z"/>                    </svg>
                </button>
            </div>`;

        quizContainer.appendChild(questionDiv);

        const form = questionDiv.querySelector('.quiz-form');
        form.addEventListener('change', () => {
            setTimeout(() => {
                if (currentQuestionIndex < quizData.length - 1) {
                    currentQuestionIndex++;
                    displayQuestion();
                }
            }, 500); // 500 milliseconds delay
        });
        const button = questionDiv.querySelector('#quiz-button');
        button.addEventListener('click', () => {
            if (currentQuestionIndex > 0) {
                currentQuestionIndex--;
                displayQuestion();
            }
        });
    }

    // Initial display
    displayQuestion();
};

populateQuiz();