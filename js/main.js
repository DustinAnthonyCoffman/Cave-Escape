

/*----- constants -----*/
let dangerButton = document.querySelectorAll('.danger');
let safetyButton = document.querySelectorAll('.safe');
let healthDisplay = document.querySelector('.health');
let allBackgrounds = document.querySelectorAll('section');
let aTags = document.querySelectorAll('a');
let story = document.querySelector('.typewriter');
let items = document.querySelectorAll('.item');
let enemies = document.querySelectorAll('.enemy');
let satchelMenu = document.querySelector('.satchelMenu');
let resetButton = document.getElementById('resetButton');





/*----- app's state (variables) -----*/

let health = document.querySelector('.health').textContent;
let healthInt = parseInt(health);
let currentRoom = 'safe';


/*----- cached element references -----*/
let player = '';
let satchel = [];
let torch = 'torch';
let raft = 'raft';
let spear = 'spear';
let caveKey = 'key to the cave exit';



/*----- functions -----*/

function animateEnemy(evt) {
    let scene = evt.target.getAttribute('href');
    switch(scene) {
        case '#top':
            let snakeAnimate = document.getElementById('snake');
            snakeAnimate.classList.remove('enemy');
            snakeAnimate.classList.add('snakeBite');
            break;
        case '#left':
            let batAnimate = document.getElementById('bat');
            batAnimate.classList.remove('enemy');
            batAnimate.classList.add('batBite');
            break;
        case '#right':
            let bearAnimate = document.getElementById('bear');
            bearAnimate.classList.remove('enemy');
            bearAnimate.classList.add('bearBite');
            break;
        
        }
};

function resetEnemy() {
    let snakeBack = document.getElementById('snake');
    let batBack = document.getElementById('bat');
    let bearBack = document.getElementById('bear');
    snakeBack.classList.remove('snakeBite');
    batBack.classList.remove('batBite');
    bearBack.classList.remove('bearBite');
};


function reduceHealth () {
    currentRoom = 'danger';

    let deathTimer2 = setInterval(function() {
        
        if (currentRoom === 'danger') {
            healthInt -= 5;
            healthDisplay.innerHTML = healthInt.toString();
            if (healthInt <  100) {
                healthDisplay.style.color = 'yellow';
            }
            if (healthInt <=  75) {
                healthDisplay.style.color = 'rgb(255, 81, 0)';
            }
            if (healthInt <= 30) {
                healthDisplay.style.color = 'red';
            }
            if (healthInt === 0) {  
                
                allBackgrounds.forEach(elem => { 
                    elem.style.backgroundImage = 'url(https://i.imgur.com/CkwOSHg.jpg)';
                    clearInterval(deathTimer2);   
                    window.scrollTo(0, 0);
                    window.location.reload(true);
                });
              
            };
        }
      
        else {
            clearInterval(deathTimer2);   
        }  
    }, 1000);    
};


function reachSafety() {
    currentRoom = 'safe';
};

function updateStory(evt) {
    let screen = evt.target.getAttribute('href');
    let snakeState = document.getElementById('snake');
    let bearState = document.getElementById('bear');
    let batState = document.getElementById('bat');
    let safeState = document.getElementById('safe');
   
    switch(screen) {
        case '#bottom':
            story.textContent = "nothing down here but old mining supplies...";
            break;
        
        case '#top':
                if (snakeState.style.display === 'none') {
                    story.textContent = "Nothing here but a tranquil lake...";
                    break;
                }
            story.textContent = "(the snake lunges for an attack)";
            break;
     
        case '#left':
                if (batState.style.display === 'none') {
                    story.textContent = "The bats are gone...for now...";
                    break;

                }
            story.textContent = "(bats swarm you in a flurry, biting at your neck)";
            break;
        
        case '#right':
                if (bearState.style.display === 'none') {
                    story.textContent = "you notice the bear was just protecting it's babies...you monster";
                    let babies = document.getElementById('babies');
                    babies.style.display = 'inline';
                    alert("you're the real monster");
                    break;
                }
            story.textContent = "(you notice a large beast before you...";
            break;
     
        case '#secret':
            story.textContent = "looks like this tunnel leads on a ways...";
            break;

        case '#drawing':
            story.textContent = "(you notice a large drawing of a bear)";
            break;

        case '#main':
            story.textContent = "it looks like I'm safe while I'm in this main room...";
            break;

        case '#crystals':
                if (safeState.style.display === 'none') {
                    story.textContent = "Handy little raft inside, what can I use this for?";
                    break;

                }
            story.textContent = "looks like there's a safe in here";
            break;
    }

};

