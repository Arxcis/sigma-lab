'use strict';

const dummy = document.createElement('div');
dummy.style.display = 'none';

function makeTrail() {
    return {
        container: document.querySelector('main'),
        activeLevel: dummy,
        activeNode: dummy,
    }    
}

function setActiveLevel(trail, newActiveLevel) {
    trail.activeLevel.classList.remove('selected');
    trail.activeLevel = newActiveLevel;
    trail.activeLevel.classList.add('selected');
}

function setActiveNode(trail, newActiveNode) {
    trail.activeNode.classList.remove('selected');
    trail.activeNode = newActiveNode || dummy;
    trail.activeNode.classList.add('selected');
}

function makeLevel(trail) {
    let level = document.createElement('div');
    level.classList.add('level');

    level.addEventListener('click', e => {
        setActiveLevel(trail, level);
    })

    return level;
}

function makeNode(trail){
    let node  = document.createElement('div');
    node.classList.add('node');

    node.addEventListener('click', e => {
        setActiveNode(trail, node);
    });
    return node;
}