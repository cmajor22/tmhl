# Tottenham Men's Hockey League App

This is a web app for a men's hockey league.  

It's build on React on the front end, express on the backend, and MySQL for the database.

It's been dockerized for ease of use.

To install dependencies, run:
### `npm install && cd client && npm install`

To run the dev environment:
### `npm run dev`

To run the front end on it's own:
### `npm run client`

To run the back end on it's own:
### `npm run server`

To build the front end:
### `npm run build`

# You will need to create a .env file to store secure credentials:
REACT_APP_HOST=
REACT_APP_USER=
REACT_APP_PASSWORD=
REACT_APP_DATABASE=
REACT_APP_EMAILUSER=
REACT_APP_EMAILPASSWORD=
PORT=3001
BACKENDPORT=3000

# Database structure
The database structure is in schema.sql