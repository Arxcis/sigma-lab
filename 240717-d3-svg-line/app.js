'use strict';
// @doc d3 SVG Path generator function - https://www.dashingd3js.com/svg-paths-and-d3js

const svgNamespace = 'http://www.w3.org/2000/svg';

window.addEventListener('load', () => {
    //The data for our line
    let lineData = [ { "x": 1,   "y": 5},  { "x": 20,  "y": 20},
                     { "x": 40,  "y": 10}, { "x": 60,  "y": 40},
                     { "x": 80,  "y": 5},  { "x": 100, "y": 60}];

    //This is the accessor function we talked about above
    let path = d3.path();

    let startx = 50;
    let starty = 50;
    path.moveTo(startx, starty);

    lineData.forEach(data => {
        path.lineTo(startx + data.x, starty + data.y);
    });

    //The SVG Container
    let body         = document.querySelector('body');
    let svgContainer = document.createElementNS(svgNamespace, 'svg');
    svgContainer.setAttribute('width', 200);
    svgContainer.setAttribute('height', 200);
    body.appendChild(svgContainer);


    //The line SVG Path we draw

    let svgPath = document.createElementNS(svgNamespace, 'path'); 
    svgPath.setAttribute('d', path.toString());
    svgPath.setAttribute('stroke', 'blue');
    svgPath.setAttribute('strok-width', 2);   
    svgPath.setAttribute('fill', 'none');   
    svgContainer.appendChild(svgPath);
});

