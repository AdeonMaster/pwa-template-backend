/**
 *  @swagger
 *
 *  /validate:
 *    post:
 *      tags:
 *        - validate
 *      description: Begin account validation
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

/**
 *  @swagger
 *
 *  /validate/{validateCode}:
 *    post:
 *      tags:
 *        - validate
 *      description: Complete account validation
 *      consumes:
 *        - application/json
 *      produces:
 *        - application/json
 *      security:
 *        - Bearer: []
 *      parameters:
 *        - in: path
 *          name: validateCode
 *          description: Validation code (UUID)
 *          schema:
 *            type: string
 *          required: true
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
