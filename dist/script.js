var questions = [
    {
        question: "What does HTML stand for?",
        options: ["Hyper Trainer Marking Language", "Hyper Text Markup Language", "High Text Markup Language", "Hyper Text Marketing Language"],
        answer: 1
    },
    {
        question: "Which language is used to style web pages?",
        options: ["HTML", "JQuery", "CSS", "XML"],
        answer: 2
    },
    {
        question: "Which one is a JavaScript framework/library?",
        options: ["Laravel", "Django", "React", "Flask"],
        answer: 2
    },
    {
        question: "Which symbol is used for comments in JavaScript?",
        options: ["<!-- -->", "//", "**", "##"],
        answer: 1
    },
    {
        question: "Which method is used to select an element by id in JavaScript?",
        options: ["getElementById()", "querySelectorId()", "getById()", "selectId()"],
        answer: 0
    }
];

var currentQuestion = 0;
var score = 0;
var answered = false;

function startQuiz() {
    currentQuestion = 0;
    score = 0;

    document.getElementById("startScreen").classList.add("hidden");
    document.getElementById("resultScreen").classList.add("hidden");
    document.getElementById("quizScreen").classList.remove("hidden");

    document.getElementById("totalQuestions").textContent = questions.length;

    loadQuestion();
}

function loadQuestion() {
    answered = false;

    var q = questions[currentQuestion];

    document.getElementById("questionNumber").textContent = currentQuestion + 1;
    document.getElementById("questionText").textContent = q.question;
    document.getElementById("feedback").textContent = "";
    document.getElementById("nextBtn").classList.add("hidden");

    // Build the option buttons
    var optionsBox = document.getElementById("optionsBox");
    optionsBox.innerHTML = "";

    for (var i = 0; i < q.options.length; i++) {
        var btn = document.createElement("button");
        btn.textContent = q.options[i];
        btn.className = "border border-gray-300 rounded px-3 py-2 text-left hover:bg-blue-50";
        btn.onclick = function (index) {
            return function () {
                checkAnswer(index);
            };
        }(i);

        optionsBox.appendChild(btn);
    }
}

function checkAnswer(selectedIndex) {
    if (answered === true) {
        return;
    }
    answered = true;

    var q = questions[currentQuestion];
    var feedback = document.getElementById("feedback");
    var buttons = document.getElementById("optionsBox").children;

    if (selectedIndex === q.answer) {
        score = score + 1;
        feedback.textContent = "Correct!";
        feedback.className = "mt-3 text-sm font-medium text-green-600";
        buttons[selectedIndex].classList.add("bg-green-100", "border-green-400");
    } else {
        feedback.textContent = "Wrong! Correct answer: " + q.options[q.answer];
        feedback.className = "mt-3 text-sm font-medium text-red-600";
        buttons[selectedIndex].classList.add("bg-red-100", "border-red-400");
        buttons[q.answer].classList.add("bg-green-100", "border-green-400");
    }

    document.getElementById("nextBtn").classList.remove("hidden");
}

function nextQuestion() {
    currentQuestion = currentQuestion + 1;

    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById("quizScreen").classList.add("hidden");
    document.getElementById("resultScreen").classList.remove("hidden");

    document.getElementById("finalScore").textContent = score + " / " + questions.length;

    var message = "";
    if (score === questions.length) {
        message = "Excellent! Perfect score!";
    } else if (score >= questions.length / 2) {
        message = "Good job! Keep practicing.";
    } else {
        message = "Keep learning, you'll do better next time!";
    }
    document.getElementById("resultMessage").textContent = message;
}

function restartQuiz() {
    document.getElementById("resultScreen").classList.add("hidden");
    document.getElementById("startScreen").classList.remove("hidden");
}