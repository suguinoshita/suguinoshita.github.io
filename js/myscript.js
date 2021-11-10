function handleInput(e){
  var value = this.valueAsNumber;
  console.log("type: %s, value: %o", typeof value, value);  
}

function fillPolygon(points, color,lineColor,mycanvas) {
	
    if (points.length > 0) {
		var canvas = document.getElementById(mycanvas);
		var ctx = canvas.getContext("2d");
		
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
				
		ctx.lineWidth = 3;
		ctx.strokeStyle = lineColor;
		ctx.stroke();
    }
}


function myFunction(Section){
	
    switch(Section){
        case 1:		
			var myForm = document.querySelector('#Form1');
            break;
        case 2:		
			var myForm = document.querySelector('#Form2');
            break;
        default:
            alert("Nothing has changed.");
    }
	
	
	/*alert("The input value has changed."+myForm.tagName);*/
	var h = parseFloat(myForm.querySelectorAll('input[name="dim1"]')[0].value);
	var b = parseFloat(myForm.querySelectorAll('input[name="dim2"]')[0].value);
	var t = parseFloat(myForm.querySelectorAll('input[name="dim3"]')[0].value);
	var t2 = parseFloat(myForm.querySelectorAll('input[name="dim4"]')[0].value);
	var mycanvas = myForm.querySelectorAll('canvas[name="myCanvas"]')[0].id;
	/*alert("The input value has changed."+mycanvas);*/
	var out1 = h;
	document.getElementById("Output1").value = "result is " + out1;
	
	var canvas = document.getElementById(mycanvas);
	var ctx = canvas.getContext("2d");
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	var x0 = canvas.width/2-b/2;
	var y0 = canvas.height-5;
	var points = [ 
		{x: x0   , y: y0-h},
		{x: x0   , y: y0  },
		{x: x0+b , y: y0  },
		{x: x0+b , y: y0-t},
		{x: x0+t , y: y0-t},
		{x: x0+t , y: y0-h},
		{x: x0   , y: y0-h}
		];
	
	fillPolygon(points, 'green','#003300',mycanvas);	
}


function myFunction2(elem){
	/*alert("function2.."+elem.tagName+elem.value);*/
	var myForm = elem.closest('div[name="myForm"]');
	myFunction3(myForm);	
}


function myFunction3(myForm){
	
	/*alert("function3."+myForm.tagName);*/
	/*alert("The input value has changed."+myForm.tagName);*/
	var section = myForm.querySelectorAll('select[name="sectionSelector"]')[0].value;
	var h = parseFloat(myForm.querySelectorAll('input[name="dim1"]')[0].value);
	var b = parseFloat(myForm.querySelectorAll('input[name="dim2"]')[0].value);
	var t = parseFloat(myForm.querySelectorAll('input[name="dim3"]')[0].value);
	var t2 = parseFloat(myForm.querySelectorAll('input[name="dim4"]')[0].value);
	var dims = [h,b,t,t2];
	var mycanvas = myForm.querySelectorAll('canvas[name="myCanvas"]')[0].id;
	//alert(section+h+b+t+t2+mycanvas);
	
	var results = calc_properties(section,dims);
	myForm.querySelectorAll('input[name="area"]')[0].value = results.A;
	myForm.querySelectorAll('input[name="perimeter"]')[0].value = results.perimeter;
	myForm.querySelectorAll('input[name="xc"]')[0].value = results.xc;
	myForm.querySelectorAll('input[name="yc"]')[0].value = results.yc;
	myForm.querySelectorAll('input[name="Ixx"]')[0].value = results.Ixx;
	myForm.querySelectorAll('input[name="Iyy"]')[0].value = results.Iyy;
	myForm.querySelectorAll('input[name="Izz"]')[0].value = results.Izz;
	myForm.querySelectorAll('input[name="Sx_min"]')[0].value = results.Sx_min;
	myForm.querySelectorAll('input[name="Sy_min"]')[0].value = results.Sy_min;
	
	var canvas = document.getElementById(mycanvas);
	var ctx = canvas.getContext("2d");
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	//var scale = getScale();	
	//var points = calc_points(section,dims,canvas.width,canvas.height,bottom_margin,scale);
	//fillPolygon(points, 'green','#003300',mycanvas);	
	updatePictures()
}

