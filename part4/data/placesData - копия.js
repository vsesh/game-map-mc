var placesData = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature", 
            "id": 0, 
            "geometry": {"type": "Point", "coordinates": [-0.3, 0]}, 
            "properties": {"balloonContent": "Home", "hintContent": "Home"}
            //, "options": {"preset": "game#homeIcon"}
        },
        {
            "type": "Feature", 
            "id": 1, 
            "geometry":  {"type": "Point", "coordinates": [0, 0]}, 
            "properties": {"balloonContent": "Health", "hintContent": "Health"}
            
            //, "options": {"preset": "game#homeIcon"}
            //, "options": {"preset": "game#healthIcon"}
        },
        {
            "type": "Feature", 
            "id": 2, 
            "geometry": {"type": "Point", "coordinates": [0.3, 0]}, 
            "properties": {"balloonContent": "Jump", "hintContent": "Jump"}//, 
            //"options": {"preset": "game#jumpIcon"}
        }
    ]
}