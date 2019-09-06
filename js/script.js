window.onload = function() {
  let keyboard = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "ñ",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z"
  ];

  let wordsArr = [
    "archiperres",
    "ardora",
    "adefesio",
    "allende",
    "azafate",
    "cachivache",
    "correveidile",
    "cuchipanda",
    "entelequia",
    "floripondio",
    "lechuguino",
    "melifluo",
    "paparrucha",
    "pardiez",
    "picaflor",
    "plumier",
    "pocholo",
    "tarambana"
  ];
  let hints = [
    "trasto, cosa inútil",
    "fosforescencia del mar que indica la presencia de un banco de sardinas",
    "persona o cosa ridícula, extravagante o muy fea",
    "más allá de",
    "canastillo, bandeja o fuente con borde de poca altura",
    "cosa rota o inservible",
    "persona que lleva y trae cuentos y chismes",
    "comida que toman juntas y regocijadamente varias personas",
    "cosa irreal",
    "flor grande que suele figurar en adornos de mal gusto",
    "muchacho imberbe que se mete a galantear aparentando ser hombre hecho",
    "que tiene miel o es parecido a ella en sus propiedades",
    "noticia falsa y desatinada de un suceso, esparcida entre el vulgo",
    "par Dios",
    "frívolo inconstante",
    "caja o estuche que sirve para guardar plumas, lápices, etc",
    "bonito, atractivo o agradable",
    "persona alocada, de poco juicio"
  ];
  let drawArray = [
    rightLeg,
    leftLeg,
    rightArm,
    leftArm,
    body,
    head,
    fourthLine,
    thirdLine,
    secondLine,
    firstLine
  ];

  let word;
  let chosenWord;
  let guess;
  let guesses = [];
  let lives;
  let counter;
  let space;

  let stickman = document.getElementById("canvas");
  let ctx = stickman.getContext("2d");
  const w = 300;
  const h = 300;
  stickman.setAttribute("width", `${w}px`);
  stickman.setAttribute("height", `${h}px`);

  let letterButtons;
  let letters;
  let list;
  let wordHolder;
  let letterSpaces;
  let count = 60;
  let time;
  let intervalID;

  let showLives = document.getElementById("lives");
  let showClue = document.getElementById("clue");
  let showClock = document.getElementById("time");
  let showButton = document.getElementById("reset");
  // let finalMessage = document.getElementById("message");

  // hangman
  // first line
  function firstLine() {
    drawOnCanvas(30, 270, 270, 270);
  }
  // second line
  function secondLine() {
    drawOnCanvas(30, 30, 30, 270);
  }
  // third line
  function thirdLine() {
    drawOnCanvas(30, 30, 150, 30);
  }
  //fourth line
  function fourthLine() {
    drawOnCanvas(150, 30, 150, 70);
  }
  // head
  function head() {
    ctx.beginPath();
    ctx.strokeStyle = "#1f3a93";
    ctx.arc(150, 85, 15, 0, Math.PI * 2);
    ctx.stroke();
    ctx.closePath();
  }
  // body
  function body() {
    drawOnCanvas(150, 100, 150, 150);
  }

  // left arm
  function leftArm() {
    drawOnCanvas(150, 100, 180, 100);
  }

  // right arm
  function rightArm() {
    drawOnCanvas(120, 100, 150, 100);
  }

  // left leg
  function leftLeg() {
    drawOnCanvas(150, 150, 180, 180);
  }

  // right leg
  function rightLeg() {
    drawOnCanvas(120, 180, 150, 150);
  }

  // animate stickman
  function animate() {
    var drawStickman = lives;
    drawArray[drawStickman]();
  }

  // canvas
  function canvas() {
    ctx.strokeStyle = "#1f3a93";
    ctx.lineCap = "round";
    ctx.lineWidth = 2.5;
  }

  function drawOnCanvas(pathFromX, pathFromY, pathToX, pathToY) {
    intervalID = setInterval(() => {
      if (pathFromX < pathToX && pathFromY == pathToY) {
        ctx.beginPath();
        ctx.moveTo(pathFromX, pathFromY);
        ctx.lineTo(pathFromX++, pathToY);
        ctx.stroke();
        ctx.closePath();
      } else if (pathFromX == pathToX && pathFromY < pathToY) {
        ctx.beginPath();
        ctx.moveTo(pathFromX, pathFromY);
        ctx.lineTo(pathToX, pathFromY++);
        ctx.stroke();
        ctx.closePath();
      } else if (pathFromX < pathToX && pathFromY < pathToY) {
        ctx.beginPath();
        ctx.moveTo(pathFromX, pathFromY);
        ctx.lineTo(pathFromX++, pathFromY++);
        ctx.stroke();
        ctx.closePath();
      } else if (pathFromX < pathToX && pathFromY > pathToY) {
        ctx.beginPath();
        ctx.moveTo(pathFromX, pathFromY);
        ctx.lineTo(pathFromX++, pathFromY--);
        ctx.stroke();
        ctx.closePath();
      }
    }, 1);
  }

  // Alphabet buttons

  function buttons() {
    letterButtons = document.getElementById("buttons");
    letters = document.createElement("ul");

    for (let i = 0; i < keyboard.length; i++) {
      letters.id = "keyboard";
      list = document.createElement("li");
      list.id = "letter";
      list.innerHTML = keyboard[i];
      check();
      letterButtons.appendChild(letters);
      letters.appendChild(list);
    }
  }

  //Word holder

  function answer() {
    wordHolder = document.getElementById("hold");
    letterSpaces = document.createElement("ul");

    for (let i = 0; i < word.length; i++) {
      letterSpaces.setAttribute("id", "my-word");
      guess = document.createElement("li");

      if (word[i] === "-") {
        guess.innerHTML = "-";
        space = 1;
      } else {
        guess.innerHTML = "_";
      }

      guesses.push(guess);
      wordHolder.appendChild(letterSpaces);
      letterSpaces.appendChild(guess);
    }
  }

  //Hints

  function hint() {
    let hintIndex = wordsArr.indexOf(chosenWord);
    showClue.innerHTML = "DEFINICIÓN: " + hints[hintIndex] + ".";
  }

  //Check matches

  function check() {
    list.onclick = function() {
      let guess = this.innerHTML;
      this.onclick = null;
      for (let i = 0; i < word.length; i++) {
        if (word[i] === guess) {
          guesses[i].innerHTML = guess;
          counter++;
        }
      }
      let j = word.indexOf(guess);
      if (j === -1) {
        lives--;
        comments();
        animate();
      } else {
        comments();
      }
    };
  }

  // Comments

  function comments() {
    showLives.setAttribute("id", "answer");
    showLives.innerHTML = "Te quedan " + lives + " oportunidades";
  }

  // Play game

  function play() {
    chosenWord = wordsArr[Math.floor(Math.random() * wordsArr.length)];
    word = chosenWord.replace(/\s/g, "-");
    buttons();

    guesses = [];
    lives = 10;
    counter = 0;
    space = 0;
    answer();
    canvas();
    comments();
    hint();
    startCount();
    hideButton();
  }
  play();

  function timedCount() {
    showClock.innerHTML = count + " segundos";
    count = count - 1;
    time = setTimeout(timedCount, 1000);

    if (lives < 1 || count === -1) {
      showLives.setAttribute("id", "message");
      showLives.innerHTML = "¡Has perdido!";
      letterSpaces.setAttribute("id", "answer");
      letterSpaces.innerHTML =
        "La respuesta correcta es: " + chosenWord.toUpperCase();
      clearTimeout(time);
      stopGame();
    } else if (counter + space === guesses.length) {
      showLives.setAttribute("id", "message");
      showLives.innerHTML = "¡Muy listo!";
      clearTimeout(time);
      stopGame();
    }
  }

  function startCount() {
    timedCount();
  }

  function resetCount() {
    clearTimeout(time);
    count = 60;
  }

  function hideButton() {
    showButton.style.display = "none";
  }

  function startButton() {
    showButton.style.display = "block";
  }

  function stopGame() {
    letters.parentNode.removeChild(letters);
    showClock.innerHTML = "";
    showClue.innerHTML = "";
    clearInterval(intervalID);

    startButton();
  }

  document.getElementById("reset").onclick = function() {
    ctx.clearRect(0, 0, w, h);
    letterSpaces.parentNode.removeChild(letterSpaces);
    resetCount();
    play();
  };
};
