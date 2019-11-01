
/*----- constants -----*/
let dangerButton = document.querySelectorAll('.danger');
let safetyButton = document.querySelectorAll('.safe');


/*----- app's state (variables) -----*/
let health = document.querySelectorAll('.health');
let charHealth = health.textContent;
let thisHealth = health.innerText
let myHealth = health.innerHTML;
// console.log(health);
// console.log(charHealth);
// console.log(thisHealth);
// console.log(myHealth)

/*----- cached element references -----*/
let satchel = [];
let playerHealth = 100;
let torch = 'torch';
let raft = 'raft';
let battleAxe = 'Battle Axe';
let caveKey = 'Key To The Cave Exit';
let currentRoom = 'safe';


/*----- functions -----*/



function reduceHealth (currentRoom, playerHealth) {
    currentRoom = 'danger';
    if (currentRoom !== 'safe' || playerHealth !== 0) {
    console.log('you are dying');
    playerHealth - 5;
    console.log(playerHealth);
    }
};

function reachSafety(currentRoom, playerHealth) {
    currentRoom = 'safe';
    clearInterval(deathTimer)
    alert('you are safe!! ' + playerHealth)
};

let deathTimer = setInterval(reduceHealth, 5000);

function buttonInit() {      //initialize all buttons for click
    dangerButton.forEach( elem =>{
        elem.addEventListener('click', deathTimer);
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

