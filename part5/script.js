var map,
    objectManager,
    layerName = "user#layer";
ymaps.ready(onReady);

function onReady () {
    setupLayer();
    setupSidebar();
    setupMap();
    setupPresets();
    setupPlaces();
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

function setupSidebar () {
    var layoutClass = ymaps.templateLayoutFactory.createClass(
        '<div class=sidebar>' +
            '<div class=show_icon id=show_house></div>' + 
            '<div class=show_icon id=show_jump></div>' + 
            '<div class=show_icon id=show_health></div>' + 
        '</div>', {
            build: function () {
                layoutClass.superclass.build.call(this);
                this._setupButtons();
            },
            
            clear: function () {
                this._teardownButtons();
                layoutClass.superclass.clear.call(this);
            },
            
            _setupButtons: function () {
                this._listeners = {};
                this._filters = [];
                this._setupButton(document.getElementById('show_house'), 'house');
                this._setupButton(document.getElementById('show_jump'), 'jump');
                this._setupButton(document.getElementById('show_health'), 'health');
            },
            
           _setupButton: function (element, key) {
                this._filters.push(key);
                var group = ymaps.domEvent.manager.group(element);
                group.add('click', function () {
                    // TODO IE8
                    var index = this._filters.indexOf(key);
                    if (index == -1) {
                        this._filters.push(key);
                    } else {
                        this._filters.splice(index, 1);
                    }
                    //properties.type == "jump" || properties.type == "house"
                    objectManager.setFilter(
                        'properties.type == "' + this._filters.join('" || properties.type == "') + '"'
                    );
                }, this);
                this._listeners[key] = group;
            },
            
            _teardownButtons: function () {
                for (var key in this._listeners) {
                    if (this._listeners.hasOwnProperty(key)) {
                        this._listeners[key].removeAll();
                    }
                }
                this._listeners = {};
            }
        }
    );
    ymaps.layout.storage.add('game#sidebatLayout', layoutClass);
}

function setupMap () {
    map = new ymaps.Map('map', {
        center: [0, 0],
        zoom: 3,
        controls: ['zoomControl'],
        type: layerName,
    }, {
        projection: new ymaps.projection.Cartesian([[-1, -1], [1, 1]], [false, false])
    });
    
    var btn = new ymaps.control.Button({
        options: {
            layout: 'game#sidebatLayout',
            position: {top: 5, right: 5}
        }
    });
    map.controls.add(btn);
}

function setupPresets () {
    ymaps.option.presetStorage
        .add('game#houseIcon', {
            iconLayout: 'default#image',
            iconImageHref: './images/house.png',
            iconImageSize: [30, 30],
            iconImageOffset: [-15, -15]
        })
        .add('game#healthIcon', {
            iconLayout: 'default#image',
            iconImageHref: './images/health.png',
            iconImageSize: [30, 30],
            iconImageOffset: [-15, -15]
        })
        .add('game#jumpIcon', {
            iconLayout: 'default#image',
            iconImageHref: './images/jump.png',
            iconImageSize: [30, 30],
            iconImageOffset: [-15, -15]
        });
}

function setupPlaces () {
    objectManager = new ymaps.ObjectManager();
    objectManager.add(placesData);
    map.geoObjects.add(objectManager);
}