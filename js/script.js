window.onload = function () {
  game();
};

function game() {
  let keyboard = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z'];
  
  let word;
  let guess;
  let guesses = [ ];
  let lives;
  let counter;
  let space;

  let showLives = document.getElementById("mylives");
  let showClue = document.getElementById("clue");



  function buttons() {
    myButtons = document.getElementById('buttons');
    letters = document.createElement('ul');

    for (let i = 0; i < keyboard.length; i++) {
      letters.id = 'keyboard';
      list = document.createElement('li');
      list.id = 'letter';
      list.innerHTML = keyboard[i];
      check();
      myButtons.appendChild(letters);
      letters.appendChild(list);
    };
  };

  function result() {
    let wordHolder = document.getElementById('hold');
    let correct = document.createElement('ul');

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

  function animate() {
    let drawMe = lives ;
    drawBody(drawMe);
  };

  function canvas () {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext('2d');
  };

  function drawBody(guesses) {
    ctx.beginPath();
    switch(guesses) {
      case 6:
        break;
      case 5: 
        ctx.arc(350, 250, 20, 0, Math.PI * 2, false);
        break;
      case 4: 
        ctx.moveTo(350, 270);
        ctx.lineTo(350, 330);
        break;
      case 3:
        ctx.moveTo(350, 330);
        ctx.lineTo(325, 370);
        break;
      case 2:
        ctx.moveTo(350, 330);
        ctx.lineTo(375, 370);
        break;
      case 1:
        ctx.moveTo(350, 300)
        ctx.lineTo(375, 275);
        break;
      case 0: 
        ctx.moveTo(350, 300);
        ctx.lineTo(325, 275);
        break;
    };
    ctx.stroke();
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
    words = ["everton", "liverpool", "swansea", "chelsea", "hull", "manchester-city", "newcastle-united", "alien", "dirty-harry", "gladiator", "finding-nemo", "jaws","manchester", "milan", "madrid", "amsterdam", "prague"];

    chosenWord = words[Math.floor(Math.random() * words.length)];
    word = chosenWord.replace(/\s/g, "-");
    buttons();

    guesses = [ ];
    lives = 10;
    counter = 0;
    space = 0;
    result();
    comments();
    canvas();
  }
  play();
  
  // Hint

  function hint() {
    hints = ["Based in Mersyside", "Based in Mersyside", "First Welsh team to reach the Premier Leauge", "Owned by A russian Billionaire", "Once managed by Phil Brown", "2013 FA Cup runners up", "Gazza's first club", "Science-Fiction horror film", "1971 American action film", "Historical drama", "Anamated Fish", "Giant great white shark", "Northern city in the UK", "Home of AC and Inter", "Spanish capital", "Netherlands capital", "Czech Republic capital"];

    let hintIndex = words.indexOf(chosenWord);
    showClue.innerHTML = "Definición: " +  hints[hintIndex];
  };
  hint();

  document.getElementById('reset').onclick = function() {
    correct.parentNode.removeChild(correct);
    letters.parentNode.removeChild(letters);
    showClue.innerHTML = "";
    context.clearRect(0, 0, 400, 400);
    play();
  };
};


