let svgns = "http://www.w3.org/2000/svg";
let x = 80;
let y = 80;
let r = 50;
let regionId = 'chart-region';
let legendX = 0;
let legendY = 0;
let offset = 0;
let border = 15;
init();

let colorPalette = [
"#59C3C3",
"#52489C",
"#EBEBEB",
"#CAD2C5",
"#84A98C",
"#3066BE",
"#119DA4",
"#6D9DC5",
"#80DED9",
"#AEECEF",
"#87BCDE",
"#805E73",
"#4E4D5C",
"#2D4654",
"#243B4A"]

//Generator code taken from stack overflow 
function* shuffle(array) {

    let i = array.length;

    while (i--) {
        yield array.splice(Math.floor(Math.random() * (i+1)), 1)[0];
    }

}

function init() {
    (async () => {
        let resp = await fetch('./data/chart-data.json');
        let data = await resp.json();
        drawPieChart(data.data, x, y, r, regionId);
    })();
}

function drawPieChart(data, centerX, centerY, radius, regionId){
    let rotationAngle = 0;
    let ranColor = shuffle(colorPalette);

    calculatePercentages(data);
    let chart = document.createElement("div");
    let legend = document.createElement("div");
    chart.style["display"] = "inline-block";
    legend.style["display"] = "inline-block";
    chart.setAttribute("width", x * 2 + border);
    legend.setAttribute("width", 50);
    let svg = document.createElementNS(svgns, 'svg');
    svg.setAttribute("width", x * 2);
    chart.appendChild(svg);
    document.getElementById(regionId).appendChild(chart);
    document.getElementById(regionId).appendChild(legend);
    
    let circle = document.createElementNS(svgns, 'circle');
    //r, cx, cy, fill, stroke, stroke-width, stroke-dasharray, transform
    circle.setAttributeNS(null, 'r', radius);
    circle.setAttributeNS(null, 'cx', centerX);
    circle.setAttributeNS(null, 'cy', centerY);
    circle.setAttributeNS(null, 'fill', 'grey');
    //circle.setAttributeNS(null, 'stroke-width', 32);
    circle.setAttribute('class', 'circle');
    svg.appendChild(circle);
    

    for(let i = 0; i < data.length ; i++){

        let sector = document.createElementNS(svgns, 'path');
        let values = createPath(centerX, centerY, radius, data[i].angle);
        let d = values[0];
        //sector.setAttributeNS(null, 'fill', getRandomColor());
        let color = ranColor.next().value;
        sector.setAttributeNS(null, 'fill', color);
        sector.setAttributeNS(null, 'd', d);
        sector.setAttributeNS(null, "transform", "rotate(" + rotationAngle.toString() + ",80,80)")
        sector.setAttribute("class", "sector");
        svg.appendChild(sector);

        let line = document.createElement("div");
        line.setAttribute("class", "line");
        let box = document.createElement("div");
        box.setAttribute("class", "box");
        box.style.backgroundColor = color;
        let label = document.createElement("span");
        label.setAttribute("class", "lbl");
        let txt = document.createTextNode(data[i].label + " " + data[i].percentage.toFixed(1) + "%");
        label.appendChild(txt);
        line.appendChild(box);
        line.appendChild(label);
        legend.appendChild(line);
        //<text x="20" y="20" font-family="sans-serif" font-size="20px" fill="red">Hello!</text>
        // let label = document.createElementNS(svgns, 'text');


        // labelPositions = findLabelPosition(centerX, centerY, values[1], values[2], convertToRadians(rotationAngle));
    
        // label.setAttributeNS(null, "transform", "translate(" + labelPositions[0] + "," + labelPositions[1] + " )")
        // let lblText = document.createTextNode(data[i].label + " " + data[i].percentage.toFixed(1) + "%");
        // svg.appendChild(lblText);
        // legend.appendChild(label);
        rotationAngle = rotationAngle + data[i].angle;
        if(i >= 15){
            //Pie chart with so many sectors will not make any sense to work with
            break;
        }
        
    }
    
    
}

function findLabelPosition(centerX, centerY, labelX, labelY, rotAngle){
    posY = ((labelY - centerY) * Math.cos(rotAngle) + (labelX - centerX) * Math.sin(rotAngle)) + centerY;
    posX = ((labelX - centerX) * Math.cos(rotAngle) - (labelY - centerY) * Math.sin(rotAngle))+ centerX;


    return [posX, posY];
}
function calculatePercentages(data){
    let sum = 0;
    for(let i = 0; i < data.length ; i++){
        sum = sum + data[i].count;
    }

    for(let i = 0; i < data.length ; i++){
        data[i].angle = data[i].count * 360 / sum;
        data[i].percentage = data[i].count * 100 / sum;
    }

}

function createPath(cx, cy, r, angle){
    let largeArc = angle <= 180 ? "0" : "1";
    
    var x1 = cx + r * Math.sin(convertToRadians(0));   
    var y1 = cy - r * Math.cos(convertToRadians(0));
   
    var x2 = cx + r * Math.sin(convertToRadians(angle)); 
    var y2 = cy - r * Math.cos(convertToRadians(angle));

    return [`M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}  L ${cx} ${cy}z`, x2, y2];      
}

 // Calculate start and end coords for arc. Starts at 12 o'clock

   

function calculateArcEnd(centerX, centerY, radius, angle){
    angle = convertToRadians(angle);
    let z = Math.sqrt(2 * Math.pow(radius, 2) - 2 * radius * radius * Math.cos(angle));
    let x = radius * Math.sin(angle);
    let y = Math.sqrt(Math.pow(z, 2) - Math.pow(x,2));
    return ((centerX + x).toString() + "," + (centerY - radius + y).toString());
}

function convertToRadians(angle){
    return angle * Math.PI / 180;
}
//this function is taken from code pen
function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
  return color;
}