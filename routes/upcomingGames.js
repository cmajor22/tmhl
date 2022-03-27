module.exports = (express, connection) => {
  var router = express.Router();

  /* Season Rosters */
  router.put('/getUpcomingGames', function(req, res, next) {
    const league = req.body.league;
    const year = req.body.year;
    const sql = `select games.*,home.name as 'homeTeam',away.name as 'awayTeam',seasons.leaguesId as 'league' 
      from games,teamsforgames,teams home,teams away,seasons where games.gamesId=teamsforgames.gamesId 
      and home.teamsId=teamsforgames.homeId and away.teamsId=teamsforgames.awayId and games.seasonsId=seasons.seasonsId 
      and games.date>=date(now()) order by games.date,games.time limit 6`;

    connection.query(sql, [year, league], function (err, rows) {
      if (err) throw {err};
    
      res.send(rows);
    });
  });

  return router;
}