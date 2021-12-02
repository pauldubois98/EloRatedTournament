

function Elo_history(teams, games, K=20, initElo=800){
    console.log(teams)
    var history = []
    var Elos = Array(...teams);
    Elos.fill(initElo)
    history = history.concat([Elos]);
    console.log(Elos)
    for(var i=0; i<games.length; i++){
        if(games[i][0] != games[i][2]){
            var teamA_Elo = Elos[games[i][0]];
            var teamB_Elo = Elos[games[i][2]];
            var scoreA = 0.5;
            var scoreB = 0.5;
            if(games[i][1]=="\>"){
                scoreA = 1;
                scoreB = 0;
            }
            if(games[i][1]=="\<"){
                scoreA = 0;
                scoreB = 1;
            }
            var expected_scoreA = 1 / (1 + 10**((teamB_Elo - teamA_Elo)/200));
            var expected_scoreB = 1 / (1 + 10**((teamA_Elo - teamB_Elo)/200));
            teamA_Elo = Math.round(teamA_Elo + K * (scoreA-expected_scoreA));
            teamB_Elo = Math.round(teamB_Elo + K * (scoreB-expected_scoreB));
            Elos[games[i][0]] = teamA_Elo;
            Elos[games[i][2]] = teamB_Elo;
            history = history.concat([Elos]);
            console.log(Elos)
        }
    }
}