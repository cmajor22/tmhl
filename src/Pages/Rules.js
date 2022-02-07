import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { Box, Container, Paper, Typography } from '@mui/material';
import PageTitle from '../Components/PageTitle';
import SportsHockeyIcon from '@mui/icons-material/SportsHockey';

const useStyles = makeStyles((theme) => ({
    ruleItem: {
        display: 'flex',
        flexDirection: 'row',
        paddingBottom: '3px'
    },
    ruleIcon: {
        marginRight: '3px',
        paddingTop: '2px',
        height: '18px',
        width: '18px'
    },
    ruleContainer: {
        padding: '5px'
    }
}));

function Rules(props) {
    const classes = useStyles();
    const regRules = [
        `OHA rules apply, except where stated below`,
        `There are two line passes allowed **Your blue line for icing**`,
        `Each game will have a 2 min warmup, followed by 1 x 18 min & 2 x 15 min period`,
        `Game time clock will start at designated start time or when refs are on ice 
            (whichever time is later, i.e. no time clock will commence before set time unless 2 captains and refs agree)`,
        `Referee’s decisions are final during a game. Any discrepancies or concerns will be
            addressed by a captains / exec. meeting with the refs if necessary`,
        `Only captains can approach the referees to discuss a concern / issue. On ice only not after the game`,
        `No slapshots above the waist, both during windup and follow through. A slapshot above the waist results in a faceoff in the offending team's end`,
        `No player changes for a shorthanded team during a stoppage in play`,
        `Last 3 minutes of a game will be stop time if score difference is 2 goals or less`,
        `**Penalties are 3 minutes**`,
        `In addition to regular penalties, the following league rules are in effect:`,
        `\t3 penalties during a game results in ejection for the remainder of the game.`,
        `\tAny game misconduct penalty results in ejection from game and a suspension from the next game (excluding the 3 penalty rule)`,
        `\tHigh sticking with no injury is an automatic **6** minute penalty (accidental or not):`,
        `\t\tAfter 1 goal being scored on penalized team the team will go back to full strength but the player will serve the entire 6 minutes`,
        `\tHigh sticking causing any injury is an automatic 5 minute major and ejection from remainder of game (accidental or not)`,
        `\tAny fight is a 2 game suspension. 2nd fight in one season is a 5 games suspension. 3rd fight in one year is a 1 year ban and review prior to reinstatement into league`,
        `\tBody contact is a 3 minute penalty unless the ref determines that the hit was particularly hard / malicious, 
            in which case the ref’s discretion will decide the severity of the penalty`,
        `\tA match penalty is 3 games for intent to injure, followed by a captain/exec/ref meeting to review`,
        `\tMinor penalties for unsportsmanlike conduct towards the officials are followed by 10 minute misconduct to the player if the conduct does not stop immediately, 
            followed by a gross misconduct`,
        `\tNo unsportsmanlike like conduct will be tolerated in the hallway, rooms or lobby. Any unsportsmanlike conduct will be an immediate 1 game suspension 
            and may escalate to gross, match or long term suspension after a captain/exec/ref meeting`,
        `\tAny player receiving 2 or more gross misconduct (2 games for abuse of official) will be suspended indefinitely and reviewed by captains/exec/ref`,
        `\tAll suspensions will carry forward into playoffs and the following season.`
    ];
    const seasonRules = [
        `Substitutions: Regular season substitution rules are: Pick up players (to 8 for
            Men’s division and to 10 for Over 40) and may never be ranked higher than the
            missing player. Goalies may be substituted but should be ranked as close as
            possible whenever possible. Most importantly the opposing Captain must
            approve of any substitution without question or consequence`,
        `Points: Regular season points are 2 for a win and 1 for a tie`,
        `Regular Season Tie Break: If 2 or more teams are tied at the end of the
            Regular Season the standings will be determined by the following
            #1 Wins. #2 Head to Head. #3 +/-. #4 Coin Flip`
    ]
    const playoffsRules = [
        `Substitutions: Regular season substitution rules apply. Pick up players (to 8
            for Men’s division and to 10 for Over 40) and may never be ranked higher than
            the missing player. Goalies may be substituted but should be ranked as close
            as possible whenever possible. Most importantly the opposing Captain must
            approve of any substitution without question or consequence`,
        `Time outs: Each team is allowed 1 time out per game`,
        `Shoot out:  If teams remain tied after regulation play, there will be a 3 player shootout to determine the winner.
            3 players are chosen from each team by the captain. Higher seed team always shoots first. If after 3 shooters from each team 
            there is still a tie the same shooters continue (in the same order) in a sudden death format until one shooter scores. 
            Players serving a penalty at the end of regulation are not eligible.`,
        `Final Night: All regular games will end in a tie accept the Championship games. If tied after regulation we proceed with 10 minute sudden death
            overtime periods with a short break between periods until a goal is scored.`,
        `Playoff Points: 3 points for regulation win. 2 Points for an overtime win. 1 Point for an overtime loss.`,
        `Tie-breaking Procedures (19+): Head to head, Goals against, Goals for, Coin flip.`,
        `Tie-breaking Procedures (40+): Head to head, Regulation time wins, Goals against, Goals for, Regular season standings.`
    ]

    return <Container>
        <PageTitle title="TMHL Rules" variant="h2"/>
        <br />
        <Paper elevation={3} className={classes.ruleContainer}>
            <PageTitle title="General" variant="h4" />
            {regRules.map((item) => {
                return <Box className={classes.ruleItem}>
                    <SportsHockeyIcon className={classes.ruleIcon}/>
                    <Typography>
                        {item}
                    </Typography>
                </Box>
            })}
        </Paper>
        <br />
        <Paper elevation={3} className={classes.ruleContainer}>
            <PageTitle title="Regular Season Addendum" variant="h4" />
            {seasonRules.map((item) => {
                return <Box className={classes.ruleItem}>
                    <SportsHockeyIcon className={classes.ruleIcon}/>
                    <Typography>
                        {item}
                    </Typography>
                </Box>
            })}
        </Paper>
        <br />
        <Paper elevation={3} className={classes.ruleContainer}>
            <PageTitle title="Playoffs Addendum" variant="h4" />
            {playoffsRules.map((item) => {
                return <Box className={classes.ruleItem}>
                    <SportsHockeyIcon className={classes.ruleIcon}/>
                    <Typography>
                        {item}
                    </Typography>
                </Box>
            })}
        </Paper>
        <br />
    </Container>
}

export default Rules;