function buttonInit() {      
    dangerButton.forEach( elem =>{
        elem.addEventListener('click', reduceHealth);
    })
    safetyButton.forEach( elem =>{
        elem.addEventListener('click', reachSafety);
        elem.addEventListener('click', resetEnemy);
    })
    aTags.forEach( elem =>{
        elem.addEventListener('click', updateStory); 
        elem.addEventListener('click', animateEnemy);
    })
    items.forEach( elem =>{ 
        elem.addEventListener('click', grabItem);
    })
    enemies.forEach( elem =>{ 
        elem.addEventListener('click', attack);
    })
    resetButton.addEventListener('click', resetGame);
    
};

buttonInit();

function attack(enemy) {
    let thisEnemy = enemy.target.getAttribute('id');

    switch(thisEnemy) {
        case 'bat':
                if (satchel.includes('torch')) {
                    story.textContent = "You wave your torch the bats!";
                    let batHealth = document.getElementById('batHealth')
                    let batLife = parseFloat(batHealth.textContent)
                    batLife = batLife - 10;
                    batHealth.textContent = batLife;
                    if (batLife <= 0) {
                        story.textContent = "You're torch has scared the bats away!";
                        let batEnemy = document.getElementById('bat');
                        let $re = $(batEnemy);
                         $re.fadeOut();
                        let spearImage = document.getElementById('spear');
                        let $spear = $(spearImage);
                        $spear.fadeIn();
                        let batDiv = document.getElementById('batDisplay');
                        let $xo = $(batDiv);
                        $xo.fadeOut();
                        currentRoom = 'safe';
                        let leftRoom = document.getElementById('leftRoom');
                        leftRoom.removeEventListener('click', reduceHealth);
                        break;
                }
            } else {
                story.textContent = "You swing wildly at the bats, they're unfazed";
                break;
            }
                break;
       
        case 'snake':
                if (satchel.includes('raft')) {
                    story.textContent = "You used the raft to float over the snake!";
                    let snakeEnemy = document.getElementById('snake');
                    let $el = $(snakeEnemy);
                    $el.fadeOut();
                    let torchImage = document.getElementById('torch');
                    let $torch = $(torchImage);
                    $torch.fadeIn();
                    currentRoom = 'safe';
                    let topRoom = document.getElementById('topRoom');
                    topRoom.removeEventListener('click', reduceHealth);
                    break;       
                }
                story.textContent = "The snake plunges it's fangs into you";
                break;
            
       
        case 'bear':
                if (satchel.includes('spear')) {
                    story.textContent = "You attack the bear with your spear!!";
                    let bearHealth = document.getElementById('bearHealth')
                    let bearLife = parseFloat(bearHealth.textContent)
                    bearLife = bearLife - 5;
                    bearHealth.textContent = bearLife;
                    if (bearLife <= 0) {
                        story.textContent = "You have plunged your spear deep into the bears chest";
                        let bearEnemy = document.getElementById('bear');
                        let $el = $(bearEnemy);
                         $el.fadeOut();
                        let keyImage = document.getElementById('key');
                        let $key = $(keyImage);
                        $key.fadeIn();
                        let bearDiv = document.getElementById('bearDisplay');
                        let $te = $(bearDiv);
                        $te.fadeOut();
                        let babies = document.getElementById('babies');
                        let $bearChildren = $(babies);
                        $bearChildren.fadeIn();
                        currentRoom = 'safe';
                        let rightRoom = document.getElementById('rightRoom');
                        rightRoom.removeEventListener('click', reduceHealth);
                        break;
                    }
                 } else {
                 story.textContent = "You're hands do nothing against this monster";
                 break;
                     }
                break;
           
    }
};



