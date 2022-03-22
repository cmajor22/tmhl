module.exports = (express, connection) => {
  var router = express.Router();

  router.post('/', function(req, res, next) {
    const league = req.body.league;
    const sql = `select * from seasons where leaguesId=? order by name desc`;

    connection.query(sql, [league], function (err, rows) {
      if (err) throw {err};
    
      res.send(rows);
    });
  });

  return router;
}