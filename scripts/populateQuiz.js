// Global variable to keep track of the question you are on
let questionIndex = 0;

// Adds a single question in the HTML based off of the provided index
const renderQuestion = (questionIndex) => {
    if (questionIndex >= quizData.length) { return; }

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