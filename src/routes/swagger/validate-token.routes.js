/**
 *  @swagger
 *
 *  /validate-token:
 *    post:
 *      tags:
 *        - validate token
 *      description: Used to validate token
 *      consumes:
 *        - application/json
 *      produces:
 *        - application/json
 *      security:
 *        - Bearer: []
 *      responses:
 *        200:
 *          description: Success
 *        400:
 *          description: Custom error
 *        403:
 *          description: Forbidden
 *        500:
 *          description: Server internal error
 */
