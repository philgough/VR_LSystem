var
	day1 = [],
	day2 = [],
	day3 = [],
	day4 = [],
	day5 = [],
	day6 = [],
	day7 = [],
	day8 = [];
	// day9 = [],
	// day10 = [];

gameOrder = [
	['Holoball', 4],
	['Fruitninja', 6],
	['Holopoint', 8],
	['Longbow', 12],
	['Longbow', 14],
	['Holopoint', 18],
	['HotSquat', 21],
	['Fruitninja', 26],
	['HotSquat', 28],
	['Longbow', 29]


];

gameColours = {
	'HotSquat': '#B10DC9',
	'Longbow':'#3D9970',
	'Fruitninja': '#01FF70',
	'Holoball': '#F012BE',
	'Holopoint': '#FFDC00',
};


var loadFiles = function() {
	console.log("loading files");
	d3.csv('data/day1.csv').then(function(data) {
		//console.log('loaded day1');
		// day1 = data;
		drawCal('Monday', 4, data, gameOrder[0][0],  0);
	})
	d3.csv('data/day2.csv').then(function(data) {
		//console.log('loaded day2');
		// day2 = data;
		drawCal('Wednesday', 6, data, gameOrder[1][0],  1);
	})
	d3.csv('data/day3.csv').then(function(data) {
		//console.log('loaded day3');
		// day3 = data;
		drawCal('Friday', 8, data, gameOrder[2][0], 2);
	})
	d3.csv('data/day4.csv').then(function(data) {
		//console.log('loaded day4');
		// day4 = data;
		drawCal('Tuesday', 12, data, gameOrder[3][0], 3);
	})
	d3.csv('data/day5.csv').then(function(data) {
		//console.log('loaded day5');
		// day5 = data;
		drawCal('Thursday', 14, data, gameOrder[4][0], 4);
	})
	d3.csv('data/day6.csv').then(function(data) {
		//console.log('loaded day6');
		// day6.push(data);
		drawCal('Monday', 18, data, gameOrder[5][0], 5);
	})
	d3.csv('data/day7.csv').then(function(data) {
		//// console.log('loaded day7');
		// day7.push(data);
		drawCal('Thursday', 21, data, gameOrder[6][0], 6);
	})
	d3.csv('data/day8.csv').then(function(data) {
		//// console.log('loaded day8');
		// day8.push(data);
		drawCal('Tuesday', 26, data, gameOrder[7][0], 7);
	})
	d3.csv('data/day9.csv').then(function(data) {
		// console.log('loaded day9');
		drawCal('Thursday', 28, data, gameOrder[8][0], 8);
	})
	d3.csv('data/day10.csv').then(function(data) {
		//// console.log('loaded day1')
		drawCal('Friday', 29, data, gameOrder[9][0], 9)
	})

}
// create the calendar layout
chartPadding = {
	'left': 11,
	'right': 10,
	'top': 25,
	'bottom': 10
}



// gameOrder = [
// 	'Holoball'
// 	'Longbow',
// 	'Holopoint',
// 	'Longbow',
// 	'Fruitninja',
// 	'Longbow',
// 	'Longbow'
// ]



days = [
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
		'Sunday'
];


d3.select('body').append("svg")
	.attr("class", 'chart')
	.attr("width", 1200)
	.attr('height', 600);

bgElements = d3.select('svg').append('g')

bgElements.append("rect")
	.attr("fill", '#efefef')
	.attr("stroke", 'none')
	.attr("x", 590)
	.attr("y", 0)
	.attr('width', 240)
	.attr('height', 600)

bgElements.append("rect")
	.attr("fill", '#dddddd')
	.attr("stroke", 'none')
	.attr("x", 0)
	.attr("y", 0)
	.attr('width', 830)
	.attr('height', 15)


