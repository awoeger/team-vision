# Team Vision

![Screenshot 1]()

![Screenshot 2]()

![Screenshot 3]()

## Deployed Version

You can visit the deployed website under:
[Team Vision]().

This project was created as the final project of the requirements for the Upleveled bootcamp in Vienna.

## Functionalities

This management app for sport teams includes the following functionalities:

- Register either as a coach or a player

Coaches:

- Create different teams and let your players sign-up for it
- Check out a players application before you can accept or deny them to the team
- Create events and see all attending, possibly attending and non attending players in one spot

Players:

- Send your favourite team a player request and tell the coach, why you are the right person for the team
- See all upcoming events for the season, filter them and tell the coach and your co-players, if you are attending or not
- Have a collection of exercises for home workouts to keep you fit throughout the season

## Technologies

- Next.js
- React.js
- Postgres
- Emotion
- Typescript
- Jest / Cypress

## SetUp Guide

To work on this project by yourself, please follow the upcoming steps:

- Clone repo to your local machine
- Download and install PostgreSQL
- Create a user and database for this project
- Modify the info in the .env-example file
- Rename the file to .env
- Install dotenv-cli with <yarn global add dotenv-cli>
- Run <yarn install> in your command line
- Run the migrations for your local database with <yarn migrateup>
- Start the server by running <yarn dev>

## Deploy your own website to Heroku

- Sign up for Heroku: signup.heroku.com
- Create a new App
- Choose a name and select the "Europe" Region
- Click on the button in the middle called "Connect to GitHub"
- Search for your repository in the search box at the bottom of the page and click on the "Connect" button Click on the button for "Enable Automatic Deploys"
- Go back to the Overview tab and click on "Configure Add-On"
- Search for "Postgres" and select "Heroku Postgres" from the results
- Trigger a deploy pushing to your github repo and enjoy.
