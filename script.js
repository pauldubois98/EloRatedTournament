

var teams_ul=document.getElementById("teams")
var games_ul=document.getElementById("games")
var teams = [];
var games = [];

var team_selects = document.getElementsByClassName("team_select");
var team_selects_str = "<option value=\"\">Select</option>\n";


var team_inputElement = document.querySelector('.team_input');


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

function add_team(teamName=null){
    var li = document.createElement('li');
    teams_ul.appendChild(li);
    li.innerHTML = li.innerHTML + '<input type="text" class="team_input" placeholder="Team ' + teams_ul.childElementCount + '">';
    if(teamName!=null){
        li.children[0].value = teamName;
    }
    update_teams_names();
    team_inputElement = document.querySelector('.team_input');
    team_inputElement.addEventListener('change', (event) => {
        update_teams_names();
    });
}
function update_teams_names(){
    teams = [];
    team_selects_str = "<option value=\"\">Select</option>\n";
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
    team_selects = document.getElementsByClassName("team_select");
    for(var i=0; i<team_selects.length; i++){
        team_selects[i].innerHTML = team_selects_str;
    }
}
function update_games_ids(){
    // TODO
}
function add_game(){
    var li = document.createElement('li');
    games_ul.appendChild(li);
    li.innerHTML = li.innerHTML + '<select class="team_select" name="team_select">'+team_selects_str+'</select>\n'
                 + ' - '        + '<select class="team_select" name="team_select">'+team_selects_str+'</select>\n';
}



function write_params(){
    update_teams_names();
    teams_GET = encodeURIComponent(JSON.stringify(teams))
    games_GET = encodeURIComponent(JSON.stringify(games))
    window.location.href = window.location.href.split("?")[0] 
                         + '?teams=' + teams_GET;
                         + '&games=' + games_GET;
}
function read_params(){
    teams = JSON.parse(decodeURIComponent(findGetParameter('teams')));
    games = JSON.parse(decodeURIComponent(findGetParameter('games')));
}


read_params();
if(teams==null){
    add_team();
} else{
    console.log(teams)
    for(var i=0; i<teams.length; i++){
        add_team(teams[i]);
        console.log(teams[i])
    }
    update_teams_names();
}





