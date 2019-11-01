
/*----- constants -----*/
let dangerButton = document.querySelectorAll('.danger');
let safetyButton = document.querySelectorAll('.safe');



/*----- app's state (variables) -----*/

let health = document.querySelector('.health').textContent;
let healthInt = parseInt(health);
let healthDisplay = document.querySelector('.health');
let healthTopDisplay = document.querySelector('.topHealth');
let healthLeftDisplay = document.querySelector('.leftHealth');
let healthRightDisplay = document.querySelector('.rightHealth');
let healthBottomDisplay = document.querySelector('.bottomHealth');

/*----- cached element references -----*/
let satchel = [];
let torch = 'torch';
let raft = 'raft';
let battleAxe = 'Battle Axe';
let caveKey = 'Key To The Cave Exit';
let currentRoom = 'safe';


/*----- functions -----*/



function reduceHealth () {
    currentRoom = 'danger';
    let deathTimer2 = setInterval(function() {
        if (currentRoom === 'danger') {
            healthInt -= 5;
            healthDisplay.innerHTML = healthInt.toString();
            healthTopDisplay.innerHTML = healthInt.toString();
            healthBottomDisplay.innerHTML = healthInt.toString();
            healthLeftDisplay.innerHTML = healthInt.toString();
            healthRightDisplay.innerHTML = healthInt.toString();
        }
        else {
            clearInterval(deathTimer2);   
        }  
    }, 2000);    
};


function reachSafety() {
    currentRoom = 'safe';
    alert('you are safe!! ');
};



function buttonInit() {      //initialize all buttons for click
    dangerButton.forEach( elem =>{
        elem.addEventListener('click', reduceHealth);
    })
    safetyButton.forEach( elem =>{
        elem.addEventListener('click', reachSafety);
    })
};
buttonInit();




function grabItem(item) {
    satchel.push(item);
};


/*----- event listeners -----*/
