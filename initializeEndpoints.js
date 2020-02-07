const { linkConverter } = require('./services/link-converter');

initializeEndpoints = (app) => {
  /**
   * @swagger
   * /echo:
   *    get:
   *      summary: Server echo message with UTC time
   *      description: This should server ECHO message
   *      tags: [main API]
   *      responses:
   *        200:
   *          description: Succesfull ECHO message
   */
  app.get('/echo', (req, res) => res.json({"echo": new Date().toUTCString()}));
  /**
   * @swagger
   * /convertLinks:
   *    post:
   *      summary: Converts input text keywords to links
   *      description: This should return text with input keywords occurences converted to links
   *      tags: [main API]
   *      responses:
   *        200:
   *          description: Succesfull conversion response
   *        500:
   *          description: Validation or internal server error with message
   *          
   *      parameters: [
   *        {name: html, description: HTML text to be converted, required: true, in: json},
   *        {name: keys, description: objects array of KEY && URL, required: true, in: json}
   *      ]
   *  
   */
  app.post('/convertLinks', function (req, res, next) { 
    let results = linkConverter(req, res, next);
  });
  // app.get('/convertLinks', (req, res) => res.json({ "echo": new Date().toUTCString() }));  
}

module.exports = initializeEndpoints;