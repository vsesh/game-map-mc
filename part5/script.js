var map,
    objectManager,
    layerName = "user#layer";
ymaps.ready(onReady);

function onReady () {
    setupLayer();
    setupSibebar();
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

function setupMap () {
    var btn = new ymaps.control.Button({
        options: {
            float: 'right',
            layout: 'game#sidebarLayout'
        }
    });
    map = new ymaps.Map('map', {
        center: [0, 0],
        zoom: 3,
        controls: ['zoomControl', btn],
        type: layerName,
    }, {
        projection: new ymaps.projection.Cartesian([[-1, -1], [1, 1]], [false, false])
    });
}

function setupSibebar () {
    var sidebarClass = ymaps.templateLayoutFactory.createClass(
        '<div class="sidebar">' +
            '<div class="show_icon" id="show_house"></div>' +
            '<div class="show_icon" id="show_jump"></div>' +
            '<div class="show_icon" id="show_health"></div>' +
        '</div>', 
        {
            build: function () {
                sidebarClass.superclass.build.call(this);
                this._buttonListeners = [];
                this._filters = [];
                this._setupButtons();
            },
            
            clear: function () {
                this._teardownButtons();
                sidebarClass.superclass.clear.call(this);
            },
            
            _setupButtons: function () {
                this._setupButton(document.getElementById('show_house'), 'house');
                this._setupButton(document.getElementById('show_jump'), 'jump');
                this._setupButton(document.getElementById('show_health'), 'health');
            },
            
            _setupButton: function (node, key) {
                this._filters.push(key);
                var listenerGroup = ymaps.domEvent.manager.group(node);
                listenerGroup.add('click', this._clickHandler, this);
                this._buttonListeners[key] = listenerGroup;
            },
            
            _teardownButtons: function () {
                for (var key in this._buttonListeners) {
                    this._buttonListeners[key].removeAll();
                }
                this._buttonListeners = {};
            },
            
            _clickHandler: function (e) {
                var filterKey = e.get('target').id.replace('show_', ''),
                    // TODO IE8 :)
                    index = this._filters.indexOf(filterKey);
                if (index == -1) {
                    this._filters.push(filterKey);
                } else {
                    this._filters.splice(index, 1);
                }

                objectManager.setFilter(
                    'properties.type == "' + this._filters.join('" || properties.type == "') + '"'
                );
            }
        }
    );
    ymaps.layout.storage.add('game#sidebarLayout', sidebarClass);
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