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
            }
        })
    }
});



function openAddPlayer() {
    let modal = document.getElementById('new-player');
    modal.style.display = "block";
}

function hideParent(parent) {
    parent.style.display = "none";
}

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
    let newDiv = document.createElement('div');
    newDiv.innerHTML = `Player ${playersN} <button class="xx">x</button>`;
    playersN++;
    playersList.appendChild(newDiv);
    toggleEmptyDivPlaceholder();
    listenDeleteButton();
}

/**
 * Remove Player From Players div and show placeholder if div is empty.
 */
function removeParent() {
    this.parentNode.remove();
    toggleEmptyDivPlaceholder();
}





