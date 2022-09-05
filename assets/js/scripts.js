/**
 * Script to run when page loads.
 */
document.addEventListener("DOMContentLoaded", function() {
    toggleEmptyDivPlaceholder();
    listenDeleteButton();
});

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
 * Add event listener to detele player buttons.
 * */
function listenDeleteButton() {
    let deletePlayers = document.getElementsByClassName('xx');
    for(deletePlayer of deletePlayers) {
        deletePlayer.addEventListener("click", removeIt);
    }
}

/**
 * Remove Player From Players div and show placeholder if div is empty.
 */
function removeIt() {
    this.parentNode.remove();
    toggleEmptyDivPlaceholder();
}





