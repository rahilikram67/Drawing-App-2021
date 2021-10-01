function RulerTool() {
    //set an icon and a name for the object
    this.icon = "assets/ruler.jpg";
    this.name = "ruler";

    //to smoothly draw we'll draw a line from the previous mouse location
    //to the current mouse location. The following values store
    //the locations from the last frame. They are -1 to start with because
    //we haven't started drawing yet.
    var previousMouseX = -1;
    var previousMouseY = -1;

    var angle = 0;
    var timerotate


    document.getElementById("rotateLeft").onmousedown = function () {
        timerotate = setInterval(() => {
            document.querySelector(".ruler").style.transform = `rotate(${--angle}deg)`
        }, 10)
    }
    document.getElementById("rotateLeft").onmouseup = function () {
        clearInterval(timerotate)
    }

    document.getElementById("rotateRight").onmousedown = function () {
        timerotate = setInterval(() => {
            document.querySelector(".ruler").style.transform = `rotate(${++angle}deg)`
        }, 10)
    }
    document.getElementById("rotateRight").onmouseup = function () {
        clearInterval(timerotate)
    }



    this.ruler = (e) => {
        var focus = document.getElementById("rulersideBarItem")
        var div = document.querySelector(".ruler");

        if (focus.style.border != "2px solid blue" || div) {
            // if(focus.style.border != "2px solid blue") $(".ruler").draggable("disable")
            // else $(".ruler").draggable("enable")
            return
        };

        createDiv(e)

    }




    function createDiv(e) {
        document.getElementById("rotateLeft").hidden = false;
        document.getElementById("rotateRight").hidden = false;
        var div = document.createElement("div")
        div.className = "ruler"
        div.style.left = (e.clientX) + 'px';
        div.style.top = (e.clientY) + 'px';

        document.getElementById("canvasParent").appendChild(div);

        div.ondblclick = function () {
            this.remove();
            document.getElementById("rotateLeft").hidden = true;
            document.getElementById("rotateRight").hidden = true;
        }

        $(".ruler").draggable({ containment: "parent" });
        $(".ruler").resizable()


        div.onmousedown = function (e) {
            e.preventDefault()
            e.stopPropagation()
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