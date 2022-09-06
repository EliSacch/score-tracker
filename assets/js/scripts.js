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

let playersArray = localStorage.getItem('playersArray');
let emptyArray = new Array();
if(playersArray === null) {
    localStorage.setItem('playersArray', JSON.stringify(emptyArray)); 
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
 * This functions adds a new player to local storage.
 */
function addPlayer() { 
    let addPlayerName = document.getElementById('username').value;
    let initialScore = document.getElementById('initial-score').value;
    let existingPlayers = JSON.parse(playersArray);
    let newPlayer = {
        name: addPlayerName,
        initialScore: initialScore
    };

    existingPlayers.push(newPlayer);
    localStorage.setItem('playersArray', JSON.stringify(existingPlayers));

    /*here i need to add function to reload players list on screens*/
    
}


/**
 * This function create the player div to display in players section
 */
function displayPlayers() {
    let existingPlayers = JSON.parse(playersArray);
    let displayArea = document.getElementById('players');
    for(let player of existingPlayers) {
       let username = player.name;
   
       let newDiv = document.createElement('div');
       newDiv.classList.add("display-inline");
       newDiv.innerHTML = `
       <div class="display-name">${username}</div>
       <div class="add-points display-inline">
           <input type="number">
           <button>+</button>
       </div>
       `;

       displayArea.appendChild(newDiv);
    }
}

displayPlayers();
/**
 * Remove Player From Players div and show placeholder if div is empty.
 */
function removeParent() {
    this.parentNode.remove();
    toggleEmptyDivPlaceholder();
}

