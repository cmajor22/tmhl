module.exports = (express, connection) => {
  var router = express.Router();

  /* All Time Points */
  router.post('/points', function(req, res, next) {
    const sql = `select players.playersId,players.name,count(*) as points,format(count(*) / gamesPlayed, 2) as pointsRate
      from goals,players,games,seasons,(
        select players.playersId,players.name,count(*) as gamesPlayed
        from games,seasons,teamsforgames,players,playersforteams
        where games.gamesId=teamsforgames.gamesId and games.seasonsId=seasons.seasonsId and leaguesId=1 and uploaded=1
        and players.playersId=playersforteams.playersId
        and (homeId=playersforteams.teamsId or awayId=playersforteams.teamsId)
        group by playersId) gamesPlayed
      where (goals.goal=players.playersId or goals.assist1=players.playersid or goals.assist2=players.playersId) and 
      goals.gamesId=games.gamesId and games.seasonsId=seasons.seasonsid and leaguesid=1 and players.name not like "%sub%" and 
      players.playersId=gamesPlayed.playersId
      group by playersId order by count(*) desc,players.name;`;

    connection.query(sql, [], function (err, rows) {
      if (err) throw {err};
    
      res.send(rows);
    });
  });

  /* All Time Goals */
  router.post('/goals', function(req, res, next) {
    const sql = `select players.playersId,players.name,count(*) as goals,format(count(*) / gamesPlayed, 2) as goalsRate
      from goals,players,games,seasons,(
        select players.playersId,players.name,count(*) as gamesPlayed
        from games,seasons,teamsforgames,players,playersforteams
        where games.gamesId=teamsforgames.gamesId and games.seasonsId=seasons.seasonsId and leaguesId=1 and uploaded=1
        and players.playersId=playersforteams.playersId
        and (homeId=playersforteams.teamsId or awayId=playersforteams.teamsId)
        group by playersId) gamesPlayed
      where goals.goal=players.playersid and goals.gamesId=games.gamesId and games.seasonsId=seasons.seasonsid and 
      leaguesid=1 and players.name not like "%sub%" and
      players.playersId=gamesPlayed.playersId
      group by goal order by count(*) desc,players.name`;

    connection.query(sql, [], function (err, rows) {
      if (err) throw {err};
    
      res.send(rows);
    });
  });

  /* All Time Assists */
  router.post('/assists', function(req, res, next) {
    const sql = `select players.playersId,players.name,count(*) as assists,format(count(*) / gamesPlayed, 2) as assistsRate
      from goals,players,games,seasons,(
        select players.playersId,players.name,count(*) as gamesPlayed
        from games,seasons,teamsforgames,players,playersforteams
        where games.gamesId=teamsforgames.gamesId and games.seasonsId=seasons.seasonsId and leaguesId=1 and uploaded=1
        and players.playersId=playersforteams.playersId
        and (homeId=playersforteams.teamsId or awayId=playersforteams.teamsId)
        group by playersId) gamesPlayed
      where (goals.assist1=players.playersid or goals.assist2=players.playersId) and goals.gamesId=games.gamesId and 
      games.seasonsId=seasons.seasonsid and leaguesid=1 and players.name not like "%sub%" and
      players.playersId=gamesPlayed.playersId
      group by playersId order by count(*) desc,players.name;`;

    connection.query(sql, [], function (err, rows) {
      if (err) throw {err};
    
      res.send(rows);
    });
  });

  /* All Time Pims */
  router.post('/pims', function(req, res, next) {
    const sql = `select players.playersId,players.name,sum(minutes) as pims,format(count(*) / gamesPlayed, 2) as pimsRate
      from penalties,players,games,seasons,(
        select players.playersId,players.name,count(*) as gamesPlayed
        from games,seasons,teamsforgames,players,playersforteams
        where games.gamesId=teamsforgames.gamesId and games.seasonsId=seasons.seasonsId and leaguesId=1 and uploaded=1
        and players.playersId=playersforteams.playersId
        and (homeId=playersforteams.teamsId or awayId=playersforteams.teamsId)
        group by playersId) gamesPlayed
      where penalties.playersId=players.playersId and penalties.gamesId=games.gamesId and games.seasonsId=seasons.seasonsid and 
      leaguesid=1 and players.name not like "%sub%" and
      players.playersId=gamesPlayed.playersId
      group by playersId order by sum(minutes) desc,players.name;`;

    connection.query(sql, [], function (err, rows) {
      if (err) throw {err};
    
      res.send(rows);
    });
  });

  return router;
}