function grabItem(item) {
    let thisItem = item.target.getAttribute('id');
    let itemImage = item.target;
    switch(thisItem) {
        case 'spear':
            story.textContent = "You have grabbed a spear!";
            satchel.push(spear);
            itemImage.style.display='none';
            let satchelSpear = document.createElement('img');
            satchelSpear.classList.add('mini');
            satchelSpear.src = 'https://i.imgur.com/8fw9zbA.png';
            satchelMenu.appendChild(satchelSpear);
            break;
        case 'raft':
            if(player !== 'satchel') {
                story.textContent = "this looks handy but I can't carry it";
                break;
            } 
            story.textContent = "You have grabbed a raft!";
            satchel.push(raft);
            itemImage.style.display='none';
            let satchelRaft = document.createElement('img');
            satchelRaft.classList.add('mini');
            satchelRaft.src = 'https://i.imgur.com/LnLgEPG.png';
            satchelMenu.appendChild(satchelRaft);
            break;
        case 'key':
            story.textContent = "You have grabbed the key to the cave!";
            satchel.push(key);
            itemImage.style.display='none';
            let satchelKey = document.createElement('img');
            satchelKey.classList.add('mini');
            satchelKey.src = 'https://i.imgur.com/R3xphG2.png';
            satchelMenu.appendChild(satchelKey);
            break;
        case 'babies':
                story.textContent = "I killed their mom in cold blood...";
                let reset = window.confirm("The bear was just protecting it's children, looks like you're the real monster, adopt the babies?");
                if(reset) {
                    let endPage = document.getElementById('right');
                    endPage.style.backgroundImage = 'url(https://i.imgur.com/7nlast9.jpg)';
                    endPage.style.backgroundRepeat = 'no-repeat';
                    let babiesSoccer = document.getElementById('babies');
                    babiesSoccer.style.display = 'inline';
                    babiesSoccer.removeEventListener('click', grabItem);
                    story.textContent = "You made the right choice";
                    let resetButton = document.getElementById('resetButton');
                    resetButton.style.display = 'inline';
                }
                    break;
                    
        case 'torch':
            story.textContent = "You have grabbed a torch!";
            satchel.push(torch);
            itemImage.style.display='none';
            let satchelTorch = document.createElement('img');
            satchelTorch.classList.add('mini');
            satchelTorch.src = 'https://i.imgur.com/Z0nzsXW.png';
            satchelMenu.appendChild(satchelTorch);
            break;
        case 'satchel':
             let answer = window.confirm("Look into the satchel?");
            
             if (answer) {
                let answerTake = window.confirm('It looks safe, take the satchel?');
                if (answerTake) {
                    story.textContent = "You have grabbed a satchel! You can now store items";
                    player = 'satchel';
                    itemImage.style.display='none';
                    let satchelRender = document.getElementById('hover-target');
                    satchelRender.style.display='inline-block';
                    story.textContent = "There's a note in here, it reads: Easy as A,B,C...";
                }
                else {
                    story.textContent = "I'm not carrying around a backpack";
                    break;
                } 
             }
             else {
                story.textContent = "Who knows what's inside...";
                 break;
             }
                break;
               
        
        case 'safe':
           let safeAnswer = prompt('Enter the safe combination:');
           if(safeAnswer === '123') {
            story.textContent = "The safe opened!";
            itemImage.style.display='none';
            let raftImage = document.getElementById('raft');
            raftImage.style.display = 'inline';

           }
           else {
               story.textContent = "The safe won't open";
           }
           break;
        case 'decoy':
            let decoyAnswer = window.confirm('Look into the satchel?');
            if(decoyAnswer) {
                story.textContent = "You've been stung by a scorpion health -30";
                healthDisplay.textContent = '70';   
            }
            else {
                story.textContent = "Who knows what's inside...";
            }     
            break;
    }
};


function resetGame() {
    window.scrollTo(0, 0);
    window.location.reload(true);
};

