$(document).ready(function () {
    var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.InQud29sdG1hbkBzdHVkZW50LmF2YW5zLm5sIg.CWXmO1qRuqqg0uvAf6VgBLEukEHX6jEVkZxtwcCfZKQ";
    var apiService = new zeeslag.ApiService(token);
    var gameController = new zeeslag.GameController(apiService);
    var menuController = new zeeslag.MenuController(apiService, gameController);  
});