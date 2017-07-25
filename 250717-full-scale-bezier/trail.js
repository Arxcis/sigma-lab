'use strict';


function makeTrail() {
    return {
        container: document.querySelector('main'),
        activeLevel: document.body,
        activeNode: document.body,
    }    
}

function setActiveLevel(trail, newActiveLevel) {
    trail.activeLevel.classList.remove('selected');
    trail.activeLevel = newActiveLevel;
    trail.activeLevel.classList.add('selected');
}

function makeLevel(trail) {
    let level = document.createElement('div');
    level.classList.add('level', 'selected');

    trail.container.appendChild(level);
    trail.activeLevel.classList.remove('selected');
    trail.activeLevel = level;

    return level;
}

function makeNode(trail){
    let node  = document.createElement('div');
    node.classList.add('node', 'selected');

    node.addEventListener('click', (e) => {
        console.log('hello');
        trail.activeNode.classList.remove('selected');
        trail.activeNode = node;
        trail.activeNode.classList.add('selected');

        trail.activeLevel.classList.remove('selected');
        trail.activeLevel = trail.activeNode.parentElement;
        trail.activeLevel.classList.add('selected');
    });

    trail.activeLevel.appendChild(node);
    trail.activeNode.classList.remove('selected');
    trail.activeNode = node;

    return node;
}