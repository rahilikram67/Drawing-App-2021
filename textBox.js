function TextAreaTool() {
    //set an icon and a name for the object
    this.icon = "assets/textarea.png";
    this.name = "textarea";

    //to smoothly draw we'll draw a line from the previous mouse location
    //to the current mouse location. The following values store
    //the locations from the last frame. They are -1 to start with because
    //we haven't started drawing yet.
    var previousMouseX = -1;
    var previousMouseY = -1;


    var canvas = document.getElementById('defaultCanvas0')
    var parent = document.createElement('div');
    parent.id="canvasParent"
    canvas.parentNode.insertBefore(parent, canvas);
    canvas.parentNode.removeChild(canvas);
    parent.appendChild(canvas);
    var ctx = canvas.getContext('2d'),
        font = '14px sans-serif',
        hasInput = false;

    this.textArea = (e) => {
        var focus = document.getElementById("textareasideBarItem")
        var data = document.querySelector(".divtext")
        if (hasInput || focus.style.border != "2px solid blue" || data) return;
        addInput(e.clientX, e.clientY);
    }

    //Function to dynamically add an input box: 
    function addInput(x, y) {

        var input = document.createElement('div');
        input.contentEditable = true;
        input.style.position = 'fixed';
        input.style.left = (x) + 'px';
        input.style.top = (y) + 'px';
        input.className = "divtext"
        input.onblur = handleEnter;
        document.body.appendChild(input);
        input.focus();
        hasInput = true;
    }

    //Key handler for input box:
    function handleEnter(e) {
        setTimeout(() => {
            var val = this.innerHTML
            val = val.replace(/<\/div>|&nbsp;|<br>/g, '');
            val = val.replace(/<div>/g, '\n')
            drawText(val, parseInt(this.style.left, 10), parseInt(this.style.top, 10));
            document.body.removeChild(this);
            hasInput = false;
        }, 200)
    }

    //Draw the text onto canvas:
    function drawText(txt, x, y) {
        ctx.textBaseline = 'top';
        ctx.textAlign = 'left';
        ctx.font = font;
        txt = txt.split('\n')
        for (var i = 0; i < txt.length; i++) {
            ctx.fillText(txt[i], x - 62, y - 25 + (i * 20));
        }

    }


    this.draw = function () {
        //if the mouse is pressed
        if (mouseIsPressed) {
            //check if they previousX and Y are -1. set them to the current
            //mouse X and Y if they are.
            if (previousMouseX == -1) {
                previousMouseX = mouseX;
                previousMouseY = mouseY;

            }
            //if we already have values for previousX and Y we can draw a line from 
            //there to the current mouse location
            else {

                previousMouseX = mouseX;
                previousMouseY = mouseY;
            }
        }
        //if the user has released the mouse we want to set the previousMouse values 
        //back to -1.
        //try and comment out these lines and see what happens!
        else {
            previousMouseX = -1;
            previousMouseY = -1;
        }
    };
}