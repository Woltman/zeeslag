(function(zeeslag) {

    var ships = [];
    var tiles = [];
    function GameController(apiService, socket){
        this.socket = socket;
        this.apiService = apiService;
        this.self = this;
        this.game = null;

        // socket.on('shot', function(shot, this.game) {
        //     this.showGame(this.game._id);
        // });
    }
    zeeslag.GameController = GameController;

    GameController.prototype.showGame = function(id){
        this.apiService.getGame(id, undefined, this.setGame.bind(this));
    }

    GameController.prototype.changeTurn = function(turn) {
        this.showGame(turn.gameId);
    }

    GameController.prototype.setGame = function(game){
        var self = this;
        this.game = game;
        var status = game.status;

        console.log("your turn ="+game.yourTurn);

        $('#gamelist').toggle("slow");
        $('#saveBoard').empty();
        $('.turn').empty();
        this.renderGame(game);

        if(status === "setup") {
            
            this.apiService.getShips(undefined, this.showShips.bind(this));
            $("#saveBoard").append("<button id='save' class='btn-link'>Ik heb mijn mijn boten gezet</button>");
            $('#save').on("click", this.sendShips.bind(this));
        }

        else if(status === "started") {
            var yourTurn = "";
            if(game.yourTurn) {yourTurn = "jij bent aan de beurt";}
            else {yourTurn = "tegenstander is aan de beurt" ;};
            
            $('.turn').append(yourTurn);

            //check if your turn
            if(game.yourTurn == true) {
                //onclick on tiles for shots
                $('.enemy-board').find('td').on("click", function () {
                    $(this).data('tile').hit();
                    $(this).css("background-color", "RED");
                    console.log($(this).data('tile'));

                    data = {"x": $(this).data('tile').x, "y": $(this).data('tile').y};
                    self.apiService.shoot(undefined, self.showGame(self.game._id), self.game._id, data);
                });


            }
            //call showGame from socket if enemy shoots
            //not your turn = cant shoot
            this.setHits(game);
            this.setMyHits(game);
        }

        else if(status == "done") {
            //show boards as a result
        }
 
        console.log("status: "+status);           
    }

    GameController.prototype.sendShips = function () {
        console.log(ships);
            var ships_send = {"ships": ships};
            this.apiService.sendShips(undefined, undefined, this.game._id, ships_send);
            console.log(ships_send);

    }

    GameController.prototype.setHits = function(game) {

        console.log("shots");
        console.log(game.myGameboard.shots);
        
        game.enemyGameboard.shots.forEach(function(shot) {
            console.log($('td').data('tile'));           
            $('.enemy-board').find('td').each(function(){
               var tile = $(this).data('tile');
                if( tile.x == shot.x && tile.y == shot.y){
                    $(this).css("background-color", "RED");
                }
            });

        }, this);
    }

    GameController.prototype.setMyHits = function(game) {

        game.myGameboard.shots.forEach(function(shot) {
            console.log($('td').data('tile'));
            $('.my-board').find('td').each(function(){
                var tile = $(this).data('tile');
                if( tile.x == shot.x && tile.y == shot.y){
                    $(this).css("background-color", "RED");
                }
            });

        }, this);
    }

    //shows game
    GameController.prototype.renderGame = function(game){
        this.showEnemyName();
        if(game.status =="started"){
            $("#ships").empty();

            this.showMyBoard();

        }else{
            $('.my-board').empty();
                this.showShips(ships);


        }
        this.showEnemyBoard();
        this.showShipsOnMyBoard();


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

                var item = $("<td></td>");
                rowItem.append(item);
            }
            $(".enemy-board").append(rowItem);
        }

        //adds droppable function
        // this.makeDroppable();
        this.addTileTo();

    }

    GameController.prototype.showMyBoard = function(){
        $(".my-board").empty();
        var chars =['a','b','c','d','e','f','g','h','i','j'];


        for(var row=0;row<10;row++){
            var rowItem = $("<tr class='tile'></tr>");
            for(var column=0;column<10;column++){
                //creates tile
                var tile = this.makeTile(chars[column], row+1);
                //adds tile to tile array
                tiles.push(tile);

                var item = $("<td class='my'></td>");
                rowItem.append(item);
            }
            $(".my-board").append(rowItem);
        }

        //adds droppable function
        // this.makeDroppable();
        this.addTileTo();

    }

    GameController.prototype.showShipsOnMyBoard = function(){
        var tds = $(".my-board").find('td');

        for(td in tds){
            var data =$(td).data('tile');

            
        }

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


    GameController.prototype.addShipToList = function(ship ) {
        var self = this;

        var item = $("<li class='ship list-group-item' id="+ ship.name.replace(/ /g,'')+"><div class='drag '></div></li>");
        var list =$("<br/>"+ship.name.replace(/ /g,'') + "<span class='badge'>"+ ship.length+ "</span> <span class='badge'>" + ship.__v+"</span>");

        var rotate = $("<a class='btn btn-primary '></a>");
            rotate.text("Rotate");



        rotate.on("click", function() {
           // rotates ship
            ship.rotate();
            $(this).toggleClass("rotate");



        });

        //item.text(ship.ship.name + ","+ ship.ship.length+ ", " + ship.ship.__v);
        item.append(list);
        item.append(rotate);
        $('#ships').append(item);

        item.data('ship', ship);

        var draggbleShip = $(item).find(".drag");

        $(draggbleShip).draggable({
         helper:function() {
             //debugger;
             draggbleShip.data('ship', item.data('ship'));


             var clone = $("<div></div>").append();
             clone.css("backgroundColor","blue");

             clone.css("width","50");
             clone.css("height","50");

             return clone;

         }

        });
    }

    //adds ships to Ships array
    GameController.prototype.showShips = function (data) {
        var self = this;

            $("#ships").empty();
            for (var i = 0; i < data.length; i++) {
                var ship = $.extend(new zeeslag.Ship(), data[i]);
                //var ship = new Ship(data[i]);
                ships.push(ship);
               this.addShipToList(ship);
            }

            this.makeDroppable();
            
    }

    //rotate ship

    function rotateShip(ship,item){
        ship.rotate();
        item.text(ship.name + ","+ ship.length+ ", " + ship.__v);
    }


    //makes all td dropppable
    GameController.prototype.makeDroppable =function(){
var me = this;
        $("td").droppable({
            out: function( event, ui ) {
                var self = this;
                if($(ui.draggable).data("ship").isVertical ==true){
                if(me.isPlaceble(ui,self,$(ui.draggable).data("ship") )){
                for(var c = 0 ;$(ui.draggable).data("ship").length  > c ;c++){

                    if($(self).data("tile").isHit != true){
                        $(self).css("background-color","white");

                    }
                    var cellIndex = $(self).closest('td').index();
                    self = $(self).closest('tr').next().children().eq(cellIndex);

                }
                }

            }else {
                    var self = this;
                    if($(ui.draggable).data("ship").isVertical !=true){
                        if(me.isPlaceble(ui,self,$(ui.draggable).data("ship") )){
                            for(var c = 0 ;$(ui.draggable).data("ship").length  > c ;c++){

                                if($(self).data("tile").isHit != true){
                                    $(self).css("background-color","white");

                                }
                                var cellIndex = $(self).closest('td').index();
                                self =  $(self).next('td');
                            }
                        }

                    }



                }
            },
            over: function( event, ui ) {
                var self = this;
                if($(ui.draggable).data("ship").isVertical ==true){

                    if(me.isPlaceble(ui,self,$(ui.draggable).data("ship") )){

                        for(var c = 0 ;$(ui.draggable).data("ship").length  > c ;c++){


                            $(self).css("background-color","green");
                            var cellIndex = $(self).closest('td').index();
                            self = $(self).closest('tr').next().children().eq(cellIndex);

                        }                    }


            }else {
                    if(me.isPlaceble(ui,self,$(ui.draggable).data("ship") )){

                        for(var c = 0 ;$(ui.draggable).data("ship").length  > c ;c++){


                            $(self).css("background-color","green");
                            var cellIndex = $(self).closest('td').index();
                            self =  $(self).next('td');

                        }                    }

                }
            },
            drop: function(event, ui) {
                var self = this;



                if( me.isPlaceble(ui,self,$(ui.draggable).data("ship")) == true){
                    if($(ui.draggable).data("ship").isVertical == 1){
                        me.placeVerical(ui,self);


                    }else if ($(ui.draggable).data("ship").isVertical == 0){
                        me.placeHori(ui,self);
                    }

                    //add x y codinates to ship
                    var ship = $(ui.draggable).data("ship");
                    ship.startCell = {"x": x =$(this).data("tile").x, "y": y =$(this).data("tile").y};
                    $('#ships').find("#"+ship.name.replace(/ /g,'')).remove();

                }else {
                    console.log("cannnot place");
                }


            }

        });

     


    }

    GameController.prototype.placeHori =function(ui, self) {

        for(var c = 0 ;$(ui.draggable).data("ship").length  > c ;c++){


            if($(self).data("tile").isHit == true){
            }
            $(self).css("background-color","black");
            $(self).data('tile').hit();
            self =  $(self).next('td');

        }

    }

    GameController.prototype.placeVerical =function(ui, self) {

        for(var c = 0 ;$(ui.draggable).data("ship").length  > c ;c++){


            if($(self).data("tile").isHit == true){
            }
            $(self).css("background-color","black");
            $(self).data('tile').hit();
            var cellIndex = $(self).closest('td').index();
            self = $(self).closest('tr').next().children().eq(cellIndex);

        }

    }

    //controles if the ship is placeble
    GameController.prototype.isPlaceble =function(ui, self, ship) {

        var place = true;

        if(ship.isVertical == true){
            console.log("verti");
            for(var c = 0 ;$(ui.draggable).data("ship").length  > c ;c++){

                if($(self).data("tile") == undefined){
                return false;
                }



                if($(self).data("tile").isHit == true){
                    return false;
                }

                var cellIndex = $(self).closest('td').index();

                self = $(self).closest('tr').next().children().eq(cellIndex);


            }

        }
        else{

            for(var c = 0 ;$(ui.draggable).data("ship").length  > c ;c++){
                if($(self).data("tile") == undefined){
                    return false;
                }


                if($(self).data("tile").isHit == true){
                    return false;
                }

                self =  $(self).next('td');

            }


        }
        return place;

    }




})(window.zeeslag = window.zeeslag || {});