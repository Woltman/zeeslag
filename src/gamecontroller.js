(function(zeeslag) {

    var ships = [];
    var tiles = [];
    function GameController(apiService){
        this.apiService = apiService;
        this.self = this;
        this.game = null;

    }
    zeeslag.GameController = GameController;

    GameController.prototype.showGame = function(id){
        this.apiService.getGame(id, undefined, this.setGame.bind(this));
    }

    GameController.prototype.setGame = function(game){
        this.game = game;
        
        this.renderGame();
        this.apiService.getShips(undefined, this.showShips);

        $("#saveBoard").append("<button id='save'>save</button>");
        

        console.log("1");
        this.game = game;
        $('#save').on("click", this.sendShips.bind(this));
        console.log("2");       
    }

    GameController.prototype.sendShips = function () {
            var ships_send = {"ships": ships};
            this.apiService.sendShips(undefined, undefined, this.game._id, ships_send);
            console.log(ships_send);
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
        var chars =['a','b','c','d','e','f','g','h','i','j'];


        for(var row=0;row<10;row++){
            var rowItem = $("<tr class='tile'></tr>");
            for(var column=0;column<10;column++){
                //creates tile
                var tile = this.makeTile(chars[column], row+1);
                //adds tile to tile array
                tiles.push(tile);

                var item = $("<td>"+tile.x+", "+tile.y+"</td>");
                rowItem.append(item);


            }
            $(".enemy-board").append(rowItem);
        }

        //adds droppable function
        this.makeDroppable();
        this.addTileTo();

    }

    //adds add object to colum
    GameController.prototype.makeTile = function(x ,y){
        var tile = new zeeslag.Tile();
        tile.x = x;
        tile.y = y;
        return tile;
    }

    //adds tile to colum
    GameController.prototype.addTileTo = function (){
        var counter = 0

        $("td").each(function(){
            $(this).data('tile',  tiles[counter]);
            counter++;
        });

    }



    GameController.prototype.addGameToList = function (game) {
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
           //this.rotateShip(ship,item);

        });

        //item.text(ship.ship.name + ","+ ship.ship.length+ ", " + ship.ship.__v);
        item.text(ship.name + ","+ ship.length+ ", " + ship.__v);
        $("#ships").append(item);
        item.data('ship', ship);
        item.draggable({

            helper: "clone",

        });
    }

    //adds ships to Ships array
    GameController.prototype.showShips = function (data) {

            $("#ships").empty();
            for (var i = 0; i < data.length; i++) {
                var ship = $.extend(new zeeslag.Ship(), data[i]);
                //var ship = new Ship(data[i]);
                ships.push(ship);
               addShipToList(ship);
            }
    }

    //rotate ship

    GameController.prototype.rotateShip = function (ship,item){
        ship.rotate();
        item.text(ship.name + ","+ ship.length+ ", " + ship.__v);
    }


    //makes all td dropppable
    GameController.prototype.makeDroppable =function(){

        $("td").droppable({
            drop: function(event, ui) {
                var self = this;




                for(var c = 0 ;$(ui.draggable).data("ship").length  > c ;c++){

                    if($(self).data("tile").isHit == true){
                        console.log("is hit");
                    }
                    $(self).css("background-color","black");
                    $(self).data('tile').hit();
                    self =  $(self).next('td');

                }
                //add x y codinates to ship
                var ship = $(ui.draggable).data("ship");
                
               
                ship.startCell = {"x": x =$(this).data("tile").x, "y": y =$(this).data("tile").y};


                console.log( JSON.stringify(ship));


            }
        });

    }
    //controles if the ship is placeble
    GameController.prototype.isPlaceble =function(ui) {

        var place = true;
        for(var c = 0 ;$(ui.draggable).data("ship").length  > c ;c++){

            if($(self).data("tile").isHit == true){
                console.log("is hit");
                place = false;
            }
            $(self).css("background-color","black");
            $(self).data('tile').hit();
            self =  $(self).next('td');

        }

        return place;

    }


})(window.zeeslag = window.zeeslag || {});