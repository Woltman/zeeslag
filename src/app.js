$(document).ready(function () {
    var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImcuZGV3aWxkdEBzdHVkZW50LmF2YW5zLm5sIg.0w2suHuEAiAFmeto6UawYmNeFg4H2l0fKhSaMrwqLkQ";
    // Glenn: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImcuZGV3aWxkdEBzdHVkZW50LmF2YW5zLm5sIg.0w2suHuEAiAFmeto6UawYmNeFg4H2l0fKhSaMrwqLkQ
    //Thom: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.InQud29sdG1hbkBzdHVkZW50LmF2YW5zLm5sIg.CWXmO1qRuqqg0uvAf6VgBLEukEHX6jEVkZxtwcCfZKQ
    //setup socket
    var server = 'https://zeeslagavans2.herokuapp.com/';
    var options = { query: "token="+token, };
    var socket = io.connect(server, options);
    
    var apiService = new zeeslag.ApiService(token, server);
    var gameController = new zeeslag.GameController(apiService, socket);
    var menuController = new zeeslag.MenuController(apiService, gameController); 
    
    //listening to the socket  
    socket.on('update', function(update){
        menuController.getGames();
        console.log("update= "+update);
        console.log(update);
    });
});