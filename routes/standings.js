module.exports = (express, connection) => {
  var router = express.Router();

  router.put('/games', function(req, res, next) {
    const league = req.body.league;
    const isPlayoffs = req.body.isPlayoffs;
    const isFinals = req.body.isFinals;
    const season = req.body.season;

    const sql = `select games.gamesId as id,games.gamesId,date,games.time,home.name as 'homeTeam',away.name as 'awayTeam',uploaded,
      seasons.leaguesId,isPlayoffs,isOvertime,count(distinct homeGoals.goalsId) as 'homeGoals',count(distinct awayGoals.goalsId) as 'awayGoals',
      ifNull(homePenalties.minutes,0) as 'homePIM', ifNull(awayPenalties.minutes,0) as 'awayPIM' 
      from seasons,teams home,teams away,games,teamsforgames left join goals homeGoals on homeGoals.teamsId=teamsforgames.homeId and 
      homeGoals.gamesId=teamsforgames.gamesId left join goals awayGoals on awayGoals.teamsId=teamsforgames.awayId and 
      awayGoals.gamesId=teamsforgames.gamesId left join (select gamesId,teamsId,sum(minutes) as 'minutes' from penalties 
      group by gamesId,teamsId) homePenalties on homePenalties.teamsId=teamsforgames.homeId and 
      homePenalties.gamesId=teamsforgames.gamesId left join (select gamesId,teamsId,sum(minutes) as 'minutes' 
      from penalties group by gamesId,teamsId) awayPenalties on awayPenalties.teamsId=teamsforgames.awayId and 
      awayPenalties.gamesId=teamsforgames.gamesId where games.seasonsId=seasons.seasonsid and 
      games.gamesId=teamsforgames.gamesId and home.teamsId=teamsforgames.homeId and away.teamsId=teamsforgames.awayId and 
      leaguesid=? and isPlayoffs=? and uploaded=1 and seasons.seasonsId=? and isFinals=? 
      group by games.gamesId
      order by games.date,convert(SUBSTRING_INDEX(games.time, ':', 1), unsigned integer)`;

    // connection.query(sql, [1, 0, 7, 0], function (err, rows) {
    connection.query(sql, [league, isPlayoffs, season, isFinals], function (err, rows) {
      if (err) throw {err};
      res.send(rows);
    });
  });
  
  router.put('/teams', function(req, res, next) {
    const league = req.body.league;
    const season = req.body.season;

    const sql = `select teams.name 
      from seasons,teams 
      where seasons.seasonsId=teams.seasonsId and leaguesid=? and seasons.seasonsId=?`;

    connection.query(sql, [league, season], function (err, rows) {
      if (err) throw {err};
    
      res.send(rows);
    });
  });

  router.put('/vs', function(req, res, next) {
    const league = req.body.league;
    const isPlayoffs = req.body.isPlayoffs;
    const isFinals = req.body.isFinals;
    const season = req.body.season;


    const sql = `select teamName.name as team,vsName.name as vs,(sum(ws)-sum(ls)) as 'h2h' from   
      (select homeId as 'team',awayId as 'vs',count(*) as 'ws',0 as 'ls' from 
      (select homeId,awayId from games,seasons,teamsforgames 
      left join goals hg on hg.gamesId=teamsforgames.gamesId and hg.teamsId=homeId 
      left join goals ag on ag.gamesId=teamsforgames.gamesId and ag.teamsId=awayId 
      where games.seasonsId=seasons.seasonsId 
      and games.gamesId=teamsforgames.gamesId 
      and seasons.seasonsid=?
      and isPlayoffs=?
      and isFinals=?
      and seasons.leaguesId=?
      group by games.gamesId 
      having count(distinct hg.goalsId)>count(distinct ag.goalsId) ) wins1 
      group by homeId,awayId 
      union all
      select awayId as 'team',homeId as 'vs',count(*) as 'ws',0 as 'ls' from 
      (select homeId,awayId from games,seasons,teamsforgames 
      left join goals hg on hg.gamesId=teamsforgames.gamesId and hg.teamsId=homeId 
      left join goals ag on ag.gamesId=teamsforgames.gamesId and ag.teamsId=awayId 
      where games.seasonsId=seasons.seasonsId 
      and games.gamesId=teamsforgames.gamesId 
      and seasons.seasonsid=?
      and isPlayoffs=?
      and isFinals=?
      and seasons.leaguesId=?
      group by games.gamesId 
      having count(distinct hg.goalsId)<count(distinct ag.goalsId) ) wins1 
      group by homeId,awayId 
      union all
      select homeId as 'team',awayId as 'vs',0 as 'ws',count(*) as 'ls' from ( 
      select homeId,awayId from games,seasons,teamsforgames 
      left join goals hg on hg.gamesId=teamsforgames.gamesId and hg.teamsId=homeId 
      left join goals ag on ag.gamesId=teamsforgames.gamesId and ag.teamsId=awayId 
      where games.seasonsId=seasons.seasonsId 
      and games.gamesId=teamsforgames.gamesId 
      and seasons.seasonsid=?
      and isPlayoffs=?
      and isFinals=?
      and seasons.leaguesId=?
      group by games.gamesId 
      having count(distinct hg.goalsId)<count(distinct ag.goalsId) ) wins1 
      group by homeId,awayId 
      union all
      select awayId as 'team',homeId as 'vs',0 as 'ws',count(*) as 'ls' from 
      ( select homeId,awayId from games,seasons,teamsforgames 
      left join goals hg on hg.gamesId=teamsforgames.gamesId and hg.teamsId=homeId 
      left join goals ag on ag.gamesId=teamsforgames.gamesId and ag.teamsId=awayId 
      where games.seasonsId=seasons.seasonsId 
      and games.gamesId=teamsforgames.gamesId 
      and seasons.seasonsid=?
      and isPlayoffs=?
      and isFinals=?
      and seasons.leaguesId=?
      group by games.gamesId 
      having count(distinct hg.goalsId)>count(distinct ag.goalsId) ) wins1 
      group by homeId,awayId 
      ) t1  left join teams 'teamName' on teamName.teamsId = team  left join teams 'vsName' on vsName.teamsId=vs  
      group by team,vs`;

    connection.query(sql, [season, isPlayoffs, isFinals, league, 
      season, isPlayoffs, isFinals, league,
      season, isPlayoffs, isFinals, league,
      season, isPlayoffs, isFinals, league ], function (err, rows) {
      // if (err) throw {err};
    
      res.send(rows);
    });
  });

  return router;
}