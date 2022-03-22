module.exports = (express, connection) => {
  var router = express.Router();

  router.post('/games', function(req, res, next) {
    const league = req.body.league;
    const season = req.body.season;

    const sql = `select date,games.time,home.name as 'homeTeam',away.name as 'awayTeam',uploaded,
      count(distinct homeGoals.goalsId) as 'homeGoals',count(distinct awayGoals.goalsId) as 'awayGoals' from seasons,
      teams home,teams away,games,teamsforgames left join goals homeGoals on homeGoals.teamsId=teamsforgames.homeId and 
      homeGoals.gamesId=teamsforgames.gamesId left join goals awayGoals on awayGoals.teamsId=teamsforgames.awayId and 
      awayGoals.gamesId=teamsforgames.gamesId where games.seasonsId=seasons.seasonsid and games.gamesId=teamsforgames.gamesId and 
      home.teamsId=teamsforgames.homeId and away.teamsId=teamsforgames.awayId and leaguesid=? and seasons.seasonsId=?
      group by games.gamesId order by date,games.time`;

    connection.query(sql, [league, season], function (err, rows) {
      if (err) throw {err};
      res.send(rows);
    });
  });

  return router;
}