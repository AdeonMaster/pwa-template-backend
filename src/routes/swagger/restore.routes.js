/**
 *  @swagger
 *
 *  /restore:
 *    post:
 *      tags:
 *        - restore
 *      description: Begin password restoration
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
 *            properties:
 *              email:
 *                type: string
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
 *  /restore/{restoreCode}:
 *    post:
 *      tags:
 *        - restore
 *      description: Complete password restoration
 *      consumes:
 *        - application/json
 *      produces:
 *        - application/json
 *      parameters:
 *        - in: path
 *          name: restoreCode
 *          description: Restoration code (UUID)
 *          schema:
 *            type: string
 *          required: true
 *        - in: body
 *          name: body
 *          schema:
 *            type: object
 *            required:
 *              - password
 *            properties:
 *              password:
 *                type: string
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
