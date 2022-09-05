/* INITIAL SETUP */

/**
 * Script to run when page loads.
 */
document.addEventListener("DOMContentLoaded", function() {
    toggleEmptyDivPlaceholder();
    listenDeleteButton();

    /* The following code was taken from the Code Institute course content.*/
    let buttons = document.getElementsByTagName('button');
    for(let button of buttons ) {

        button.addEventListener("click", function() {
            let buttonAction = this.getAttribute("data-type");
    /*End of code from coure*/
            switch (buttonAction) {
                case "openAddPlayer":
                openAddPlayer();
                break;
                case "hideParent":
                hideParent(button.parentNode.parentNode);
                break;
                case addPlayer:
                addPlayerValidation();
                break;
            }
        })
    }
});

/* INITIALIZE LOCAL STORAGE */
let playersCount = localStorage.getItem('playersCount');
if(playersCount === null) {
    window.localStorage.setItem('playersCount', 0); 
} 

let playersArray = localStorage.getItem('playersArray');
if(playersArray === null) {
    window.localStorage.setItem('playersArray', []); 
} 


/* ACTION SPECIFIC FUNCTION */

/* TOOGLE MODAL*/

function openAddPlayer() {
    let modal = document.getElementById('new-player');
    modal.style.display = "block";
}

function hideParent(parent) {
    parent.style.display = "none";
}

/* TOGGLE PLACEHOLDER */

let playersList = document.getElementById('players');

/**
 * This function toggles the placeholder element for players div.
 * It hides the placeholder when the players div is not empty anymore
 */
function toggleEmptyDivPlaceholder() {
    let placeholderEmpty = document.getElementsByClassName('empty');
    if(playersList.children.length === 0) {
        for (let i = 0; i < placeholderEmpty.length; i++ ) {
            placeholderEmpty[i].style.display = "block";
        } 
    } else {
        for (let i = 0; i < placeholderEmpty.length; i++ ) {
            placeholderEmpty[i].style.display = "none";
        }
    }
}


/* ADD PLAYER FUNCTIONS */

/* Form Validation */
function addPlayerValidation() {
    let errorMsg = document.getElementById('error-msg');
    let addPlayerName = document.getElementById('username').value;
    let initialScore = document.getElementById('initial-score').value;
    let newPlayerForm = document.getElementById('new-player-form');

    if(addPlayerName === "") {
        errorMsg.innerHTML = "Please, enter a name.";
    } else if(addPlayerName.length < 2) {
        errorMsg.innerHTML = "Please, enter at least 2 characters.";
    } else if(initialScore < -10000 || initialScore > 10000) {
        errorMsg.innerHTML = "Initial Score is out of range. Min: -10000, Max: 10000";
    } else {
        addPlayer();
        newPlayerForm.submit();
    }
}

/**
 * Add event listener to detele player buttons.
 * */
 function listenDeleteButton() {
    let deletePlayers = document.getElementsByClassName('xx');
    for(let deletePlayer of deletePlayers) {
        deletePlayer.addEventListener("click", removeIt);
    }
}

let playersN = 0;
/**
 * This functions adds a new line for each player added.
 */
function addPlayer() { 
    
    alert('new player');
}

/**
 * Remove Player From Players div and show placeholder if div is empty.
 */
function removeParent() {
    this.parentNode.remove();
    toggleEmptyDivPlaceholder();
}









