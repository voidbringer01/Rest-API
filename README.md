# Rest-API
Simple Rest API created in Node with MySQL using express as web server and sequelize as ORM. 
Tests are written with Jest and documentation available at `/api-docs` is generated via Swagger.
## Setting up
- Clone the repository `git clone https://github.com/voidbringer01/Rest-API.git`
- Move into the cloned directory `cd Rest-API`
- Install dependencies with `npm i`
- Setup the local MySQL Database
- Create .env file and add next variables:
  - PORT
  - HOST
  - DB_HOST
  - DB_USER
  - DB_PASSWORD
  - DB_NAME
  - JWT_SECRET
- Run your app with `npm start`
## Further
- To run the tests type `npm test`
