# Score TRACKER
A web application inspired by darts, but that can be used to track any game score.

Have you ever played darts with your friends (or any other game), without having the tool to track your scores? Did you find yourself trying to keep track of the score in the retro of an old receipt or on the "Notes" application of your phone?

Score TRACKER is the solution.

A simple and intiuitive design, easy to use for your games.

![Responsice Mockup]()

[See deployed website]()

## Table of content

- [Design and User Experience](#design-and-user-experience)
  - [Design](#design)
  - [User Stories](#user-stories)
  - [Wireframes](#wireframes)

- [Features](#features)
  - [Landing Page](#landing-page)
  - [Game Page](#game-page)
  - [Add Player](#add-player)
  - [Options](#option)
  - [Final Score Page](#final-score)

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
    - That users are prompt to share the website with their friends.

- As a user I want:
    - To easily understand the purpose of the website.
    - To have a clear navigation.
    - To have the option to ammend the score if I made a mistake.
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

- __New game__

- __Options__

- __Social media links__


### Game Page

- __New player__

- __Options__

- __Ad score section__ 

- __Total score__

- __Finish game__


### Add player

### Options

### Final score page


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



### Content

- Instructions on how to ##### were taken from [Site name](link)

- The icons were taken from [Font Awesome](https://fontawesome.com/)

- The following fonts, used for the project, are from [Google Fonts](https://fonts.google.com/):
  - 
  - 

### Media

- The photos used for this website are from [Unsplash](https://unsplash.com/)
  - Darts photo by [Immo Wegmann](https://unsplash.com/@macroman?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
  
  


## Technologies used

  - HTML
  - CSS
  - JavaScript
