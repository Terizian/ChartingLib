var json = JSON.parse('{	"data": [{"label": "A", "count": 1},{"label": "B", "count": 5},	{"label": "C", "count": 7},{"label": "D", "count": 2},{"label": "E", "count": 4}]}');

let x = 0;
let y = 0;
var svgns = "http://www.w3.org/2000/svg";

for(var i = 0; i < json.data.length; i++) {
    var obj = json.data[i];
    var height = obj.count * 10;
    y=100-height;
    //console.log(obj.label);
    //console.log(obj.count);
    var rect = document.createElementNS(svgns, 'rect');
    rect.setAttributeNS(null, 'x', x);
    rect.setAttributeNS(null, 'y', y);
    rect.setAttributeNS(null, 'height', height);
    rect.setAttributeNS(null, 'width', 20);
    rect.setAttributeNS(null, 'fill', '#'+Math.round(0xffffff * Math.random()).toString(16));
    document.getElementById('bar-chart').appendChild(rect);

    x = x + 25;
    
}


// var rect = document.createElementNS(svgns, 'rect');
// rect.setAttributeNS(null, 'x', 0);
// rect.setAttributeNS(null, 'y', 0);
// rect.setAttributeNS(null, 'height', '50');
// rect.setAttributeNS(null, 'width', '50');
// rect.setAttributeNS(null, 'fill', '#'+Math.round(0xffffff * Math.random()).toString(16));
// document.getElementById('bar-chart').appendChild(rect);
