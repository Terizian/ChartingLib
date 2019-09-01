let svgns = "http://www.w3.org/2000/svg";
let offset = 10;

let defaultConfig = {
    type: 'bar',
    title: 'Sample Chart',
    x: 0,
    y: 0,
    color: 'rgba(95, 21, 163, 0.808)',
    width: 30
}
export function drawChart(containerId, data, config) {
    if (!config) {
        config = defaultConfig;
    } else {
        config.type = config.type || defaultConfig.type;
        config.title = config.title || defaultConfig.title;
        config.x = config.x || defaultConfig.x;
        config.y = config.y || defaultConfig.y;
        config.color = config.color || defaultConfig.color;
        config.width = config.width || defaultConfig.width;
    }
    drawBar(containerId, data, config);
}

function drawBar(containerId, data, config){
    let x = config.x;
    let y = config.y;
    let width = config.width;
    let json = data;
    let margin = setMargin(json.data);
    let titleText = config.title;
    drawBarChart(titleText, json.data, config.x, config.y, config.width, margin, containerId);
    for (let bar of document.querySelectorAll(`#${containerId} .bar`)) {
        bar.style.fill = config.color;
    }
}

function setMargin(data){
    const MIN_MARGIN = 5
    const MAX_MARGIN = 17
    let margin = MIN_MARGIN;
    for (let i = 0; i < data.length; i++){
        if(margin < data[i].label.length){
            margin = data[i].label.length;
        }

    }
    if(margin > MAX_MARGIN){
        margin = MAX_MARGIN;
    }
    return margin*1.5;
}

function drawBarChart(titleText, data, startingX, startingY, width, margin, regionId){
    let h1 = document.createElement('h1');
    let txt = document.createTextNode(titleText);
    h1.appendChild(txt);
    document.getElementById(regionId).appendChild(h1);

    let svg = document.createElementNS(svgns, 'svg');
    document.getElementById(regionId).appendChild(svg);

    let maxHeight = scaleValues(data, 10);
    createDataBars(startingX, startingY, width, maxHeight, margin, data, svg);
    drawAxes(startingX, startingY, maxHeight, data.length, width, margin, svg);
}

function scaleValues(data, offset){
    let max = 0;
    let maxIndex = 0;
    for(let i = 0; i < data.length; i++){
        let obj = data[i];
        if(max < obj.count){
            max = obj.count
            maxIndex = i;
        }
    }

    let range = max;

    for(let i = 0; i<data.length; i++){
        data[i].scaledCount = (data[i].count * 100) / range;
    }
    return data[maxIndex].scaledCount +offset;
}

function createDataBars(startingX, startingY, width, maxHeight, margin, data, svg){
    for(let i = 0; i < data.length; i++) {
        let obj = data[i];
        let height = obj.scaledCount;
        startingY=maxHeight - height;
       
        let rect = document.createElementNS(svgns, 'rect');
        rect.setAttributeNS(null, 'x', startingX);
        rect.setAttributeNS(null, 'y', startingY);
        rect.setAttributeNS(null, 'height', height);
        rect.setAttributeNS(null, 'width', width);
        rect.setAttribute('class', 'bar');
        svg.appendChild(rect);
    

        let label = document.createElementNS(svgns, 'text');
        label.setAttributeNS(null, 'x', startingX + (width / 3));
        label.setAttributeNS(null, 'y', startingY + height + 10); 
        label.setAttribute('class', 'axis-label');
        let txt = document.createTextNode(generateShortenedLabel(obj.label));
        label.appendChild(txt);
        label.addEventListener("mouseover", function () {
            hover(label, obj.label)
        }, false);
        label.addEventListener("mouseout", function () {
            hover(label, generateShortenedLabel(obj.label))
        }, false);
        svg.appendChild(label);

        let countLabel = document.createElementNS(svgns, 'text');
        countLabel.setAttributeNS(null, 'x', startingX + (width / 2.5));
        countLabel.setAttributeNS(null, 'y', startingY - 2); 
        countLabel.setAttribute('class', 'label');
        let txt2 = document.createTextNode(obj.count);
        countLabel.appendChild(txt2);
        svg.appendChild(countLabel);

        startingX= startingX + width + margin;
        
    }
}

function generateShortenedLabel(label){
    const MAX_CHAR_LENGTH = 10;
    let shortenedLabel = label;
    if(shortenedLabel.length > MAX_CHAR_LENGTH)
    {
        shortenedLabel = shortenedLabel.slice(0, MAX_CHAR_LENGTH - 3);
        shortenedLabel = shortenedLabel + "...";
    }
    return shortenedLabel;
}

function hover(label, textLabel){  
    var textNode = label.childNodes[0];
    textNode.nodeValue = textLabel;
}

function drawAxes(startingX, startingY, maxHeight, numOfBars, width, margin, svg){
    let xAxis = document.createElementNS(svgns, 'line');
    xAxis.setAttributeNS(null, 'x1', startingX);
    xAxis.setAttributeNS(null, 'y1', startingY + maxHeight)
    xAxis.setAttributeNS(null, 'x2', startingX + numOfBars*(width + margin) + 10);
    xAxis.setAttributeNS(null, 'y2', startingY + maxHeight)
    svg.appendChild(xAxis);

    let yAxis = document.createElementNS(svgns, 'line');
    yAxis.setAttributeNS(null, 'x1', startingX);
    yAxis.setAttributeNS(null, 'y1', startingY + maxHeight)
    yAxis.setAttributeNS(null, 'x2', startingX);
    yAxis.setAttributeNS(null, 'y2', startingY - 10)
    svg.appendChild(yAxis);
}










