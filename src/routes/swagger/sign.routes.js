/**
 *  @swagger
 *
 *  /signup:
 *    post:
 *      tags:
 *        - sign
 *      description: Sign Up to the application
 *      consumes:
 *        - application/json
 *      produces:
 *        - application/json
 *      parameters:
 *        - in: body
 *          name: body
 *          schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *                type: string
 *              password:
 *                type: string
 *      responses:
 *        200:
 *          description: Success
 *        400:
 *          description: Custom error
 *        500:
 *          description: Server internal error
 */

/**
 *  @swagger
 *
 *  /signin:
 *    post:
 *      tags:
 *        - sign
 *      description: Sign In to the application
 *      consumes:
 *        - application/json
 *      produces:
 *        - application/json
 *      parameters:
 *        - in: body
 *          name: body
 *          schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *                type: string
 *              password:
 *                type: string
 *      responses:
 *        200:
 *          description: Success
 *        400:
 *          description: Custom error
 *        500:
 *          description: Server internal error
 */
