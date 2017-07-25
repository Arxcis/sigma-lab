'use strict';

const svgNamespace = 'http://www.w3.org/2000/svg';


function makeSvgContainer()
{
    let svg = document.createElementNS(svgNamespace, 'svg');
    svg.style.position = 'absolute';
    svg.style.zIndex = '-1';

    return svg;    
}

function snapBoundingRect(svg, container) 
{
    let boundingRect = container.getBoundingClientRect();

    svg.style.top  = `${boundingRect.top}px`;
    svg.style.left = `${boundingRect.left}px`;

    svg.setAttribute('width',  boundingRect.width);
    svg.setAttribute('height', boundingRect.height);


    //console.log(svg.style.top, svg.style.left, svg.getAttribute('width'), svg.getAttribute('height'))
}

function updateLines(svg, nodePairs) {
    
}
