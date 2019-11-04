
/*----- constants -----*/
let dangerButton = document.querySelectorAll('.danger');
let safetyButton = document.querySelectorAll('.safe');
let healthDisplay = document.querySelector('.health');
let exit = document.querySelector('.exit');
let mainBackground = document.getElementById('main');
let allBackgrounds = document.querySelectorAll('section');
let aTags = document.querySelectorAll('a');
let story = document.querySelector('.typewriter');
let items = document.querySelectorAll('.item');
let enemies = document.querySelectorAll('.enemy');





/*----- app's state (variables) -----*/

let health = document.querySelector('.health').textContent;
let healthInt = parseInt(health);
let currentRoom = 'safe';


/*----- cached element references -----*/
let satchel = [];
let torch = 'torch';
let raft = 'raft';
let spear = 'Spear';
let caveKey = 'Key To The Cave Exit';



/*----- functions -----*/



function reduceHealth () {
    currentRoom = 'danger';

    let deathTimer2 = setInterval(function() {
        
        if (currentRoom === 'danger') {
            healthInt -= 5;
            healthDisplay.innerHTML = healthInt.toString();
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
    switch(screen) {
        case '#bottom':
            story.textContent = "nothing down here but rocks and old mining supplies...";
            break;
        case '#top':
            story.textContent = "(the snake lunges for an attack)";
            break;
        case '#left':
            story.textContent = "(bats swarm you in a flurry, biting at your neck)";
            break;
        case '#right':
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
            story.textContent = "something is etched on this wall";
            break;
    }

};


function buttonInit() {      //initialize all buttons for click
    dangerButton.forEach( elem =>{
        elem.addEventListener('click', reduceHealth);
    })
    safetyButton.forEach( elem =>{
        elem.addEventListener('click', reachSafety);
    })
    aTags.forEach( elem =>{
        elem.addEventListener('click', updateStory); 
    })
    items.forEach( elem =>{ 
        elem.addEventListener('click', grabItem);
    })
};
buttonInit();




function grabItem(item) {
    console.log(item);
   // satchel.push(item);
};


/*----- event listeners -----*/
