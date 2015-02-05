var socket = io.connect("http://" + window.location.hostname + ":7000");
socket.on("connect", function() {
    console.log("connect");
});

var w = window.innerWidth;
var h = window.innerHeight;
var r1  = w/6 + 10; // big circle
var r2  = 2/30 * w; // small circle

var dataset = [ 
    [w/4, h/2, r1],             // big1
    [3/4 * w, h/2, r1],         // big2

    [w/4, h/2 - w/10, r2],      // up   (2)
    [w/4, h/2 + w/10, r2],      // down (3)
    [w/4 - w/10, h/2, r2],      // left (4)
    [w/4 + w/10, h/2, r2],      // right(5)

    [3/4 * w, h/2 - w/10, r2],  // up   (6)
    [3/4 * w, h/2 + w/10, r2],  // down (7)
    [3/4 * w - w/10, h/2, r2],  // left (8)
    [3/4 * w + w/10, h/2, r2]   // right(9)
];


var svg = d3.select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h)

svg.selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")
    .attr("cx", function(d) { return d[0];})
    .attr("cy", function(d) { return d[1];})
    .attr("r",  function(d) { return d[2];})
    .attr("fill", function(d) {
        if (d[2] == r2) {
            return "#00BFFF";
        } else {
            return "#D8D8D8";
        }
    })
    .attr("opacity", function(d) {
        if (d[2] == r2) {
            return "0.5";
        } else {
            return "0.7";
        } 
    })
    .attr("stroke", "#A4A4A4")
    .on("touchstart", function(d, i){
        document.body.style.background = "orange";
        d3.event.preventDefault();
        d3.select(d3.event.target)
            .on("touchmove", function() {
                socket.emit("message", i);
                d3.event.preventDefault();
            })
            .on("touchend", function() {
                document.body.style.background = "";
            })
    })

//---
