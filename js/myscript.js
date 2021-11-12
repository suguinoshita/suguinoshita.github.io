google.charts.load("current", {packages:["corechart"]});
//google.load('visualization', '1.0', {'packages':['corechart']});
//google.charts.load('current', {'packages':['bar']});
google.charts.setOnLoadCallback(drawCharts);

function handleInput(e){
  var value = this.valueAsNumber;
  console.log("type: %s, value: %o", typeof value, value);  
}

function setTwoNumberDecimal(event) {
    this.value = parseFloat(this.value).toFixed(2);
}

function nan2zero(num) {
	if(isNaN(num)) num = 0; 
    return num; 
}

function fillPolygon(data,cg, color,lineColor,mycanvas) {
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
		ctx.setLineDash([]);
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
			ctx.setLineDash([]);
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
	
	ctx.beginPath();
	ctx.setLineDash([5, 3]);/*dashes are 5px and spaces are 3px*/
	ctx.lineWidth = 1;
	ctx.strokeStyle = "black";
	ctx.moveTo(canvas.width/2, canvas.height);
	ctx.lineTo(canvas.width/2, 0);
	ctx.stroke();
	
	ctx.beginPath();
	ctx.setLineDash([5, 3]);/*dashes are 5px and spaces are 3px*/
	ctx.lineWidth = 1;
	ctx.strokeStyle = "black";
	ctx.moveTo(           0, canvas.height-cg[1]-bottom_margin);
	ctx.lineTo(canvas.width, canvas.height-cg[1]-bottom_margin);
	ctx.stroke();
		
	ctx.font = "10px Arial";
	ctx.fillStyle = "#000"; 
	ctx.fillText("x",            0+3, canvas.height-cg[1]-bottom_margin-5);
	ctx.fillText("x", canvas.width-5, canvas.height-cg[1]-bottom_margin-5);
	ctx.font = "10px Arial";
	ctx.fillStyle = "#000";
	ctx.fillText("y",canvas.width/2+2, canvas.height-3);
	ctx.fillText("y",canvas.width/2+2, 5);
	
	
	//alert(mycanvas+' updated');
}

function drawCharts() {
	
	var array1 = [
		//['Section','Section 1','Section 2','Section 3','Section 4'],
		[{label: 'Section', type: 'string'},
		 {label: 'Section 1', type: 'number'},
		 {label: 'Section 2', type: 'number'},
		 {label: 'Section 3', type: 'number'},
		 {label: 'Section 4', type: 'number'}],
		['Cross-section\n Area', 0, 0, 0, 0 ]
		];
	
	var array2 = [
		['Section', 'Section 1','Section 2','Section 3','Section 4'],
		['Moment of inertia,\n Ixx', 0, 0, 0, 0],
		['Moment of inertia,\n Iyy', 0, 0, 0, 0],
		['Polar moment\n of inertia, Izz', 0, 0, 0, 0]
		];
	
	var array3 = [
		['Section', 'Section 1','Section 2','Section 3','Section 4'],
		['Axial stress', 0, 0, 0, 0],
		['Bending stress,\n x-axis', 0, 0, 0, 0],
		['Bending stress,\n y-axis', 0, 0, 0, 0]
		];

	var ref = 0;
	var filled = [];
	var s = 1;
	var formList = document.getElementsByName('myForm');
	for (var fm of formList) {
		
		var section = fm.querySelectorAll('select[name="sectionSelector"]')[0].value;
		if (section == 'None') {
			array1[1][s] = Infinity;
			
			array2[1][s] = Infinity;
			array2[2][s] = Infinity;
			array2[3][s] = Infinity;
			
			array3[1][s] = Infinity;
			array3[2][s] = Infinity;
			array3[3][s] = Infinity;
		} else {
			filled.push(s);
			var isRef = fm.querySelectorAll('input[name="refSwitch"]')[0].checked;
			if (isRef == true) { ref = s; }
			array1[1][s] = parseFloat(fm.querySelectorAll('input[name="area"]')[0].value);
			
			array2[1][s] = parseFloat(fm.querySelectorAll('input[name="Ixx"]')[0].value);
			array2[2][s] = parseFloat(fm.querySelectorAll('input[name="Iyy"]')[0].value);
			array2[3][s] = parseFloat(fm.querySelectorAll('input[name="Izz"]')[0].value);
			
			array3[1][s] = 1/parseFloat(fm.querySelectorAll('input[name="area"]')[0].value);
			array3[2][s] = 1/parseFloat(fm.querySelectorAll('input[name="Sx_min"]')[0].value);
			array3[3][s] = 1/parseFloat(fm.querySelectorAll('input[name="Sy_min"]')[0].value);
		}
		s = s + 1;
	}
	if (ref == 0 && filled.length > 0) { ref = filled[0]; }
	var num = filled.length;
	
	var myChartId = 'Chart1';
	//alert(myChartId);
	drawChart(array1,ref,myChartId,num);
	myChartId = 'Chart2';
	//alert(myChartId);
	drawChart(array2,ref,myChartId,num);
	myChartId = 'Chart3';
	//alert(myChartId);
	drawChart(array3,ref,myChartId,num);
	//alert('charts done');
}

