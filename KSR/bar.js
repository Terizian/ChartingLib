let json = JSON.parse('{	"data": [{"label": "A", "count": 1},{"label": "B", "count": 5},	{"label": "C", "count": 7},{"label": "D", "count": 2},{"label": "E", "count": 4} ,{"label": "F", "count": 3}]}');

let x = 0;
let y = 0;
let width = 30;
let margin = 5;
let svgns = "http://www.w3.org/2000/svg";
let titleText = "Sample Bar Chart"
drawBarChart(titleText, json.data, x, y, width, margin);

function drawBarChart(titleText, data, startingX, startingY, width, margin){
    let maxHeight = getMaxHeight(data);
    createDataBars(startingX, startingY, width, maxHeight, margin, data);
    drawAxes(startingX, startingY, maxHeight, data.length, width, margin);

    
    let txt = document.createTextNode(titleText);
    document.getElementById('title').appendChild(txt);
}
function drawAxes(startingX, startingY, maxHeight, numOfBars, width, margin){
    let xAxis = document.createElementNS(svgns, 'line');
    xAxis.setAttributeNS(null, 'x1', startingX);
    xAxis.setAttributeNS(null, 'y1', startingY + maxHeight)
    xAxis.setAttributeNS(null, 'x2', startingX + numOfBars*(width + margin) + 10);
    xAxis.setAttributeNS(null, 'y2', startingY + maxHeight)
    document.getElementById('bar-chart').appendChild(xAxis);

    let yAxis = document.createElementNS(svgns, 'line');
    yAxis.setAttributeNS(null, 'x1', startingX);
    yAxis.setAttributeNS(null, 'y1', startingY + maxHeight)
    yAxis.setAttributeNS(null, 'x2', startingX);
    yAxis.setAttributeNS(null, 'y2', startingY-10)
    document.getElementById('bar-chart').appendChild(yAxis);
}
function createDataBars(startingX, startingY, width, maxHeight, margin, data){
    for(let i = 0; i < data.length; i++) {
        let obj = data[i];
        let height = obj.count * 10;
        startingY=maxHeight-height;
        //console.log(obj.label);
        //console.log(obj.count);
       
        let rect = document.createElementNS(svgns, 'rect');
        rect.setAttributeNS(null, 'x', startingX);
        rect.setAttributeNS(null, 'y', startingY);
        rect.setAttributeNS(null, 'height', height);
        rect.setAttributeNS(null, 'width', width);
        rect.setAttribute('class', 'bar');
        //rect.setAttributeNS(null, 'fill', '#d81c3f');
        document.getElementById('bar-chart').appendChild(rect);
    

        let label = document.createElementNS(svgns, 'text');
        label.setAttributeNS(null, 'x', startingX+(width/3));
        label.setAttributeNS(null, 'y', startingY+height+10); 
        label.setAttribute('class', 'axis-label');
        let txt = document.createTextNode(obj.label);
        label.appendChild(txt);
        //rect.setAttributeNS(null, 'fill', '#d81c3f');
        document.getElementById('bar-chart').appendChild(label);

        let countLabel = document.createElementNS(svgns, 'text');
        countLabel.setAttributeNS(null, 'x', startingX+(width/2.5));
        countLabel.setAttributeNS(null, 'y', startingY+10); 
        countLabel.setAttribute('class', 'label');
        let txt2 = document.createTextNode(obj.count);
        countLabel.appendChild(txt2);
        //rect.setAttributeNS(null, 'fill', '#d81c3f');
        document.getElementById('bar-chart').appendChild(countLabel);

        startingX= startingX + width + margin;
        
    }
}

function getMaxHeight(data){
    let maxHeight = 0;
    for(let i = 0; i < data.length; i++){
        let obj = data[i];
        if (maxHeight < (obj.count * 10))
        {
            maxHeight = obj.count * 10;
        }
    }
    maxHeight = maxHeight + 10;
    return maxHeight;
}

