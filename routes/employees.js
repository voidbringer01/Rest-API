const express = require('express')
const router = express.Router()
const employeesController = require('../controllers/employees.controller')

  /**
   * @swagger
   * definitions:
   *   Employees:
   *     properties:
   *       id:
   *         example: 3
   *         type: integer
   *       name:   
   *         example: John Doe
   *         type: string
   *       email:
   *         example: johndoe@gmail.com
   *         type: string
   *       phone:
   *         example: 0661234567
   *         type: string
   *       city:
   *         example: Novi Pazar
   *         type: string
   *       zipcode:
   *         example: 36300
   *         type: string   
   *       street:
   *         example: Kraljevica Marka 2
   *         type: string
   *       date_of_birth:
   *         example: 21-10-2021
   *         type: string
   *         format: date-time
   */



  /**
   * @swagger
   * tags:
   *  - name: Authentication
   *    description: User authentication
   *  - name: Employees
   *    description: RESTful Employees API
   * 
   */

  /**
   * @swagger
   * /employees:
   *   get:
   *     description: Get all employees
   *     tags:
   *      - Employees
   *     produces:
   *      - application/json
   *     responses:
   *       200:
   *         description: OK
   *         schema:
   *           type: object
   *           $ref: '#/definitions/Employees'
   */
  router.get('/',employeesController.findAll)

  /**
   * @swagger
   * /employees/{id}:
   *   get:
   *     description: Get a employee by id
   *     tags:
   *      - Employees
   *     produces:
   *      - application/json
   *     parameters:
   *      - in: params
   *        name: id
   *        example: 3
   *        description: employee to select
   *        schema:
   *            type: integer
   *        required: true 
   *     responses:
   *       200:
   *         description: OK
   *         schema:
   *           type: object
   *           $ref: '#/definitions/Employees'
   *       404:
   *         description: Not found
   *         schema:
   *            type: object
   *            properties:
   *                message:
   *                    type: string
   *                    example: Can't find user with id 3.
   *                    description: Message from the server
   */
  router.get('/:id',employeesController.findOne)

  /**
   * @swagger
   * /employees:
   *   post:
   *     description: Add new employee
   *     tags: [Employees]
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: body
   *         name: employee
   *         description: The employee to create.
   *         schema:
   *            $ref: '#/definitions/Employees' 
   *     responses:
   *       200:
   *         description: OK
   *         schema:
   *            type: object
   *            properties:
   *                message:
   *                    type: string
   *                    example: Successful insert.
   *                    description: Message from the server.
   *                userID:
   *                    type: integer
   *                    example: 3
   *                    description: ID of the created user.
   */
  router.post('/',employeesController.create)

  /**
   * @swagger
   * /employees/{id}:
   *   put:
   *     description: Edit existing employee
   *     tags: [Employees]
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: body
   *         name: employee
   *         description: The employee to create.
   *         schema:
   *            $ref: '#/definitions/Employees' 
   *       - in: params
   *         name: id
   *         description: employee to select
   *         schema:
   *            type: integer
   *         required: true 
   *     responses:
   *       200:
   *         description: OK
   *         schema:
   *            type: object
   *            properties:
   *                message:
   *                    type: string
   *                    example: Successful edit.
   *                    description: Message from the server
   *       404:
   *         description: Not found
   *         schema:
   *            type: object
   *            properties:
   *                message:
   *                    type: string
   *                    example: Couldn't edit.
   *                    description: Message from the server
   */
  router.put('/:id',employeesController.update)

  /**
   * @swagger
   * /employees/{id}:
   *   delete:
   *     description: Delete an employee.
   *     tags: [Employees]
   *     produces:
   *       - application/json
   *     parameters:
   *      - in: params
   *        name: id
   *        description: Employee to delete.
   *        schema:
   *            type: integer
   *        required: true 
   *     responses:
   *       200:
   *         description: OK.
   *         schema:
   *            type: object
   *            properties:
   *                message:
   *                    type: string
   *                    example: Successful delete.
   *                    description: Message from the server
   *       404:
   *         description: Not found
   *         schema:
   *            type: object
   *            properties:
   *                message:
   *                    type: string
   *                    example: Couldn't delete
   *                    description: Message from the server
   */ 
  router.delete('/:id',employeesController.delete)

module.exports = router