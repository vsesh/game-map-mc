var map;
ymaps.ready(onReady);
function onReady () {
    map = new ymaps.Map('map', {
        center: [54.96752802, 73.36126386],
        zoom: 10,
        controls: ['zoomControl']
    });
}