var initElo_input=document.getElementById("init-Elo");
var K_input=document.getElementById("K");
var Elo = []
var leader_board_table=document.getElementById("leader-board").children[0];

function Elo_history(){
    var initElo = Number(initElo_input.value);
    if(initElo_input.value==""){
        initElo = 800;
    }
    var K = Number(K_input.value);
    if(K_input.value==""){
        K = 20;
    }
    var history = []
    Elos = Array(...teams);
    Elos.fill(initElo)
    history = history.concat([Elos]);
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
        }
    }
}
function refresh_Elo(){
    var teams_score = []
    for(var i=0; i<teams.length; i++){
        var Elo = Elos[i];
        var team = teams[i];
        if(teams[i]==""){
            team = "Team "+String(i+1);
        }
        teams_score = teams_score.concat([[Elo,team]]);
    }
    teams_score = teams_score.sort( function(a, b) {return a[0] - b[0];} ).reverse()
    var i=0;
    while(i<teams.length){
        if(i+1<leader_board_table.children.length){
            var tr = leader_board_table.children[i+1];
            tr.children[0].textContent = String(i+1);
            tr.children[1].textContent = teams_score[i][1];
            tr.children[2].textContent = String(teams_score[i][0]);
        } else{
            var tr = document.createElement('tr');
            tr.innerHTML += "<td>"+String(i+1)+"</td>\n" 
                         +  "<td>"+teams_score[i][1]+"</td>\n"
                         +  "<td>"+String(teams_score[i][0])+"</td>\n"
            leader_board_table.appendChild(tr);
        }
        i++;
    }
    while(i+1<leader_board_table.children.length){
        leader_board_table.children[i+1].remove()
    }
}
