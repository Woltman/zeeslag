(function(zeeslag) {

    var ships = [];
    function GameController(apiService){
        this.apiService = apiService;

    }
    zeeslag.GameController = GameController;
    
    GameController.prototype.showGame = function(id){
        this.apiService.getGame(id, undefined, this.setGame.bind(this));       
    }
    
    GameController.prototype.setGame = function(game){
        this.game = game;

        this.renderGame();
        this.apiService.getShips(undefined, showShips);

    }
    
    //shows game
    GameController.prototype.renderGame = function(){
        this.showEnemyName();
        this.showEnemyBoard();
    }
    
    //show name
    GameController.prototype.showEnemyName = function(){
        if(this.game.status === "queue"){
            $(".enemy-name").text("Waiting for opponent.........");
        }
        $(".enemy-name").text(this.game.enemyName);
    }
    
    GameController.prototype.showEnemyBoard = function(){
        $(".enemy-board").empty();


        for(var row=0;row<10;row++){
            var rowItem = $("<tr class='tile'></tr>");
            for(var column=0;column<10;column++){
                rowItem.append($("<td>"+row+", "+column+"</td>"));

            }
            $(".enemy-board").append(rowItem);
        }

        $("tr").droppable({
            drop: function(event, ui) {
                console.log("gedropt");


            }
        });
    }


    function addGameToList(game) {
        var item = $("<li class='tile'></li>");
        item.on("click", function() {
            gamecontroller.showGame(game._id);


        })
        item.text(game.enemyName + ", " + game.status);
        $("#gamelist").append(item);
    }


    function addShipToList(ship) {
        var item = $("<li class='ship'></li>");
        item.on("click", function() {
            //rotates ship
           //rotateShip(ship,item);



        });

        item.text(ship.ship.name + ","+ ship.ship.length+ ", " + ship.ship.__v);
        $("#ships").append(item);
        item.draggable({
            helper: "clone",

        });
    }

    function showShips(data) {

            $("#ships").empty();
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                var ship = new Ship(data[i]);
                ships.push(ship);
                addShipToList(ship);
            }
    }

    function rotateShip(ship,item){
        ship.rotate();
        item.text(ship.ship.name + ","+ ship.ship.length+ ", " + ship.ship.__v);
    }

})(window.zeeslag = window.zeeslag || {});