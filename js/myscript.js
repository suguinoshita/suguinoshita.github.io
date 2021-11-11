function handleInput(e){
  var value = this.valueAsNumber;
  console.log("type: %s, value: %o", typeof value, value);  
}

function setTwoNumberDecimal(event) {
    this.value = parseFloat(this.value).toFixed(2);
}

function fillPolygon(data, color,lineColor,mycanvas) {
	//alert(mycanvas+'data='+data.length);
	if (data.length == 2) {
		var points = data[0];
	} else if (data.length > 2) {
		var points = data;
	} else  {
		return
	}
	
	//alert(mycanvas+'points='+points.length);
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
	
	if (data.length == 2) {
		points = data[1];
		//alert(mycanvas+'points='+points.length);
		if (points.length > 0) {
			var canvas = document.getElementById(mycanvas);
			var ctx = canvas.getContext("2d");
			
			ctx.fillStyle = "white"; // all css colors are accepted by this property
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
	//alert(mycanvas+' updated');
}


function myFunction2(elem){
	/*alert("function2.."+elem.tagName+elem.value);*/
	var myForm = elem.closest('div[name="myForm"]');
	myFunction3(myForm);	
}


function myFunction3(myForm){
	
	//alert("function3."+myForm.tagName);
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
	myForm.querySelectorAll('input[name="area"]')[0].value = results.A.toFixed(2);
	myForm.querySelectorAll('input[name="perimeter"]')[0].value = results.perimeter.toFixed(2);
	myForm.querySelectorAll('input[name="xc"]')[0].value = results.xc.toFixed(2);
	myForm.querySelectorAll('input[name="yc"]')[0].value = results.yc.toFixed(2);
	myForm.querySelectorAll('input[name="Ixx"]')[0].value = results.Ixx.toFixed(2);
	myForm.querySelectorAll('input[name="Iyy"]')[0].value = results.Iyy.toFixed(2);
	myForm.querySelectorAll('input[name="Izz"]')[0].value = results.Izz.toFixed(2);
	myForm.querySelectorAll('input[name="Sx_min"]')[0].value = results.Sx_min.toFixed(2);
	myForm.querySelectorAll('input[name="Sy_min"]')[0].value = results.Sy_min.toFixed(2);
	
	var canvas = document.getElementById(mycanvas);
	var ctx = canvas.getContext("2d");
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	//var scale = getScale();	
	//var points = calc_points(section,dims,canvas.width,canvas.height,bottom_margin,scale);
	//fillPolygon(points, 'green','#003300',mycanvas);	
	updatePictures()
}

function updatePictures(){
	//alert('updatePictures');
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
		//alert('drawing on '+mycanvas+' done');
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

function updateForm(fm) {
	// Enables or Disables the form based on the "Section type" selection
	var section = fm.querySelectorAll('select[name="sectionSelector"]')[0].value;
	//alert('updating form ='+fm.id);
	if (section == 'None') {
		// set labels to gray
		var labelsList = fm.querySelectorAll(".forms_text");
		//alert('labels='+labelsList.length);
		for (const lbl of labelsList) {
			if ( lbl.name != "sectionSelector" ) {
				lbl.className = "forms_text_disabled";
			}
		}
		// set inputs to gray
		var inputsList = fm.querySelectorAll('input[class="email-bt"]');
		for (const inp of inputsList) {
			inp.className = "email-bt_disabled";
		}
		// disable inputs			
		var input = fm.querySelectorAll('input[name="dim1"]')[0];
		input.disabled = true;
		input = fm.querySelectorAll('input[name="dim2"]')[0];
		input.disabled = true;
		input = fm.querySelectorAll('input[name="dim3"]')[0];
		input.disabled = true;
		input = fm.querySelectorAll('input[name="dim4"]')[0];
		input.disabled = true; 
		input = fm.querySelectorAll('input[name="refSwitch"]')[0];
		input.disabled = true; 
		input.checked = false; 
		setReference(input);
		
		// clear canvas
		var mycanvas = fm.querySelectorAll('canvas[name="myCanvas"]')[0].id;
		var canvas = document.getElementById(mycanvas);
		var ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		
	} else {
		// ensure labels are black
		var labelsList = fm.querySelectorAll(".forms_text_disabled");
		for (const lbl of labelsList) {
			lbl.className = "forms_text";
		}
		// set inputs to black
		var inputsList = fm.querySelectorAll('input[class="email-bt_disabled"]');
		for (const inp of inputsList) {
			inp.className = "email-bt";
		}
		var input = fm.querySelectorAll('input[name="refSwitch"]')[0];
		input.disabled = false; 
	}
	
	var lbl = fm.querySelectorAll('p[name="sectionSelector"]')[0];
	lbl.className = "forms_text";
	
	// Enable specific elements for each section type
	switch(section) {
		case 'Circular':
			// labels
			var lbl = fm.querySelectorAll('p[name="dim1"]')[0];
			lbl.className = "forms_text";
			lbl.innerHTML = "Diameter (D):";
			lbl = fm.querySelectorAll('p[name="dim2"]')[0];
			lbl.innerHTML = "<br/>";
			lbl = fm.querySelectorAll('p[name="dim3"]')[0];
			lbl.innerHTML = "<br/>";
			lbl = fm.querySelectorAll('p[name="dim4"]')[0];
			lbl.innerHTML = "<br/>";
			// inputs
			var inputsList = fm.querySelectorAll('input');
			for (const inp of inputsList) {
				if (inp.name == "dim1" ){
					inp.disabled = false; 
					inp.className = "email-bt";
				} else if ( inp.name == "dim2" ||  inp.name == "dim3" ||  inp.name == "dim4" ) {
					inp.disabled = true; 
					inp.className = "email-bt-hidden";
				}
			}
			break;
		case 'Circular tube':
			// labels
			var lbl = fm.querySelectorAll('p[name="dim1"]')[0];
			lbl.className = "forms_text";
			lbl.innerHTML = "Diameter (D<sub>out</sub>):";
			lbl = fm.querySelectorAll('p[name="dim2"]')[0];
			lbl.className = "forms_text";
			lbl.innerHTML = "Thickness (t):";
			lbl = fm.querySelectorAll('p[name="dim3"]')[0];
			lbl.innerHTML = "<br/>";
			lbl = fm.querySelectorAll('p[name="dim4"]')[0];
			lbl.innerHTML = "<br/>";
			// inputs
			var inputsList = fm.querySelectorAll('input');
			for (const inp of inputsList) {
				if (inp.name == "dim1" ||  inp.name == "dim2"){
					inp.disabled = false; 
					inp.className = "email-bt";
				} else if ( inp.name == "dim3" ||  inp.name == "dim4" ) {
					inp.disabled = true; 
					inp.className = "email-bt-hidden";
				}
			}
			break;
		case 'Rectangular':
			// labels
			var lbl = fm.querySelectorAll('p[name="dim1"]')[0];
			lbl.className = "forms_text";
			lbl.innerHTML = "Height (h):";
			lbl = fm.querySelectorAll('p[name="dim2"]')[0];
			lbl.className = "forms_text";
			lbl.innerHTML = "Width (b):";
			lbl = fm.querySelectorAll('p[name="dim3"]')[0];
			lbl.innerHTML = "<br/>";
			lbl = fm.querySelectorAll('p[name="dim4"]')[0];
			lbl.innerHTML = "<br/>";
			// inputs
			var inputsList = fm.querySelectorAll('input');
			for (const inp of inputsList) {
				if (inp.name == "dim1" ||  inp.name == "dim2"){
					inp.disabled = false; 
					inp.className = "email-bt";
				} else if ( inp.name == "dim3" ||  inp.name == "dim4" ) {
					inp.disabled = true; 
					inp.className = "email-bt-hidden";
				}
			}
			break;
		case 'Rectangular tube':
			// labels
			var lbl = fm.querySelectorAll('p[name="dim1"]')[0];
			lbl.className = "forms_text";
			lbl.innerHTML = "Height (h):";
			lbl = fm.querySelectorAll('p[name="dim2"]')[0];
			lbl.className = "forms_text";
			lbl.innerHTML = "Width (b):";
			lbl = fm.querySelectorAll('p[name="dim3"]')[0];
			lbl.className = "forms_text";
			lbl.innerHTML = "Thickness (t):";
			lbl = fm.querySelectorAll('p[name="dim4"]')[0];
			lbl.innerHTML = "<br/>";
			// inputs
			var inputsList = fm.querySelectorAll('input');
			for (const inp of inputsList) {
				if (inp.name == "dim1" ||  inp.name == "dim2" ||  inp.name == "dim3"){
					inp.disabled = false; 
					inp.className = "email-bt";
				} else if ( inp.name == "dim4" ) {
					inp.disabled = true; 
					inp.className = "email-bt-hidden";
				}
			}
			break;
		case 'L section':
			// labels
			var lbl = fm.querySelectorAll('p[name="dim1"]')[0];
			lbl.className = "forms_text";
			lbl.innerHTML = "Height (h):";
			lbl = fm.querySelectorAll('p[name="dim2"]')[0];
			lbl.className = "forms_text";
			lbl.innerHTML = "Width (b):";
			lbl = fm.querySelectorAll('p[name="dim3"]')[0];
			lbl.className = "forms_text";
			lbl.innerHTML = "Thickness (t):";
			lbl = fm.querySelectorAll('p[name="dim4"]')[0];
			lbl.innerHTML = "<br/>";
			// inputs
			var inputsList = fm.querySelectorAll('input');
			for (const inp of inputsList) {
				if (inp.name == "dim1" ||  inp.name == "dim2" ||  inp.name == "dim3"){
					inp.disabled = false; 
					inp.className = "email-bt";
				} else if ( inp.name == "dim4" ) {
					inp.disabled = true; 
					inp.className = "email-bt-hidden";
				}
			}
			break;
		case 'C channel':
			// labels
			var lbl = fm.querySelectorAll('p[name="dim1"]')[0];
			lbl.className = "forms_text";
			lbl.innerHTML = "Height (h):";
			lbl = fm.querySelectorAll('p[name="dim2"]')[0];
			lbl.className = "forms_text";
			lbl.innerHTML = "Width (b):";
			lbl = fm.querySelectorAll('p[name="dim3"]')[0];
			lbl.className = "forms_text";
			lbl.innerHTML = "Thickness, web (t<sub>w</sub>): ";
			lbl = fm.querySelectorAll('p[name="dim4"]')[0];
			lbl.className = "forms_text";
			lbl.innerHTML = "Thickness, flanges (t<sub>f</sub>): ";
			// inputs
			var inputsList = fm.querySelectorAll('input');
			for (const inp of inputsList) {
				if (inp.name == "dim1" ||  inp.name == "dim2" ||  inp.name == "dim3" || inp.name == "dim4" ){
					inp.disabled = false; 
					inp.className = "email-bt";
				}
			}
			break;
		case 'U channel':
			// labels
			var lbl = fm.querySelectorAll('p[name="dim1"]')[0];
			lbl.className = "forms_text";
			lbl.innerHTML = "Height (h):";
			lbl = fm.querySelectorAll('p[name="dim2"]')[0];
			lbl.className = "forms_text";
			lbl.innerHTML = "Width (b):";
			lbl = fm.querySelectorAll('p[name="dim3"]')[0];
			lbl.className = "forms_text";
			lbl.innerHTML = "Thickness, web (t<sub>w</sub>): ";
			lbl = fm.querySelectorAll('p[name="dim4"]')[0];
			lbl.className = "forms_text";
			lbl.innerHTML = "Thickness, flanges (t<sub>f</sub>): ";
			// inputs
			var inputsList = fm.querySelectorAll('input');
			for (const inp of inputsList) {
				if (inp.name == "dim1" ||  inp.name == "dim2" ||  inp.name == "dim3" || inp.name == "dim4" ){
					inp.disabled = false; 
					inp.className = "email-bt";
				}
			}
			break;
		case 'I section':
			// labels
			var lbl = fm.querySelectorAll('p[name="dim1"]')[0];
			lbl.className = "forms_text";
			lbl.innerHTML = "Height (h):";
			lbl = fm.querySelectorAll('p[name="dim2"]')[0];
			lbl.className = "forms_text";
			lbl.innerHTML = "Width (b):";
			lbl = fm.querySelectorAll('p[name="dim3"]')[0];
			lbl.className = "forms_text";
			lbl.innerHTML = "Thickness, web (t<sub>w</sub>): ";
			lbl = fm.querySelectorAll('p[name="dim4"]')[0];
			lbl.className = "forms_text";
			lbl.innerHTML = "Thickness, flanges (t<sub>f</sub>): ";
			// inputs
			var inputsList = fm.querySelectorAll('input');
			for (const inp of inputsList) {
				if (inp.name == "dim1" ||  inp.name == "dim2" ||  inp.name == "dim3" || inp.name == "dim4" ){
					inp.disabled = false; 
					inp.className = "email-bt";
				}
			}
			break;
		case 'H section':
			// labels
			var lbl = fm.querySelectorAll('p[name="dim1"]')[0];
			lbl.className = "forms_text";
			lbl.innerHTML = "Height (h):";
			lbl = fm.querySelectorAll('p[name="dim2"]')[0];
			lbl.className = "forms_text";
			lbl.innerHTML = "Width (b):";
			lbl = fm.querySelectorAll('p[name="dim3"]')[0];
			lbl.className = "forms_text";
			lbl.innerHTML = "Thickness, web (t<sub>w</sub>): ";
			lbl = fm.querySelectorAll('p[name="dim4"]')[0];
			lbl.className = "forms_text";
			lbl.innerHTML = "Thickness, flanges (t<sub>f</sub>): ";
			// inputs
			var inputsList = fm.querySelectorAll('input');
			for (const inp of inputsList) {
				if (inp.name == "dim1" ||  inp.name == "dim2" ||  inp.name == "dim3" || inp.name == "dim4" ){
					inp.disabled = false; 
					inp.className = "email-bt";
				}
			}
			break;
		default:
			break;
	}
	//alert('update done');
}

function selectorChange(elem) {
	
	//alert("selectorChange");
	var myForm = elem.closest('div[name="myForm"]');
	//alert('myFunction3, form'+myForm.id);
	myFunction3(myForm);
	//alert('updating form');
	updateForm(myForm);
}

function setReference(elem) {
	//alert('switch'+elem.checked);
	var isRef = elem.checked;
	var myForm = elem.closest('div[name="myForm"]');
	var myFormId = myForm.id; 
	if (isRef == true) {
		//alert('turning on'+myFormId);
		var fm = myForm.querySelectorAll('div[class="power"]')[0];
		fm.className = "power_full";
		
		var formList = document.getElementsByName('myForm');
		//alert('forms foud = '+formList.length);
		for (const fm of formList) {
			//alert('checking'+fm.id);
			if (fm.id != myFormId) {
				//alert('turning off'+fm.id+fm.className);
				input = fm.querySelectorAll('input[name="refSwitch"]')[0];
				input.checked = false; 
				var formu = fm.querySelectorAll('div[class="power_full"]')[0];
				//alert('turning off'+formu.tagName+formu.className);
				if (fm.querySelectorAll('div[class="power_full"]').length>0){
					formu.className = "power";
				}
			}
		}
	} else {
		if (myForm.querySelectorAll('div[class="power_full"]').length>0){
			var fm = myForm.querySelectorAll('div[class="power_full"]')[0];
			fm.className = "power";
		}
	}
	
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
			res.A = 2*h*tf + (b-2*tf)*tw;
			res.perimeter = 4*h+2*b-2*tw;
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
			var d = dims[0]*scale;
			var x0 = canvas_width/2;
			var y0 = canvas_height-bottom_margin-d/2;
			var points = [{x: 0   , y: 0}];	
			var steps = 30;
			for (var i = 0; i < steps; i++) {
				var xValue = (x0 + d/2 * Math.cos(2 * Math.PI * i / steps));
				var yValue = (y0 + d/2 * Math.sin(2 * Math.PI * i / steps));
				points[i] = {x: xValue   , y: yValue};
			}
			break;
		case 'Circular tube':
			var d = dims[0]*scale;
			var t = dims[1]*scale;
			var di = d-2*t;
			var x0 = canvas_width/2;
			var y0 = canvas_height-bottom_margin-d/2;
			var points1 = [{x: 0   , y: 0}];	
			var points2 = [{x: 0   , y: 0}];	
			var steps = 30;
			for (var i = 0; i < steps; i++) {
				var xValue = (x0 + d/2 * Math.cos(2 * Math.PI * i / steps));
				var yValue = (y0 + d/2 * Math.sin(2 * Math.PI * i / steps));
				points1[i] = {x: xValue   , y: yValue};
			}
			for (var i = 0; i < steps; i++) {
				var xValue = (x0 + di/2 * Math.cos(2 * Math.PI * i / steps));
				var yValue = (y0 + di/2 * Math.sin(2 * Math.PI * i / steps));
				points2[i] = {x: xValue   , y: yValue};
			}
			points = [points1,points2];
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
			var h = dims[0]*scale;
			var b = dims[1]*scale;
			var t = dims[2]*scale;
			var x0 = canvas_width/2-b/2;
			var y0 = canvas_height-bottom_margin;
			var points = [ 
				{x: x0   , y: y0-h},
				{x: x0   , y: y0  },
				{x: x0+b , y: y0  },
				{x: x0+b , y: y0-h}
				];	
			var points = [ [
				{x: x0   , y: y0-h},
				{x: x0   , y: y0  },
				{x: x0+b , y: y0  },
				{x: x0+b , y: y0-h}
				],[
				{x: x0+t   , y: y0-h+t},
				{x: x0+t   , y: y0-t  },
				{x: x0+b-t , y: y0-t  },
				{x: x0+b-t , y: y0-h+t}
				] ];	
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
    "value" : "Circular",
  },
  {
    "text"     : "Circular tube",
    "value"    : "Circular tube",
  },
  {
    "text"  : "Rectangular",
    "value" : "Rectangular",
  },
  {
    "text"     : "Rectangular tube",
    "value"    : "Rectangular tube",
  },
  {
    "text"  : "L section",
    "value" : "L section",
  },
  {
    "text"  : "C channel",
    "value" : "C channel",
  },
  {
    "text"  : "U channel",
    "value" : "U channel",
  },
  {
    "text"  : "I section",
    "value" : "I section",
  },
  {
    "text"  : "H section",
    "value" : "H section",
  }
];

//var selectBoxList = document.getElementsByName('sectionSelector');
var selectBoxList = document.querySelectorAll('select[name="sectionSelector"]');
for (const selectBox of selectBoxList) {
	for(var i = 0, l = options.length; i < l; i++){
		var option = options[i];
		selectBox.options.add( new Option(option.text, option.value, option.selected) );
	}
	//selectBox.onchange="selectorChange(this)";
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
	updateForm(fm);
}
/*
myFunction(1);
myFunction(2);
*/