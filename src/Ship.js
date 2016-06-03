/**
 * Created by Glenn on 31-5-2016.
 */

(function(zeeslag) {
function Ship(ship){




    this.rotate = function () {

        if(this.__v == 1){
            this.__v = 0;

        }else {
            this.__v = 1;
        }
    }

}
    zeeslag.Ship = Ship;
})(window.zeeslag = window.zeeslag || {});