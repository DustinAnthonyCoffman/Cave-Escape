
/*----- constants -----*/
let dangerButton = document.querySelectorAll('.danger');
let safetyButton = document.querySelectorAll('.safe');



/*----- app's state (variables) -----*/


/*----- cached element references -----*/
let satchel = [];
let playerHealth = 100;
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
            playerHealth -= 5;
            console.log('you are dying', playerHealth);
        }
        else {
            clearInterval(deathTimer2);
        }  
    }, 2000);    
};


function reachSafety() {
    currentRoom = 'safe';
    alert('you are safe!! ' + playerHealth);
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
