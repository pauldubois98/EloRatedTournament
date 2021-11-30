

var teams_ul=document.getElementById("teams")
var games_ul=document.getElementById("games")
var teams = [];
var games = [];





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
    li.innerHTML = li.innerHTML + '<input type="text" placeholder="Team ' + teams_ul.childElementCount + '">';
    if(teamName!=null){
        li.children[0].value = teamName;
    }
}
function update_teams_names(){
    teams = [];
    for (var i = 0; i < teams_ul.children.length; i++) {
        var team_li = teams_ul.children[i];
        if(team_li.children[0].value!=""){
            teams = teams.concat([team_li.children[0].value])
        } else{
            //teams = teams.concat([team_li.children[0].placeholder])
            teams = teams.concat([""])
        }
    }
    console.log(teams)
}

function add_game(){
    var li = document.createElement('li');
    games_ul.appendChild(li);
    li.innerHTML = li.innerHTML + '<input type="text" placeholder="Team A">'
                 + ' - '        + '<input type="text" placeholder="Team B">';
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
}





