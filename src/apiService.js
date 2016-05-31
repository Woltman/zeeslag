 (function(zeeslag) {
    function ApiService(token){
        this.token = token;
    }
    zeeslag.ApiService = ApiService;
    
    ApiService.prototype.printtoken = function(){
        console.log(this.token);    
    }

     //gives collection of games from the user
    ApiService.prototype.getGames = function(error, success){
        return $.ajax({
            url: "https://zeeslagavans.herokuapp.com/users/me/games",
            data: { token: this.token },
            success: success,
            error: error
        });   
    }

     // gives info from user
     ApiService.prototype.getUserInfo = function(error, success){
         return $.ajax({
             url: "https://zeeslagavans.herokuapp.com/users/me/info",
             data: { token: this.token },
             success: success,
             error: error
         });
     }
    
    ApiService.prototype.newGameAI = function (error, success) {
        return $.ajax({
            url: "https://zeeslagavans.herokuapp.com/games/ai",
            data: { token: this.token },
            success: success,
            error: error
        });


    }
    
    ApiService.prototype.newGame = function (error, success) {
        return $.ajax({
            url: "https://zeeslagavans.herokuapp.com/games",
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
            url: "https://zeeslagavans.herokuapp.com/users/me/info",
            data: { token: this.token },
            success: succes,
            error: error
        });
    }
    
    ApiService.prototype.getGame = function (id, error, succes) {
        return $.ajax({
            url: "https://zeeslagavans.herokuapp.com/games/"+id,
            data: { token: this.token },
            success: succes,
            error: error
        });
    }

    //get ships from apponent
     ApiService.prototype.getShips = function (error, succes) {
         return $.ajax({
             url: "https://zeeslagavans.herokuapp.com/ships",
             data: { token: this.token },
             success: succes,
             error: error
         });
     }

     // sends ship to apponeng
     ApiService.prototype.sendShips = function (id,error, succes) {
         return $.ajax({
             url: "https://zeeslagavans.herokuapp.com/games/"+id+"/gameboards",
             data: { token: this.token },
             success: succes,
             error: error
         });
     }



        
})(window.zeeslag = window.zeeslag || {});

 