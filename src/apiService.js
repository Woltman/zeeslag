 (function(zeeslag) {
    function ApiService(token, server){
        this.token = token;
        this.server = server;
    }
    zeeslag.ApiService = ApiService;
    
    ApiService.prototype.printtoken = function(){
        console.log(this.token);    
    }

     //gives collection of games from the user
    ApiService.prototype.getGames = function(error, success){

        return $.ajax({
            url: this.server+"users/me/games",
            data: { token: this.token },
            success: success,
            error: error
        });

    }

     // gives info from user
     ApiService.prototype.getUserInfo = function(error, success){
         return $.ajax({
             url: this.server+"users/me/info",
             data: { token: this.token },
             success: success,
             error: error
         });

     }
    
    ApiService.prototype.newGameAI = function (error, success) {
        return $.ajax({
            url: this.server+"games/ai",
            data: { token: this.token },
            success: success,
            error: error
        });


    }
    
    ApiService.prototype.newGame = function (error, success) {
        return $.ajax({
            url: this.server+"games",
            data: { token: this.token },
            success: function (data) {

                if (data.error) {
                    error(data);
                }
                else {
                    success(data);
                }
            },
            error: error
            
        });
    }
    
    ApiService.prototype.getUser = function (error, succes) {
        return $.ajax({
            url: this.server+"users/me/info",
            data: { token: this.token },
            success: succes,
            error: error
        });
    }
    
    ApiService.prototype.getGame = function (id, error, success) {
        return $.ajax({
            url: this.server+"games/"+id,
            data: { token: this.token },
            success: success,
            error: error
        });
    }
    
    //delete all games
    ApiService.prototype.deleteGames = function (error, success) {
        return $.ajax({
            url: this.server+"users/me/games?token="+this.token,
            type: "DELETE",
            success: success,
            error: error
        });
    }

    //get ships from apponent
     ApiService.prototype.getShips = function (error, succes) {
         return  $.ajax({
             url: this.server+"ships",
             data: { token: this.token },
             success: succes,
             error: error
         });

     }

     ApiService.prototype.sendShips = function (error, success, id, data) {
        return $.ajax({
            url: this.server+"games/"+id+"/gameboards?token="+this.token,
            type: "POST",
            data: data,
            success: success,
            error: error
        });
    }

    ApiService.prototype.shoot = function (error, success, id, data) {
        return $.ajax({
            url: this.server+"games/"+id+"/shots?token="+this.token,
            type: "POST",
            data: data,
            success: success,
            error: error
        });
    }

})(window.zeeslag = window.zeeslag || {});

 