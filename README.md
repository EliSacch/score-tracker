# Score TRACKER
A web application inspired by darts, but that can be used to track any game score.

Have you ever played darts with your friends (or any other game), without having the tool to track your scores? Did you find yourself trying to keep track of the score in the retro of an old receipt or on the "Notes" application of your phone?

Score TRACKER is the solution.

A simple and intiuitive design, easy to use for your games.

![Responsive Mockup](media/am-i-responsive.png)

[See deployed website](https://elisacch.github.io/score-tracker/index.html)

## Table of content

- [Design and User Experience](#design-and-user-experience)
  - [Design](#design)
  - [User Stories](#user-stories)
  - [Wireframes](#wireframes)

- [Features](#features)
  - [Landing Page](#landing-page)
  - [Game Page](#game-page)
  - [Leaderboard](#leaderboard)

- [Testing](#testing)
  - [Tests](#tests)
  - [Validator Testing](#validator-testing)
  - [Fixed bugs](#fixed-bugs)
  - [Unfixed bugs](#unfixed-bugs)
  - [Performance](#performance)

- [Deployment](#deployment)
  - [Live Website](#live-website)
  - [Local Deployment](#local-deployment)

- [Credits](#credits)
  - [Content](#content)
  - [Media](#media)

- [Technologies used](#technologies-used)

## Design and User Experience

### Design

The design is based on the "Darts" game, which inspired this webpage.

- Color scheme inspiration:
![Darts](media/color-scheme-inspiration.jpg)
- Primary Color:

![Primary color](media/primary-color.png)
- Secondary Color:

![Secondary color](media/secondary-color.png)
- Dark Color:

![Dark color](media/dark-color.png)
- Neutral Color:

![Neutral color](media/neutral-color.png)



### User Stories

- As website owner I want:
    - To have an engaging design to catch the users attention.
    - That the website is accessible for all users.

- As a user I want:
    - To easily understand the purpose of the website.
    - To have a clear navigation.
    - That the design is responsive for mobile, so that I can have it always with me when I go out playing.
    - To easily add or remove points with one click.
    - To have a leaderboard where I can see the winner and ranking.
    - To be able to restart the game without having to re-enter all the players name.

### Wireframes

<details>
  <summary>Mobile</summary>

   ![Mobile Wireframes](media/Mobile.png) 

</details>

<details>
  <summary>Desktop</summary>

   ![Desktop Wireframes](media/Desktop.png) 

</details>



## Features 


### Landing page

The landing page is designed to fit in all mobile screens.

![Mobile landing page](media/landing-page-mobile.png)

- __New game__

There are two game modes, and the player can easily switch between the two when starting the game, and decide which mode suits better.

    - Darts Mode enabled: 
      - The goal is to reach 0 poins, and the user should select an initial score higher than zero. 
      - This is usually set to 501 or 301, so when enableing darts mode, the initial value will be set to 501, but the player can change it easily.
      - The limit will be set automatically to zero. If one player reaches or exceeded 0 then the game will prompt to finish the game and open the leaderboard.

    - Darts Mode disabled:
      - The goal is to reach the higher score.
      - The initial value will be set to 0, but the players can decide to change it for another value.
      - There is an option to set a limit score. If set the leamit will prompt the players to finish the game when reached. If not set the players will be able to finish the game manually.

![New Game Darts Mode](media/new-game-darts-enabled.png) ![New Game Darts Mode](media/new-game-darts-disabled.png)

The players can click on "Start" to begin the game or they can exit the modal.

- __Resume__

The resume button is disabled if there is no open game, and it will be enabled if the player starts a game, so that the user can go back to the game at any time.

- __About__

This button opens up a modal with an explaination of the functionalities and the two modes available. 
<details>
  <summary>See preview</summary>

   ![About Modal](media/about-modal.png) 

</details>

- __Social media links__

Social media links to find the site owner ( me! :) ) on gitHub and linkedIn on see my other projects:    
![Footer](media/social-media.png) 



### Game Page

When we create a new game we are redirected to the game page, where the user can add players and manage the game.

When the game starts there are no players, so the page will inform the user to add one player to start.

When at least on eplayer is added, the placeholder image and text disappear and we see the input to add or remove points, and the updated score for each player.

![Game Page with no players](media/game-page-no-players.png) ![Game Page with players](media/game-page-with-players.png) 

- __Header__

The header contains 3 action buttons:

    - Logo, that will redirect to the homepage.
    - Add Player button.
    - Options button.

- __Add player__

The user can add the playes by clicking on this icon.

A modal will open to enter the name of the player, and the initial score set for the game will be displayed. 

The user can decide to change the initial score, for example if a player need to be added in the middle of the game, or to re-enter a player deleted by accident.

<details>
  <summary>See preview</summary>

   ![Add player](media/add-player-initial-score.png) 

</details>

- __Options__

This button will open a modal that contains the two following commands:

    - New game, which will open the "New Game" modal as in the landing page. It allows the users to create a new game, deleting the players, setting a new initial score and selecting the game type (Darts or not).

    - Reset score, which will keep all the players and the current mode, but will set all the scores to the initial value set for the game.

<details>
  <summary>See preview</summary>

   ![Options](media/options.png) 

</details>

- __Target section__ 

This section is meant as reminder of the target score. 

It is initially set to 0, if the game is in Darts mode, or to the limit value set by the user for the current game.

If no limit is set, this section will indicate if the target is the higher score or the lower score, based on the game type. For example if the darts mode is disabled, the target will be to reached the higher score possible.


![Options](media/target.png) 

- __Players section__ 

This section is the core of the website. It allows to add and removes points to each player.

The user needs just to enter the points in the input associated to the desired players, and click to plus or minus sign to add or remove these points from the total.

![Players section](media/players-v2.png) 

This section was initially designed to have only one button which was performing a different oparation based on the game type.

    - For Darts Mode, it contained a minus sign (-), and the points were subtracted from the total.
    - For Non-darts Mode, it contained a plus sign (+), and it was adding the points to the total.

This approach was confusing for the users, who have found it difficult to understand. For this reason the second button was introduced, so that the user can easily add or remove points in one click.


<details>
  <summary>See the two verisons compared</summary>

   ![Single button](media/single-button.png)  ![Double buttons](media/double-buttons.png) 

</details>

- __Remove players__ 

Next to each player there is a button that can be used to remove the player from the game.
![Remove player button](media/remove-x.png)  

It will open a new filed that asks confirmation before deleting one player.
This was added to prevent the users from deleting one player unintentionally.

![Remove player confirmation](media/remove-confirmation.png) 

- __Scores section__

This section shows the updated score for each player

![Scores section](media/scores.png)

- __Finish game modal__

If one player reaches or exceeds the target (if set), then the system will open a pop-up to inform the players and ask them if they want to finish the game.

If the users select finish, they will be redirected to see the leaderboard.

If they select no the pop-up will close and they can continue the game.
In this case the limit will be removed, to avoid the pop-up to open each time they add or remove points.

<details>
  <summary>See preview</summary>

   ![Finish game modal](media/finish-prompt.png)  

</details>


- __Finish game button__

This button can be used to show the leaderboard at any time during the game.

It will be disabled if there are no players added and enabled if there is as low as 1 player.

![Finish button](media/finish-btn.png)  

### Leaderboard

This page shows the leaderboard, and the winner highlighted on the top.

Depending on the game type (Darts mode or not), the ranking might be from the lower score to the higher, or viceversa.

This page contains also the button to reset the scores directly, if the players want to start a new round, or they can simply exit and continue from where they left off.


![Leaderboard](media/leaderboard.png)  

## Testing 

To test my website I have opened it on different devices, to see if it was working as expected.

- Browser tested:


- Operating systems:


### Tests

  <details>
  <summary>Testing</summary>

  |Action | Expected behavious | Result|
  |-------|--------------------|-------|
  |action here | Bhaviour here | Pass/Fail |
  |action here | Bhaviour here | Pass/Fail |
  |action here | Bhaviour here | Pass/Fail |
  |action here | Bhaviour here | Pass/Fail |

  </details>



### Validator Testing

- HTML
  - Errors returned when passing the final version through the official [W3C validator](https://validator.w3.org/nu/#textarea)
- CSS
  - Errors when passing the final version through the official [Jigsaw validator](https://jigsaw.w3.org/css-validator/validator)
- JavaScript
  - Errors found when passing the final version through the official [Jshint validator](https://jshint.com/)

### Fixed Bugs
- Remove Players function:
  - First Bug: When I added the function to remove one player from the local storage, I added the function to display the payers again, so that it would read the updated local storage and the display area accordingly.
  Instead of removing the corresponding div from the display area it duplicated it, showing two divs for the same player.
  - Fix: Instead of calling the function __displayPlayers()__ I added a function to reload the page so that the program can read the updated local storage.

  ![Remove Players Error](media/remove-players-from-localstorage-error.png)

- Update Score function:
  - Bug: This function takes the value from input of type "number". This input allows also the value '__e__' and it caused the score to be updated to '__null__'. This also breaks the function, since we cannot add or remove any value from 'null'.
  ![Input Value Error 1](media/points-value-e-error.png)
  - Fix: I implemented a validation that prevents the value 'e' to be entered. 

  ![Input Value Fix 1](media/points-value-e-fix.png)


  - Second Bug: The input also allowed to enter multiple plus and minus signs, causing the following walue to be returned: "__NaN__".
  ![Input Value Error 2](media/points-value-nan-error.png)
  - Fix: For the second issue I have implemented a validation (.isNaN()) to check if the value converted to float returns NaN or a valid number.
   ![Input Value Fix 2](media/points-value-nan-fix.png)

### Unfixed Bugs



### Performance

I have tested the performance in chrome, using lighthouse:

<details>
  <summary> Mobile </summary>
  
  - Home page:

   ![Mobile - home page]()


</details>

<details>
  <summary> Desktop </summary>
  
  - Home page:

   ![Desktop- home page]()


</details>


## Deployment

### Live Website

- The site was deployed to GitHub pages. The steps to deploy are as follows: 
  - In the GitHub repository, navigate to the Settings tab 
  - From the source section drop-down menu, select the Master Branch
  - Once the master branch has been selected, the page will be automatically refreshed with a detailed ribbon display to indicate the successful deployment. 

The live link can be found here - [Live Website]()

### Local Deployment
  - For a local deployment follow these steps:
    - Create a new directory on your machine, where you want do deploy the files
    - Open the existing repository in GitHub
    - Go to the "Code" tab
    - Click on the "Code" button
    - Copy the HTTPS link
    - Open your terminal and run the command __git clone 'link'__
    - use the link just copied, without quotes, instead of 'link'

## Credits 

### Code

- The code for adding an event listener using data-type was taken from the [Code Institute course](https://codeinstitute.net/global/)
Lesson: Love Maths Walkthrough Project - Adding some JavaScript - Creating Event Listeners.

- To prevent the possibility to add __e__ and __+__ as values into the add pointa input, I checked this page in [stackoverflow](https://stackoverflow.com/questions/39291997/how-to-block-e-in-input-type-number) but changing the code to adapt it to my needs.

- The code to sort an array of objects based on one parameter was taken from this tutorial of All things JavaScript, LLC [JavaScript Problem: Sorting an Array of Objects](https://www.youtube.com/watch?v=0d76_2sksWY)


### Content

- Instructions on how to ##### were taken from [Site name](link)

- The icons were taken from [Font Awesome](https://fontawesome.com/)

- The following fonts, used for the project, are from [Google Fonts](https://fonts.google.com/)

### Media

- The photos used for this website are from [Unsplash](https://unsplash.com/)
  - Darts photo by [Immo Wegmann](https://unsplash.com/@macroman?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
  
  


## Technologies used

  - HTML
  - CSS
  - JavaScript
