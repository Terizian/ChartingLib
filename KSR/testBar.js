import {
    drawChart
} from "./bar.js";

function init() {
    (async () => {
        let resp = await fetch('./data/chart-data.json');
        let data = await resp.json();
        drawChart('chart-region', data);
    })();

    // (async () => {
    //     let resp = await fetch('./data/chart-data2.json');
    //     let data = await resp.json();
    //     drawChart('another-chart', data, {
    //         color: 'green',
    //         title: 'The other chart'
    //     });
    // })();
}

init();