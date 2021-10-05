function addGP(r,team) {
    return (r.homeTeam === team || r.awayTeam === team) ? 1 : 0;
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

function addLoss(r,team) {
    if(r.homeTeam===team && r.homeGoals<r.awayGoals) {
        return 1;
    }else if(r.awayTeam===team && r.homeGoals>r.awayGoals) {
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

function addGF(r,team) {
    if(r.homeTeam===team) {
        return r.homeGoals;
    }else if(r.awayTeam===team) {
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

function addPIM(r,team) {
    if(r.homeTeam===team) {
        return r.homePIM;
    }else if(r.awayTeam===team) {
        return r.awayPIM;
    }else{
        return 0;
    }
}

function addStreak(r,team) {
    if(r.homeTeam===team) {
        return r.homeStreak;
    }else if(r.awayTeam===team) {
        return r.awayStreak;
    }else{
        return "";
    }
}

function addWinPlayoffs(r,team) {
    if(r.homeTeam===team && r.homeGoals>r.awayGoals && r.isOvertime===0) {
        return 1;
    }else if(r.awayTeam===team && r.homeGoals<r.awayGoals && r.isOvertime===0) {
        return 1;
    }else{
        return 0;
    }
}


function addOTWinPlayoffs(r,team) {
    if(r.homeTeam===team && r.homeGoals>r.awayGoals && r.isOvertime===1) {
        return 1;
    }else if(r.awayTeam===team && r.homeGoals<r.awayGoals && r.isOvertime===1) {
        return 1;
    }else{
        return 0;
    }
}

function addLossPlayoffs(r,team) {
    if(r.homeTeam===team && r.homeGoals<r.awayGoals && r.isOvertime===0) {
        return 1;
    }else if(r.awayTeam===team && r.homeGoals>r.awayGoals && r.isOvertime===0) {
        return 1;
    }else{
        return 0;
    }
}

function addOTLossPlayoffs(r,team) {
    if(r.homeTeam===team && r.homeGoals<r.awayGoals && r.isOvertime===1) {
        return 1;
    }else if(r.awayTeam===team && r.homeGoals>r.awayGoals && r.isOvertime===1) {
        return 1;
    }else{
        return 0;
    }
}

export { addGP, addWin, addLoss, addTie, addGF, addGA, addPIM, addStreak, 
    addWinPlayoffs, addLossPlayoffs, addOTWinPlayoffs, addOTLossPlayoffs}