// stepCount = new Array(30);
// for(var i = 0; i < stepCount.length; i++) {
// 	var rand = 0;
// 	for (var j = 0; j < 6 ; j++) {
// 		rand += Math.random();
// 	}
// 	stepCount[i] = Math.floor(rand/6  * 12000 + 2000)
// }
var calendarData = [];
for (var i = 0; i < 30; i++) {
	// friday was the 1st of Sept.
	var datum = {}
	var j = i + 4;
	datum.todate = i+1
	datum.today = days[(i + 4)%7];
	datum.xPos = j % 7 * 120 + 1;
    datum.yPos = Math.floor(j/7) * 120 + 15;

	var rand = 0;
	for (var j = 0; j < 6 ; j++) {
		rand += Math.random();
	}
    
    datum.stepCount = Math.floor(rand/6 * 12000 + 2000)
    
    datum.vrToday = false;
    
    for (var k = gameOrder.length - 1; k >= 0; k--) {
    	// console.log(gameOrder[k][1], datum.todate)
    	if (gameOrder[k][1] === datum.todate) {
    		datum.vrToday = true;
    	}
    }
	    
    calendarData.push(datum)
}

calendarBoxes = d3.select("svg").append('g')
calendarBoxesL2 = d3.select("svg").append('g')

calendarBoxesL2.selectAll('rect')
	.data(calendarData).enter()
	.append('rect')
	    .attr('x', function(d, i) {
	    	// console.log(d)
			var j = i + 4;
			var xPos = j % 7 * 120 + 1;
		    // var yPos = Math.floor(j/7) * 120 + 15;
		    return xPos;
		})
	    .attr('y', function(d, i) {
			var j = i + 4;
			// var xPos = j % 7 * 120 + 1;
		    var yPos = Math.floor(j/7) * 120 + 15;
	    	return yPos;

	    })
	    .attr('width', 100)
	    .attr('height', 4)
	    .attr('fill', function(d) {
	    	var colour = '#DDDDDD'
	    	if (d.stepCount > 10000) {
	    		colour = '#0074D9'
	    	}
	    	else {
	    		if (d.stepCount > 5000) {
	    			colour = '#7FDBFF'
	    		}
	    	}
	    	return colour;
	    })
	    .on('mouseover', function(d) {

	    	// console.log(d);
	    	if (d.vrToday) {

		    vrBodymapOver(d.today, d.todate)
		    	// d3.select('#bodymap-none')
		    	// 	.attr('visibility', 'hidden');
		    	// d3.select('#bodymap-'+d.today+'-'+d.todate)
		    	// 	.attr('visibility', 'visible');
	    	}

	    })
	    .on('mouseleave', function(d) {
	    	if (d.vrToday) {

		    	vrBodymapLeave(d.today, d.todate);
		    	// d3.select('#bodymap-none')
		    	// 	.attr('visibility', 'visible');
		    	// d3.select('#bodymap-'+d.today+'-'+d.todate)
		    	// 	.attr('visibility', 'hidden');
	    	}

	    })

	// .append('text')
	// 	.attr("x", function(d, i) {
	// 		var j = i + 4;
	// 		var xPos = j % 7 * 120 + 1;
	// 	    var yPos = Math.floor(j/7) * 120 + 15;    	
	// 		return xPos + 3;
	// 	})
	// 	.attr("y", function(d, i) {
	// 		var j = i + 4;
	// 		var xPos = j % 7 * 120 + 1;
	// 	    var yPos = Math.floor(j/7) * 120 + 15;
	// 		return yPos + 13;
	// 	})
	// 	.text(function(d, i) {return i+1});

// calendar



calendarBoxes.selectAll('rect')
	.data(calendarData).enter()
    .append('rect')
    .attr("x", function (d) {return d.xPos})
    .attr('y', function (d){return d.yPos})
    .attr('width', 100)
    .attr('height', 100)
    // .attr('y', 100)
    .attr('stroke', 'black')
    .attr("fill", 'white')
    .attr('id', function(d) {return 'date-rect-'+d.todate})
    .on('mouseover', function(d) {

    	// console.log(d);
    	if (d.vrToday) {

	    vrBodymapOver(d.today, d.todate)
	    	// d3.select('#bodymap-none')
	    	// 	.attr('visibility', 'hidden');
	    	// d3.select('#bodymap-'+d.today+'-'+d.todate)
	    	// 	.attr('visibility', 'visible');
    	}

    })
    .on('mouseleave', function(d) {
    	if (d.vrToday) {

	    	vrBodymapLeave(d.today, d.todate);
	    	// d3.select('#bodymap-none')
	    	// 	.attr('visibility', 'visible');
	    	// d3.select('#bodymap-'+d.today+'-'+d.todate)
	    	// 	.attr('visibility', 'hidden');
    	}

    })