function drawChart(array,ref,myChartId,num) {
	//alert(array);
	var rows = array.length - 1;
	var cols = array[0].length - 1;
	
	//alert('data');
    var data = google.visualization.arrayToDataTable(array);
	
	var formatPercent = new google.visualization.NumberFormat({
		pattern: '#,##0.0%'
	});
	
	var formatShort = new google.visualization.NumberFormat({
		pattern: '0.0E+0'
	});
	//alert('got here');
	var sig = "";
    var view = new google.visualization.DataView(data);
	view.setColumns([0, 1,
				 { calc: function (dt, row) {
					var col = 1;
					var amount =  formatShort.formatValue(dt.getValue(row,col));
					//var percent = formatPercent.formatValue(dt.getValue(row, col) / groupData.getValue(0, col));
					if (col == ref) { var percent = "ref"; 
					} else { 
					var percent = formatPercent.formatValue((dt.getValue(row, col)- dt.getValue(row, ref))/ dt.getValue(row, ref));
					if (percent>0) { sig = "+"; }
					}
					//return amount + ' (' + sig + percent + ')';
					return sig + percent;
					},
					 sourceColumn: 1,
					 type: "string",
					 role: "annotation" },
				 2,
				 { calc: function (dt, row) {
					var col = 2;
					var amount =  formatShort.formatValue(dt.getValue(row,col));
					//var percent = formatPercent.formatValue(dt.getValue(row, col) / groupData.getValue(0, col));
					if (col == ref) { var percent = "ref"; 
					} else { 
					var percent = formatPercent.formatValue((dt.getValue(row, col)- dt.getValue(row, ref))/ dt.getValue(row, ref));
					if (percent>0) { sig = "+"; }
					}
					//return amount + ' (' + sig + percent + ')';
					return sig + percent;
					},
					 sourceColumn: 2,
					 type: "string",
					 role: "annotation" },
				 3,
				 { calc: function (dt, row) {
					var col = 3;
					var amount =  formatShort.formatValue(dt.getValue(row,col));
					//var percent = formatPercent.formatValue(dt.getValue(row, col) / groupData.getValue(0, col));
					if (col == ref) { var percent = "ref";
					} else { 
					var percent = formatPercent.formatValue((dt.getValue(row, col)- dt.getValue(row, ref))/ dt.getValue(row, ref));
					if (percent>0) { sig = "+"; }
					}
					//return amount + ' (' + sig + percent + ')';
					return sig + percent;
					},
					 sourceColumn: 3,
					 type: "string",
					 role: "annotation" },
				 4,
				 { calc: function (dt, row) {
					var col = 4;
					var amount =  formatShort.formatValue(dt.getValue(row,col));
					//var percent = formatPercent.formatValue(dt.getValue(row, col) / groupData.getValue(0, col));
					if (col == ref) { var percent = "ref"; 
					} else { 
					var percent = formatPercent.formatValue((dt.getValue(row, col)- dt.getValue(row, ref))/ dt.getValue(row, ref));
					if (percent>0) { sig = "+"; } 
					}
					//return amount + ' (' + sig + percent + ')';
					return sig + percent;
					},
					 sourceColumn: 4,
					 type: "string",
					 role: "annotation" }
				 ]);
	if (num == 1) {
		view.setColumns([0, 1,
				 { calc: function (dt, row) {
					var col = 1;
					var amount =  formatShort.formatValue(dt.getValue(row,col));
					return amount;
					},
					 sourceColumn: 1,
					 type: "string",
					 role: "annotation" },
				 2,
				 { calc: function (dt, row) {
					var col = 2;
					var amount =  formatShort.formatValue(dt.getValue(row,col));
					return amount;
					},
					 sourceColumn: 2,
					 type: "string",
					 role: "annotation" },
				 3,
				 { calc: function (dt, row) {
					var col = 3;
					var amount =  formatShort.formatValue(dt.getValue(row,col));
					return amount;
					},
					 sourceColumn: 3,
					 type: "string",
					 role: "annotation" },
				 4,
				 { calc: function (dt, row) {
					var col = 4;
					var amount =  formatShort.formatValue(dt.getValue(row,col));
					return amount;
					},
					 sourceColumn: 4,
					 type: "string",
					 role: "annotation" }
				 ]);
	}
	var colors = fillColors;
	colors.forEach(function (color, index) {
		data.setColumnProperty(index + 1, 'fill-color', color);
		});	 	
	
	// Optional; add a title and set the width and height of the chart
    var options = { bar: {groupWidth: "80%"},
        hAxis: {format: 'scientific'},
        bars: 'horizontal',
		annotations: {alwaysOutside: true},
        //chartArea: {width: '100%', height: '100%'},
        //theme: 'maximized',
        //hAxis: {textPosition: 'out'},
        vAxis: {textPosition: 'out'},
        legend: {position: 'top', maxLines: 3, alignment: 'center'},
		colors: colors,
		chartArea: {left:85,top:40, width: '50%', height: '70%'},
		//chartArea: {width: '100%', height: '80%'},
		width: '100%',
		height: '80%',
        };

	// Display the chart inside the <div> element with id="piechart"
	var chart = new google.visualization.BarChart(document.getElementById(myChartId));
	chart.draw(view, options);
	
    /*window.addEventListener('resize', function() {
		chart.draw(view, options);
    }, false);*/
}

