/* INITIAL SETUP */

/**
 * Script to run when page loads.
 */
document.addEventListener("DOMContentLoaded", function() {  
    /* The following code was taken from the Code Institute course content.*/
    let buttons = document.getElementsByTagName('button');
    for(let button of buttons ) {
        button.addEventListener("click", function() {
            let buttonAction = this.getAttribute("data-type");
    /*End of code from coure*/
            switch (buttonAction) { 
                case "form":
                    console.log('action handled via submit');  
                    break;
                case "openNewGame":
                    openNewGame();
                    break; 
                case "redirect":
                    location.href='game.html';
                    break;       
                case "openAddPlayer":
                    openAddPlayer();
                    break;
                case "openOptions":
                    openOptions();
                    break;
                case "hideParent":
                    hideParent(button.parentNode.parentNode);
                    break;
                case "hideGrandParent":
                    hideParent(button.parentNode.parentNode.parentNode);
                    break;
                case "addPlayer":
                    addPlayerValidation();
                    break;
                case "resetScore":
                    resetScore();
                    break;
                case "finishGameAlert":
                    finishGameAlert();
                    break;
                case "finalScore":
                    finalScore();
                    break;
                default:
                    throw `Action ${buttonAction} not recognized`;
            }
        })
    }

    toggleEmptyDivPlaceholder();
    displayPlayers();
    preventE();

    /*Add event listener for darts mode checkbox*/
    let modeToggler = document.getElementById('darts-mode');
    if(modeToggler != null) {
        modeToggler.addEventListener("change", toggleMode);
    }
});

    /* INITIALIZE LOCAL STORAGE */
    let playersArray = localStorage.getItem('playersArray');
    let emptyArray = new Array();
    if(playersArray === null) {
        localStorage.setItem('playersArray', JSON.stringify(emptyArray)); 
    }
    
    let globalInitialScore = localStorage.getItem('globalInitialScore');
    if(globalInitialScore === null) {
        localStorage.setItem('globalInitialScore', 0); 
    }

/* ACTION SPECIFIC FUNCTION */

/** This function toggled darts mode */
function toggleMode() {
    let dartsModeToggler = document.getElementById('darts-mode');
    if(dartsModeToggler != null) {
        let limitInput = document.getElementById('limit');
        let limitLabel = document.getElementById('limit-label');
        if(dartsModeToggler.checked) {
            limitInput.style.display="none";
            limitLabel.style.display="none";
        } else {
            limitInput.style.display="block";
            limitLabel.style.display="block";
        }
    }   
}

/** This function opens the options modal */
function openOptions() {
    let modal = document.getElementById('options');
    modal.style.display = "block";
}

/** this function closes the modal*/
function hideParent(parent) {
    parent.style.display = "none";
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
                    ".",
                    ","
                  ];
                  if (invalidChars.includes(evt.key)) {
                    evt.preventDefault();
                  }
            });
        }
        /*End of code from stackoverfow*/
    }

/** This function set the score for all players to 0 */
function resetScore() {
    let existingPlayers = JSON.parse(playersArray);
    let globalInitialScore = localStorage.getItem('globalInitialScore');
    for(let player of existingPlayers) {
        if(globalInitialScore != null) {
            player.score= globalInitialScore;
        } else {
            player.score = 0;
        }
        localStorage.setItem('playersArray', JSON.stringify(existingPlayers));
        location.reload();
    }
}

let playersList = document.getElementById('players');
let placeholderEmpty = document.getElementsByClassName('empty');
/**
 * This function toggles the placeholder element for players div.
 * It hides the placeholder when the players div is not empty anymore
 */
function toggleEmptyDivPlaceholder() {
    if(playersList != null) {
        if(playersList.children.length === 0) {     
            for (let i = 0; i < placeholderEmpty.length; i++ ) {
                placeholderEmpty[i].style.display = "block";
            } 
        } else {
            for ( i = 0; i < placeholderEmpty.length; i++ ) {
                placeholderEmpty[i].style.display = "none";
            }
        }
    }      
}

/* NEW GAME FUNCTIONS */
/** This function opens the new game modal */
function openNewGame() {
    let modal = document.getElementById('new-game-modal');
    let limitInput = document.getElementById('limit');
    let limitLabel = document.getElementById('limit-label');
    let dartsModeChecked = document.getElementById('darts-mode');
    if(dartsModeChecked.checked) {
            limitInput.style.display="none";
            limitLabel.style.display="none";
        } else {
            limitInput.style.display="block";
            limitLabel.style.display="block";
        }
    modal.style.display = "block";
}

