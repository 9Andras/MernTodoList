# MernTodoList

A simple, but useful todo app developed with the MERN stack as foundation.

First of all, thank you for downloading/cloning/looking at this project of mine. This was my first ever from the
ground-up MERN project I started working on at Codecool, and something I have refined during my job search to be part of
my portfolio.

Should this be your first ever time looking at a MERN stack project, follow the instructions below to get set up and
maybe continue refining/using my work. 

This project grew more before I knew it and now includes authorization for the users, protected backend and frontend routes and properly populated todos fetched from the user's data and mapped on the frontend.

In the future, I would like to refine this project further, adding a User Profile section, animated done marking for the todos, filtering of the todos and more.



### Setup Instructions:

- create a mongoDB cluster or database for yourself (follow this page: https://www.mongodb.com/basics/create-database)
- run ` npm install ` to install the needed packages (these packages will be: express, nodemon, mongoose, dotenv, etc.)
- rename the dotenvexample.txt files to `.env ` and adjust the connection link to match yours, also make your `SECRET`
  for token generation
- navigate to the populate directory (cmd: `cd.\server\populate\` run the command `node populate.js` while still in the directory (this will populate the DB with some users and
  their random todos using the 2 json files in the populate directory)


#### Running the server:

- open a terminal, navigate to the server directory (cmd: `cd .\server\`) and run the command ` npm run dev ` (if the
  database is viable it should start without problems)<br>
  <b><u>Note:</u></b> Because of the use of nodemon, every adjustment made to the server code restarts the server.
  Should the mongo connection be slow, please wait until the terminal writes: ` "Database connection established!" `

#### Running the frontend (React-based)

- open a terminal, navigate to the client directory (cmd: `cd .\client\`) and run the command: `npm start`. This will
  start the development server of React on port 3000. <br>
  <b><u>Note:</u></b> this command will most likely open your default browser and automatically
  open `http://localhost:3000/` in the browser. Should you close the browser this is the address you can return to.

- to start using the app and site, follow the instructions on the welcome page
