(function(zeeslag) {
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
        
        for(var row=0;row<10;row++){
            var rowItem = $("<tr></tr>");
            for(var column=0;column<10;column++){
                rowItem.append($("<td><button>"+row+", "+column+"</button></td>"));
            }
            $(".enemy-board").append(rowItem);
        }
        
        
    }

})(window.zeeslag = window.zeeslag || {});