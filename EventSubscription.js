

window.onload = () => {
    var canvas = document.getElementById('defaultCanvas0')
    var obj
    canvas.onclick = function (e) {
        (new TextAreaTool()).textArea(e);
    }
    canvas.onmousedown = (e) => {
        obj = new RulerTool()
        obj.ruler(e);
    }
    canvas.onmouseup = (e) => {
        obj.ruler(e);
    }

}
