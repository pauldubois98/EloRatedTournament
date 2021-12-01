

var teams_ul=document.getElementById("teams")
var games_ul=document.getElementById("games")
var teams = [];
var games = [];
var team_selects = document.getElementsByClassName("team_select");
// var team_selects_str = "<option value=\"\">Select</option>\n";
var team_selects_str = "";

function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
          tmp = item.split("=");
          if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}

function full(){
    update_games_ids();
    update_teams_names();
    update_team_select();
    refresh_games();
}

function add_team(teamName=null){
    var li = document.createElement('li');
    teams_ul.appendChild(li);
    li.innerHTML = li.innerHTML + '<input type="text" class="team_input" placeholder="Team ' + teams_ul.childElementCount + '">';
    if(teamName!=null){
        li.children[0].value = teamName;
    } else{
        full();
    }
    li.children[0].addEventListener('change', (event) => {
        full();
    });
}
function update_teams_names(){
    teams = [];
    // team_selects_str = "<option value=\"\">Select</option>\n";
    team_selects_str = "";
    for (var i = 0; i < teams_ul.children.length; i++) {
        var team_li = teams_ul.children[i];
        var team_name = "";
        var team_display = "";
        if(team_li.children[0].value!=""){
            team_name = team_li.children[0].value;
            team_display = team_li.children[0].value;
        } else{
            team_name = "";
            team_display =  team_li.children[0].placeholder;
        }
        teams = teams.concat([team_name]);
        team_selects_str += "<option value=\""+team_display+"\">"+team_display+"</option>\n";
    }
}

function update_team_select(){
    team_selects = document.getElementsByClassName("team_select");
    for(var i=0; i<team_selects.length; i++){
        team_selects[i].innerHTML = team_selects_str;
    }
}

function add_game(teamA=null,comp=null,teamB=null){
    var li = document.createElement('li');
    games_ul.appendChild(li);
    li.innerHTML   += '<select class="team_select" name="team_select">'+team_selects_str+'</select>\n'
                    + '<select class="compare" name="compare"><option value="\>">\></option><option value="\=">\=</option><option value="\<">\<</option></select>\n'
                    + '<select class="team_select" name="team_select">'+team_selects_str+'</select>\n';
    if(teamA!=null){
        li.children[0].value = teams[teamA];
        if(teams[teamA]==""){
            li.children[0].value = "Team "+(teamA+1);
        }
    }
    if(comp!=null){
        li.children[1].value = comp;
    }
    if(teamB!=null){
        li.children[2].value = teams[teamB];
        if(teams[teamB]==""){
            li.children[2].value = "Team "+(teamB+1);
        }
    }
    if(teamA==null && comp==null && teamB==null){
        update_games_ids();
    }
    li.children[0].addEventListener('change', (event) => {
        update_games_ids();
    });
    li.children[1].addEventListener('change', (event) => {
        update_games_ids();
    });
    li.children[2].addEventListener('change', (event) => {
        update_games_ids();
    });
}
function update_games_ids(){
    games = [];
    for(var i=0; i<games_ul.children.length; i++){
        var li = games_ul.children[i];
        var teamA = teams.indexOf(li.children[0].value);
        if(teamA==-1){
            teamA = Number(li.children[0].value.split(" ")[1])-1;
        }
        var comp = li.children[1].value;
        var teamB = teams.indexOf(li.children[2].value)
        if(teamB==-1){
            teamB = Number(li.children[2].value.split(" ")[1])-1;
        }
        games = games.concat([[teamA, comp, teamB]]);
    }
}

function write_params(){
    update_teams_names();
    update_games_ids();
    teams_GET = encodeURIComponent(JSON.stringify(teams));
    games_GET = encodeURIComponent(JSON.stringify(games));
    window.location.href = window.location.href.split("?")[0] 
                         + '?teams=' + teams_GET
                         + '&games=' + games_GET;
}
function read_params(){
    teams = JSON.parse(decodeURIComponent(findGetParameter('teams')));
    games = JSON.parse(decodeURIComponent(findGetParameter('games')));
}

function load_teams(){
    for(var i=0; i<teams.length; i++){
        add_team(teams[i]);
    }
}
function load_games(){
    for(var i=0; i<games.length; i++){
        add_game(games[i][0],games[i][1],games[i][2]);
    }
}
function refresh_games(){
    for(var i=0; i<games.length; i++){
        if(i<games_ul.children.length){
            var li = games_ul.children[i];
            li.children[0].value = teams[games[i][0]];
            if(teams[games[i][0]]==""){
                li.children[0].value = "Team "+(games[i][0]+1);
            }
            li.children[1].value = games[i][1];
            li.children[2].value = teams[games[i][2]];
            if(teams[games[i][2]]==""){
                li.children[2].value = "Team "+(games[i][2]+1);
            }
        } else{
            add_game(games[i][0],games[i][1],games[i][2]);
        }
    }
}



read_params();
if(teams==null){
    add_team();
} else{
    load_teams();
    update_teams_names();
}
if(games.length==0){
    add_game();
} else{
    load_games();
}





