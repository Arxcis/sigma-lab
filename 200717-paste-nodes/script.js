    const key = {
        ESC:   8,
        LEFT: 37, 
        RIGHT:39,
        UP:   38,
        DOWN: 40,
    }

    let app = {
        activeNode   : {},
        activeColumn : 0,
        activeRow    : 0,
        maxColumn    : 0,
        maxRow       : 0,
    }

    document.addEventListener('DOMContentLoaded', (e) => {
        app.activeNode = document.getElementById('start-node');
        console.log(app.activeNode);
    });

    document.addEventListener('paste', (e) => {
        //console.log(e.clipboardData.getData('text/plain'));
        app.activeRow = clamp(app.activeRow + 1, 0, app.maxRow);

        if (app.activeRow == app.maxRow) {
            let newLevel = document.createElement('div');
            let newNode  = document.createElement('div');

            newLevel.classList.add('level');
            app.maxRow = document.body.children.length-1;

            newNode.classList.add('node', 'selected');

            app.activeNode.classList.remove('selected');
            app.activeNode = newNode;
            newLevel.appendChild(newNode);
            document.body.appendChild(newLevel);
        }
    });

    document.addEventListener('keyup', (e) => {

        const code = e.keyCode;

        if (code === key.ESC) {
            document.body.removeChild(document.body.lastChild);
            app.activeColumn = clamp(app.activeColumn - 1, 0, app.maxColumn);
            app.maxRow       = document.body.children.length - 1; 
        }

        else if (code === key.LEFT) {
            app.activeColumn = clamp(app.activeColumn - 1, 0, app.maxColumn);
        }

        else if (code === key.RIGHT) {
            app.activeColumn = clamp(app.activeColumn + 1, 0, app.maxColumn);
        }

        else if (code === key.UP) {
            app.activeRow = clamp(app.activeRow - 1, 0, app.maxRow);
        }

        else if (code === key.DOWN) {
            app.activeRow = clamp(app.activeRow + 1, 0, app.maxRow);
        }
        render();
    });


    function render() {
        printAppData(app);


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
        console.log('maxColumn', app.maxColumn);
        console.log('maxRow', app.maxRow);
        console.log('no children',  document.body.children.length);
    }