function dimChange(elem){
	/*alert("dimChange.."+elem.tagName+elem.value);*/
	var myForm = elem.closest('div[name="myForm"]');
	recalculateSection(myForm);	
	updatePictures();
	drawCharts();
}


function recalculateSection(myForm){
	
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
		var xc = parseFloat(fm.querySelectorAll('input[name="xc"]')[0].value);
		var yc = parseFloat(fm.querySelectorAll('input[name="yc"]')[0].value);
		var cg = [xc*scale,yc*scale];
		var mycanvas = fm.querySelectorAll('canvas[name="myCanvas"]')[0].id;
		var canvas = document.getElementById(mycanvas);
		var ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		//alert('drawing on '+mycanvas);
		var points = calc_points(section,dims,canvas.width,canvas.height,bottom_margin,scale);
		var colors = getColors(fm);
		fillPolygon(points,cg, colors[0],colors[1],mycanvas);
		//alert('drawing on '+mycanvas+' done');
	}	
}

function getColors(fm){
	switch (fm.id) {
		case 'Form1':
			var fill = fillColors[0];
			var line = lineColors[0];
			break;
		case 'Form2':
			var fill = fillColors[1];
			var line = lineColors[1];
			break;
		case 'Form3':
			var fill = fillColors[2];
			var line = lineColors[2];
			break;
		case 'Form4':
			var fill = fillColors[3];
			var line = lineColors[3];
			break;
		default:
			var fill = '#b3b3b3';
			var line = '#4d4d4d';
	}
	return [fill, line];
}

function getScale() {
	// Calculate the scale needed to fit all the pictures on each canvas, keeping the proportions
	
	var scales = [];
	var formList = document.getElementsByName('myForm');
	for (const fm of formList) {
		var section = fm.querySelectorAll('select[name="sectionSelector"]')[0].value;
		if (section == 'Circular' || section == 'Circular tube') {
			var d1 = parseFloat(fm.querySelectorAll('input[name="dim1"]')[0].value);
			var dims = [d1,d1];
		} else if  (section == 'None') {
			var dims = [0,0];
		} else {
			var d1 = parseFloat(fm.querySelectorAll('input[name="dim1"]')[0].value);
			var d2 = parseFloat(fm.querySelectorAll('input[name="dim2"]')[0].value);
			var dims = [d1,d2];
		}
		var mycanvas = fm.querySelectorAll('canvas[name="myCanvas"]')[0].id;
		var canvas = document.getElementById(mycanvas);
		var ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		
		for (var d of dims) {
			if (d > 0) {
				scales.push((canvas.width-10)/d);
				scales.push((canvas.height-bottom_margin-10)/d);
			}
		}		
	}
	var scale = Math.min(...scales); // keep the min scale
	//alert('scale='+scale);
	return scale;
}

