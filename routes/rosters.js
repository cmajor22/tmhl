module.exports = (express, connection) => {
  var router = express.Router();

  /* Season Rosters */
  router.post('/', function(req, res, next) {
    const league = req.body.league;
    const year = req.body.year;
    const sql = `select players.playersId,playerNumber as 'number',players.name as 'playerName', teams.name as 'teamName',isGoalie,isCaptain,
      primaryColour,secondaryColour,shortForm
      from playersforteams,teams,seasons,players
      where playersforteams.teamsId=teams.teamsId and teams.seasonsId=seasons.seasonsid 
      and players.playersId=playersforteams.playersId and seasons.name  like ? and leaguesId=? 
      order by teams.teamsId,isCaptain desc,isGoalie desc,players.name`;

    connection.query(sql, [year, league], function (err, rows) {
      if (err) throw {err};
    
      res.send(rows);
    });
  });

  /* Team Captains */
  router.post('/captains', function(req, res, next) {
    const sql = `select players.playersId,playerNumber as 'number',players.name as 'playerName', teams.name as 'teamName',isGoalie,isCaptain,leaguesId,
      primaryColour,secondaryColour,shortForm
      from playersforteams,teams,seasons,players
      where playersforteams.teamsId=teams.teamsId and teams.seasonsId=seasons.seasonsid 
      and players.playersId=playersforteams.playersId and seasons.isActive=1 and isCaptain=1
      order by teams.teamsId,isCaptain desc,isGoalie desc,players.name`;

    connection.query(sql, [], function (err, rows) {
      if (err) throw {err};
    
      res.send(rows);
    });
  });

  return router;
}