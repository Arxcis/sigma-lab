'use strict';
// @doc d3 SVG Path generator function - https://www.dashingd3js.com/svg-paths-and-d3js

const svgNamespace = 'http://www.w3.org/2000/svg';

window.addEventListener('load', () => {
    //The data for our line
    let lineData = [ { "x": 1,   "y": 5},  { "x": 20,  "y": 20},
                     { "x": 40,  "y": 10}, { "x": 60,  "y": 40},
                     { "x": 80,  "y": 5},  { "x": 100, "y": 60}];

    // Get bounding rect
    let squareRect = document.querySelector('.square-in-the-middle').getBoundingClientRect();

    let path = d3.path();
    let pathQB = d3.path();

    let startx = squareRect.x + squareRect.width/2;
    let starty = squareRect.y + squareRect.height;

    // Creating a normal line from point to point
    path.moveTo(startx, starty);
    lineData.forEach(data => {
        path.lineTo(startx + data.x, starty + data.y);
    });

    // Creating a quadratic bezier curved line
    pathQB.moveTo(startx, starty);
    pathQB.bezierCurveTo(startx, starty+100, startx+100, starty, startx+100, starty+100);

    // The SVG Container
    let svgContainer = document.createElementNS(svgNamespace, 'svg');
    svgContainer.style.position = 'absolute';
    svgContainer.style.top  = '0px';
    svgContainer.style.left = '0px';

    svgContainer.setAttribute('width', 1000);
    svgContainer.setAttribute('height', 1000);
    document.body.appendChild(svgContainer);


    //The line SVG Path we draw
    let svgPath = document.createElementNS(svgNamespace, 'path'); 
    svgPath.setAttribute('d', path.toString());
    svgPath.setAttribute('stroke', 'blue');
    svgPath.setAttribute('stroke-width', 2);   
    svgPath.setAttribute('fill', 'none');   

    let svgPathQB = document.createElementNS(svgNamespace, 'path'); 
    svgPathQB.setAttribute('d', pathQB.toString());
    svgPathQB.setAttribute('stroke', 'red');
    svgPathQB.setAttribute('stroke-width', 2);   
    svgPathQB.setAttribute('fill', 'none'); 

    svgContainer.appendChild(svgPath);
    svgContainer.appendChild(svgPathQB);

});

