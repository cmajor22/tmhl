module.exports = (express, connection) => {
  var router = express.Router();

  /* Season Rosters */
  router.put('/getUpcomingGames', function(req, res, next) {
    const league = req.body.league;
    const year = req.body.year;
    const sql = `
      select games.*,home.teamsId as 'home',home.name as 'homeTeam',away.teamsId as 'away',away.name as 'awayTeam',seasons.leaguesId as 'league',
      sum(if(home.teamsId=goals.teamsId,1,0)) as homeScore,sum(if(away.teamsId=goals.teamsId,1,0)) as awayScore
          from teamsforgames,teams home,teams away,seasons,games
          left join goals on goals.gamesId=games.gamesId 
          where games.gamesId=teamsforgames.gamesId 
          and home.teamsId=teamsforgames.homeId and away.teamsId=teamsforgames.awayId and games.seasonsId=seasons.seasonsId 
          and games.date>=date(now())
          group by games.gamesId
          order by games.date,convert(SUBSTRING_INDEX(games.time, ':', 1), unsigned integer)
          limit 6`;

    connection.query(sql, [year, league], function (err, rows) {
      if (err) throw {err};
    
      res.send(rows);
    });
  });

  return router;
}