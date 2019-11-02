
/*----- constants -----*/
let dangerButton = document.querySelectorAll('.danger');
let safetyButton = document.querySelectorAll('.safe');
let healthDisplay = document.querySelector('.health');
let exit = document.querySelector('.exit');
let mainBackground = document.getElementById('main');
let allBackgrounds = document.querySelectorAll('section');


/*----- app's state (variables) -----*/

let health = document.querySelector('.health').textContent;
let healthInt = parseInt(health);
let currentRoom = 'safe';


/*----- cached element references -----*/
let satchel = [];
let torch = 'torch';
let raft = 'raft';
let battleAxe = 'Battle Axe';
let caveKey = 'Key To The Cave Exit';



/*----- functions -----*/



function reduceHealth () {
    currentRoom = 'danger';

    let deathTimer2 = setInterval(function() {
        
        if (currentRoom === 'danger') {
            healthInt -= 5;
            healthDisplay.innerHTML = healthInt.toString();
            if (healthInt <= 0) {
                alert('you have died!!!!');
                allBackgrounds.forEach(elem => { 
                    elem.style.backgroundImage = 'url(https://i.imgur.com/CkwOSHg.jpg)';
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

function renderTunnel(evt) {
    let target = evt.target;
    mainBackground.style.backgroundImage = 'url(https://i.imgur.com/DxQ9HGi.jpg)';
    exit.style.display = 'none';

};


function buttonInit() {      //initialize all buttons for click
    dangerButton.forEach( elem =>{
        elem.addEventListener('click', reduceHealth);
    })
    safetyButton.forEach( elem =>{
        elem.addEventListener('click', reachSafety);
    })
    exit.addEventListener('click', renderTunnel);
};
buttonInit();




function grabItem(item) {
    satchel.push(item);
};


/*----- event listeners -----*/
e