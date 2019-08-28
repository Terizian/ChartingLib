let json = JSON.parse('{	"data": [{"label": "A", "count": 50},{"label": "B", "count": 5},	{"label": "C", "count": 7},{"label": "D", "count": 2},{"label": "E", "count": 4} ,{"label": "F", "count": 3}]}');

let x = 0;
let y = 0;
//let width = 30;
let width = setBarWidth(json.data);
let margin = 5;
let offset = 10;
let svgns = "http://www.w3.org/2000/svg";
let titleText = "Sample Bar Chart";


drawBarChart(titleText, json.data, x, y, width, margin);

function drawBarChart(titleText, data, startingX, startingY, width, margin){
    let maxHeight = scaleValues(data, 10);
    createDataBars(startingX, startingY, width, maxHeight, margin, data);
    drawAxes(startingX, startingY, maxHeight, data.length, width, margin);

    
    let txt = document.createTextNode(titleText);
    document.getElementById('title').appendChild(txt);
}

function setBarWidth(data){
    const MIN_CHAR_LENGTH = 3;
    const MAX_CHAR_LENGTH = 15;
    let maxLength = 0;
    for (let i = 0; i < data.length; i++)
    {
        if(data[i].label.length >= MAX_CHAR_LENGTH)
        {
            maxLength = MAX_CHAR_LENGTH;
            break;
        }
        if(maxLength < data[i].label.length)
        {
            maxLength = data[i].label.length
        }
        
    }
    if(maxLength<MIN_CHAR_LENGTH){
        maxLength = MIN_CHAR_LENGTH;
    }

    let fontSize = getStyle('.axis-label').split(':')[1].split(';')[0].split('p')[0];
    let barWidth = parseInt(fontSize) * maxLength;
    return barWidth;

}

function getStyle(className) {
    var classes = document.styleSheets[0].rules || document.styleSheets[0].cssRules;
    for (var x = 0; x < classes.length; x++) {
        if (classes[x].selectorText == className) {
            //(classes[x].cssText) ? alert(classes[x].cssText) : alert(classes[x].style.cssText);
            return classes[x].style.cssText;
        }
    }
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
        let height = obj.scaledCount;
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
        countLabel.setAttributeNS(null, 'y', startingY-2); 
        countLabel.setAttribute('class', 'label');
        let txt2 = document.createTextNode(obj.count);
        countLabel.appendChild(txt2);
        //rect.setAttributeNS(null, 'fill', '#d81c3f');
        document.getElementById('bar-chart').appendChild(countLabel);

        startingX= startingX + width + margin;
        
    }
}

function scaleValues(data, offset){
    let max = 0;
    let maxIndex = 0;
    for(let i = 0; i < data.length; i++){
        let obj = data[i];
        if(max < obj.count)
        {
            max = obj.count
            maxIndex =i;
        }
    }

    let range = max;

    for(let i = 0; i<data.length; i++)
    {
        data[i].scaledCount = (data[i].count * 100)/range;
    }
    return data[maxIndex].scaledCount +offset;
}

