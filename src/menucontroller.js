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

        function showShips(data) {
            $("#ships").empty();
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                addShipToList(data[i]);
            }
        }

        function addGameToList(game) {
            var item = $("<li></li>");
            item.on("click", function() {
                gamecontroller.showGame(game._id);
                apiService.getShips(undefined, showShips);


            })
            item.text(game.enemyName + ", " + game.status);
            $("#gamelist").append(item);
        }


        function addShipToList(ship) {
            var item = $("<li></li>");

            item.text(ship.name + ","+ ship.length+ ", " + ship.__v);
            $("#ships").append(item);
        }
    }
    zeeslag.MenuController = MenuController;


    
})(window.zeeslag = window.zeeslag || {});