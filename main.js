const letters = 'qwertyuiopasdfghjklzxcvbnm';
const arrLetters = Array.from(letters).sort();
const wordsObj = {
  programming: ["php", "javascript", "go", "scala", "fortran", "r", "mysql", "python"],
  movies: ["Prestige", "Inception", "Parasite", "Interstellar", "Whiplash", "Memento", "Coco", "Up"],
  people: ["Albert Einstein", "Hitchcock", "Alexander", "Cleopatra", "Mahatma Ghandi"],
  countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"]
};
const worldFrom = document.querySelector('.category span');
const lettersContainer = document.querySelector('.letters');
const guessContainer = document.querySelector('.letters-guess');
const hangmanDraw = document.querySelector('.hangman-draw');



// Create [Span] of [arrLetters] & [Append] in [lettersContainer]
createLetter(lettersContainer);

// Random [Key]&[Value] from [object]
let randomKey,randomValue,randomValueValue;
randomWorld(wordsObj);

// add [randomKey] to [worldFrom]
worldFrom.innerHTML = randomKey;

// Creat [Spans] in [Guess] form randomValueValue
lettersGuess(randomValueValue, guessContainer);

//Event =>>> [check & Click]
checkClick();

//
function createLetter(target) {

  arrLetters.forEach((letter) => {

    let span = document.createElement('span');
    let text = document.createTextNode(letter);
    span.className = 'letter-box';
    span.appendChild(text);
    target.appendChild(span);

  })

}
function randomWorld(obj) {

  let objKey = Object.keys(obj);
  let random = Math.floor(Math.random() * objKey.length);
  randomKey = objKey[random]; //key
  randomValue = obj[randomKey]; // value
  let randomOfvalue = Math.floor(Math.random() * randomValue.length)
  randomValueValue = obj[randomKey][randomOfvalue].toLowerCase(); // valueValue 

}
function lettersGuess(valuelength , target) {

  let arr = Array.from(valuelength);

  arr.forEach(ele => {

    let span = document.createElement('span');

    if (ele === ' ') {
      span.classList.add('with-space');
    }

    target.appendChild(span);

  })

}
function checkClick() {

  let allSpanLetter = document.querySelectorAll('.letters .letter-box');
  let allSpanLetterGuess = document.querySelectorAll('.letters-guess span');
  let guessedWord = Array.from(randomValueValue);
  let conter = 0;


  allSpanLetter.forEach(ele => {

    ele.addEventListener('click', (e) => {
      let theStatus = false;
      ele.classList.add('clicked');
      let clickValue = ele.textContent;

      guessedWord.forEach((letter, index) => {

        if (letter === clickValue) {
          allSpanLetterGuess[index].innerHTML = clickValue;
          theStatus = true;
        }
      });

      if (theStatus !== true) {
        conter++;
        hangmanDraw.classList.add(`wrong-${conter}`);
      }

      if (conter === 8) {
        endGame('GameOver');
      }

      winGame();
    });

  });
}
function endGame(status) {

  lettersContainer.classList.add("finished");

  setTimeout(() => {
    let div = document.createElement("div");
    let divText = document.createTextNode(`${status}, The Word Is ${randomValueValue}`);
    div.appendChild(divText);
    div.className = 'popup';
    document.body.appendChild(div);
    setTimeout(()=> window.location.reload(),1000);
  },1000);


}
function winGame() {
  
  let guess = Array.from(document.querySelectorAll('.letters-guess span'));
  let counter = 0;

  let rightWord = guess.filter((ele) => {
    if (ele.textContent !== '') {
      return ele; 
    }
  });

  guess.forEach((ele) => {
    if (ele.classList.contains('with-space')) {
      counter++;
    }
  })

  if (guess.length - counter === rightWord.length) {
    endGame('Good Job');
  }
}