calendarBoxes.selectAll('text')
	.data(calendarData).enter()
    .append('text')
    .attr("x", function(d) {
    	return d.xPos + 3;
    })
    .attr("y", function(d) {
    	return d.yPos + 13;
    })
    .text(function(d) {//return d.today[0] + ' ' + d.todate
    	return d.todate
    })
    .on('mouseover', function(d) {

	    	// console.log(d);
	    	if (d.vrToday) {

		vrBodymapOver(d.today, d.todate)
		    	// d3.select('#bodymap-none')
		    	// 	.attr('visibility', 'hidden');
		    	// d3.select('#bodymap-'+d.today+'-'+d.todate)
		    	// 	.attr('visibility', 'visible');
	    	}

	    })
	    .on('mouseleave', function(d) {
	    	if (d.vrToday) {

		    	vrBodymapLeave(d.today, d.todate);
		    	// d3.select('#bodymap-none')
		    	// 	.attr('visibility', 'visible');
		    	// d3.select('#bodymap-'+d.today+'-'+d.todate)
		    	// 	.attr('visibility', 'hidden');
	    	}

	    })
;


// }

for (var i = 0; i < 7; i++) {
	var j = i + 4;
	var xPos = j % 7 * 120 + 1;
	d3.select('svg').append('text')
		.attr('class', 'days')
		.attr('x', xPos)
		.attr('y', 10)
		.attr("font-weight", 'bold')
		.text(days[j%7]);
}



var OffsetX = function(today, todate) {
	// friday was the first
	var xPos = days.indexOf(today) % 7 * 120 + chartPadding.left;
	return xPos;
	
}

var OffsetY = function(today, todate) {
	// console.log(todate);
	j = todate + 5;

	var yPos = Math.floor(j/7) * 120 + chartPadding.top;
	// console.log(today, todate, j, yPos);
	return yPos;
}


// legend

var cols = ['#0074D9','#FFBF1C','#FF4136'];
var colLevels = ['Low', 'Moderate', 'Vigorous'];


d3.select('svg').append('text')
	.attr('x', 5)
	.attr('y', 26)
	.attr('font-weight', 'bold')
	.text('Workout Intensity:')

for (var i = 0; i < 3; i++) {
	d3.select("svg").append("rect")
		.attr("x", 5)
		.attr("y", i * 12 + 33 )
		.attr("width", 10)
		.attr("height", 10)
		.attr("fill", cols[i])

	d3.select("svg").append("text")
		.attr("x", 17)
		.attr("y", i * 12 + 41)
		.text(colLevels[i])

}

d3.select("svg").append("text")
	.attr("font-weight", 'bold')
	.attr("x", 145)
	.attr("y", 26)
	.text("VR Game played:");




var colCounter = 0;
for (var key in gameColours) {

	var bg_vr = d3.select('svg').append('g').attr('id', 'vr-icon-'+key);

};

