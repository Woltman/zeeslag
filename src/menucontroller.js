(function(zeeslag) {
    function MenuController(apiService, gamecontroller){
             
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
            item.on("click", function() {
                gamecontroller.showGame(game._id);
            })
            item.text(game.enemyName + ", " + game.status);
            $("#gamelist").append(item);
        }
    }
    zeeslag.MenuController = MenuController;


    
})(window.zeeslag = window.zeeslag || {});