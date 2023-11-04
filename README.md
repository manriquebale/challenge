# Development Challenge for Node.js

The Movie and TV Series Management API is a backend application developed with Node.js, Express, and MongoDB. It provides a set of services for managing information related to movies, TV series, actors, and directors. 

## Prerequisites
Make sure you have the following installed:

- Node.js
- MongoDB

## Setup

1. **Clone the Repository:**

   git clone https://github.com/manriquebale/challenge.git

2. **Install Dependencies:**

Open a terminal in the root folder of your project and run the following command to install the dependencies:
    npm install

3. **Configure Environment Variables:**

Create a .env file in the project's root with the appropriate configuration. Here's an example:

- DB_URI = 'mongodb://localhost:27017/filmographyDB'
- JWT_EXPIRATION = 5d
- JWT_SECRET =  'secret'
- PORT = 3000
4. **Usage**
To run the application, use the following command:

npm start

The application will run at http://localhost:3000 by default.

**Routes**

- /auth: Authentication routes.
- /users: User management routes.
- /movies: Routes related to movies.
- /directors: Routes related to directors.
- /actors: Routes related to actors.
- /shows: Routes related to TV series.




