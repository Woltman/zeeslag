/**
 * Created by Glenn on 31-5-2016.
 */

(function(zeeslag) {
function Ship(ship){

    zeeslag.Ship = Ship;


    this.rotate = function () {

        if(this.__v == 1){
            this.__v = 0;

        }else {
            this.__v = 1;
        }
    }

}
})(window.zeeslag = window.zeeslag || {});