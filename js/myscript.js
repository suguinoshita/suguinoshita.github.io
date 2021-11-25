(function () {
    "use strict";

    var cookieAlert = document.querySelector(".cookiealert");
    var acceptCookies = document.querySelector(".acceptcookies");

    if (!cookieAlert) {
       return;
    }

    cookieAlert.offsetHeight; // Force browser to trigger reflow (https://stackoverflow.com/a/39451131)

    // Show the alert if we cant find the "acceptCookies" cookie
    if (!getCookie("acceptCookies")) {
        cookieAlert.classList.add("show");
    }

    // When clicking on the agree button, create a 1 year
    // cookie to remember user's choice and close the banner
    acceptCookies.addEventListener("click", function () {
        setCookie("acceptCookies", true, 365);
        cookieAlert.classList.remove("show");

        // dispatch the accept event
        window.dispatchEvent(new Event("cookieAlertAccept"))
    });

    // Cookie functions from w3schools
    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
})();


function saveForm() {
	//nothing to work with, get out of here
/*	if(typeof window.sessionStorage ==="undefined"){return;}
	saveValues();
	//alert('saved to sessionStorage!')
	*/
	return;
}


function loadForm() {
	//nothing to work with, get out of here
/*	if(window.sessionStorage) {
		//alert('sessionStorage found! '+window.sessionStorage.type)
		setValues();
	} else {
		//alert('sessionStorage not found!');
	}
	*/
	return;
}

function saveValues(){
/*	var i = 0;
	var formList = document.getElementsByName('myForm');
	for (const fm of formList) {
		
		var KEY = 'input'+i;
		window.sessionStorage.setItem( KEY, fm.querySelectorAll('select[name="sectionSelector"]')[0].value);
		
		i += 1;
		var KEY = 'input'+i;
		window.sessionStorage.setItem( KEY,  fm.querySelectorAll('input[name="dim1"]')[0].value);
		
		i += 1;
		var KEY = 'input'+i;
		window.sessionStorage.setItem( KEY, fm.querySelectorAll('input[name="dim2"]')[0].value);
		
		i += 1;
		var KEY = 'input'+i;
		window.sessionStorage.setItem( KEY, fm.querySelectorAll('input[name="dim3"]')[0].value);
		
		i += 1;
		var KEY = 'input'+i;
		window.sessionStorage.setItem( KEY, fm.querySelectorAll('input[name="dim4"]')[0].value);
		i += 1;
	}	*/
	return true;
}


