const populateQuiz = () => {
    let currentQuestionIndex = 0;

    const quizContainer = document.getElementById('quiz-container');
    const prevButton = document.createElement('button');

    prevButton.innerText = 'Previous';
    prevButton.classList.add('btn', 'btn-secondary', 'mb-4');

    prevButton.addEventListener('click', () => {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            displayQuestion();
        }
    });

    function displayQuestion() {
        quizContainer.innerHTML = ''; // Clear previous content

        const quizItem = quizData[currentQuestionIndex];
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('mb-4', 'p-4', 'Montserrat', 'quiz-question');
        questionDiv.innerHTML = `
            <div class="col-12">
                <h3 class="pb-2">${quizItem.question}</h3>
                <form class="quiz-form Montserrat">
                    ${quizItem.answers.map((answer, index) => `
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="answer" id="answer${index}" value="${answer}">
                            <label class="form-check-label" for="answer${index}">
                                ${answer}
                            </label>
                        </div>
                    `).join('')}
                </form>
            </div>`;

        quizContainer.appendChild(questionDiv);
        quizContainer.appendChild(prevButton);

        const form = questionDiv.querySelector('.quiz-form');
        form.addEventListener('change', () => {
            setTimeout(() => {
                if (currentQuestionIndex < quizData.length - 1) {
                    currentQuestionIndex++;
                    displayQuestion();
                }
            }, 500); // 500 milliseconds delay
        });
    }

    // Initial display
    displayQuestion();
};

populateQuiz();