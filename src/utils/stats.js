function addGP(r,team) {
    if(r.homeTeam===team || r.awayTeam===team) {
        return 1;
    }else{
        return 0;
    }
}

function addGPGoalie(r,team) {
    if(r.homeGoalie===team || r.awayGoalie===team) {
        return 1;
    }else{
        return 0;
    }
}


function addWin(r,team) {
    if(r.homeTeam===team && r.homeGoals>r.awayGoals) {
        return 1;
    }else if(r.awayTeam===team && r.homeGoals<r.awayGoals) {
        return 1;
    }else{
        return 0;
    }
}


function addWinGoalie(r,team) {
    if(r.homeGoalie===team && r.homeGoals>r.awayGoals) {
        return 1;
    }else if(r.awayGoalie===team && r.homeGoals<r.awayGoals) {
        return 1;
    }else{
        return 0;
    }
}

function addLoss(r,team) {
    if(r.homeTeam===team && r.homeGoals<r.awayGoals) {
        return 1;
    }else if(r.awayTeam===team && r.homeGoals>r.awayGoals) {
        return 1;
    }else{
        return 0;
    }
}

function addLossGoalie(r,team) {
    if(r.homeGoalie===team && r.homeGoals<r.awayGoals) {
        return 1;
    }else if(r.awayGoalie===team && r.homeGoals>r.awayGoals) {
        return 1;
    }else{
        return 0;
    }
}

function addTie(r,team) {
    if(r.homeTeam===team && r.homeGoals===r.awayGoals) {
        return 1;
    }else if(r.awayTeam===team && r.homeGoals===r.awayGoals) {
        return 1;
    }else{
        return 0;
    }
}

function addTieGoalie(r,team) {
    if(r.homeGoalie===team && r.homeGoals===r.awayGoals) {
        return 1;
    }else if(r.awayGoalie===team && r.homeGoals===r.awayGoals) {
        return 1;
    }else{
        return 0;
    }
}

function addGF(r,team) {
    if(r.homeTeam===team) {
        return r.homeGoals;
    }else if(r.awayTeam===team) {
        return r.awayGoals;
    }else{
        return 0;
    }
}

function addGFGoalie(r,team) {
    if(r.homeGoalie===team) {
        return r.homeGoals;
    }else if(r.awayGoalie===team) {
        return r.awayGoals;
    }else{
        return 0;
    }
}

function addGA(r,team) {
    if(r.homeTeam===team) {
        return r.awayGoals;
    }else if(r.awayTeam===team) {
        return r.homeGoals;
    }else{
        return 0;
    }
}

function addGAGoalie(r,team) {
    if(r.homeGoalie===team) {
        return r.awayGoals;
    }else if(r.awayGoalie===team) {
        return r.homeGoals;
    }else{
        return 0;
    }
}

function addPIM(r,team) {
    if(r.homeTeam===team) {
        return r.homePIM;
    }else if(r.awayTeam===team) {
        return r.awayPIM;
    }else{
        return 0;
    }
}

function addPIMGoalie(r,team) {
    if(r.homeGoalie===team) {
        return r.homePIM;
    }else if(r.awayGoalie===team) {
        return r.awayPIM;
    }else{
        return 0;
    }
}

function addSO(r,team) {
    if(r.homeTeam===team && r.awayGoals===0) {
        return 1;
    }else if(r.awayTeam===team && r.homeGoals===0) {
        return 1;
    }else{
        return 0;
    }
}

function addSOGoalie(r,team) {
    if(r.homeGoalie===team && r.awayGoals===0) {
        return 1;
    }else if(r.awayGoalie===team && r.homeGoals===0) {
        return 1;
    }else{
        return 0;
    }
}

function addGoalie(r,team) {
    if(r.homeTeam===team) {
        return r.homeGoalie;
    }else if(r.awayTeam===team) {
        return r.awayGoalie;
    }else{
        return "";
    }
}

function addGoalieGoalie(r,team) {
    if(r.homeGoalie===team) {
        return r.homeGoalie;
    }else if(r.awayGoalie===team) {
        return r.awayGoalie;
    }else{
        return "";
    }
}

function addGoalieNum(r,team) {
    if(r.homeTeam===team) {
        return r.homeId;
    }else if(r.awayTeam===team) {
        return r.awayId;
    }else{
        return "";
    }
}

function addGoalieNumGoalie(r,team) {
    if(r.homeGoalie===team) {
        return r.homeId;
    }else if(r.awayGoalie===team) {
        return r.awayId;
    }else{
        return "";
    }
}

export { addGP, addWin, addLoss, addTie, addGF, addGA, addPIM, addStreak, 
    addWinPlayoffs, addLossPlayoffs, addOTWinPlayoffs, addOTLossPlayoffs}