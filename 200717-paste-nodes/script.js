'use strict';

const key = {
    ESC:   8,
    LEFT: 37, 
    RIGHT:39,
    UP:   38,
    DOWN: 40,
}

let app = {
    container    : {},
    activeNode   : {},
    activeLevel  : {},
    activeColumn : 0,
    activeRow    : 0,
    maxColumn    : 0,
    maxRow       : 0,
}

document.addEventListener('DOMContentLoaded', (e) => {
    // Init app
    app.container   = document.body;
    app.activeNode  = document.getElementById('start-node');
    app.activeLevel = document.getElementById('level0');

    // Add event listeneres
    document.addEventListener('keyup', (e) => {

        const code = e.keyCode;
        let   navigated = false;

        // Update navigation state
        if (code === key.LEFT) {
            app.activeColumn = clamp(app.activeColumn - 1, 0, maxColumn(app));

            navigated = true;
        }

        else if (code === key.RIGHT) {
            app.activeColumn = clamp(app.activeColumn + 1, 0, maxColumn(app));
            navigated = true;
        }

        else if (code === key.UP) {
            app.activeRow = clamp(app.activeRow - 1, 0, maxRow(app));
            app.activeLevel = app.container.children[app.activeRow];
            app.activeColumn = clamp(app.activeColumn, 0, maxColumn(app));

            navigated = true;
        }

        else if (code === key.DOWN) {
            app.activeRow   = clamp(app.activeRow + 1, 0, maxRow(app));
            app.activeLevel = app.container.children[app.activeRow];
            app.activeColumn = clamp(app.activeColumn, 0, maxColumn(app));

            navigated = true;
        }

        // Toggle selected node
        if (navigated) {            
            app.activeNode.classList.remove('selected');
            app.activeNode = app.activeLevel.children[app.activeColumn];
            app.activeNode.classList.add('selected');
        }
        printAppData(app);
    });

    document.addEventListener('paste', (e) => {
        //console.log(e.clipboard  Data.getData('text/plain'));
        app.activeRow += 1;

        if (app.activeRow > maxRow(app)) {
        
            app.activeNode.classList.remove('selected');
            app.activeNode = getNewNode(app.activeRow, app.activeColumn);


            app.activeLevel = getNewLevel(app.activeRow);
            app.activeLevel.appendChild(app.activeNode);
            app.container.appendChild(app.activeLevel);
            app.activeColumn = 0;
        }
        else {
            app.activeNode.classList.remove('selected');
            app.activeNode = getNewNode(app.activeRow, app.activeColumn);

            app.activeLevel = app.container.children[app.activeRow];

            app.activeColumn = clamp(app.activeColumn, 0, maxColumn(app));
            app.activeLevel.insertBefore(app.activeNode, app.activeLevel.children[app.activeColumn].nextSibling);
        }

        app.activeRow = clamp(app.activeRow, 0, maxRow(app));
    });


});


function getNewLevel(rowid) {
    let level = document.createElement('div');
    level.classList.add('level');
    level.id = `level${rowid}`;

    return level;
}

function getNewNode(rowid, colid){
    let node  = document.createElement('div');
    node.classList.add('node', 'selected');
    node.id = `node${rowid}_${colid}`;

    node.onclick = (e) => {
        app.activeNode.classList.remove('selected');
        app.activeNode = e.target;
        app.activeNode.classList.add('selected');
    }
    return node;
}

function maxRow(app) {
    return app.container.children.length - 1;
}

function maxColumn (app) {
    return app.activeLevel.children.length - 1;
}

function clamp(value, min, max) {
    if (value < min)      return min;
    else if (value > max) return max;
    else                  return value;
}

function printAppData(app){
    console.log('----- APP DATA ------');
    console.log('activeColumn', app.activeColumn);
    console.log('activeRow',    app.activeRow);
    console.log('maxColumn',    maxColumn(app));
    console.log('maxRow',       maxRow(app));
    console.log('container children',  app.container.children.length);
    console.log('level chilrdren ', app.activeLevel.children.length);
    console.log('activeLevel', app.activeLevel.id);
}
