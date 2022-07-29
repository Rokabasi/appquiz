import { questions } from './question.js';
const container = document.querySelector('.container');
const questionContainer = document.querySelector('.question-box');
const resultContainer = document.querySelector('.result-box');
const form = document.querySelector('#form');
const inputName = document.getElementById('name');
const inputEmail = document.getElementById('email');
const firstLabel = document.querySelector('#answer1');
const secondLabel = document.querySelector('#answer2');
const thirdLabel = document.querySelector('#answer3');
const fourthLabel = document.querySelector('#answer4');
const question = document.querySelector('.question');
const questionNumber = document.querySelector('.question-number');
const inputAnswer = document.querySelectorAll('.question-input');
const firstAnswer = document.querySelector('#question1');
const secondAnswer = document.querySelector('#question2');
const thirdAnswer = document.querySelector('#question3');
const fourthAnswer = document.querySelector('#question4');
const btnNext = document.querySelector('.next');
let progressbar = document.querySelector('.progress-bar');
let number = 0;
let makeChoice = false;
let myChoice = false;
let sec = 60;
let score = 0;
let quit = document.querySelector('#quit');
form.addEventListener('submit', event => {
    event.preventDefault();
    myProgessebar();
    validateInputs();
    showQuestion(number);
    number = 0;
    score = 0;
});

function setError(element, message) {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error-message');
    errorDisplay.innerText = message;
    element.classList.add('errors');
    element.classList.remove('success');
    inputControl.classList.add('error');
    inputControl.classList.remove('sucess');
}

function isValidEmail(email) {
    const myRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return myRegex.test(String(email).toLowerCase());
}

function validateInputs() {
    const usernameValue = inputName.value.trim();
    const emailValue = inputEmail.value.trim();
    if (usernameValue === '' && emailValue === '') {
        setError(inputName, "N'oubliez pas de renseigner votre inputName avant de commencer le quiz!");
        setError(inputEmail, "N'oubliez pas de renseigner votre inputName avant de commencer le quiz!");
    } else if (usernameValue === '') {
        setError(inputName, "N'oubliez pas de renseigner votre inputName avant de commencer le quiz!");
    } else if (usernameValue.length < 3) {
        setError(inputName, "Votre inputName doit contenir au moins troi caractères!");
    } else if (emailValue === '') {
        setError(inputEmail, "N'oubliez pas de renseigner votre inputName avant de commencer le quiz!");
    } else if (!isValidEmail(emailValue)) {
        setError(inputEmail, "renseigner un mail correct");
    } else {
        container.classList.add('hide');
        questionContainer.classList.remove('hide');
    }
}

function showQuestion(index) {
    removeColor();
    question.textContent = questions[index].question;
    questionNumber.textContent = "Question " + questions[index].number + "/15";
    firstLabel.textContent = questions[index].options[0];
    secondLabel.textContent = questions[index].options[1];
    thirdLabel.textContent = questions[index].options[2];
    fourthLabel.textContent = questions[index].options[3];
}

function monScore(dutext) {
    const userAnswer = dutext;
    const goodAnswer = questions[number].answer;
    if ((userAnswer === goodAnswer) && (makeChoice === false) && (myChoice === false)) {
        score += 1;
        makeChoice = true;
        myChoice = true;
    } else if ((userAnswer != questions[number].answer) && (makeChoice == true) && (myChoice == true)) {
        score -= 1;
        myChoice = false;
        makeChoice = false;
    }
}
for (let i = 0; i < 4; i++) {
    inputAnswer[i].addEventListener("change", () => {
        btnNext.disabled = false;
        changeColor();
        if (firstAnswer.checked == true) {
            monScore(questions[number].options[0]);
        } else if (secondAnswer.checked == true) {
            monScore(questions[number].options[1]);

        } else if (thirdAnswer.checked == true) {
            monScore(questions[number].options[2]);

        } else if (fourthAnswer.checked == true) {
            monScore(questions[number].options[3]);
        }
        if (document.querySelector('.answer.decoration')) {
            document.querySelector('.answer.decoration').classList.remove('decoration');
        }
        if (inputAnswer[i].checked == true) {
            inputAnswer[i].parentElement.classList.add("decoration")
        }
    })
}

function changeColor() {
    btnNext.classList.add('next_checked');
    btnNext.classList.remove("next");
}

function removeColor() {
    btnNext.classList.remove('next_checked');
    btnNext.classList.add("next");
}

function uploadRadio() {
    for (let i = 0; i < 4; i++) {
        inputAnswer[i].checked = false;
        inputAnswer[i].parentElement.classList.remove("decoration");
    }
    btnNext.disabled = true;
}

function myProgessebar() {
    sec = 60;
    const timeSecond = document.querySelector('.time-left');
    setInterval(() => {
        timeSecond.innerHTML = sec--;
        progressbar.style.width = `${(sec/60)*100}%`
        if (sec == -1) {
            nextquestion();
        };
    }, 1000);
    if ((sec === 0) && (number === 15)) {
        result();
    }
}

btnNext.addEventListener('click', e => {
    e.preventDefault();
    nextquestion()
})

function nextquestion() {

    myChoice = false;
    sec = 60;
    clearInterval(sec);
    number += 1;
    makeChoice = false
    if (number === 14) {
        btnNext.value = 'Terminer';
    }
    if (number < 15) {
        showQuestion(number);
        uploadRadio();
    }
    if (number === 15) {
        result();
        btnNext.addEventListener('click', e => {
            e.preventDefault();
            result();
        });
    }
}


quit.addEventListener('click', e => {
    e.preventDefault();
    clearInterval(sec);
    result();
});

function result() {
    clearInterval(sec);
    const playerName = inputName.value;
    const playerEmail = inputEmail.value;
    let srcImage = "";
    if (score < 8) {
        srcImage = "lost.webp";
    } else {
        srcImage = "win.png";
    }
    let resultat = `
        <div class="result-name">${playerName}</div>
        <div class="result-email">${playerEmail}</div>
        <div class="result-icone"><img src="${srcImage}" alt="result" class="img-result"></div><br>
        <div class="result"> ${score}/15</div><br>
        <input type="button" value="Accueil" id="accueil-button" onclick="location.reload()">
    `
    questionContainer.classList.add('hide');
    resultContainer.innerHTML = resultat;
    resultContainer.classList.remove('hide');
    form.reset();
    const errorMessage = document.querySelector('.error-message');
    errorMessage.innerHTML = '';
}