function updatePictures(){
	var scale = getScale();
	var formList = document.getElementsByName('myForm');
	for (const fm of formList) {
		var section = fm.querySelectorAll('select[name="sectionSelector"]')[0].value;
		var h = parseFloat(fm.querySelectorAll('input[name="dim1"]')[0].value);
		var b = parseFloat(fm.querySelectorAll('input[name="dim2"]')[0].value);
		var t = parseFloat(fm.querySelectorAll('input[name="dim3"]')[0].value);
		var t2 = parseFloat(fm.querySelectorAll('input[name="dim4"]')[0].value);
		var dims = [h,b,t,t2];
		var mycanvas = fm.querySelectorAll('canvas[name="myCanvas"]')[0].id;
		var canvas = document.getElementById(mycanvas);
		var ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		//alert('drawing on '+mycanvas);
		var points = calc_points(section,dims,canvas.width,canvas.height,bottom_margin,scale);
		fillPolygon(points, 'green','#003300',mycanvas);	
	}	
}

function getScale() {
	var scale = 1;
	//alert('scale='+scale);
	var formList = document.getElementsByName('myForm');
	for (const fm of formList) {
		var section = fm.querySelectorAll('select[name="sectionSelector"]')[0].value;
		if (section == 'Circular' || section == 'Circular tube') {
			var d1 = parseFloat(fm.querySelectorAll('input[name="dim1"]')[0].value);
			var dims = [d1,d1];
		} else {
			var d1 = parseFloat(fm.querySelectorAll('input[name="dim1"]')[0].value);
			var d2 = parseFloat(fm.querySelectorAll('input[name="dim2"]')[0].value);
			var dims = [d1,d2];
		}
		var mycanvas = fm.querySelectorAll('canvas[name="myCanvas"]')[0].id;
		var canvas = document.getElementById(mycanvas);
		var ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		
		//alert('scale1='+scale);
		for (var d of dims) {
			if (d > canvas.width &&  canvas.width/d < scale) {
				scale = canvas.width/d;
			}
			if (d > (canvas.height-bottom_margin) &&  (canvas.height-bottom_margin)/d < scale) {
				scale = (canvas.height-bottom_margin)/d;
			}
		}
		//alert('scale2='+scale);
		if (scale == 1) {
			var temp = Math.max(dims[0],dims[1]);
			if (temp < canvas.width &&  temp < (canvas.height-bottom_margin)) {
					scale = Math.min(canvas.width,(canvas.height-bottom_margin))/temp;
				
			}
		}
		//alert('scale3='+scale);
		
	}
	return scale;
}


