import {
    drawChart
} from "./bar2.js";

function init() {
    (async () => {
        let resp = await fetch('http://127.0.0.1:5500/ChartingLib/RMJ/data/chart-data.json');
        let data = await resp.json();
        drawChart('chart-region', data);
    })();

    (async () => {
        let resp = await fetch('http://127.0.0.1:5500/ChartingLib/RMJ/data/chart-data2.json');
        let data = await resp.json();
        drawChart('another-chart', data, {
            color: 'green',
            title: 'The other chart'            
        });
    })();
}

init();