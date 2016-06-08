$(document).ready(function () {
    var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.InQud29sdG1hbkBzdHVkZW50LmF2YW5zLm5sIg.CWXmO1qRuqqg0uvAf6VgBLEukEHX6jEVkZxtwcCfZKQ";
    // Glenn: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImcuZGV3aWxkdEBzdHVkZW50LmF2YW5zLm5sIg.0w2suHuEAiAFmeto6UawYmNeFg4H2l0fKhSaMrwqLkQ
    //Thom: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.InQud29sdG1hbkBzdHVkZW50LmF2YW5zLm5sIg.CWXmO1qRuqqg0uvAf6VgBLEukEHX6jEVkZxtwcCfZKQ
    //setup socket
    var server = 'https://zeeslagavans.herokuapp.com/';
    var options = { query: "token="+token, };
    // var socket = io.connect(server, options);
    
    var apiService = new zeeslag.ApiService(token);
    var gameController = new zeeslag.GameController(apiService);
    var menuController = new zeeslag.MenuController(apiService, gameController); 
    
    //listening to the socket  
    // socket.on('update', function(update){
    //     menuController.getGames();
    // });
});