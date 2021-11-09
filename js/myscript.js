


function fillPolygon(points, color) {
    if (points.length > 0) {
        ctx.fillStyle = color; // all css colors are accepted by this property
      	var point = points[0];
        ctx.beginPath();
        ctx.moveTo(point.x, point.y);   // point 1
        for (var i = 1; i < points.length; ++i) {
            point = points[i];
            ctx.lineTo(point.x, point.y);
        }
        ctx.closePath();      // go back to point 1
        ctx.fill();
    }
}




function myFunction(Section){
    switch(Section){
        case 1:
            /**alert("The input value has changed.");*/
            var in1 = document.getElementById("Sec1dim1").value;
            var out1 = in1;
            document.getElementById("Output1").value = "result is " + out1;
            break;
        default:
            alert("Nothing has changed.");
    }
}

var xc = 50;
var y0 = 100-5;
var h = 70;
var b = 50;
var t = 5;
var points = [ 
    {x: xc-b/2, y: y0-h},
    {x: xc-b/2, y: y0},
    {x: xc+b/2, y: y0},
    {x: xc+b/2, y: y0-t},
    {x: xc-b/2+t, y: y0-t},
    {x: xc-b/2+t, y: y0-h}
];

var canvas = document.getElementById("myCanvas1");
var ctx = canvas.getContext("2d");
ctx.beginPath();
ctx.arc(50, 50, 40, 0, 2 * Math.PI, false);
ctx.fillStyle = 'green';
ctx.fill();
ctx.lineWidth = 3;
ctx.strokeStyle = '#003300';
ctx.stroke();


fillPolygon(points, 'green');
ctx.lineWidth = 3;
ctx.strokeStyle = '#003300';
ctx.stroke();