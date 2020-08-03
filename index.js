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
        var self = this;
        document.addEventListener('click', function() {
            self.hideContextMenu();
        }, { once: true });
    
        var x = event.clientX;
        var y = event.clientY;
        var width = this.target.offsetWidth;
        var height = this.target.offsetHeight;
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;

        // position checker 
        if (x >= windowWidth - width) {
            x -= width;
        }

        if (y >= windowHeight - height) {
            y -= height;
        }

        this.target.style.cssText = 'left:' + x + 'px;' + 'top: ' + y + 'px;';
    }

    hideContextMenu() {
        this.target.classList.add('hidden');
        // document.removeEventListener('click', hideContextMenu); 
    }
}

var contextMenu = new ContexMenu([
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
    var contextMenuActions = ContexMenu.getActions();
    for(var i = 0, item; i < contextMenu.list.length; i++) {
        item = document.createElement('div');
        item.classList.add('item');
        item.innerHTML = contextMenu.list[i].title;
        item.addEventListener('click', contextMenuActions[contextMenu.list[i].action]);

        contextMenu.target.appendChild(item);
    }

    window.addEventListener('contextmenu', function(event) {
        contextMenu.showContextMenu(event);
    });
}

window.addEventListener('load', init);


// keyHandler(event) {
//     if (event.ctrlKey) {
//         handlerWithCtrl(event);
//     } else {
//         handlerWitoutCtrl(event);
//     }
// }