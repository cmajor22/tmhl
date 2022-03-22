module.exports = (express, connection) => {
  var router = express.Router();

  /* Posts */
  router.put('/', function(req, res, next) {
    const sql = `select post_date,post_title,post_content
    from totte873_tmhlwp.tmhlwpposts where post_status like "publish" and post_type like "post"
    order by post_date desc`;

    connection.query(sql, [], function (err, rows) {
      if (err) throw {err};
    
      res.send(rows);
    });
  });

  return router;
}