colCounter = 0
d3.xml("img/vr.svg").then(function(xml) {
	var importedNode = document.importNode(xml.documentElement, true);
	d3.select('#vr-icon-HotSquat').each(function() {
		// console.log('internal',key)
		this.appendChild(importedNode);
		// console.log('this', this)

	})
	// inside of our d3.xml callback, call another function
	// that styles individual paths inside of our imported svg
	// legendVR();
		var temp = d3.select('#vr-icon-HotSquat')

	temp.select('svg')	
		.attr('width', '20')
		.attr('x', 145)
		.attr('y', -265 + 12 * colCounter)
		.attr('fill', function() {return gameColours['HotSquat']})
		
	temp.append("text")
		.attr("x", 170)
		.attr("y", colCounter * 12 + 38)
		.text('Hot Squat');

	colCounter++;
});
d3.xml("img/vr.svg").then(function(xml) {
	var importedNode = document.importNode(xml.documentElement, true);
	d3.select('#vr-icon-Longbow').each(function() {
		// console.log('internal',key)
		this.appendChild(importedNode);
		// console.log('this', this)

	})
	// inside of our d3.xml callback, call another function
	// that styles individual paths inside of our imported svg
	// legendVR();
	var temp = d3.select('#vr-icon-Longbow')

	temp.select('svg')	
		.attr('width', '20')
		.attr('x', 145)
		.attr('y', -265 + 12 * colCounter)
		.attr('fill', function() {return gameColours['Longbow']})
		
	temp.append("text")
		.attr("x", 170)
		.attr("y", colCounter * 12 + 38)
		.text('Longbow');

	colCounter++;
});
d3.xml("img/vr.svg").then(function(xml) {
	var importedNode = document.importNode(xml.documentElement, true);
	d3.select('#vr-icon-Fruitninja').each(function() {
		// console.log('internal',key)
		this.appendChild(importedNode);
		// console.log('this', this)

	})
	// inside of our d3.xml callback, call another function
	// that styles individual paths inside of our imported svg
	// legendVR();
		var temp = d3.select('#vr-icon-Fruitninja')

	temp.select('svg')	
		.attr('width', '20')
		.attr('x', 145)
		.attr('y', -265 + 12 * colCounter)
		.attr('fill', function() {return gameColours['Fruitninja']})
	
	temp.append("text")
		.attr("x", 170)
		.attr("y", colCounter * 12 + 38)
		.text('Fruitninja');	
		

	colCounter++;
});
d3.xml("img/vr.svg").then(function(xml) {
	var importedNode = document.importNode(xml.documentElement, true);
	d3.select('#vr-icon-Holoball').each(function() {
		// console.log('internal',key)
		this.appendChild(importedNode);
		// console.log('this', this)

	})
	// inside of our d3.xml callback, call another function
	// that styles individual paths inside of our imported svg
	// legendVR();
	var temp = d3.select('#vr-icon-Holoball')

	temp.select('svg')	
		.attr('width', '20')
		.attr('x', 145)
		.attr('y', -265 + 12 * colCounter)
		.attr('fill', function() {return gameColours['Holoball']})
		
	temp.append("text")
		.attr("x", 170)
		.attr("y", colCounter * 12 + 38)
		.text('Holoball');	

	colCounter++;
});
d3.xml("img/vr.svg").then(function(xml) {
	var importedNode = document.importNode(xml.documentElement, true);
	d3.select('#vr-icon-Holopoint').each(function() {
		// console.log('internal',key)
		this.appendChild(importedNode);
		// console.log('this', this)

	})
	// inside of our d3.xml callback, call another function
	// that styles individual paths inside of our imported svg
	var temp = d3.select('#vr-icon-Holopoint')

	temp.select('svg')	
		.attr('width', '20')
		.attr('x', 145)
		.attr('y', -265 + 12 * colCounter)
		.attr('fill', function() {return gameColours['Holopoint']})
		
	temp.append("text")
		.attr("x", 170)
		.attr("y", colCounter * 12 + 38)
		.text('Holopoint');	

	colCounter++;
});




calSidebar = d3.select('svg').append('g')
	.attr('class', 'sidebar')


calSidebar.append('rect')
	.attr('x', 833)
	.attr('y', 0)
	.attr('width', 350)
	.attr('height', 600)
	.attr('stroke', '#AAAAAA')
	.attr('fill', 'none')



d3.select('.sidebar').append('svg:image')
	.attr('class', 'bodymap')
	.attr('id', 'bodymap-none')
	.attr('xlink:href', 'img/PNG/map-none.png')
	.attr('x', 830)
	.attr('y', 0)
	.attr('visibility', 'visible')















