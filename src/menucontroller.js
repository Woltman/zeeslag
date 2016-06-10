(function(zeeslag) {
    function MenuController(apiService, gamecontroller){
        this.apiService = apiService;
        this.gamecontroller = gamecontroller;
        
        //setup on click events
        $('#newgame').on("click", this.newGame.bind(this));
        $('#newgame-ai').on("click", this.newGameAI.bind(this));
        $('.delete-games').on("click", this.deleteGames.bind(this));
        $('#toggle-games').on("click", function(){$('#gamelist').toggle("slow")});


        //show games
        this.getGames();
        //show user
        apiService.getUser(undefined, this.showProfile);
    }
    
    zeeslag.MenuController = MenuController;

    MenuController.prototype.showGames = function(data) {
        $("#gamelist").empty();
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                this.addGameToList(data[i]);
            }
    }
    
    MenuController.prototype.getGames = function() {
        this.apiService.getGames(undefined, this.showGames.bind(this));
    }
    
    MenuController.prototype.showProfile = function (data) {
        $("#naam").text(data.name);
        $("#id").text(data._id);
    }
    
    MenuController.prototype.addGameToList = function (game) {
        var item = $("<li></li>");
        
        item.on("click", function() {
            this.gamecontroller.showGame(game._id);
        }.bind(this));
        
        item.text(game.enemyName + ", " + game.status);
        $("#gamelist").append(item);
    }

    MenuController.prototype.newGame = function()
    {
        this.apiService.newGame( 
            function (error) {
                alert('je bent nog in queue'); 
            }
        , function(){
             this.apiService.getGames(undefined, this.showGames.bind(this));
          }.bind(this));
        console.log(this);
    }
    
    MenuController.prototype.newGameAI = function() {
        this.apiService.newGameAI(undefined, function(){
            this.apiService.getGames(undefined, this.showGames.bind(this));
        }.bind(this));     
    }
    
    MenuController.prototype.deleteGames = function() {
            this.apiService.deleteGames(undefined, function(){
                this.apiService.getGames(undefined, this.showGames.bind(this));
            }.bind(this));
    }

    
})(window.zeeslag = window.zeeslag || {});