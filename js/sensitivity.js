google.charts.load("current", {packages:["corechart"]});
//google.load('visualization', '1.0', {'packages':['corechart']});
//google.charts.load('current', {'packages':['bar']});
google.charts.setOnLoadCallback(drawCharts);
//create trigger to resizeEnd event
$(window).resize(function() {
    if(this.resizeTO) clearTimeout(this.resizeTO);
    this.resizeTO = setTimeout(function() {
        $(this).trigger('resizeEnd');
    }, 1000);
});
//redraw graph when window resize is completed
$(window).on('resizeEnd', function() {
    var chart = document.getElementById('Chart1');
    chart.clearChart();
    var chart = document.getElementById('Chart2');
    chart.clearChart();
    var chart = document.getElementById('Chart3');
    chart.clearChart();
    var chart = document.getElementById('Chart4');
    chart.clearChart();
    var chart = document.getElementById('Chart5');
    chart.clearChart();
    var chart = document.getElementById('Chart6');
    chart.clearChart();
    drawCharts();
});

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


    //alert('hey');
	var fm = document.getElementsByName('myForm')[0];
	var section = fm.querySelectorAll('select[name="sectionSelector"]')[0].value;
    var section = fm.querySelectorAll('select[name="sectionSelector"]')[0].value;
	var h = parseFloat(fm.querySelectorAll('input[name="dim1"]')[0].value);
	var b = parseFloat(fm.querySelectorAll('input[name="dim2"]')[0].value);
	var t = parseFloat(fm.querySelectorAll('input[name="dim3"]')[0].value);
	var t2 = parseFloat(fm.querySelectorAll('input[name="dim4"]')[0].value);
	var dims = [h,b,t,t2];
	var ref = calc_properties(section,dims);

    var lbl = [fm.querySelectorAll('p[name="dim1"]')[0].innerHTML.split("(")[0]];
    if (fm.querySelectorAll('p[name="dim2"]')[0].innerHTML != "<br>") {
        lbl.push(fm.querySelectorAll('p[name="dim2"]')[0].innerHTML.split("(")[0]);}
    if (fm.querySelectorAll('p[name="dim3"]')[0].innerHTML != "<br>") {
        lbl.push(fm.querySelectorAll('p[name="dim3"]')[0].innerHTML.split("(")[0]);}
    if (fm.querySelectorAll('p[name="dim4"]')[0].innerHTML != "<br>") {
        lbl.push(fm.querySelectorAll('p[name="dim4"]')[0].innerHTML.split("(")[0]);}

    var nplots = lbl.length;
    //alert(dims_values)
	var temp = [
		[{label: 'Change in dimensions', type: 'number'}]
		];
	//alert(lbl);
    //alert(temp);
    var lims = [-0.5,0.5];
    var steps = 10;
	for (var i=0; i<=steps; i+=1 ) {
        var diff = lims[0] + i*(lims[1]-lims[0])/steps;
        temp.push([diff]);
    }
    //alert(temp);
    var array_area = []; // create empty array to hold copy
    var array_ixx = [];
    var array_iyy = [];
    var array_izz = [];
    var array_sx = [];
    var array_sy = [];
    // use for loop to apply slice to sub-arrays
    for (var i = 0, len = temp.length; i < len; i++) {
        array_area[i] = temp[i].slice();
        array_ixx[i] = temp[i].slice();
        array_iyy[i] = temp[i].slice();
        array_izz[i] = temp[i].slice();
        array_sx[i] = temp[i].slice();
        array_sy[i] = temp[i].slice();
    }

    for (var idx=0; idx<nplots; idx += 1){
        var delta = dims.slice(0);
        //alert(delta+' '+dims);
        var variable = dims[idx];
        var header_col = {"label": lbl[idx],"type": 'number'};
        array_area[0][idx+1] = header_col;
        array_ixx[0][idx+1] = header_col;
        array_iyy[0][idx+1] = header_col;
        array_izz[0][idx+1] = header_col;
        array_sx[0][idx+1] = header_col;
        array_sy[0][idx+1] = header_col;
        for (var i=0; i<=steps; i+=1 ) {
            var diff = lims[0] + i*(lims[1]-lims[0])/steps;
            delta[idx] = (1+diff)*variable;
            //alert('i='+i+', dim1='+variable+', delta1='+delta[idx]);
            var results = calc_properties(section,delta);
            array_area[i+1][idx+1] = (results.A - ref.A)/ref.A;
            array_ixx[i+1][idx+1] = (results.Ixx - ref.Ixx)/ref.Ixx;
            array_iyy[i+1][idx+1] = (results.Iyy - ref.Iyy)/ref.Iyy;
            array_izz[i+1][idx+1] = (results.Izz - ref.Izz)/ref.Izz;
            array_sx[i+1][idx+1] = (1/results.Sx_min - 1/ref.Sx_min)/(1/ref.Sx_min);
            array_sy[i+1][idx+1] = (1/results.Sy_min - 1/ref.Sy_min)/(1/ref.Sy_min);
        }
    }

	var myChartId = 'Chart1';
	drawChart(array_area,myChartId,lims,'% change in Area');
	var myChartId = 'Chart2';
	drawChart(array_ixx,myChartId,lims,'% change in Ixx');
	var myChartId = 'Chart3';
	drawChart(array_iyy,myChartId,lims,'% change in Iyy');
	var myChartId = 'Chart4';
	drawChart(array_izz,myChartId,lims,'% change in Izz');
	var myChartId = 'Chart5';
	drawChart(array_sx,myChartId,lims,'% change in Stress');
	var myChartId = 'Chart6';
	drawChart(array_sy,myChartId,lims,'% change in Stress');
}

