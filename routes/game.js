module.exports = (express, connection) => {
  var router = express.Router();

  /* Game goals */
  router.post('/goals', function(req, res, next) {
    const gameId = req.body.gameId;
    const sql = `select seasons.hasStatsV2,games.gamesId,games.date,games.time,home.teamsId as 'homeId',
      home.name as 'homeName',away.teamsId as 'awayId',away.name as 'awayName',goals.teamsId as 'goalTeam',
      isSHG,isPP,isOT,period,goals.time as 'goalTime', goal.name as 'goal',ifnull(assist1.name,'') as 'assist1',
      ifnull(assist2.name,'') as 'assist2' from games,seasons,teamsforgames left join teams home on home.teamsId=teamsforgames.homeId 
      left join teams away on away.teamsId=teamsforgames.awayId left join (select * from goals where gamesid=?) goals 
      on goals.gamesId=teamsforgames.gamesId left join players goal on goal.playersId = goals.goal 
      left join players assist1 on assist1.playersId = goals.assist1 left join players assist2 on assist2.playersId = goals.assist2 
      where games.gamesid=? and games.gamesId=teamsforgames.gamesId and games.gamesId=goals.gamesId 
      and games.seasonsId=seasons.seasonsId  order by period,substring_index(substring_index(goals.time,':',1),':',1)*1 desc,
      substring_index(substring_index(goals.time,':',2),':',-1)*1 desc`;

    connection.query(sql, [gameId, gameId], function (err, rows) {
      if (err) throw {err};
    
      res.send(rows);
    });
  });

  /* Game penalties */
  router.post('/penalties', function(req, res, next) {
    const gameId = req.body.gameId;
    const sql = `select seasons.hasStatsV2,games.gamesId,games.date,games.time,home.teamsId as 'homeId',home.name as 'homeName',
      away.teamsId as 'awayId',away.name as 'awayName',penalties.teamsId as 'penaltyTeam', penalty.name as 'penalty',infraction,
      minutes,period,penalties.time as 'penaltyTime' from games,seasons,teamsforgames 
      left join teams home on home.teamsId=teamsforgames.homeId left join teams away on away.teamsId=teamsforgames.awayId 
      left join (select * from penalties where gamesid=?) penalties on penalties.gamesId=teamsforgames.gamesId 
      left join players penalty on penalties.playersId = penalty.playersId where games.gamesid=?
      and games.gamesId=teamsforgames.gamesId and games.seasonsId=seasons.seasonsId`;

    connection.query(sql, [gameId, gameId], function (err, rows) {
      if (err) throw {err};
    
      res.send(rows);
    });
  });

  /* Game home list */
  router.post('/home', function(req, res, next) {
    const gameId = req.body.gameId;
    const sql = `select homeT4.*,teamName,goals+assists as 'points',ifnull(sum(penalties.minutes),0) as 'penalties' 
    from ( select homeT3.*,assists1+count(distinct goalsId) as 'assists' from ( select homeT2.*,count(distinct goalsId) as 'assists1' 
    from ( select homeT.*,count(distinct goalsId) as 'goals' from ( select players.playersId,players.name as 'playerName',playerNumber,teams.name as teamName,
    isGoalie,games.gamesId from games,teams,teamsforgames left join playersforteams home on teamsforgames.homeId=home.teamsId 
    left join players on players.playersId=home.playersId where games.gamesid=teamsforgames.gamesId and games.gamesid=? and teamsforgames.homeId=teams.teamsId) homeT 
    left join goals on homeT.playersId = goals.goal and homeT.gamesId=goals.gamesId group by playersId) homeT2 
    left join goals assists1 on homeT2.playersId=assists1.assist1 and homeT2.gamesId=assists1.gamesId group by playersId) homeT3 
    left join goals assists2 on homeT3.playersId=assists2.assist2 and homeT3.gamesId=assists2.gamesId group by playersId) homeT4 
    left join penalties on homeT4.playersId=penalties.playersId and homeT4.gamesId=penalties.gamesId group by playersId 
    order by points desc,isGoalie,goals desc,assists desc,penalties`;

    connection.query(sql, [gameId], function (err, rows) {
      if (err) throw {err};
    
      res.send(rows);
    });
  });

  /* Game away list */
  router.post('/away', function(req, res, next) {
    const gameId = req.body.gameId;
    const sql = `select awayT4.*,teamName,goals+assists as 'points',ifnull(sum(penalties.minutes),0) as 'penalties' 
      from ( select awayT3.*,assists1+count(distinct goalsId) as 'assists' from ( select awayT2.*,count(distinct goalsId) as 'assists1' 
      from ( select awayT.*,count(distinct goalsId) as 'goals' from ( select players.playersId,players.name as 'playerName',playerNumber,teams.name as teamName,
      isGoalie,games.gamesId from games,teams,teamsforgames left join playersforteams away on teamsforgames.awayId=away.teamsId 
      left join players on players.playersId=away.playersId where games.gamesid=teamsforgames.gamesId and games.gamesid=? and teamsforgames.awayId=teams.teamsId) awayT 
      left join goals on awayT.playersId = goals.goal and awayT.gamesId=goals.gamesId group by playersId) awayT2 
      left join goals assists1 on awayT2.playersId=assists1.assist1 and awayT2.gamesId=assists1.gamesId group by playersId) awayT3 
      left join goals assists2 on awayT3.playersId=assists2.assist2 and awayT3.gamesId=assists2.gamesId group by playersId) awayT4 
      left join penalties on awayT4.playersId=penalties.playersId and awayT4.gamesId=penalties.gamesId group by playersId 
      order by points desc,isGoalie,goals desc,assists desc,penalties`;

    connection.query(sql, [gameId], function (err, rows) {
      if (err) throw {err};
    
      res.send(rows);
    });
  });

  return router;
}