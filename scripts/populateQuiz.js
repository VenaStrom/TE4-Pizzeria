// Global variable to keep track of the question you are on
let questionIndex = 0;

// Adds a single question in the HTML based off of the provided index
const renderQuestion = (questionIndex) => {
    const quizContainer = document.getElementById("question-container");

    // Clear the container
    quizContainer.innerHTML = "";

    // Get the current questions data from the quizData array from the "quizList.js" file
    const quizItem = quizData[questionIndex];

    // Make the question and answers into an HTML element
    const questionDiv = document.createElement("div");
    questionDiv.classList.add("mt-3", "row", "justify-content-center");
    questionDiv.innerHTML = `
    <div class="col-10 col-sm-4">
        <h5 class="Montserrat" id="question">${quizItem.question}</h5>
        <form class="quiz-form Montserrat">
            ${quizItem.answers.map((answer, index) => `
                <div class="form-check">
                    <input class="form-check-input clickable" type="radio" name="answer" id="radioBox${index}" value="${answer}">
                    <label class="form-check-label clickable fst-italic ms-1 Montserrat" id="answer${index}" for="radioBox${index}">
                        ${answer}
                    </label>
                </div>
            `).join("")}
        </form>
        <button class="pt-2 btn custom-btn d-block mx-auto" id="quiz-button">
            <svg xmlns="http://www.w3.org/2000/svg" class="custom-icon" viewBox="0 0 320 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#ffffff" d="M34.5 239L228.9 44.7c9.4-9.4 24.6-9.4 33.9 0l22.7 22.7c9.4 9.4 9.4 24.5 0 33.9L131.5 256l154 154.8c9.3 9.4 9.3 24.5 0 33.9l-22.7 22.7c-9.4 9.4-24.6 9.4-33.9 0L34.5 273c-9.4-9.4-9.4-24.6 0-33.9z"/>                    </svg>
        </button>
    </div>`;

    quizContainer.appendChild(questionDiv);
};

// On every click, check if the clicked element is a one of the answers. If so, move on to the next question
// When all questions have been answered, show a random result :)
document.addEventListener("click", async (event) => {
    if (event.target.classList.contains("clickable")) {
        const radioBox = event.target.parentElement.querySelector("input[type=radio]");
        radioBox.checked = true;

        questionIndex++;

        if (questionIndex >= quizData.length) {
            const quizContainer = document.getElementById("question-container");
            quizContainer.innerHTML = `
            <div class="row justify-content-center mt-3">
                <div class="col-10 col-sm-4">
                    <h5 class="Montserrat text-center">Din pizza är...</h5>
                    <h2 class="display-3 italianno text-center">${(await getRandomPizza()).name}</h2>
                </div>
            </div>
            `;
        } else {
            // Add a slight delay before rendering the next question for a smoother experience
            setTimeout(() => { renderQuestion(questionIndex) }, 500);
        }
    }
});

// Start the quiz by rendering the first question
renderQuestion(questionIndex);