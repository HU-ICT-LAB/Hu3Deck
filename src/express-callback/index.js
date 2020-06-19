module.exports = function makeExpressCallback (controller) {
    return (req, res) => {

      const httpRequest = {
        body: req.body,
        query: req.query,
        params: req.params,
        ip: req.ip,
        method: req.method,
        path: req.path,
        headers: {
          'Content-Type': req.get('Content-Type'),
          Referer: req.get('referer'),
          'User-Agent': req.get('User-Agent')
        }
      };

      controller(httpRequest)
        .then(httpResponse => {
          if (httpResponse.headers) {
            //remove when not in development
            httpResponse.headers['Access-Control-Allow-Origin'] = 'http://localhost:4200';
            res.set(httpResponse.headers);
          }
          res.type('json');
          res.status(httpResponse.statusCode).send(httpResponse.body);
        })
        .catch(e => {console.log(e); return res.status(500).send({ error: 'An unkown error occurred.' })});
    }
  }