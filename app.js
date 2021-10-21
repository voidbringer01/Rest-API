const express = require ('express')
const app = express()
const jwt = require('jsonwebtoken')
const path = require('path')
const dotenv = require('dotenv');
const auth = require('./utils/auth_middleware')
const db = require('./models/index')

// Dotenv config
dotenv.config();

// Swagger setup
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const swaggerOptions = {
    swaggerDefinition:{
        info:{
            title:'Employees API',
            description:'Employees API information',
            contact:{
                name:'Dzemil Sejdija'
            },
            servers:['http://localhost:3000']
        }
    },
    apis:["app.js","./routes/*.js"]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

// db check
db.authenticate()
    .then(()=>{
        console.log('Database connected...')
    })
    .catch((err)=>{
        console.log(err)
    })
db.sync()

// parsers
app.use(express.urlencoded({extended:false}))
app.use(express.json())


// Routes
app.use(express.static(path.join(__dirname,'static')))
app.use('/employees', require('./routes/employees'))


/**
 * @swagger
 * /auth:
 *  get:
 *    description: Used to authenticate the user
 *    tags: [Authentication]
 *    produces: 
 *      - application/json
 *    responses:
 *      '200':
 *        description: OK
 *        schema:
 *           type: object
 *           properties:
 *               token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 *                   description: JWT token.
 */
app.get('/auth',(req,res)=>{
    jwt.sign({user:req.hostname},process.env.JWT_SECRET || 'neka tajna',(err,token)=>{
        if (err) res.json({message:err.message})
        res.json({token})
    })
})
/**
 * @swagger
 * /isauthenticated:
 *  get:
 *    description: Used to check if user is authenticated
 *    tags: [Authentication]
 *    produces: 
 *      - application/json
 *    responses:
 *      '200':
 *        description: OK
 *      '403':
 *        description: Forbidden.
 */
app.get('/isauthenticated',auth, (req,res)=>{
    res.json(true)
})


module.exports = app