class ContexMenu {
    constructor(listItem, target) {
        this.list = listItem;
        this.target = target;
    }

    setTarget(target){
        this.target = target;
    }

    static getActions() {
        return {
            a1handler() {
                console.log('a1handler');
            },
            a2handler() {
                console.log('a2handler');
            },
            a3handler() {
                console.log('a3handler');
            }
        };
    }

    showContextMenu(event) {
        event.preventDefault();
        this.target.classList.remove('hidden');
        const self = this;
        document.addEventListener('click', () => self.hideContextMenu() , { once: true });
    
            let {clientX, clientY} = event;

            
    const   {offsetWidth, offsetHeight} = this.target,
            {innerWidth, innerHeight} = window;

        // position checker 
        if (clientX >= innerWidth - offsetWidth) {
            clientX -= offsetWidth;
        }
        if (clientY >= innerHeight - offsetHeight) {
            clientY -= offsetHeight;
        }
        this.target.style.cssText = 'left:' + clientX + 'px;' + 'top: ' + clientY + 'px;';
    }

    hideContextMenu() {
        this.target.classList.add('hidden');
    }
}

let contextMenu = new ContexMenu([
    {
        title: 'Title 1',
        action: 'a1handler'
    },
    {
        title: 'Title 2',
        action: 'a2handler'
    },
    {
        title: 'Title 3',
        action: 'a3handler'
    },
    {
        title: 'Cut'       
    }
]);

function init() {
    contextMenu.setTarget(document.querySelector('.context-menu'));
    const contextMenuActions = ContexMenu.getActions();
    for(let i = 0, item; i < contextMenu.list.length; i++) {
        item = document.createElement('div');
        item.classList.add('item');
        item.innerHTML = contextMenu.list[i].title;
        item.addEventListener('click', contextMenuActions[contextMenu.list[i].action]);

        contextMenu.target.appendChild(item);
    }

    window.addEventListener('contextmenu', event => contextMenu.showContextMenu(event));
}

window.addEventListener('load', init);