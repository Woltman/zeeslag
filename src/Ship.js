/**
 * Created by Glenn on 31-5-2016.
 */

(function(zeeslag) {
function Ship(){

    this.isVertical = 1;


    this.rotate = function () {

        if(this.__v == 1){
            this.__v = 0;
            this.isVertical = 1;

        }else {
            this.__v = 1;
            this.isVertical = 0;

        }
    }

}
    zeeslag.Ship = Ship;
})(window.zeeslag = window.zeeslag || {});