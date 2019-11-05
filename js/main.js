
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
    snakeAnimate.classList.add('enemy');   
    batBack.classList.remove('batBite');
    batAnimate.classList.add('enemy');
    bearBack.classList.remove('bearBite');
    bearAnimate.classList.add('enemy');
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
            story.textContent = "nothing down here but rocks and old mining supplies...";
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

function buttonInit() {      //initialize all buttons for click
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
};

buttonInit();

function attack(enemy) {
    let thisEnemy = enemy.target.getAttribute('id');
    let enemyImage = enemy.target;

    switch(thisEnemy) {
        case 'bat':
            if (satchel.includes('torch')) {
                story.textContent = "Your torch has illuminated the cave scaring away the bats!";
                enemyImage.style.display='none';
                let spearImage = document.getElementById('spear');
                spearImage.style.display='inline';
                currentRoom = 'safe';
                let leftRoom = document.getElementById('leftRoom');
                leftRoom.removeEventListener('click', reduceHealth); 
                break;
            }
                story.textContent = "The bats begin to drain your blood";
                break;
         
       
        case 'snake':
                if (satchel.includes('raft')) {
                    story.textContent = "You used the raft to float over the snake!";
                    enemyImage.style.display='none';
                    let torchImage = document.getElementById('torch');
                    torchImage.style.display='inline';
                    currentRoom = 'safe';
                    let topRoom = document.getElementById('topRoom');
                    topRoom.removeEventListener('click', reduceHealth);
                    break;       
                }
                story.textContent = "The snake plunges it's fangs into you, you cry out";
                break;
            
       
        case 'bear':
                if (satchel.includes('spear')) {
                    story.textContent = "You have plunged your spear deep into the bears chest, ending it's life";
                    enemyImage.style.display='none';
                    let keyImage = document.getElementById('key');
                    keyImage.style.display='inline';
                    currentRoom = 'safe';
                    let rightRoom = document.getElementById('rightRoom');
                    rightRoom.removeEventListener('click', reduceHealth);
                    break;
                }
                    story.textContent = "The beast mauls you over and over";
                    break;
           
    }
}


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
            story.textContent = "You have grabbed a key!";
            satchel.push(key);
            itemImage.style.display='none';
            let satchelKey = document.createElement('img');
            satchelKey.classList.add('mini');
            satchelKey.src = 'https://i.imgur.com/R3xphG2.png';
            satchelMenu.appendChild(satchelKey);
            break;
        case 'torch':
            story.textContent = "You have grabbed a torch!";
            satchel.push(torch);
            itemImage.style.display='none';
            let satchelTorch = document.createElement('img');
            satchelTorch.classList.add('mini');
            satchelTorch.src = 'https://i.imgur.com/3yjxWtA.jpg';
            satchelMenu.appendChild(satchelTorch);
            break;
        case 'satchel':
            story.textContent = "You have grabbed a satchel! You can now store 1 item at a time";
             player = 'satchel';
             itemImage.style.display='none';
             let satchelRender = document.getElementById('hover-target');
             satchelRender.style.display='inline-block';
             let answer = window.confirm("It looks like there's a piece of paper in the satchel...read it?");
             if (answer) {
                 story.textContent = "It reads: Easy as A,B,C...";
             }
             else {
                 story.textContent = "I'm not into reading, I hope I don't die in here...";
             }
             //footer gets satchel image?? or satchel h2?? ? ? 
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
    }
};


/*----- event listeners -----*/