function calc_properties(section,dims){
	//alert('calc='+section+dims[0]);
	var res = {
		A: 0,
		perimeter: 0,
		xc: 0,
		yc: 0,
		Ixx: 0,
		Iyy: 0,
		Izz: 0,
		Sx_min: 0,
		Sy_min: 0,
	};
	
	switch(section) {
		case 'Circular':
			var d = dims[0];
			var r = d/2;
			res.A = Math.PI*d*d/4;
			res.perimeter = Math.PI*d;
			res.xc = d/2;
			res.yc = d/2;
			res.Ixx = Math.PI*d*d*d*d/64;
			res.Iyy = Math.PI*d*d*d*d/64;
			res.Izz = res.Ixx + res.Iyy;
			res.Sx_min = Math.PI*r*r*r/4;
			res.Sy_min = Math.PI*r*r*r/4;
			break;
		case 'Circular tube':
			var d = dims[0];
			var t = dims[1];
			var r = d/2;
			var ri = r-t;
			res.A = Math.PI*(r*r-ri*ri);
			res.perimeter = Math.PI*d;
			res.xc = d/2;
			res.yc = d/2;
			res.Ixx = Math.PI*(r*r*r*r - ri*ri*ri*ri)/4;
			res.Iyy = Math.PI*(r*r*r*r - ri*ri*ri*ri)/4;
			res.Izz = res.Ixx + res.Iyy;
			res.Sx_min = Math.PI*(r*r*r*r - ri*ri*ri*ri)/(4*r);
			res.Sy_min = Math.PI*(r*r*r*r - ri*ri*ri*ri)/(4*r);
			break;
		case 'Rectangular':
			var h = dims[0];
			var b = dims[1];
			res.A = h*b;
			res.perimeter = 2*(h+b);
			res.xc = b/2;
			res.yc = h/2;
			res.Ixx = b*h*h*h/12;
			res.Iyy = h*b*b*b/12;
			res.Izz = res.Ixx + res.Iyy;
			res.Sx_min = b*h*h/6;
			res.Sy_min = h*b*b/6;
			break;
		case 'Rectangular tube':
			var h = dims[0];
			var b = dims[1];
			var t = dims[2];
			var hi = h - 2*t;
			var bi = b - 2*t;
			res.A = h*b - hi*bi;
			res.perimeter = 2*(h+b);
			res.xc = b/2;
			res.yc = h/2;
			res.Ixx = b*h*h*h/12 - bi*hi*hi*hi/12;
			res.Iyy = h*b*b*b/12 - hi*bi*bi*bi/12;
			res.Izz = res.Ixx + res.Iyy;
			res.Sx_min = res.Ixx*2/h;
			res.Sy_min = res.Iyy*2/b;
			break;
		case 'L section':
			var h = dims[0];
			var b = dims[1];
			var t = dims[2];
			res.A = (h+b-t)*t;
			res.perimeter = 2*h+2*b;
			res.xc = (t/2*(b*b + h*t - t*t))/(res.A);
			res.yc = (t/2*(h*h + b*t - t*t))/(res.A);
			var Ix0 = t/3*(b*t*t + h*h*h - t*t*t);
			var Iy0 = t/3*(h*t*t + b*b*b - t*t*t);
			res.Ixx = Ix0 - res.A*res.yc*res.yc;
			res.Iyy = Iy0 - res.A*res.xc*res.xc;
			res.Izz = res.Ixx + res.Iyy;
			res.Sx_min = res.Ixx/(h-res.yc);
			res.Sy_min = res.Iyy/(b-res.xc);
			break;
		case 'C channel':
			var h = dims[0];
			var b = dims[1];
			var tw = dims[2];
			var tf = dims[3];
			res.A = 2*b*tf + (h-2*tf)*tw;
			res.perimeter = 4*b+2*h-2*tw;
			res.xc = ((h-2*tf)*tw*tw/2+tf*b*b)/(res.A);
			res.yc = b/2;
			res.Ixx = (b-tw)*Math.pow((h-2*tf),3)/12;
			var Iy0 = (h-2*tf)*tw*tw*tw/3 + 2*tf*b*b*b/3;
			res.Iyy = Iy0 - res.A*res.xc*res.xc;
			res.Izz = res.Ixx + res.Iyy;
			res.Sx_min = res.Ixx/(h-res.yc);
			res.Sy_min = res.Iyy/(b-res.xc);
			break;
		case 'U channel':
			var h = dims[0];
			var b = dims[1];
			var tw = dims[2];
			var tf = dims[3];
			res.A = 2*b*tf + (h-2*tf)*tw;
			res.perimeter = 4*b+2*h-2*tw;
			res.xc = b/2;
			res.yc = ((h-2*tf)*tw*tw/2+tf*b*b)/(res.A);
			res.Iyy = (b-tw)*Math.pow((h-2*tf),3)/12;
			var Ix0 = (h-2*tf)*tw*tw*tw/3 + 2*tf*b*b*b/3;
			res.Ixx = Ix0 - res.A*res.yc*res.yc;
			res.Izz = res.Ixx + res.Iyy;
			res.Sx_min = res.Ixx/(b-res.yc);
			res.Sy_min = res.Iyy/(h-res.xc);
			break;
		case 'I section':
			var h = dims[0];
			var b = dims[1];
			var tw = dims[2];
			var tf = dims[3];
			res.A = 2*b*tf + (h-2*tf)*tw;
			res.perimeter = 4*b+2*h-2*tw;
			res.xc = b/2;
			res.yc = h/2;
			res.Ixx = b*h*h*h/12 - (b-tw)*Math.pow((h-2*tf),3)/12;
			var hw = h - 2*tf;
			res.Iyy = tf*b*b*b/6 + hw*tw*tw*tw/12;
			res.Izz = res.Ixx + res.Iyy;
			res.Sx_min = res.Ixx/(h-res.yc);
			res.Sy_min = res.Iyy/(b-res.xc);
			break;
		case 'H section':
			var h = dims[0];
			var b = dims[1];
			var tw = dims[2];
			var tf = dims[3];
			res.A = 2*b*tf + (h-2*tf)*tw;
			res.perimeter = 4*b+2*h-2*tw;
			res.xc = b/2;
			res.yc = h/2;
			var bw = b - 2*tf;
			res.Ixx = tf*h*h*h/6 + bw*tw*tw*tw/12;
			res.Iyy = h*b*b*b/12 - (h-tw)*Math.pow((b-2*tf),3)/12;
			res.Izz = res.Ixx + res.Iyy;
			res.Sx_min = res.Ixx/(h-res.yc);
			res.Sy_min = res.Iyy/(b-res.xc);
			break;
		default:
			res = res;
			
	}
	
	return res;
}