function setValues(){
/*	var i = 0;
	var formList = document.getElementsByName('myForm');
	for (const fm of formList) {
		
		var KEY = 'input'+i;	
		var val = window.sessionStorage.getItem(KEY);
		if(val !== null){
			fm.querySelectorAll('select[name="sectionSelector"]')[0].value = val;
		}
		
		i += 1;
		var KEY = 'input'+i;
		var val = window.sessionStorage.getItem(KEY);
		if(val !== null){
			fm.querySelectorAll('input[name="dim1"]')[0].value = val;
		}
		
		i += 1;
		var KEY = 'input'+i;
		var val = window.sessionStorage.getItem(KEY);
		if(val !== null){
			fm.querySelectorAll('input[name="dim2"]')[0].value  = val;
		}
		
		i += 1;
		var KEY = 'input'+i;
		var val = window.sessionStorage.getItem(KEY);
		if(val !== null){
			fm.querySelectorAll('input[name="dim3"]')[0].value = val;
		}
		
		i += 1;
		var KEY = 'input'+i;
		var val = window.sessionStorage.getItem(KEY);
		if(val !== null){
			fm.querySelectorAll('input[name="dim4"]')[0].value = val;
		}
		i += 1;
	}	*/
	return true;
}




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
				
		ctx.lineWidth = 6;
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
					
			ctx.lineWidth = 6;
			ctx.strokeStyle = lineColor;
			ctx.stroke();
		}
	} 
	
	ctx.beginPath();
	ctx.setLineDash([10, 6]);/*dashes are 5px and spaces are 3px*/
	ctx.lineWidth = 2;
	ctx.strokeStyle = "black";
	ctx.moveTo(canvas.width/2, canvas.height);
	ctx.lineTo(canvas.width/2, 0);
	ctx.stroke();
	
	ctx.beginPath();
	ctx.setLineDash([10, 6]);/*dashes are 5px and spaces are 3px*/
	ctx.lineWidth = 2;
	ctx.strokeStyle = "black";
	ctx.moveTo(           0, canvas.height-cg[1]-bottom_margin);
	ctx.lineTo(canvas.width, canvas.height-cg[1]-bottom_margin);
	ctx.stroke();
		
	ctx.font = "20px Arial";
	ctx.fillStyle = "#000"; 
	ctx.fillText("x",            0+3, canvas.height-cg[1]-bottom_margin-5);
	ctx.fillText("x", canvas.width-10, canvas.height-cg[1]-bottom_margin-5);
	ctx.font = "20px Arial";
	ctx.fillStyle = "#000";
	ctx.fillText("y",canvas.width/2+2, canvas.height-3);
	ctx.fillText("y",canvas.width/2+2, 10);
	
	
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
		[{label: 'Section', type: 'string'},
		 {label: 'Section 1', type: 'number'},
		 {label: 'Section 2', type: 'number'},
		 {label: 'Section 3', type: 'number'},
		 {label: 'Section 4', type: 'number'}],
		['Moment of inertia,\n Ixx', 0, 0, 0, 0],
		['Moment of inertia,\n Iyy', 0, 0, 0, 0],
		['Polar moment\n of inertia, Izz', 0, 0, 0, 0]
		];
	
	var array3 = [
		[{label: 'Section', type: 'string'},
		 {label: 'Section 1', type: 'number'},
		 {label: 'Section 2', type: 'number'},
		 {label: 'Section 3', type: 'number'},
		 {label: 'Section 4', type: 'number'}],
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
			array1[1][s] = 0;
		
			array2[1][s] = 0;
			array2[2][s] = 0;
			array2[3][s] = 0;
			
			array3[1][s] = 0;
			array3[2][s] = 0;
			array3[3][s] = 0;
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
	var myAxisTitle = 'Lighter \u21D0   \u21D2 Heavier          ';
	//alert(myChartId);
	drawChart(array1,ref,myChartId,myAxisTitle,num);
	
	myChartId = 'Chart2';
	var myAxisTitle = 'Lower stiffness \u21D0   \u21D2 Higher stiffness              ';
	//alert(myChartId);
	drawChart(array2,ref,myChartId,myAxisTitle,num);
	
	myChartId = 'Chart3';
	var myAxisTitle = 'Lower stress \u21D0   \u21D2 Higher stress          ';
	//alert(myChartId);
	drawChart(array3,ref,myChartId,myAxisTitle,num);
	
	//alert('charts done');
}