function drawChart(array,myChartId,lims,chartTitle) {
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

    //alert(lims[0]+' '+lims[1]);
    var t = [array[1][0]];
    for (var i = 2; i<=rows; i+=1) {
        t.push(array[i][0]);
    }
    //t.push(array[rows][0]);
	// Optional; add a title and set the width and height of the chart
    var options = {
        chartArea:{left:50,top:5,width:'80%',height:'75%'},
        curveType: 'function',
	    hAxis: {title: '% Change in each dimension',
	            titleTextStyle: {italic: false},
                format:'percent',
                viewWindow: {
        		    min: lims[0],
        		    max: lims[1]
    			    },
    			ticks: t,
	            textPosition: 'out'},
        vAxis: {title: chartTitle,
                titleTextStyle: {italic: false},
                format:'percent',
                viewWindow: {
        		    min: -1,
        		    max: 1
    			    },
    			ticks: [-1,-0.5,0,0.5,1],
                },
        legend: { position: 'in', maxLines: 3 },
        interpolateNulls: true,
        series: {
          0: { lineWidth: 2, pointSize: 0 },
          1: { lineWidth: 2, pointSize: 0 },
          2: { lineWidth: 2, pointSize: 0 },
          3: { lineWidth: 2, pointSize: 0 }
        }
        };

    //alert('got here');
	// Display the chart inside the <div> element with id="piechart"
	var chart = new google.visualization.ScatterChart(document.getElementById(myChartId));
	chart.draw(data, options);
	
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

function updateForm(fm) {
	// Enables or Disables the form based on the "Section type" selection
	
	var section = fm.querySelectorAll('select[name="sectionSelector"]')[0].value;
	//alert('updating form ='+fm.id);
	//alert('section ='+section);

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
			lbl.innerHTML = "Thickness, web (t<sub>w</sub>):";
			lbl = fm.querySelectorAll('p[name="dim4"]')[0];
			lbl.className = "forms_text";
			lbl.innerHTML = "Thickness, flanges (t<sub>f</sub>):";
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
			lbl.innerHTML = "Thickness, web (t<sub>w</sub>):";
			lbl = fm.querySelectorAll('p[name="dim4"]')[0];
			lbl.className = "forms_text";
			lbl.innerHTML = "Thickness, flanges (t<sub>f</sub>):";
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
			lbl.innerHTML = "Thickness, web (t<sub>w</sub>):";
			lbl = fm.querySelectorAll('p[name="dim4"]')[0];
			lbl.className = "forms_text";
			lbl.innerHTML = "Thickness, flanges (t<sub>f</sub>):";
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
			lbl.innerHTML = "Thickness, web (t<sub>w</sub>):";
			lbl = fm.querySelectorAll('p[name="dim4"]')[0];
			lbl.className = "forms_text";
			lbl.innerHTML = "Thickness, flanges (t<sub>f</sub>):";
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
    "text"  : "Circular",
    "value" : "Circular",
    "selected" : true
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

init();
function init() {
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

    var fm = document.getElementsByName('myForm')[0];
    //alert('recalculateSection '+fm.id)
    recalculateSection(fm);
    //alert('updateForm '+fm.id)
    updateForm(fm);
    //alert('done  '+fm.id)

    //alert('updating pics');
    updatePictures();
    //alert('updating charts');
    //drawCharts();
    //alert('all done');
}
