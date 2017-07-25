'use strict';

const dummy = document.createElement('div');
dummy.style.display = 'none';

function makeTrail(_container) {
    let trail = {
        container: _container,
        activeLevel: dummy,
        activeNode: dummy,
        onChangeHandler: () => console.log('default...'),
    }    
    return trail;
}

function onChange(trail, handler) {
    trail.onChangeHandler = handler;
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

function appendLevel(trail, _level) {
    trail.container.appendChild(_level);
    trail.onChangeHandler.call();
}

function appendNode(trail, _node) {
    trail.activeLevel.appendChild(_node);
    trail.onChangeHandler.call();
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