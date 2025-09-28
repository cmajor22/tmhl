module.exports = (express, connection) => {
  var router = express.Router();

  /* Season Rosters */
  router.put('/getUpcomingGames', function(req, res, next) {
    const league = req.body.league;
    const year = req.body.year;
    const sql = `
      select * from (
      select games.*,home.teamsId as 'home',home.name as 'homeTeam',away.teamsId as 'away',away.name as 'awayTeam',seasons.leaguesId as 'league',
      sum(if(home.teamsId=goals.teamsId,1,0)) as homeScore,sum(if(away.teamsId=goals.teamsId,1,0)) as awayScore,
      home.shortForm as homeShortForm,home.primaryColour as homePrimary,home.secondaryColour as homeSecondary,
      away.shortForm as awayShortForm,away.primaryColour as awayPrimary,away.secondaryColour as awaySecondary
      from teamsforgames,teams home,teams away,seasons,leagues,games
      left join goals on goals.gamesId=games.gamesId 
      where games.gamesId=teamsforgames.gamesId 
      and home.teamsId=teamsforgames.homeId and away.teamsId=teamsforgames.awayId and games.seasonsId=seasons.seasonsId 
      and games.date>=date(now()) and seasons.leaguesId=leagues.leaguesId and leagues.leaguesId=1
      group by games.gamesId
      order by games.date,cast(substring_index(substring_index(games.time,':',1),':',-1) as unsigned)
      limit 4) t1
            
      union
      
      select * from (
      select games.*,home.teamsId as 'home',home.name as 'homeTeam',away.teamsId as 'away',away.name as 'awayTeam',seasons.leaguesId as 'league',
      sum(if(home.teamsId=goals.teamsId,1,0)) as homeScore,sum(if(away.teamsId=goals.teamsId,1,0)) as awayScore,
      home.shortForm as homeShortForm,home.primaryColour as homePrimary,home.secondaryColour as homeSecondary,
      away.shortForm as awayShortForm,away.primaryColour as awayPrimary,away.secondaryColour as awaySecondary
      from teamsforgames,teams home,teams away,seasons,leagues,games
      left join goals on goals.gamesId=games.gamesId 
      where games.gamesId=teamsforgames.gamesId 
      and home.teamsId=teamsforgames.homeId and away.teamsId=teamsforgames.awayId and games.seasonsId=seasons.seasonsId 
      and games.date>=date(now()) and seasons.leaguesId=leagues.leaguesId and leagues.leaguesId=2
      group by games.gamesId
      order by games.date,cast(substring_index(substring_index(games.time,':',1),':',-1) as unsigned)
      limit 3) t2
      `;

    connection.query(sql, [year, league], function (err, rows) {
      if (err) throw {err};
    
      res.send(rows);
    });
  });

  return router;
}