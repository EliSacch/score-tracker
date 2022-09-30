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
                case "about":
                    openAbout();
                    break;
                case "form":
                    //the action here is andled when submitting form
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
                case "continueGame":
                    hideParent(button.parentNode.parentNode.parentNode);
                    removeLimit();
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
                case "closeLeaderboard":
                    hideParent(button.parentNode.parentNode);
                    clearLeaderboard();
                    break; 
                default:
                    throw `Action ${buttonAction} not recognized`;
            }
        });
    }

    toggleEmptyDivPlaceholder();
    displayPlayers();
    preventE();

    /*Add event listener for darts mode checkbox*/
    const modeToggler = document.getElementById('darts-mode');
    if(modeToggler != null) {
        modeToggler.addEventListener("change", toggleMode);
    }

    /*Check if a new game has been initiated and disable resume button if there is no game*/
    const isDartsMode = localStorage.getItem('dartsMode');
    const resumeButton = document.getElementById('resume');
    if (isDartsMode == null) {
        resumeButton.setAttribute("disabled","true");
    }

    /*display target on screen*/
    const limit = localStorage.getItem('limit');
    const displayTarget = document.getElementById('target');
    if((limit == "null")&&(isDartsMode == "true")) {
        displayTarget.innerHTML = "As low as possible";
    } else if((limit == "null")&&(isDartsMode == "false")) {
        displayTarget.innerHTML = "As high as possible";
    } else {
        displayTarget.innerHTML = limit;
    }

});

    /* INITIALIZE LOCAL STORAGE */
    const playersArray = localStorage.getItem('playersArray');
    const emptyArray = new Array();
    if(playersArray === null) {
        localStorage.setItem('playersArray', JSON.stringify(emptyArray)); 
    }
    
    let globalInitialScore = localStorage.getItem('globalInitialScore');
    if(globalInitialScore === null) {
        localStorage.setItem('globalInitialScore', 0); 
    }

/*MODAL TAB ACCESSIBILITY*/

const exitKey = {
    ESC: 27
};

let previousActiveElement;
const modals = document.getElementsByClassName('modal');

/** This function closes the modal if ESC key is pressed */
function closeModalEsc() {
    previousActiveElement = document.activeElement; 
    document.addEventListener('keydown', exitPressed);
    }

function exitPressed(e) { 
    if(e.keyCode == exitKey.ESC) {
       for(let modal of modals) {
        previousActiveElement.focus();
        hideParent(modal);
       }    
    }
}   

for(let modal of modals) {
    modal.addEventListener("keydown", function(event) {
        if(event.key.toLowerCase() == "tab") {
            let focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            let target = event.target;

            let last = (focusableElements.length)-1;

            if(event.shiftKey) {
                if(target == focusableElements[0]) {
                    event.preventDefault();
                    focusableElements[last].focus();
                }
            } else {
                if(target == focusableElements[last]) {
                    event.preventDefault();
                    focusableElements[0].focus();
                }
            }
        }
    });
}   

/* ACTION SPECIFIC FUNCTION */

/** This function toggled darts mode */
function toggleMode() {
    const dartsModeToggler = document.getElementById('darts-mode');
    if(dartsModeToggler != null) {
        const limitInput = document.getElementById('limit');
        const limitLabel = document.getElementById('limit-label');
        const initialScore = document.getElementById('set-initial-score');
        if(dartsModeToggler.checked) {
            limitInput.value = 0;
            initialScore.value = 501;
            limitInput.style.display="none";
            limitLabel.style.display="none";
        } else {
            limitInput.value = "";
            initialScore.value = 0;
            limitInput.style.display="block";
            limitLabel.style.display="block";
        }
    }   
}

/**This function opens the about modal */
function openAbout() {
    const modal = document.getElementById('about');
    modal.style.display = "block";
    closeModalEsc();
    document.getElementById('about').focus();
}           

