# :pray: mettabot :pray:
*Maitrī (Sanskrit; Pali: mettā) means benevolence, loving-kindness, friendliness, amity, good will, and active interest in others.*

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Twitter](https://img.shields.io/badge/@spreadthemetta-%231DA1F2.svg?style=for-the-badge&logo=Twitter&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

### Short Description
A pep talk generator for experimenting with css/svg animation, speech synthesis, and chat bot APIs. 

[Live Demo](https://www.mettabot.app)

### Table of Contents
- [Background](#background)
- [Install](#install)
- [Usage](#usage)
- [API](#api)
- [Contributing](#contributing)
- [License](#license)

### Background
This project was born out of the synthesis of a few goals:
- build a web app from the ground up without a heavy framework
- spread some encouragement, joy, and kindness into the online community
- delve deeper into CSS Animations
- provide a jumping off point for other explorations such as chat bots and speech synthesis

### Install
- Fork/clone repo
- Run `npm install` to install dependencies
- Run `npm run dev` to run server in development mode using `nodemon`
- Run `npm start` to run server in production mode


#### Dependencies 
- `express`
- `twitter-api-v2`
- `dotenv`
- `nodemon` (development only)

### Usage
#### Frontend
Home route at `/` in browser displays animated random message as static site

### API
API endpoint at `/api/message` returns random message in JSON format as "text" field
API endpoint at `/api/twitter/asme` triggers OAuth2 flow. Upon authentication, bot will update the authenticated users status with a random message. 

### Contributing
If you'd like to add additional phrases to mettabot, submit a pull request on the files in `/messages` that adds suggested strings to the array. 

The format is simple - there are 4 parts (files labeled p1...p4). 
- Part 1 - The greeting: e.g."Hello there,"
- Part 2 - The subject of the compliment: e.g. "your hair today"
- Part 3 - The compliment: e.g. "is the best I've ever seen"
- Part 4 - The closer: e.g. "without a doubt."

*follow exisiting examples in the array for formatting*

Messages must be wholesome and kind. 

If you'd like to contribute to additional features, contact me at erich@zenlex.dev


### License
[GNU General Public License](https://opensource.org/licenses/GPL-3.0)