function drawChart(array,ref,myChartId,myAxisTitle,num) {
	//alert(array);
	//alert(myChartId)
	var rows = array.length - 1;
	var cols = array[0].length - 1;
	
	var yValues = [[]];
	for (var k = 0; k < cols-1; k++) {
		yValues.push([]);
	}
	//alert(xyValues.length);
	
	var ymax = 0;
	var xValues = [];
	for (var k = 0; k < cols; k++) {
		var temp = [];
		for (var i = 0; i < rows; i++) {
			temp[i] = array[i+1][k+1].toExponential(2);
			xValues[i] = array[i+1][0];
			ymax = Math.max(ymax,temp[i]);
		}
		yValues[k] = temp;		
		//alert(array[0][k+1].label);
		//alert(yValues[k]);
    }
	
	//alert(ref)
	//alert(num)
	
	var datalabels_format = function calculate(value,context) {
		var {ref,num} = getRef();
		var index = context.datasetIndex; // column index
		var k = context.dataIndex; // row indexif (index+1 == ref) { 
		if (num == 1) { 
			out = value;//+' index+1='+(index+1)+' ref='+ref+' row='+k;
		} else if (index+1 == ref) { 
			out = 'reference';//+' index+1='+(index+1)+' ref='+ref+' row='+k;
		} else {
			var value_ref = context.chart.data.datasets[ref-1].data[k] ;
			var percent = ((value-value_ref)/value_ref* 100).toFixed(1);
			if (percent > 0) percent =  '+'+percent;
			out = percent+'%';//+' index+1='+(index+1)+' ref='+ref+' row='+k;
		}
		return out;
	};
	
	function formatLabel(str, maxwidth) {
		var sections = [];
		var words = str.split(" ");
		var temp = "";
		words.forEach(function(item, index){
			if(temp.length > 0)
			{
				var concat = temp + ' ' + item;
				if(concat.length > maxwidth){
					sections.push(temp);
					temp = "";
				}
				else{
					if(index == (words.length-1))
					{
						sections.push(concat);
						return;
					}
					else{
						temp = concat;
						return;
					}
				}
			}
			if(index == (words.length-1))
			{
				sections.push(item);
				return;
			}
			if(item.length < maxwidth) {
				temp = item;
			}
			else {
				sections.push(item);
			}
		});
		return sections;
	};

    //if (typeof Chart3 ==="undefined") {
	var myDataset = {
		type: 'horizontalBar',
		data: {
			labels: xValues,
			datasets: [],
			},
		options: {
            animation: {
                duration: 0,
                },
			responsive: true,
			maintainAspectRatio: false,
			legend: false,
			scales: {
				xAxes: [{
					ticks: {
						beginAtZero: true,
						display: false,
						},
					afterDataLimits(scale) {
							scale.max = scale.max*1.25;
						},					
					scaleLabel: {
						display: true,
						labelString: myAxisTitle,
						},
					}],
				
				yAxes: [{
					ticks: {
						callback: function (label){
							return formatLabel(label,20)
							}
						},
					}]
				},
			tooltips: {
                mode: 'index',
                intersect: false,
                callbacks: {
                    //beforeBody: function(tooltipItem, data) {
                    //    return 'Change of '},
                    label: function(tooltipItem, data) {
							var {ref,num} = getRef();
							var index = tooltipItem.datasetIndex;
							var value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
							var value_ref = data.datasets[ref-1].data[tooltipItem.index];
							if (index+1 == ref) {
								var out = value+' (reference)';
							} else {
								var percent = ((value-value_ref)/value_ref* 100).toFixed(1);
								if (percent > 0) percent =  '+'+percent;
								var out = value+' ('+percent+'%)';
							}
							return out;
                        },
					},
				},
			plugins: {
				datalabels: {
					align: function(context) {
						var index = context.dataIndex;
						var value = context.dataset.data[index];
						var invert = Math.abs(value) <= 1;
						//return index > 1 ? 'end' : 'start'
						return 'end'
						},
					anchor: 'end',
					backgroundColor: null,
					borderColor: null,
					borderRadius: 4,
					borderWidth: 1,
					color: '#333333',
					font: {
						size: 11,
						weight: 400
						},
					offset: 4,
					padding: 0,	
					display: true,
					formatter: datalabels_format,
					},
				},
			},
		};
	/*} else {
	var myDataset = {
		data: {
			datasets: [], label: '',backgroundColor: '',hidden: true,
			},
		};
	}*/
	for (var k = 0; k < cols; k++) {
		if (yValues[k][0] == 0){var bool = true;}else{var bool = false;}
		myDataset.data.datasets[k] = {
			data: yValues[k],
            label: array[0][k+1].label,
			backgroundColor: fillColors[k],
			hidden: bool,
		    };
	}
	
	//alert('got here')
    switch (myChartId) {
        case 'Chart1':
            if(typeof Chart1 ==="undefined"){ window.Chart1 = new Chart(document.getElementById(myChartId), myDataset);
            }else{
                window.Chart1.config=myDataset; window.Chart1.update();
            }
            break;
        case 'Chart2':
            if(typeof Chart2 ==="undefined"){ window.Chart2 = new Chart(myChartId, myDataset);
            }else{
                window.Chart2.config=myDataset; window.Chart2.update();
            }
            break;
        case 'Chart3':
            if(typeof Chart3 ==="undefined"){ window.Chart3 = new Chart(myChartId, myDataset);
            }else{
                window.Chart3.config=myDataset; window.Chart3.update();
            }
            break;
        default:
            break;
    }
	
}
var Chart1, Chart2, Chart3;

function getRef(){
	var ref = 0;
	var filled = [];
	var s = 1;
	var formList = document.getElementsByName('myForm');
	for (var fm of formList) {
		var section = fm.querySelectorAll('select[name="sectionSelector"]')[0].value;
		if (section != 'None') {
			filled.push(s);
			var isRef = fm.querySelectorAll('input[name="refSwitch"]')[0].checked;
			if (isRef == true) ref = s; 
		}
		s = s + 1;
	}
	if (ref == 0 && filled.length > 0) ref = filled[0];
	var num = filled.length;
	
return {ref,num};
}

