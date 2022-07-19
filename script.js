const container = document.querySelector('.container');
const question_box = document.querySelector('.question-box');
const result_box = document.querySelector('.result-box');
const form = document.querySelector('#form');
const nom = document.getElementById('name');
const email = document.getElementById('email');
const label1 = document.querySelector('#answer1');
const label2 = document.querySelector('#answer2');
const label3 = document.querySelector('#answer3');
const label4 = document.querySelector('#answer4');
const question = document.querySelector('.question');
const question_number = document.querySelector('.question-number');
const block1 = document.querySelectorAll('#question1');
const input_answer = document.querySelectorAll('.question-input');
const firstanwser = document.querySelector('#question1');
const secondtanwser = document.querySelector('#question2');
const thirdanwser = document.querySelector('#question3');
const fourthanwser = document.querySelector('#question4');
const btn_next = document.querySelector('.next');
let progressbar = document.querySelector('.progress-bar');
let numero = 0;
let makechoice = false;
let mychoice = false;
let sec;
let useranswer;
let score;
let questcompteur;

form.addEventListener('submit', event => {
    event.preventDefault();
    myprogressebar();
    validateInputs();
    showQuestion(numero);
    choice();
    numero = 0;
    questcompteur = 0;
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

function setSuccess(element) {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error-message')
    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
    element.classList.add('success');
    element.classList.remove('errors');

}

function isValidEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validateInputs() {
    const usernameValue = nom.value.trim();
    const emailValue = email.value.trim();
    const container = document.querySelector('.container');
    if (usernameValue === '' && emailValue === '') {
        setError(nom, "N'oubliez pas de renseigner votre nom avant de commencer le quiz!");
        setError(email, "N'oubliez pas de renseigner votre nom avant de commencer le quiz!");
    } else if (usernameValue === '') {
        setError(nom, "N'oubliez pas de renseigner votre nom avant de commencer le quiz!");
    } else if (usernameValue.length < 3) {
        setError(nom, "Votre nom doit contenir au moins troi caractères!");
    } else if (emailValue === '') {
        setError(email, "N'oubliez pas de renseigner votre nom avant de commencer le quiz!");
    } else if (!isValidEmail(emailValue)) {
        setError(email, "renseigner un mail correct");
    } else {
        container.classList.add('hide');
        question_box.classList.remove('hide');
    }
}

function showQuestion(index) {
    removecolor();

    question.textContent = questions[index].question;
    question_number.textContent = "Question " + questions[index].number + "/15";
    label1.textContent = questions[index].options[0];
    label2.textContent = questions[index].options[1];
    label3.textContent = questions[index].options[2];
    label4.textContent = questions[index].options[3];
    // for (i = 0; i < 3; i++) {
    //     option[i].setAttribute("onclick", "optionSelected(this)");
    //     console.log(option)
    // }


}

function choice() {
    for (let i = 0; i < 4; i++) {
        if (label1.click) {
            label1.setAttribute("onclick", "monscore(this)");
        }
        if (label2.click) {
            label2.setAttribute("onclick", "monscore(this)");
        }
        if (label3.click) {
            label3.setAttribute("onclick", "monscore(this)");
        }
        if (label4.click) {
            label4.setAttribute("onclick", "monscore(this)");
        }
    }
}

function monscore(dutext) {
    const affiche = dutext.textContent;
    const goodanswer = questions[numero].answer;
    if ((affiche === goodanswer) && (makechoice === false) && (mychoice === false)) {
        score += 1;
        makechoice = true;
        mychoice = true;
    } else if ((affiche != questions[numero].answer) && (makechoice == true) && (mychoice == true)) {
        score -= 1;
        mychoice = false;
        makechoice = false;
    }
}
for (let i = 0; i < 4; i++) {
    input_answer[i].addEventListener("change", () => {
        btn_next.disabled = false;
        changecolor();
        firstanwser.classList.add("decoration");

    })
}

function changecolor() {
    btn_next.classList.add('next_checked');
    btn_next.classList.remove("next");
}

function removecolor() {
    btn_next.classList.remove('next_checked');
    btn_next.classList.add("next");
}

function uploadradio() {
    for (let i = 0; i < 4; i++) {
        input_answer[i].checked = false;
        input_answer[i].checked = false;
        input_answer[i].checked = false;
        input_answer[i].checked = false;
    }
    btn_next.disabled = true;
}

function myprogressebar() {
    sec = 60;
    const timesecond = document.querySelector('.time-left');
    const timer = setInterval(() => {

        timesecond.innerHTML = sec--;

        progressbar.style.width = `${(sec/60)*100}%`
        if (sec == -1) {
            nextquestion();
        };
    }, 1000);
    if ((sec == 0) && (numero == 15)) {
        result();
    }
}

btn_next.addEventListener('click', e => {
    e.preventDefault();
    nextquestion()
})

function nextquestion() {
    makechoice = false;
    mychoice = false;
    sec = 60;
    clearInterval(sec);
    numero += 1;
    makechoice = false
    if (numero == 14) {
        btn_next.value = 'Terminer';
    }
    if (numero < 15) {
        showQuestion(numero);
        uploadradio();
    }
    if (numero == 15) {
        result();
        btn_next.addEventListener('click', e => {
            e.preventDefault();
            result();
        });
    }
}

let quit = document.querySelector('#quit');
quit.addEventListener('click', e => {
    e.preventDefault();
    clearInterval(sec);
    result();
});

function result() {
    clearInterval(sec);
    const gamername = nom.value;
    const gameremail = email.value;
    let source;
    if (score < 8) {
        source = "lost.webp";
    } else {
        source = "win.png";
    }
    let resultat = `

        <div class="result-name">${gamername}</div>
        <div class="result-email">${gameremail}</div>
        <div class="result-icone"><img src="${source}" alt="result" class="img-result"></div><br>
        <div class="result"> ${score}/15</div><br>
        <input type="button" value="Accueil" id="accueil-button" Onclick="accueil()">
    `
    question_box.classList.add('hide');
    result_box.innerHTML = resultat;
    result_box.classList.remove('hide');
    form.reset();
    const errormess = document.querySelector('.error-message');
    errormess.innerHTML = '';
}

function accueil() {
    location.reload();
}