function calc_points(section,dims,canvas_width,canvas_height,bottom_margin,scale){

	switch(section) {
		case 'Circular':
			break;
		case 'Circular tube':
			break;
		case 'Rectangular':
			var h = dims[0]*scale;
			var b = dims[1]*scale;
			var x0 = canvas_width/2-b/2;
			var y0 = canvas_height-bottom_margin;
			var points = [ 
				{x: x0   , y: y0-h},
				{x: x0   , y: y0  },
				{x: x0+b , y: y0  },
				{x: x0+b , y: y0-h}
				];		
			break;
		case 'Rectangular tube':
			break;
		case 'L section':
			var h = dims[0]*scale;
			var b = dims[1]*scale;
			var t = dims[2]*scale;
			var x0 = canvas_width/2-b/2;
			var y0 = canvas_height-bottom_margin;
			var points = [ 
				{x: x0   , y: y0-h},
				{x: x0   , y: y0  },
				{x: x0+b , y: y0  },
				{x: x0+b , y: y0-t},
				{x: x0+t , y: y0-t},
				{x: x0+t , y: y0-h},
				{x: x0   , y: y0-h}
				];
			break;
		case 'C channel':
			var h = dims[0]*scale;
			var b = dims[1]*scale;
			var tw = dims[2]*scale;
			var tf = dims[3]*scale;
			var x0 = canvas_width/2-b/2;
			var y0 = canvas_height-bottom_margin;
			var points = [ 
				{x: x0   , y: y0-h},
				{x: x0   , y: y0  },
				{x: x0+b , y: y0  },
				{x: x0+b , y: y0-tf},
				{x: x0+tw , y: y0-tf},
				{x: x0+tw , y: y0-h+tf},
				{x: x0+b , y: y0-h+tf},
				{x: x0+b , y: y0-h}
				];
			break;
		case 'U channel':
			var h = dims[0]*scale;
			var b = dims[1]*scale;
			var tw = dims[2]*scale;
			var tf = dims[3]*scale;
			var x0 = canvas_width/2-h/2;
			var y0 = canvas_height-bottom_margin;
			var points = [ 
				{x: x0      , y: y0-b },
				{x: x0      , y: y0   },
				{x: x0+h    , y: y0   },
				{x: x0+h    , y: y0-b },
				{x: x0+h-tf , y: y0-b },
				{x: x0+h-tf , y: y0-tw},
				{x: x0+tf   , y: y0-tw},
				{x: x0+tf   , y: y0-b }
				];
			break;
		case 'I section':
			var h = dims[0]*scale;
			var b = dims[1]*scale;
			var tw = dims[2]*scale;
			var tf = dims[3]*scale;
			var x0 = canvas_width/2-b/2;
			var y0 = canvas_height-bottom_margin;
			var points = [ 
				{x: x0          , y: y0-h },
				{x: x0          , y: y0-h+tf },
				{x: x0+b/2-tw/2 , y: y0-h+tf },
				{x: x0+b/2-tw/2 , y: y0-tf },
				{x: x0          , y: y0-tf },
				{x: x0          , y: y0 },
				{x: x0+b        , y: y0 },
				{x: x0+b        , y: y0-tf },
				{x: x0+b/2+tw/2 , y: y0-tf },
				{x: x0+b/2+tw/2 , y: y0-h+tf },
				{x: x0+b        , y: y0-h+tf },
				{x: x0+b        , y: y0-h }
				];
			break;
		case 'H section':
			var h = dims[0]*scale;
			var b = dims[1]*scale;
			var tw = dims[2]*scale;
			var tf = dims[3]*scale;
			var x0 = canvas_width/2-b/2;
			var y0 = canvas_height-bottom_margin;
			var points = [ 
				{x: x0      , y: y0-h },
				{x: x0      , y: y0 },
				{x: x0+tf   , y: y0 },
				{x: x0+tf   , y: y0-h/2+tw/2 },
				{x: x0+b-tf , y: y0-h/2+tw/2 },
				{x: x0+b-tf , y: y0 },
				{x: x0+b    , y: y0 },
				{x: x0+b    , y: y0-h },
				{x: x0+b-tf , y: y0-h },
				{x: x0+b-tf , y: y0-h/2-tw/2 },
				{x: x0+tf , y: y0-h/2-tw/2 },
				{x: x0+tf , y: y0-h }
				];
			break;
		default:
			var points = [ 
				{x: 0   , y: 0}
				];
			
	}
	
	return points;
}