function dimChange(elem){
	/*alert("dimChange.."+elem.tagName+elem.value);*/
	var myForm = elem.closest('div[name="myForm"]');
	recalculateSection(myForm);	
	updatePictures();
	drawCharts();
	//saveForm();
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
	///alert(section+h+b+t+t2+mycanvas);
	
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
	updateTooltips();
	//saveForm();
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

function updateTooltips() {
	var formList = document.getElementsByName('myForm');
	for (const fm of formList) {
		var section = fm.querySelectorAll('select[name="sectionSelector"]')[0].value;
		var path = getImgPath(section);
		fm.querySelectorAll('img[name="tooltip-image"]')[0].src = path;
	}
}

function getImgPath(section) {
	switch(section) {
		case 'Circular':
			imgPath = "images/dimensions/sections/Slide1.png";
			break;
		case 'Circular tube':
			imgPath = "images/dimensions/sections/Slide2.png";
			break;
		case 'Rectangular':
			imgPath = "images/dimensions/sections/Slide3.png";
			break;
		case 'Rectangular tube':
			imgPath = "images/dimensions/sections/Slide4.png";
			break;
		case 'L section':
			imgPath = "images/dimensions/sections/Slide5.png";
			break;
		case 'C channel':
			imgPath = "images/dimensions/sections/Slide6.png";
			break;
		case 'U channel':
			imgPath = "images/dimensions/sections/Slide7.png";
			break;
		case 'I section':
			imgPath = "images/dimensions/sections/Slide8.png";
			break;
		case 'H section':
			imgPath = "images/dimensions/sections/Slide9.png";
			break;
		case 'T section':
			imgPath = "images/dimensions/sections/Slide10.png";
			break;
		default:
			imgPath = "images/dimensions/sections/none.png";
			break;
	}
	//alert('update done');
	return imgPath;
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
		case 'T section':
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
		case 'T section':
			var h = dims[0];
			var b = dims[1];
			var tw = dims[2];
			var tf = dims[3];
			res.A = b*tf + (h-tf)*tw;
			res.perimeter = 2*b + 2*h;
			res.xc = b/2;
			res.yc = h-(tw*h*h+(b-tw)*tf*tf)/(2*res.A);
			var Ix0 = tw*h*h*h/3 + (b-tw)*tf*tf*tf/3;
			res.Ixx = Ix0 - res.A*(h-res.yc)*(h-res.yc);
			res.Iyy = (h-tf)*tw*tw*tw/12 + tf*b*b*b/12;
			res.Izz = res.Ixx + res.Iyy;
			res.Sx_min = res.Ixx/(res.yc);
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
		case 'T section':
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
				{x: x0+b/2-tw/2 , y: y0 },
				{x: x0+b/2+tw/2 , y: y0 },
				{x: x0+b/2+tw/2 , y: y0-h+tf },
				{x: x0+b        , y: y0-h+tf },
				{x: x0+b        , y: y0-h }
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
  },
  {
    "text"  : "T section",
    "value" : "T section",
  }
];

//const fillColors = ['#3cba54','#f4c20d','#db3236','#4885ed'];
//const lineColors = ['#298039','#b38f09','#992326','#3664b3'];

//const fillColors = ['#2ecc70','#3498db','#e64b3b','#e67e22']; //#3d566e
//const lineColors = ['#26ae60','#2880b8','#c0392b','#d25300'];//#2c3e50
const fillColors = ['#3cba54','#3498db','#e64b3b','#e67e22']; //#3d566e
const lineColors = ['#298039','#2880b8','#c0392b','#d25300'];//#2c3e50


$(document).ready(function() {
    var selectBoxList = document.querySelectorAll('select[name="sectionSelector"]');
    for (const selectBox of selectBoxList) {
        for(var i = 0, l = options.length; i < l; i++){
            var option = options[i];
            selectBox.options.add( new Option(option.text, option.value, option.selected) );
        }
    }

    var myForm = document.querySelector('#Form1');
    var section = myForm.querySelectorAll('select[name="sectionSelector"]')[0];
    section.value = "Circular tube";
    var myForm = document.querySelector('#Form2');
    var section = myForm.querySelectorAll('select[name="sectionSelector"]')[0];
    section.value = "Circular tube";

    //loadForm();
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
    drawCharts();
    updateTooltips();
    //alert('all done');
    /*
    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
    })*/
});