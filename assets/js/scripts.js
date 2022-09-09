/* INITIAL SETUP */

/**
 * Script to run when page loads.
 */
document.addEventListener("DOMContentLoaded", function() {
    displayPlayers();
    toggleEmptyDivPlaceholder();

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
    let errorMsg = document.getElementById('modal-error-msg');
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
 * This function prevents the possibility to enter e and + in number input
 */
function preventE() {
/*Code from stackoverflow*/
    let inputNumber = document.getElementsByClassName("restrict-input");
    for(let inputs of inputNumber) {
        inputs.addEventListener("keypress", function (evt) {
            let invalidChars = [
                "+",
                "e",
              ];
              if (invalidChars.includes(evt.key)) {
                evt.preventDefault();
              }
        });
    }
    /*End of code from stackoverfow*/
}


let playersN = 0;
/**
 * This functions adds a new player to local storage.
 */
function addPlayer() { 
    let addPlayerName = document.getElementById('username').value;
    let initialScore = document.getElementById('initial-score').value;
    if(!initialScore) {
        initialScore = 0;
    }
    let existingPlayers = JSON.parse(playersArray);
    let newPlayer = {
        name: addPlayerName,
        score: initialScore
    };

    existingPlayers.push(newPlayer);
    localStorage.setItem('playersArray', JSON.stringify(existingPlayers));

    /*here I call the function to show the players on screen*/
    displayPlayers();
}


/**
 * This function create the player div to display in players section
 */
function displayPlayers() {
    let existingPlayers = JSON.parse(playersArray);
    let displayArea = document.getElementById('players');
    let scoreArea = document.getElementById('score-area');
    if(existingPlayers!=null) {
        for(let player of existingPlayers) {
            let username = player.name;
            let score = player.score;
            let playerPosition = existingPlayers.indexOf(player);
        
            //create HTML for the players areas
            let newDiv = document.createElement('div');
            newDiv.classList.add("display-inline");
            newDiv.innerHTML = `
            <button class="btn-remove" onclick="removePlayer(${playerPosition});"><i class="fas fa-times"></i></button>
            <div class="display-name">${username}</div>
            <div class="display-inline">
                <input class="restrict-input"
                type="number" 
                min="-10000" 
                max="10000"
                pattern="([-])+([0-9]{0,4})+([.0-9]{0,3})"
                id="points${playerPosition}">
                <button class="add-points" onclick="updateScore(${playerPosition})">+</button>
            </div>
            `;
            displayArea.appendChild(newDiv);
     
            //create HTML for the scores area
            let scoreDiv = document.createElement('div');
            scoreDiv.classList.add("display-inline");
            scoreDiv.innerHTML = `
            <div class="display-name">${username}:</div>
            <div>${score}</div>
            `;
            scoreArea.appendChild(scoreDiv);

            }

            preventE();
         }
    }

/**
 * This function updates the player's score and then reloads page to update display area
 */
function updateScore(position) {
    let errorMsg = document.getElementById('error-msg');
    let existingPlayers = JSON.parse(playersArray);
    if(existingPlayers[position]) {
        
        let points = document.getElementById(`points${position}`).value;
            if(isNaN(parseFloat(points))) {
                errorMsg.innerHTML = "Invalid value";
                throw `Invalid value euntered`;
            } else {
                if(points < -10000 || points > 10000) {
                    errorMsg.innerHTML = "Value out of range. Min -10000, Max 10000";
                    throw `Value out of range minmax`;
                } else {
                    //let score = Number.parseFloat(existingPlayers[position].score);
                    existingPlayers[position].score += Number.parseFloat(points);
                    localStorage.setItem('playersArray', JSON.stringify(existingPlayers));
                    location.reload();
                }
            }
    } else {
        throw `There is no player in position ${position}`;
    }
}


/**
 * This function removed players from local storage and then reloads page to update display area
 */
function removePlayer(position) {
    let existingPlayers = JSON.parse(playersArray);
    if(existingPlayers[position]) {
        existingPlayers.splice(position, 1);
        localStorage.setItem('playersArray', JSON.stringify(existingPlayers));
        location.reload();
    } else {
        throw `There is no player in position: ${position}`;
    }
}


/**
 * Remove Player From Players div and show placeholder if div is empty.
 */
function removeParent() {
    this.parentNode.remove();
    toggleEmptyDivPlaceholder();
}

