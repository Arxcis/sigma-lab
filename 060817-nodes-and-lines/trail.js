'use strict';

const key = {
    ESC:       27,
    LEFT:      37, 
    RIGHT:     39,
    UP:        38,
    DOWN:      40,
    ENTER:     13,
    BACKSPACE: 8,
}

const TRAIL_UPDATE = new Event('trail-update');

export class Trail extends HTMLElement {

    constructor() {
        super();

        //
        // PRIVATE SCOPE
        // 
        this._activeLevel = null;
        this._activeNode  = null;
        this._nodePairs   = new Array();
        
        
        this.shadow = this.attachShadow({ mode: 'open' });
        this.shadow.innerHTML = CSS;

        //  
        // Set up the first node
        //
        {
            let level = this._makeLevel();
            let node  = this._makeNode();

            this._printData();

            this._setActiveLevel(level);
            this._setActiveNode(node);

            this._printData();

            this.shadow.appendChild(level);
            this._activeLevel.appendChild(node);

            this.dispatchEvent(TRAIL_UPDATE);
        }

        //
        // ON PASTE 
        //
        this.shadow.addEventListener('paste', e => { 

            let node = this._makeNode();
            this._setActiveNode(node);
            this._activeLevel.appendChild(node);

            this.dispatchEvent(TRAIL_UPDATE);
        });


        //
        // ON KEY DOWN
        //
        this.shadow.addEventListener('keydown', e => {
            //console.log(e.keyCode);
            

            //
            // @brief MOVE up and down in the trail, switching levels.
            //
            if (e.keyCode == key.UP) {
                let prevLevel = this._activeLevel.previousElementSibling;

                if (prevLevel) {
                    this._setActiveLevel(prevLevel);
                }
            }

            else if (e.keyCode == key.DOWN) {
                let nextLevel = this._activeLevel.nextElementSibling;

                if (nextLevel) {
                    this._setActiveLevel(nextLevel);
                }
            }

            //
            // @brief Select different nodes within a level. Click ENTER to move right,
            //          click BACKSPACE to move left.
            //
            else if (e.keyCode == key.ENTER) {

                if (this._activeLevel == this._activeNode.parentElement) {

                    let nextNode = this._activeNode.nextElementSibling;
                    if (nextNode) {
                        this._setActiveNode(nextNode);
                    }
                    else {
                        this._setActiveNode(this._activeNode.firstChild);
                    }
                }  
                else {
                    this._setActiveNode(this._activeNode.firstChild);
                }
            }

            else if (e.keyCode == key.BACKSPACE) {

                if (this._activeLevel == this._activeNode.parentElement) {
                    
                    let prevNode = this._activeNode.previousElementSibling;
                    if (prevNode) {
                        this._setActiveNode(prevNode);
                    }
                    else {
                        this._setActiveNode(this._activeLevel.lastChild);
                    }  
                }
                else {
                    this._setActiveNode(this._activeLevel.firstChild);
                }
            }
        });
    }

    _printData() {
        console.log('active level:', this._activeLevel);
        console.log('active node:', this._activeNode);
    }

    _makeLevel() {
        let level = document.createElement('div');
        level.classList.add('level');

        level.addEventListener('click', e => {
            this._setActiveLevel(level);
        })
        return level;
    }

    _makeNode() {
        let node  = document.createElement('div');
        node.classList.add('node');

        node.addEventListener('click', e => {
            this._setActiveNode(node);
            this._setActiveLevel(node.parentElement)
        });
        return node;
    }    

    _setActiveLevel(newActiveLevel) {
        if(this._activeLevel != null)
            this._activeLevel.classList.remove('active');
        this._activeLevel = newActiveLevel;
        this._activeLevel.classList.add('active');
    }

    _setActiveNode(newActiveNode) {
        if(this._activeNode != null)
            this._activeNode.classList.remove('active');
        this._activeNode = newActiveNode;
        this._activeNode.classList.add('active');
    }
}

customElements.define('custom-trail', Trail);


let CSS = `
<style>
/*                              */
/* -------- .level         */
/*                              */
.level {
    background-color: white;
    border: 1px solid blue;
    flex: 0 0 100px;
    height: 100px;

    display: flex;
    justify-content: center;
    align-items: center;
}
.level.active {
    background-color: rgb(255, 215, 248);
}
.level:hover{
    cursor: pointer;
}

/*                             */
/* ------- .node          */
/*                             */
.node {
    border-radius: 25%;
    margin: 0px 20px 0px 20px;
    flex: 0 0 50px;
    height: 50px;
    background-color: grey;
    
    font-size: 10px;
    color: white;

    display: flex;
    justify-content: center;
    align-items: center;
}

.node:hover {
    cursor: pointer;
}
.node.active {
    background-color: #4CAF50;
}
</style>`;