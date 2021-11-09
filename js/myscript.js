
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
            var h = document.getElementById("Sec1dim1").value;
            var b = document.getElementById("Sec1dim2").value;
            var t = document.getElementById("Sec1dim3").value;
			
			
			var x0 = 50-b/2;
			var y0 = 100-5;
			var points = [ 
				{x: x0   , y: y0-h},
				{x: x0   , y: y0  },
				{x: x0+b , y: y0  },
				{x: x0+b , y: y0-t},
				{x: x0+t , y: y0-t},
				{x: x0+t , y: y0-h},
				{x: x0   , y: y0-h}
			];
			
            var out1 = h;
            document.getElementById("Output1").value = "result is " + out1;
			
			
			var canvas = document.getElementById("myCanvas1");
			var ctx = canvas.getContext("2d");
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			fillPolygon(points, 'green');
			ctx.lineWidth = 3;
			ctx.strokeStyle = '#003300';
			ctx.stroke();
			
			
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

myFunction(1)