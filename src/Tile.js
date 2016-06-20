/**
 * Created by Glenn on 4-6-2016.
 */

(function(zeeslag) {
    function Tile(tile){
        var x;
        var y;
        var isHit;
        var isPlaced;




        this.hit = function () {


                this.isHit = 1;

        }

        this.place = function () {


            this.isPlaced = 1;

        }

    }




    zeeslag.Tile = Tile;
})(window.zeeslag = window.zeeslag || {})