function selectorChange(elem) {
	
	//alert("selectorChange");
	var myForm = elem.closest('div[name="myForm"]');
	//alert('recalculateSection, form'+myForm.id);
	recalculateSection(myForm);
	//alert('updating form');
	updateForm(myForm);
	
	updatePictures();
	drawCharts();
}

function setReference(elem) {
	formatReference(elem);
	drawCharts();
}
	
function formatReference(elem) {
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

function updateForm(fm) {
	// Enables or Disables the form based on the "Section type" selection
	
	var section = fm.querySelectorAll('select[name="sectionSelector"]')[0].value;
	//alert('updating form ='+fm.id);
	//alert('section ='+section);
	if (section == 'None') {
		// set labels to gray
		var labelsList = fm.querySelectorAll(".forms_text");
		//alert('labels='+labelsList.length);
		for (const lbl of labelsList) {
			if ( lbl.name != "sectionSelector" ) {
				lbl.className = "forms_text_disabled";
			}
		}
		lbl = fm.querySelectorAll('p[name="dim1"]')[0];
		lbl.innerHTML = "<br/>";
		lbl = fm.querySelectorAll('p[name="dim2"]')[0];
		lbl.innerHTML = "<br/>";
		lbl = fm.querySelectorAll('p[name="dim3"]')[0];
		lbl.innerHTML = "<br/>";
		lbl = fm.querySelectorAll('p[name="dim4"]')[0];
		lbl.innerHTML = "<br/>";
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
		formatReference(input);
		
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
			res.yc = h/2;
			res.Ixx = b*h*h*h/12 - (b-tw)*Math.pow((h-2*tf),3)/12;
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
			res.A = 2*h*tf + (b-2*tf)*tw;
			res.perimeter = 4*h+2*b-2*tw;
			res.xc = b/2;
			res.yc = ((b-2*tf)*tw*tw/2+tf*h*h)/(res.A);
			res.Iyy = h*b*b*b/12 - (h-tw)*Math.pow((b-2*tf),3)/12;
			var Ix0 = (b-2*tf)*tw*tw*tw/3 + 2*tf*h*h*h/3;
			res.Ixx = Ix0 - res.A*res.yc*res.yc;
			res.Izz = res.Ixx + res.Iyy;
			res.Sx_min = res.Ixx/(h-res.yc);
			res.Sy_min = res.Iyy/(b-res.xc);
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
			var x0 = canvas_width/2-b/2;
			var y0 = canvas_height-bottom_margin;
			var points = [ 
				{x: x0      , y: y0-h },
				{x: x0      , y: y0   },
				{x: x0+b    , y: y0   },
				{x: x0+b    , y: y0-h },
				{x: x0+b-tf , y: y0-h },
				{x: x0+b-tf , y: y0-tw},
				{x: x0+tf   , y: y0-tw},
				{x: x0+tf   , y: y0-h }
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
const bottom_margin = 10;
const options =
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

//const fillColors = ['#3cba54','#f4c20d','#db3236','#4885ed'];
//const lineColors = ['#298039','#b38f09','#992326','#3664b3'];

//const fillColors = ['#2ecc70','#3498db','#e64b3b','#e67e22']; //#3d566e
//const lineColors = ['#26ae60','#2880b8','#c0392b','#d25300'];//#2c3e50
const fillColors = ['#3cba54','#3498db','#e64b3b','#e67e22']; //#3d566e
const lineColors = ['#298039','#2880b8','#c0392b','#d25300'];//#2c3e50

var selectBoxList = document.querySelectorAll('select[name="sectionSelector"]');
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
	//alert('recalculateSection '+fm.id)
	recalculateSection(fm);
	//alert('updateForm '+fm.id)
	updateForm(fm);
	//alert('done  '+fm.id)
}
//alert('updating pics');
updatePictures();
//alert('updating charts');
//drawCharts();
//alert('all done');