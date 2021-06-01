var authentication = require('./authentication.controller');

async function checkUser(req, res, next) {

  try {
      
      var authenticated = await authentication.getAuthentication(req.body.user,req.body.password,req.body.role);

      if (authenticated) {
          res.json(true);
      } else {
          res.json(false);
      }

  } catch (error) {
      console.error(error);
      res.status(500).send({"err" : "Internal error on check User"});
  }
}

module.exports = {checkUser};