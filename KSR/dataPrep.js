//let textFile = readTextFile("data.json");
//console.log(textFile)
//let json = JSON.parse(textFile);
readTextFile()

function readTextFile() {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", "data.json", true);
    rawFile.onload = function() {
        if (rawFile.readyState == 4 && rawFile.status == "200") {
        //if (rawFile.status == "200") {
            console.log(rawFile.responseText);
            return rawFile.responseText;
        }
    };
    rawFile.send(null);
    //return '{}';
}

let data = '[{"label": "I am a very long label", "count": 50},{"label": "B","count": 5},{"label": "C", "count": 7},{ "label": "D","count": 2},{"label": "E","count": 4},{ "label": "F","count": 3}]';
let json = JSON.parse(data)

//////////////////////////
// TODO: 

// const readData = async function f(){
//     let json = await fetch('data.json')
//                 .then(response => response.json());
// console.log(json);
// return json}

// // let z = await fetch('data.json');
// // let data = await z.json();

// let json = readData().then({
    
// });

//UNUSED
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
