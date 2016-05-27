$(document).ready(function () {
    var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.InQud29sdG1hbkBzdHVkZW50LmF2YW5zLm5sIg.CWXmO1qRuqqg0uvAf6VgBLEukEHX6jEVkZxtwcCfZKQ";
    var apiService = new zeeslag.ApiService(token);
    
    
    
    
    apiService.printtoken();
    apiService.getGames(undefined, showGames);
    apiService.getUser(undefined, showProfile);
    
    $('#newgame-ai').on("click", function() {
        
        apiService.newGameAI(undefined, function(){
            apiService.getGames(undefined, showGames);
        });
    });
    $('#newgame').on("click", function() {
        
        apiService.newGame(function (error) {
            alert('je bent nog in queue');
        },function(){
            apiService.getGames(undefined, showGames);
        });
    });

    function showProfile(data) {
        console.log(data);
        $("#naam").text(data.name);
        $("#id").text(data._id);
    }

    function showGames(data) {
        $("#gamelist").empty();
        console.log(data);
        for (var i = 0; i < data.length; i++) {
            addGameToList(data[i]);
        }
    }

    function addGameToList(game) {
        var item = $("<li></li>");
        item.text(game.enemyName + ", " + game.status);
        $("#gamelist").append(item);
    }


});