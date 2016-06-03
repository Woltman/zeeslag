/**
 * Created by Glenn on 31-5-2016.
 */
(function(zeeslag) {
function Ship(ship){

    zeeslag.Ship = Ship;

    this.ship = ship;
    this.rotate = function () {

        if(this.ship.__v == 1){
            this.ship.__v = 0;

        }else {
            this.ship.__v = 1;
        }
    }

}
})(window.zeeslag = window.zeeslag || {});