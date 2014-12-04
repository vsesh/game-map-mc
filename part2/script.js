var map,
    layerName = "user#layer";
        
    ymaps.ready(onReady);
    
    function onReady () {
        setupLayer();
        setupMap();
    }
    
    function setupLayer () {
        var Layer = function () {
            var layer = new ymaps.Layer("./%z/%x-%y.jpeg", {
                //tileTransparent: true,
                notFoundTile: "./2/0-0.jpeg"
            });
            layer.getZoomRange = function () {
                return ymaps.vow.resolve([1, 3]);
            };
            layer.getCopyrights = function () {
                return ymaps.vow.resolve("wow!");
            };
            return layer;
        };
        ymaps.layer.storage.add(layerName, Layer);
        var mapType = new ymaps.MapType(layerName, [layerName]);
        ymaps.mapType.storage.add(layerName, mapType);
    }
    
    function setupMap () {
        map = new ymaps.Map('map', {
            center: [0, 0],
            zoom: 3,
            controls: ['zoomControl'],
            type: layerName
        }, {
            projection: new ymaps.projection.Cartesian([[-1, -1], [1, 1]], [false, false])
        });
    }