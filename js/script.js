window.onload = function () {
  let keyboard = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z'];
  
  let wordsArr = ["everton", "liverpool", "swansea", "chelsea", "hull", "manchester-city", "newcastle-united", "alien", "dirty-harry", "gladiator", "finding-nemo", "jaws","manchester", "milan", "madrid", "amsterdam", "prague"];
  let hints = ["Based in Mersyside", "Based in Mersyside", "First Welsh team to reach the Premier Leauge", "Owned by A russian Billionaire", "Once managed by Phil Brown", "2013 FA Cup runners up", "Gazza's first club", "Science-Fiction horror film", "1971 American action film", "Historical drama", "Anamated Fish", "Giant great white shark", "Northern city in the UK", "Home of AC and Inter", "Spanish capital", "Netherlands capital", "Czech Republic capital"];
  let drawArray = [rightLeg, leftLeg, rightArm, leftArm, torso, head, smallVerticalFrame, upperHorzontalFrame, verticalFrame, lowerFrame];

  let word;
  let chosenWord;
  let guess;
  let guesses = [ ];
  let lives;
  let counter;
  let space;
  let myStickman; // canvas
  let ctx; // canvas  ctx
  let letterButtons;
  let letters;
  let list;
  let wordHolder;
  let correct;

  let showLives = document.getElementById("mylives");
  let showClue = document.getElementById("clue");

  
// -------------------------- hangman draw ---------------------------
    // first line
    function lowerFrame() {
      drawOnCanvas(0, 200, 150, 200);
  }
  // second line
  function verticalFrame() {
      drawOnCanvas(10, 0, 10, 600);
  }
  // third line
  function upperHorzontalFrame() {
      drawOnCanvas(0, 5, 70, 5);
  }
  //fourth line
  function smallVerticalFrame() {
      drawOnCanvas(60, 5, 60, 15);
  }
  // torso
  function torso() {
      drawOnCanvas(60, 36, 60, 70);
  }
  // head
  function head() {
      myStickman = document.getElementById("canvas");
      ctx = myStickman.getContext('2d');
      ctx.beginPath();
      ctx.strokeStyle = "red";
      ctx.arc(60, 25, 10, 0, Math.PI * 2);
      ctx.stroke();
  }

  // right arm
  function rightArm() {
      drawOnCanvas(60, 46, 100, 50);
  }
  
  // left arm
  function leftArm() {
      drawOnCanvas(60, 46, 20, 50);
  }
  // right leg
  function rightLeg() {
      drawOnCanvas(60, 70, 100, 100);
  }
  // left leg
  function leftLeg() {
      drawOnCanvas(60, 70, 20, 100);
  }

  // Animate man
  function animate() {
      var drawMe = lives;
      drawArray[drawMe]();
  }

  function canvas() {
    myStickman = document.getElementById("canvas");
    myStickman.width = 300;
    myStickman.height = 200;
    ctx = myStickman.getContext('2d');

    //context.beginPath();
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 5;
  } 

function drawOnCanvas(pathFromX, pathFromY, pathToX, pathToY) {
    ctx.beginPath();
    ctx.strokeStyle = "whitesmoke";
    ctx.moveTo(pathFromX, pathFromY);
    ctx.lineTo(pathToX, pathToY);
    ctx.stroke();
  }

  function buttons() {
    letterButtons = document.getElementById('buttons');
    letters = document.createElement('ul');

    for (let i = 0; i < keyboard.length; i++) {
      letters.id = 'keyboard';
      list = document.createElement('li');
      list.id = 'letter';
      list.innerHTML = keyboard[i];
      check();
      letterButtons.appendChild(letters);
      letters.appendChild(list);
    };
  };

  function answer() {
    wordHolder = document.getElementById('hold');
    correct = document.createElement('ul');

    for (let i = 0; i < word.length; i++) {
      correct.setAttribute('id', 'my-word');
      guess = document.createElement('li');
      guess.setAttribute('class', 'guess');
      if (word[i] === "-") {
        guess.innerHTML = "-";
        space = 1;
      } else {
        guess.innerHTML = "_";
      };

      guesses.push(guess);
      wordHolder.appendChild(correct);
      correct.appendChild(guess);
    };
  };
  
 
  function comments() {
    showLives.innerHTML = "Te quedan " + lives + " oportunidades";
    if (lives < 1) {
      showLives.innerHTML = "¡Has perdido!";
    };
    for (let i = 0; i < guesses.length; i++) {
      if (counter + space === guesses.length) {
        showLives.innerHTML = "¡Muy listo!";
      };
    };
  };

  function check() {
    list.onclick = function () {
      let guess = (this.innerHTML);
      this.setAttribute("class", "active");
      this.onclick = null;
      for (let i = 0; i < word.length; i++) {
        if (word[i] === guess) {
          guesses[i].innerHTML = guess;
          counter += 1;
        } 
      };
      let j = (word.indexOf(guess));
      if (j === -1) {
        lives -= 1;
        comments();
        animate();
      } else {
        comments();
      };
    };
  };
  
  function play() {
    chosenWord = wordsArr[Math.floor(Math.random() * wordsArr.length)];
    word = chosenWord.replace(/\s/g, "-");
    buttons();

    guesses = [ ];
    lives = 10;
    counter = 0;
    space = 0;
    answer();
    comments();
    canvas();
  }
  play();

  function hint() {
    let hintIndex = wordsArr.indexOf(chosenWord);
    showClue.innerHTML = "Definición: " +  hints[hintIndex];
  };
  hint();

  function resetGame() {
    correct.parentNode.removeChild(correct);
    letters.parentNode.removeChild(letters);
    showClue.innerHTML = "";
    ctx.clearRect(0, 0, 400, 400);
    
  };

  document.getElementById('reset').onclick = function() {
    resetGame();
    play();
  };

};



