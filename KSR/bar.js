let svgns = "http://www.w3.org/2000/svg";
let offset = 10;

function drawBar(data, chartTitle){
    let x = 0;
    let y = 0;
    let width = 30;
    let json = JSON.parse(data);
    let margin = setMargin(json.data);
    let titleText = chartTitle;
    drawBarChart(titleText, json.data, x, y, width, margin);
}

function setMargin(data){
    const MIN_MARGIN = 5
    const MAX_MARGIN = 17
    let margin = MIN_MARGIN;
    for (let i = 0; i < data.length; i++)
    {
        if(margin < data[i].label.length)
        {
            margin = data[i].label.length;
        }

    }
    if(margin > MAX_MARGIN)
    {
        margin = MAX_MARGIN;
    }
    return margin*1.5;
}

function drawBarChart(titleText, data, startingX, startingY, width, margin){
    let maxHeight = scaleValues(data, 10);
    createDataBars(startingX, startingY, width, maxHeight, margin, data);
    drawAxes(startingX, startingY, maxHeight, data.length, width, margin);
    let txt = document.createTextNode(titleText);
    document.getElementById('title').appendChild(txt);
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

function createDataBars(startingX, startingY, width, maxHeight, margin, data){
    for(let i = 0; i < data.length; i++) {
        let obj = data[i];
        let height = obj.scaledCount;
        startingY=maxHeight-height;
       
        let rect = document.createElementNS(svgns, 'rect');
        rect.setAttributeNS(null, 'x', startingX);
        rect.setAttributeNS(null, 'y', startingY);
        rect.setAttributeNS(null, 'height', height);
        rect.setAttributeNS(null, 'width', width);
        rect.setAttribute('class', 'bar');
        document.getElementById('bar-chart').appendChild(rect);
    

        let label = document.createElementNS(svgns, 'text');
        label.setAttributeNS(null, 'x', startingX+(width/3));
        label.setAttributeNS(null, 'y', startingY+height+10); 
        label.setAttribute('class', 'axis-label');
        let txt = document.createTextNode(generateShortenedLabel(obj.label));
        label.appendChild(txt);
        label.addEventListener("mouseover", funcName=function(){hover(label, obj.label)}, false);
        label.addEventListener("mouseout", funcName=function(){hover(label, generateShortenedLabel(obj.label))}, false);
        document.getElementById('bar-chart').appendChild(label);

        let countLabel = document.createElementNS(svgns, 'text');
        countLabel.setAttributeNS(null, 'x', startingX+(width/2.5));
        countLabel.setAttributeNS(null, 'y', startingY-2); 
        countLabel.setAttribute('class', 'label');
        let txt2 = document.createTextNode(obj.count);
        countLabel.appendChild(txt2);
        document.getElementById('bar-chart').appendChild(countLabel);

        startingX= startingX + width + margin;
        
    }
}

function generateShortenedLabel(label)
{
    const MAX_CHAR_LENGTH = 10;
    let shortenedLabel = label;
    if(shortenedLabel.length > MAX_CHAR_LENGTH)
    {
        shortenedLabel = shortenedLabel.slice(0,MAX_CHAR_LENGTH-3);
        shortenedLabel = shortenedLabel + "...";
    }
    return shortenedLabel;
}

function hover(label, textLabel)
{  
    var textNode = label.childNodes[0];
    textNode.nodeValue = textLabel;
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