var drawCal = function(today, todate, input_data, gameName, dayNum) {

	console.log("drawing calendar", input_data[0]);

    var w = window.innerwidth,
        h = window.innerheight;








    HR_max = 190;
    HR_vig = HR_max * .75;
    HR_mod = HR_max * .5;




    var theta = Math.PI / 2.0,
        length = 3,
        x0 = 1,
        y0 = 10,
        t0 = Math.PI / 2.0;
    lineData = [];
    function tree(string) {

		counter = 0;
        string.split('').forEach(function(a) { if ('F'.includes(a)) { counter += 1 } })

        // console.log('counter:', counter);







        
        var tree = [],
            root = { path: "M" + x0 + "," + y0, children: [] },
            step = { x: x0, y: y0, t: t0, branch: root };



        thisLine = 0;
        var instructions = {
            'F': function() {
                datum = { 'x1': step.x, 'y1': step.y };
                step.x -= length * Math.cos(step.t);
                step.y -= length * Math.sin(step.t);
                datum['x2'] = step.x;
                datum['y2'] = step.y;

                // / smooth the data, since we don't have as many lines as samples


                inc = Math.floor(input_data.length / counter);

                av = 0;


                for (var i =  0; i < 5; i++) {
                	if (thisLine < input_data.length) {
						if (thisLine < 5) {
							j = thisLine + i;
							av += (+input_data[j]['HR (bpm)']);
						}
						else {
							j = thisLine - (i - 5);
							// console.log(j);
							av += (+input_data[j]['HR (bpm)']);
						}
					}
                }

                av /= 5;
                datum.value = av;
                // console.log(av);
                thisLine += inc;

                datum.game = gameName;
                lineData.push(datum);

                step.branch.path += "L" + step.x + "," + step.y;

                // pStep.branch.path += "L" + step.x + "," + step.y;
            },
            '+': function() {
                step.t += theta;
            },
            '-': function() {
                step.t -= theta;
            },
            '[': function() {
                tree.push(step);
                step = Object.create(step);
                var branch = { path: "M" + step.x + "," + step.y, children: [] };
                step.branch.children.push(branch);
                step.branch = branch;
            },
            ']': function() {
                step = tree.pop();
            }
        };

        string.split('').forEach(function(a) { if ('F+-[]'.includes(a)) { instructions[a](); } });
        // console.log(root);

        return root;
    }

    var creatorG = d3.select("svg").append("g")
        .attr("width", w)
        .attr("height", h)
        .attr('class', 'l-system-creator')
        .datum(tree(line(3, {
            // "F": "F-[-F+F+F-FF]+[+FF-F-F-]",
            'X': "XFX-YF-YF+FX+FX-YF-YFFX+YF+FXFXYF-FX+YF+FXFX+YF-FXYF-YF-FX+FX+YFYF-",
            'Y': "+FXFX-YF-YF+FX+FXYF+FX-YFYF-FX-YF+FXYFYF-FX-YFFX+FX+YF-YF-FX+FX+YFY",
	            'A': "+YF"
        }, 'A')))
        .each(grow);

    function grow(d) {
        // d3.select(this).append("path")
        // .attr("stroke", "black")
        // .attr("stroke-opacity", 0)
        // .attr("stroke-width", function(d, i) { i * Math.PI / 38 })
        // .attr("fill", "none")
        // .attr("d", function(d) { return d.path; });

        d3.select(this).selectAll("g")
            .data(d.children)
            .enter().append("g")
            .transition()
            .each("start", grow);
    }

    function line(n, rules, axiom) {
        if (n == 0) {
            return axiom;
        } else {
            return line(--n, rules, axiom.replace(/./g, function(a) { return rules[a] || a; }));
        }
    }


    chart = d3.select('svg').append('g')
    	.attr("class", 'l-system')
        .attr('id', today + '-' + todate)
        .attr('width', window.innerwidth)
        .attr('hight', window.innerheight);


	d3.xml("img/vr.svg").then(function(xml) {
		var importedNode = document.importNode(xml.documentElement, true);
		d3.select('#'+today + '-' + todate).each(function() {
			this.appendChild(importedNode);

		})
		// inside of our d3.xml callback, call another function
		// that styles individual paths inside of our imported svg

		 vrIconStyling()
	});

	function vrIconStyling() {
		d3.select('#'+today + '-' + todate).select('svg')
			.attr('width', '20')
			.attr('fill', function() {return gameColours[gameName]})
	    	.attr('x', function() {return OffsetX(today, todate) + 68})
	    	.attr('y', function() {return OffsetY(today, todate) - 300})

	    	.on('mouseover', function(d) {

	    	// console.log(d);
	    	// if (d.vrToday) {

		    	vrBodymapOver(today, todate)
		    	// d3.select('#bodymap-none')
		    	// 	.attr('visibility', 'hidden');
		    	// d3.select('#bodymap-'+today+'-'+todate)
		    	// 	.attr('visibility', 'visible');
	    	// }

	    })
	    .on('mouseleave', function(d) {
	    	// if (d.vrToday) {

		    	vrBodymapLeave(today, todate);
		    	// d3.select('#bodymap-none')
		    	// 	.attr('visibility', 'visible');
		    	// d3.select('#bodymap-'+today+'-'+todate)
		    	// 	.attr('visibility', 'hidden');
	    	// }

	    })


	}

	d3.select('.sidebar').append('svg:image')
		.attr('class', 'bodymap')
		.attr('id', 'bodymap-'+today+'-'+todate)
		.attr('xlink:href', 'img/PNG/map-'+(dayNum + 1)+'.png')
		.attr('x', 830)
		.attr('y', 0)
		.attr('visibility', 'hidden');

	// d3.select('.sidebar').
	
	// d3.xml('img/map-'+(dayNum + 1)+'.svg').then(function(xml) {
	// 	var importedNode = document.importNode(xml.documentElement, true);
	// 	d3.select('#bodymap-'+today + '-' + todate).each(function() {
	// 		this.appendChild(importedNode);

	// 	})
	// 	d3.select('#bodymap-'+today + '-' + todate)
	// 		.attr('x', 300 + 50 * dayNum)
	// })

    chart.selectAll('line')
        .data(lineData).enter()
        .append('line')

        .attr('x1', function(d) {
        	off = OffsetX(today, todate);
            return d.x1 + off;
        })
        .attr('y1', function(d) {
            off = OffsetY(today, todate);
            return d.y1 + off;
        })
        .attr('x2', function(d) {
            off = OffsetX(today, todate);
            return d.x2 + off;
        })
        .attr('y2', function(d) {
            off = OffsetY(today, todate);
            return d.y2 + off;
        })
        .attr('stroke', function(d) {

        	ret = cols[0];
        	if (d.value > HR_mod) {
        		ret = cols[1]
        	}
        	if (d.value > HR_vig) { 
        		ret = cols[2];
        	}
        	return ret;

        	
            // return 'rgb(255, 0, ' + d.value + ')';
        })
        .attr("stroke-opacity", 1)
        .on('mouseover', function(d) {

	    	// console.log(d);
	    	// if (d.vrToday) {

		    vrBodymapOver(today, todate)
		    	// d3.select('#bodymap-none')
		    	// 	.attr('visibility', 'hidden');
		    	// d3.select('#bodymap-'+today+'-'+todate)
		    	// 	.attr('visibility', 'visible');
	    	// }

	    })
	    .on('mouseleave', function(d) {
	    	// if (vrToday) {

		    	vrBodymapLeave(today, todate);
		    	// d3.select('#bodymap-none')
		    	// 	.attr('visibility', 'visible');
		    	// d3.select('#bodymap-'+today+'-'+todate)
		    	// 	.attr('visibility', 'hidden');
	    	// }

	    })
;

  //   chart.selectAll('circle')
  //   	.data([today, todate, gameOrderIndex]).enter()
  //   	.append('circle')
  //   	.attr("cx", function(d) {return OffsetX(today, todate) + 83})
  //   	.attr('cy', function(d) {return OffsetY(today, todate) - 3})
  //   	.attr('r', 4)
  //   	.attr('fill', function(d) {return gameColours[gameName]})
		// .attr("stroke", 'black')
		// .attr("stroke-width", 0.25);

	

}


loadFiles();


function vrBodymapOver(today, todate) {
	d3.select('#bodymap-none')
		.attr('visibility', 'hidden');
	d3.select('#bodymap-'+today+'-'+todate)
		.attr('visibility', 'visible');
}

function vrBodymapLeave(today, todate) {
	d3.select('#bodymap-none')
		.attr('visibility', 'visible');
	d3.select('#bodymap-'+today+'-'+todate)
		.attr('visibility', 'hidden');
}
