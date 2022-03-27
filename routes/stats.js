module.exports = (express, connection) => {
  var router = express.Router();

  router.put('/teams/all', function(req, res, next) {
    const league = req.body.league;

    const sql = `select teams.name from seasons,teams where seasons.seasonsId=teams.seasonsId and leaguesid=?`;

    connection.query(sql, [league], function (err, rows) {
      if (err) throw {err};
      res.send(rows);
    });
  });

  router.put('/goalies/all', function(req, res, next) {
    const league = req.body.league;

    const sql = `select players.name from playersforteams,teams,players,seasons 
      where playersforteams.teamsId=teams.teamsId and playersforteams.playersId=players.playersId and 
      seasons.seasonsId=teams.seasonsId and isgoalie=1 and leaguesid=? group by players.name`;

    connection.query(sql, [league], function (err, rows) {
      if (err) throw {err};
      res.send(rows);
    });
  });

  router.put('/goalieStats/all', function(req, res, next) {
    const league = req.body.league;

    const sql = `select games.gamesId,date,games.time,teamsforgames.homeId as 'home',teamsforgames.awayId as 'away', 
      count(distinct homeGoals.goalsId) as 'homeGoals',count(distinct awayGoals.goalsId) as 'awayGoals', 
      ifNull(homePenalties.minutes,0) as 'homePIM', ifNull(awayPenalties.minutes,0) as 'awayPIM', uploaded as 'isUploaded',
      seasons.leaguesId,isPlayoffs,isOvertime, home.name as 'homeTeam',away.name as 'awayTeam', homeGoalie.name as 'homeGoalie',
      awayGoalie.name as 'awayGoalie', homeGoalie.playersId as 'homeId', awayGoalie.playersId as 'awayId' 
      from seasons,teams home,teams away,games,teamsforgames 
      left join goals homeGoals on homeGoals.teamsId=teamsforgames.homeId and homeGoals.gamesId=teamsforgames.gamesId 
      left join goals awayGoals on awayGoals.teamsId=teamsforgames.awayId and awayGoals.gamesId=teamsforgames.gamesId 
      left join (select gamesId,teamsId,sum(minutes) as 'minutes' from penalties group by gamesId,teamsId) homePenalties 
        on homePenalties.teamsId=teamsforgames.homeId and homePenalties.gamesId=teamsforgames.gamesId 
      left join (select gamesId,teamsId,sum(minutes) as 'minutes' from penalties group by gamesId,teamsId) awayPenalties 
        on awayPenalties.teamsId=teamsforgames.awayId and awayPenalties.gamesId=teamsforgames.gamesId 
      left join (select teamsId,players.playersId,name from playersforteams,players 
        where playersforteams.playersId=players.playersId and isGoalie=1) homeGoalie on homeGoalie.teamsId=teamsforgames.homeId 
      left join (select teamsId,players.playersId,name from playersforteams,players 
        where playersforteams.playersId=players.playersId and isGoalie=1) awayGoalie on awayGoalie.teamsId=teamsforgames.awayId 
      where games.seasonsId=seasons.seasonsid and games.gamesId=teamsforgames.gamesId and home.teamsId=teamsforgames.homeId and 
      away.teamsId=teamsforgames.awayId and leaguesid=? and uploaded=1 
      group by games.gamesId`;

    connection.query(sql, [league], function (err, rows) {
      if (err) throw {err};
      res.send(rows);
    });
  });

  router.put('/playerStats/all', function(req, res, next) {
    const league = req.body.league;

    const sql = `select players.name as 'playerName',players.playersId as 'playerId',teams.name as 'teamName',
      ifNull(goals.goals,0) as 'goals', (ifNull(assist1.assists1,0) + ifNull(assist2.assists2,0)) as 'assists',
      (ifNull(goals.goals,0) + ifNull(assist1.assists1,0) + ifNull(assist2.assists2,0)) as 'points',
      ifNull(penalties.pims,0) as 'pims' 
      from seasons,teams,playersforteams,players
      left join (select goal,count(*) as 'goals' from goals,games,seasons where goals.gamesId=games.gamesid and
        games.seasonsId=seasons.seasonsId and leaguesid=? group by goal) goals on players.playersId=goals.goal 
      left join (select assist1,count(*) as 'assists1' from goals,games,seasons where goals.gamesId=games.gamesid and 
        games.seasonsId=seasons.seasonsId and leaguesid=? group by assist1) assist1 on players.playersId=assist1.assist1
      left join (select assist2,count(*) as 'assists2' from goals,games,seasons where goals.gamesId=games.gamesid and
        games.seasonsId=seasons.seasonsId and leaguesid=? group by assist2) assist2 on  players.playersId=assist2.assist2
      left join (select playersId,sum(penalties.minutes) as 'pims' from penalties,games,seasons
        where penalties.gamesId=games.gamesid and games.seasonsId=seasons.seasonsId and leaguesid=? group by playersId) penalties on
        players.playersId=penalties.playersId
      where seasons.seasonsId=teams.seasonsId and teams.teamsId = playersforteams.teamsId and
        players.playersId=playersforteams.playersId group by players.playersId`;

    connection.query(sql, [league, league, league, league], function (err, rows) {
      if (err) throw {err};
      res.send(rows);
    });
  });

  router.put('/teams', function(req, res, next) {
    const season = req.body.season;

    const sql = `select teams.name from seasons,teams where seasons.seasonsId=teams.seasonsId and seasons.seasonsId=?`;

    connection.query(sql, [season], function (err, rows) {
      if (err) throw {err};
      res.send(rows);
    });
  });

  router.put('/goalieStats', function(req, res, next) {
    const isPlayoffs = req.body.isPlayoffs;
    const season = req.body.season;
    const isFinals = req.body.isFinals;

    const sql = `select games.gamesId,date,games.time,teamsforgames.homeId as 'home',teamsforgames.awayId as 'away', 
      count(distinct homeGoals.goalsId) as 'homeGoals',count(distinct awayGoals.goalsId) as 'awayGoals', 
      ifNull(homePenalties.minutes,0) as 'homePIM', ifNull(awayPenalties.minutes,0) as 'awayPIM', uploaded as 'isUploaded',
      seasons.leaguesId,isPlayoffs,isOvertime, home.name as 'homeTeam',away.name as 'awayTeam', homeGoalie.name as 'homeGoalie',
      awayGoalie.name as 'awayGoalie', homeGoalie.playersId as 'homeId', awayGoalie.playersId as 'awayId'
      from seasons,teams home,teams away,games,teamsforgames 
      left join goals homeGoals on homeGoals.teamsId=teamsforgames.homeId and homeGoals.gamesId=teamsforgames.gamesId 
      left join goals awayGoals on awayGoals.teamsId=teamsforgames.awayId and awayGoals.gamesId=teamsforgames.gamesId 
      left join (select gamesId,teamsId,sum(minutes) as 'minutes' from penalties group by gamesId,teamsId) homePenalties
        on homePenalties.teamsId=teamsforgames.homeId and homePenalties.gamesId=teamsforgames.gamesId 
      left join (select gamesId,teamsId,sum(minutes) as 'minutes' from penalties group by gamesId,teamsId) awayPenalties
        on awayPenalties.teamsId=teamsforgames.awayId and awayPenalties.gamesId=teamsforgames.gamesId 
      left join (select teamsId,players.playersId,name from playersforteams,players where playersforteams.playersId=players.playersId and
        isGoalie=1) homeGoalie on homeGoalie.teamsId=teamsforgames.homeId 
      left join (select teamsId,players.playersId,name from playersforteams,players where playersforteams.playersId=players.playersId and
        isGoalie=1) awayGoalie on awayGoalie.teamsId=teamsforgames.awayId
      where games.seasonsId=seasons.seasonsid and games.gamesId=teamsforgames.gamesId and home.teamsId=teamsforgames.homeId and
      away.teamsId=teamsforgames.awayId and isPlayoffs=? and uploaded=1 and seasons.seasonsId=? and isFinals=?
      group by games.gamesId`;

    connection.query(sql, [isPlayoffs, season, isFinals], function (err, rows) {
      if (err) throw {err};
      res.send(rows);
    });
  });

  router.put('/playerStats', function(req, res, next) {
    const isPlayoffs = req.body.isPlayoffs;
    const season = req.body.season;
    const isFinals = req.body.isFinals;

    const sql = `select players.name as 'playerName',players.playersId as 'playerId',teams.name as 'teamName', 
      ifNull(goals.goals,0) as 'goals', (ifNull(assist1.assists1,0) + ifNull(assist2.assists2,0)) as 'assists',
      (ifNull(goals.goals,0) + ifNull(assist1.assists1,0) + ifNull(assist2.assists2,0)) as 'points',
      ifNull(penalties.pims,0) as 'pims' from seasons,teams,playersforteams,players 
      left join (select goal,count(*) as 'goals' from goals,games,seasons
      where goals.gamesId=games.gamesid and games.seasonsId=seasons.seasonsId and 
      seasons.seasonsId=? and isFinals=? and isPlayoffs=? group by goal) goals
      on players.playersId=goals.goal left join (select assist1,count(*) as 'assists1' from goals,games,seasons 
      where goals.gamesId=games.gamesid and games.seasonsId=seasons.seasonsId and 
      seasons.seasonsId=? and isFinals=? and isPlayoffs=? group by assist1) assist1 
      on players.playersId=assist1.assist1 left join (select assist2,count(*) as 'assists2' from goals,games,seasons
      where goals.gamesId=games.gamesid and games.seasonsId=seasons.seasonsId and
      seasons.seasonsId=? and isFinals=? and isPlayoffs=? group by assist2) assist2
      on players.playersId=assist2.assist2  left join (select playersId,sum(penalties.minutes) as 'pims' from penalties,games,seasons
      where penalties.gamesId=games.gamesid and games.seasonsId=seasons.seasonsId and
      seasons.seasonsId=? and isFinals=? and isPlayoffs=? group by playersId) penalties
      on players.playersId=penalties.playersId where seasons.seasonsId=teams.seasonsId and teams.teamsId = playersforteams.teamsId and
      players.playersId=playersforteams.playersId and seasons.seasonsId=? group by players.playersId`;

    connection.query(sql, [season, isFinals, isPlayoffs, season, isFinals, isPlayoffs,
        season, isFinals, isPlayoffs, season, isFinals, isPlayoffs, season], function (err, rows) {
      if (err) throw {err};
      res.send(rows);
    });
  });

  return router;
}