/** Form validation for new game*/
function addNewGameValidation() {
    let errorMsg = document.getElementById('new-game-error-msg');
    let initialScore = document.getElementById('set-initial-score').value;
    let limit = document.getElementById('limit').value;
    let mode = document.getElementById('darts-mode').checked;

    let newGameForm = document.getElementById('new-game-form');

        if(initialScore === "") {
            errorMsg.innerHTML = "Please, enter the initial score";
        } else if(mode === true && initialScore < 1) {
            errorMsg.innerHTML = "Initial score must be greater than 0";
        } else if(mode === false && initialScore > limit) {
            errorMsg.innerHTML = "Initial score must be lower than limit";
        } else if(
            (limit != "" && 
            isNaN(parseInt(limit))) ||
            (isNaN(parseInt(initialScore)))
            ) {
            errorMsg.innerHTML = "Invalid value";
            throw `Invalid value entered`;
        } else {
            newGame();
            newGameForm.submit();
        }
} 

/** This function removes all players from the game */
function newGame() {
    //get values
    let mode = document.getElementById('darts-mode').checked;
    let initialScore = document.getElementById('set-initial-score').value;
    let limit = document.getElementById('limit').value;
    localStorage.setItem('dartsMode', JSON.stringify(mode));
    localStorage.setItem('globalInitialScore', JSON.stringify(parseInt(initialScore)));
    localStorage.setItem('limit', JSON.stringify(parseInt(limit)));
    //remove existing players from playersList
    let emptyArray = [];
    localStorage.setItem('playersArray', JSON.stringify(emptyArray)); 
}

/* ADD PLAYER FUNCTIONS */
/** This function opens the new player modal */
function openAddPlayer() {
    let modal = document.getElementById('new-player');
    let intialValue = document.getElementById('initial-score');
    intialValue.value = localStorage.getItem('globalInitialScore');
    modal.style.display = "block";
    console.log(intialValue);
}

/** Form validation for new player*/
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
    displayPlayers();
}

/**
 * This function create the player div to display in players section
 */
function displayPlayers() {
    let existingPlayers = JSON.parse(playersArray);
    let displayArea = document.getElementById('players');
    let scoreArea = document.getElementById('score-area');
    if(displayArea != null) {
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
                <div class="display-inline player-line">
                    <input class="restrict-input"
                    type="number" 
                    min="-10000" 
                    max="10000"
                    pattern="([-])+([0-9]{0,4})"
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
                <div class="player-line">${score}</div>
                `;
                scoreArea.appendChild(scoreDiv);
    
                }
                preventE();
             }
        }
        toggleEmptyDivPlaceholder();
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

/*UPDATE SCORE*/

/**
 * This function updates the player's score and then reloads page to update display area
 */
function updateScore(position) {
    let errorMsg = document.getElementById('error-msg');
    let existingPlayers = JSON.parse(playersArray);
    if(existingPlayers[position]) {
        
        let points = document.getElementById(`points${position}`).value;
            if(isNaN(parseInt(points))) {
                errorMsg.innerHTML = "Invalid value";
                throw `Invalid value euntered`;
            } else {
                if(points < -10000 || points > 10000) {
                    errorMsg.innerHTML = "Value out of range. Min -10000, Max 10000";
                    throw `Value out of range minmax`;
                } else {
                    let score = Number.parseInt(existingPlayers[position].score);
                    score += Number.parseInt(points);
                    existingPlayers[position].score = score;
                    localStorage.setItem('playersArray', JSON.stringify(existingPlayers));
                    location.reload();
                }
            }
    } else {
        throw `There is no player in position ${position}`;
    }
}

/*FINISH GAME FUNCTIONS*/
let playersScores = JSON.parse(playersArray);
let targetScore = localStorage.getItem('limit');
let isDartsMode = localStorage.getItem('dartsMode');

for(let score of playersScores) {
    if(isDartsMode) {
        if(score.score <= targetScore) {
            //finishGameAlert();
        }
    } else {
        if(score.score >= targetScore) {
            //finishGameAlert();
        }
    }   
}

function finishGameAlert() {
    let promptFinish = document.getElementById('prompt-finish');
    promptFinish.style.display = "block";
}


/** This function redirects to the rank page */
function finalScore() {
    /*First we sort the array*/
    let sorted = false;
    //iteration limit to avoid infinite loop
    let safeLimit = 20;
    let iterations = 0;
    while(!sorted) {
        let check = true;
        for(let i = 0; i < ((playersScores.length)-1); i++) {
            let temp = playersScores[i];
            if(temp.score > playersScores[i+1].score) {
                playersScores[i] = playersScores[i+1];
                playersScores[i+1] = temp;
                check=false;
            } else {
                continue;
            }      
        }
        if(check==true) {
            sorted = true;
        }
        iterations++;
        if(iterations >= safeLimit) {
            sorted=true;
        }
    }

    /* Then if not darts mode we reverse it*/
    if(!isDartsMode) {
        playersScores.reverse();
    }

    /* Then we display the final rank*/

}

   
