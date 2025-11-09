module.exports = (express, connection) => {
  var router = express.Router();

  /* Game goals */
  router.post('/seasons', function(req, res, next) {
    const playersId = req.body.playersId;
    const sql = `select playerName,t1.playersId as 'playerId',teamName,shortForm,seasonsName,leaguesid,hasStats,hasStatsV2,
      ifNull(goals.goals,0) as 'goals',  (ifNull(assist1.assists1,0) + ifNull(assist2.assists2,0)) as 'assists',
      (ifNull(goals.goals,0) + ifNull(assist1.assists1,0) + ifNull(assist2.assists2,0)) as 'points',
      ifNull(penalties.pims,0) as 'pims'
      from (select players.name as 'playerName',seasons.seasonsId,seasons.name as 'seasonsName',leaguesid,hasStats,hasStatsV2,
      players.playersId,teams.name as 'teamName', teams.shortForm from seasons,teams,playersforteams,players
      where seasons.seasonsId=teams.seasonsId and teams.teamsId = playersforteams.teamsId and 
      players.playersId=playersforteams.playersId and playersforteams.playersId=?
      group by players.playersId,seasons.seasonsId) t1  left join (select goal,count(*) as 'goals',seasons.seasonsId
      from goals,games,seasons where goals.gamesId=games.gamesid
      and games.seasonsId=seasons.seasonsId group by seasonsId,goal) goals on t1.playersId=goals.goal and t1.seasonsId=goals.seasonsId
      left join (select assist1,count(*) as 'assists1',seasons.seasonsId from goals,games,seasons 
      where goals.gamesId=games.gamesid and games.seasonsId=seasons.seasonsId group by seasonsId,assist1) assist1 
      on t1.playersId=assist1.assist1 and t1.seasonsId=assist1.seasonsId left join (select assist2,count(*) as 'assists2',
      seasons.seasonsid   from goals,games,seasons where goals.gamesId=games.gamesid and games.seasonsId=seasons.seasonsId 
      group by seasonsId,assist2) assist2 on  t1.playersId=assist2.assist2 and t1.seasonsId=assist2.seasonsId
      left join (select playersId,sum(penalties.minutes) as 'pims',seasons.seasonsId from penalties,games,seasons
      where penalties.gamesId=games.gamesid and games.seasonsId=seasons.seasonsId group by seasonsId,playersId) penalties
      on t1.playersId=penalties.playersId and t1.seasonsId=penalties.seasonsId where hasStats=1 and leaguesid=1 order by seasonsName desc`;

    connection.query(sql, [playersId], function (err, rows) {
      if (err) throw {err};
    
      res.send(rows);
    });
  });

  /* Game home list */
  router.post('/games', function(req, res, next) {
    const playersId = req.body.playersId;
    const sql = `select playerName,t1.playersId as 'playerId',teamName,shortForm,seasonsName,leaguesid,hasStats,hasStatsV2,
    ifNull(goals.goals,0) as 'goals',  (ifNull(assist1.assists1,0) + ifNull(assist2.assists2,0)) as 'assists',
    (ifNull(goals.goals,0) + ifNull(assist1.assists1,0) + ifNull(assist2.assists2,0)) as 'points',
    ifNull(penalties.pims,0) as 'pims',t1.gamesId,homeName,awayName,if(teamName=homeName,awayName,homeName) as 'vs',
    if(teamName=homeName,homeShortForm,awayShortForm) as 'shortForm',if(teamName=homeName,awayShortForm,homeShortForm) as 'vsShortForm',
    t1.date,t1.time from  ( select players.name as 'playerName',seasons.seasonsId,seasons.name as 'seasonsName',
    leaguesid,hasStats,hasStatsV2, players.playersId,teams.name as 'teamName', teams.shortForm,games.gamesId,home.name as'homeName',
    away.name as 'awayName',ifNull(home.shortForm,home.name) as homeShortForm,ifNull(away.shortForm,away.name) as awayShortForm,
    date,time from seasons,teams,playersforteams,players,games,teamsforgames
    left join teams home on teamsforgames.homeId=home.teamsId  left join teams away on teamsforgames.awayId=away.teamsId
    where seasons.seasonsId=teams.seasonsId and teams.teamsId = playersforteams.teamsId and players.playersId=playersforteams.playersId
    and seasons.seasonsId=games.seasonsId and teamsforgames.gamesId=games.gamesId and playersforteams.playersId=? and uploaded=1
    group by players.playersId,games.gamesId having homeName=teamName or awayName=teamName) t1 left join (select goal,count(*) as 'goals',
    goals.gamesId from goals,games where goals.gamesId=games.gamesid group by gamesId,goal) goals on t1.playersId=goals.goal
    and t1.gamesId=goals.gamesId left join (select assist1,count(*) as 'assists1',goals.gamesId from goals,games
    where goals.gamesId=games.gamesid group by gamesId,assist1) assist1 on t1.playersId=assist1.assist1 and t1.gamesId=assist1.gamesId
    left join (select assist2,count(*) as 'assists2',goals.gamesId  from goals,games where goals.gamesId=games.gamesid 
    group by gamesId,assist2) assist2 on t1.playersId=assist2.assist2 and t1.gamesId=assist2.gamesId 
    left join (select playersId,sum(penalties.minutes) as 'pims',penalties.gamesId from penalties,games
    where penalties.gamesId=games.gamesid group by gamesId,playersId) penalties on t1.playersId=penalties.playersId
    and t1.gamesId=penalties.gamesId where hasStats=1 and leaguesid=1 group by gamesId order by seasonsName,date`;

    connection.query(sql, [playersId], function (err, rows) {
      if (err) throw {err};
    
      res.send(rows);
    });
  });

  router.post('/points', function(req, res, next) {
    const playersId = req.body.playersId;

    const sql = `select * from goals where goal=? or assist1=? or assist2=?`;

    connection.query(sql, [playersId, playersId, playersId], function (err, rows) {
      if (err) throw {err};
      res.send(rows);
    });
  });

  router.post('/penalties', function(req, res, next) {
    const playersId = req.body.playersId;

    const sql = `select * from penalties where playersId=9`;

    connection.query(sql, [playersId], function (err, rows) {
      if (err) throw {err};
      res.send(rows);
    });
  });

  return router;
}