//alert("loading1.");
const bottom_margin = 5;
var options =
[
  {
    "text"  : "None",
    "value" : "None",
    "selected" : true
  },
  {
    "text"  : "Circular",
    "value" : "Circular"
  },
  {
    "text"     : "Circular tube",
    "value"    : "Circular tube"
  },
  {
    "text"  : "Rectangular",
    "value" : "Rectangular"
  },
  {
    "text"     : "Rectangular tube",
    "value"    : "Rectangular tube"
  },
  {
    "text"  : "L section",
    "value" : "L section"
  },
  {
    "text"  : "C channel",
    "value" : "C channel"
  },
  {
    "text"  : "U channel",
    "value" : "U channel"
  },
  {
    "text"  : "I section",
    "value" : "I section"
  },
  {
    "text"  : "H section",
    "value" : "H section"
  }
];

var selectBoxList = document.getElementsByName('sectionSelector');

for (const selectBox of selectBoxList) {
	for(var i = 0, l = options.length; i < l; i++){
		var option = options[i];
		selectBox.options.add( new Option(option.text, option.value, option.selected) );
	}
}

var myForm = document.querySelector('#Form1');
var section = myForm.querySelectorAll('select[name="sectionSelector"]')[0];
section.value = "L section";
var myForm = document.querySelector('#Form2');
var section = myForm.querySelectorAll('select[name="sectionSelector"]')[0];
section.value = "L section";

var formList = document.getElementsByName('myForm');
for (const fm of formList) {
	myFunction3(fm);
}
/*
myFunction(1);
myFunction(2);
*/