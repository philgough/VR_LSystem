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

var loadFiles = function() {
	console.log("loading files");
	d3.csv('data/day1.csv').then(function(data) {
		//console.log('loaded day1');
		// day1 = data;
		drawCal('Monday', 4, data);
	})
	d3.csv('data/day2.csv').then(function(data) {
		//console.log('loaded day2');
		// day2 = data;
		drawCal('Wednesday', 6, data);
	})
	d3.csv('data/day3.csv').then(function(data) {
		//console.log('loaded day3');
		// day3 = data;
		drawCal('Friday', 8, data);
	})
	d3.csv('data/day4.csv').then(function(data) {
		//console.log('loaded day4');
		// day4 = data;
		drawCal('Tuesday', 12, data);
	})
	d3.csv('data/day5.csv').then(function(data) {
		//console.log('loaded day5');
		// day5 = data;
		drawCal('Thursday', 14, data);
	})
	d3.csv('data/day6.csv').then(function(data) {
		//console.log('loaded day6');
		// day6.push(data);
		drawCal('Monday', 18, data);
	})
	d3.csv('data/day7.csv').then(function(data) {
		//// console.log('loaded day7');
		// day7.push(data);
		drawCal('Thursday', 21, data);
	})
	d3.csv('data/day8.csv').then(function(data) {
		//// console.log('loaded day8');
		// day8.push(data);
		drawCal('Tuesday', 26, data);
	})
	d3.csv('data/day9.csv', function(data) {
		//// console.log('loaded day1')
		drawCal('Thrsday', 28, data);
	})
	d3.csv('data/day10.csv', function(data) {
		//// console.log('loaded day1')
		drawCal('Friday', 29, data)
	})

}
// create the calendar layout
chartPadding = {
	'left': 11,
	'right': 10,
	'top': 25,
	'bottom': 10
}



days = ['Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday'
];



d3.select('body').append("svg")
	.attr("class", 'chart')
	.attr("width", 900)
	.attr('height', 600);

d3.select("svg").append("rect")
	.attr("fill", '#dddddd')
	.attr("stroke", 'none')
	.attr("x", 0)
	.attr("y", 0)
	.attr('width', 822)
	.attr('height', 15)

// calendar
for (var i = 0; i < 30; i++) {
	// friday was the 1st of Sept.
	var j = i + 5;
	var xPos = j % 7 * 120 + 1;
    var yPos = Math.floor(j/7) * 120 + 15;



    d3.select("svg").append('rect')
    .attr("x", xPos)
    .attr('y', yPos	)
    .attr('width', 100)
    .attr('height', 100)
    // .attr('y', 100)
    .attr('stroke', 'black')
    .attr("fill", 'none');

    d3.select("svg").append('text')
    .attr("x", function() {
    	return xPos + 3;
    })
    .attr("y", function() {
    	return yPos + 13;
    })
    .text(i+1);

	

}


for (var i = 0; i < 7; i++) {
	var j = i + 5;
	var xPos = j % 7 * 120 + 1;
	d3.select('svg').append('text')
		.attr('class', 'days')
		.attr('x', xPos)
		.attr('y', 10)
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




var drawCal = function(today, todate, input_data) {

	console.log("drawing calendar", input_data);

    var w = window.innerwidth,
        h = window.innerheight;








    HR_max = 190;
    HR_vig = HR_max * .75;
    HR_mod = HR_max * .5;




    var theta = Math.PI / 2.0,
        length = 3,
        x0 = 1,
        y0 = 1,
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
        .attr("stroke", function(d) {

        	ret = '#0074D9';
        	if (d.value > HR_mod) {
        		ret = '#FFDC00'
        	}
        	if (d.value > HR_vig) { 
        		ret = '#FF4136';
        	}
        	return ret;

        	
            // return 'rgb(255, 0, ' + d.value + ')';
        })
        .attr("stroke-opacity", 1);
}


loadFiles();
