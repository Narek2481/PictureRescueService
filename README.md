Picture Rescue Service is a project for storing pictures and it has registration and login. It uses different algorithms and methods to store and retrieve images.

Installation
Clone the repository:

bash
Copy code
git clone https://github.com/Narek2481/PictureRescueService.git
Navigate to the project directory:

bash
Copy code
cd PictureRescueService
cd client 
npm install
Install the dependencies:

Copy code
cd server 
npm install
change the .env file in the project's client directory.

Configure the server by providing the following configurations in the .env file:

dotenv
Copy code
PORT=4000
SECRET="Narek2481"
SECRET_REFRESH="Narek1998"
CLIENT_URL="http://localhost:3000"
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER=picturerescueservice@gmail.com
SMTP_PASSWORD=nareknarek1998
API_URL="http://localhost:4000"
ENCRYPTION_SECRET="NarekNarek1998"

Configure the PostgreSQL database by providing the following configurations in the server/data_base/db.js file:

javascript
Copy code
import Sequelize from 'sequelize';

const config = {
    development: {
        username: 'postgres',
        password: '123',
        database: 'PictureRescueService',
        host: 'localhost',
        dialect: 'postgres',
        port: 5432
    }
};

const { username, password, database, host, dialect, port } = config.development;

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect,
  port
});

export { sequelize };
Make sure you have Node.js version 18.7.0 installed.

Start the server:

arduino
Copy code
npm run dev
The Picture Rescue Service server is now running on http://localhost:4000.

Frontend Configuration
If you want to configure the frontend, you can provide the following configurations in the frontend project's .env file:

dotenv
Copy code
ENCRYPTION_SECRET="NarekNarek1998"
ENCRYPTION_SECRET_FOR_TOKEN="narek1998"
Please refer to the frontend project's package.json file for additional configuration details.

Dependencies
The project has the following dependencies:

Server:

bcrypt: ^5.1.0
body-parser: ^1.20.2
cookie-parser: ^1.4.6
cors: ^2.8.5
crypto-js: ^4.1.1
dns: ^0.1.2
dotenv: ^16.0.3
express: ^4.18.2
express-session: ^1.17.3
formidable: ^2.1.1
jsonwebtoken: ^9.0.0
multer: ^1.4.5-lts.1
nodemailer: ^6.9.2
pg: ^8.10.0
pg-hstore: ^2.3.4
postgresql: ^0.0.1
sequelize: ^6.30.0
sequelize-cli: ^6.6.0
sharp: ^0.32.0
uuid: ^9.0.0
Frontend:

axios: ^1.3.4
bootstrap: ^5.2.3
crypto-js: ^4.1.1
js-cookie: ^3.0.1
react: ^18.2.0
react-avatar-edit: ^1.2.0
react-bootstrap: ^2.7.4
react-cookie: ^4.1.1
react-dom: ^18.2.0
react-dotenv: ^0.1.3
react-modal: ^3.16.1
react-redux: ^8.0.5
react-remove-scroll: ^2.5.5
react-router-dom: ^6.8.1
react-scripts: ^5.0.1
redux: ^4.2.1
redux-thunk: ^2.4.2
sass: ^1.60.0
web-vitals: ^2.1.4
Make sure to install these dependencies using npm install before running the project.

License
This project is licensed under the ISC License.