/** This function opens the options modal */
function openOptions() {
    const modal = document.getElementById('options');
    modal.style.display = "block";
    closeModalEsc();
    document.getElementById('new-game-btn').focus();
}
/**
 * this function closes the modal
 * @param {DOMElement} parent 
 */
function hideParent(parent) {
    parent.style.display = "none";
}

/**
 * This function prevents the possibility to enter e and + in number input
 */
 function preventE() {
    /*Code from stackoverflow*/
        const inputNumber = document.getElementsByClassName("restrict-input");
        for(let inputs of inputNumber) {
            inputs.addEventListener("keypress", function (evt) {
                const invalidChars = [
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
    const existingPlayers = JSON.parse(playersArray);
    const globalInitialScore = localStorage.getItem('globalInitialScore');
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
const placeholderEmpty = document.getElementsByClassName('empty');
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
    const modal = document.getElementById('new-game-modal');
    const initialScore = document.getElementById('set-initial-score');
    const limitInput = document.getElementById('limit');
    const limitLabel = document.getElementById('limit-label');
    const dartsModeChecked = document.getElementById('darts-mode');
    if(dartsModeChecked.checked) {
            limitInput.value = 0;
            initialScore.value = 501;
            limitInput.style.display="none";
            limitLabel.style.display="none";
        } else {
            limitInput.value = "";
            initialScore.value = 0;
            limitInput.style.display="block";
            limitLabel.style.display="block";
        }
    modal.style.display = "block";
    closeModalEsc();
    document.getElementById('darts-mode').focus();
}

/** Form validation for new game*/
function addNewGameValidation() {
    const errorMsg = document.getElementById('new-game-error-msg');
    let initialScore = document.getElementById('set-initial-score').value;
    let limit = document.getElementById('limit').value;
    let mode = document.getElementById('darts-mode').checked;

    const newGameForm = document.getElementById('new-game-form');

        if(initialScore === "") {
            errorMsg.innerHTML = "Please, enter the initial score";
        } else if(mode === true && initialScore < 1) {
            errorMsg.innerHTML = "Initial score must be greater than 0";
        } else if(limit != "" && (mode === false && initialScore > limit)) {
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
    const emptyArray = [];
    localStorage.setItem('playersArray', JSON.stringify(emptyArray));
}

/* ADD PLAYER FUNCTIONS */
/** This function opens the new player modal */
function openAddPlayer() {
    const modal = document.getElementById('new-player');
    const intialValue = document.getElementById('initial-score');
    intialValue.value = localStorage.getItem('globalInitialScore');
    modal.style.display = "block";
    closeModalEsc();
    document.getElementById('username').focus();
}

/** Form validation for new player*/
function addPlayerValidation() {
    const errorMsg = document.getElementById('modal-error-msg');
        const addPlayerName = document.getElementById('username').value;
        const initialScore = document.getElementById('initial-score').value;
        const newPlayerForm = document.getElementById('new-player-form');

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
 * This functions adds a new player to local storage.
 */
function addPlayer() { 
    const addPlayerName = document.getElementById('username').value;
    let initialScore = document.getElementById('initial-score').value;
    if(!initialScore) {
        initialScore = 0;
    }
    let existingPlayers = JSON.parse(playersArray);
    const newPlayer = {
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
    const existingPlayers = JSON.parse(playersArray);
    const displayArea = document.getElementById('players');
    const scoreArea = document.getElementById('score-area');
    const isDartsMode = localStorage.getItem('dartsMode');
    if(displayArea != null) {
        if(existingPlayers!=null) {
            for(let player of existingPlayers) {
                let username = player.name;
                let score = player.score;
                let playerPosition = existingPlayers.indexOf(player);
                let operand = "+";
                let operation = "addition";
                if(isDartsMode == "true") {
                    operand="-";
                    operation = "subtraction";
                }

            
                //create HTML for the players areas
                const newDiv = document.createElement('div');
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
                    <button class="add-points" onclick="updateScore(${playerPosition}, '${operation}')">${operand}</button>
                </div>
                `;
                displayArea.appendChild(newDiv);
         
                //create HTML for the scores area
                const scoreDiv = document.createElement('div');
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
        document.getElementById('add-player-btn').focus();
    }

/**
 * This function removed players from local storage and then reloads page to update display area
 */
function removePlayer(position) {
    const existingPlayers = JSON.parse(playersArray);
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
function updateScore(position, operation) {
    const errorMsg = document.getElementById('error-msg');
    const existingPlayers = JSON.parse(playersArray);
    if(existingPlayers[position]) {
        
        const points = document.getElementById(`points${position}`).value;
            if(isNaN(parseInt(points))) {
                errorMsg.innerHTML = "Invalid value";
                throw `Invalid value euntered`;
            } else {
                if(points < -10000 || points > 10000) {
                    errorMsg.innerHTML = "Value out of range. Min -10000, Max 10000";
                    throw `Value out of range minmax`;
                } else {
                   let score = Number.parseInt(existingPlayers[position].score);

                    if(operation == "addition") {
                        score += Number.parseInt(points);
                    } else if(operation == "subtraction") {
                        score -= Number.parseInt(points);
                    } else {
                        errorMsg.innerHTML = "There was an error. Try again.";
                        throw `Invalid operation: ${operation}`;
                    }
                                      
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
const playersScores = JSON.parse(playersArray);
const targetScore = localStorage.getItem('limit');
const isDartsMode = localStorage.getItem('dartsMode');
if(targetScore != "null") {
    for(let score of playersScores) {
        if(isDartsMode == "true") {
            if(score.score <= targetScore) {
                finishGameAlert();
            }
        } else {
            if(score.score >= targetScore) {
                finishGameAlert();
            }
        }   
    }
}

/** this function prompts user to finish game if limit is set */
function finishGameAlert() {
    const promptFinish = document.getElementById('prompt-finish');
    promptFinish.style.display = "block";
    closeModalEsc();
    document.getElementById('finish-btn').focus();
}

/** This functions erase the limit if players want to continue the game */
function removeLimit() {
    localStorage.setItem('limit', null);
}


/** This function redirects to the rank page */
function finalScore() {
    let sortedList = playersScores;

    /* Start of code from 'All Things JavaScript, LLC' */
    sortedList.sort(function(a,b) {
        return a.score - b.score;
    });
    /* End of code from 'All Things JavaScript, LLC' */

    if(isDartsMode == 'false') {
        const reversed = playersScores.reverse();
        localStorage.setItem('finalRanking', JSON.stringify(reversed));
    } else {
        localStorage.setItem('finalRanking', JSON.stringify(sortedList));
    }  
   showRanking();
}

/** This function openas the leaderboard and shows the ranking */
function showRanking() {
    const promptFinish = document.getElementById('prompt-finish');
    const leaderboard = document.getElementById('leaderboard');
    promptFinish.style.display = "none";
    leaderboard.style.display = "block";
    const finalRanking = JSON.parse(localStorage.getItem('finalRanking'));
    const ranking = document.getElementById('ranking');
    for(let player of finalRanking) {
        let username = player.name;
        let score = player.score;
        let playerPosition = finalRanking.indexOf(player);
    
        //create HTML for the players areas
        const newDiv = document.createElement('div');
        newDiv.classList.add("display-inline");
        newDiv.innerHTML = `
        <div class="display-inline players-rank">
            <div>${playerPosition+1}. </div>
            <div>${username}</div>
            <div>${score}</div>
        </div>
        `;
        ranking.appendChild(newDiv);
    } 
    document.getElementById('close-leaderboard-btn').focus();
}

/** This function clears the leaderboard when we close it */
function clearLeaderboard() {
    const ranking = document.getElementById('ranking');
    ranking.innerHTML = "";
}
