/*
var socket = io.connect("http://" + window.location.hostname + ":7000");
socket.on("connect", function() {
    console.log("connect");
});
*/

var w = window.innerWidth;
var h = window.innerHeight;
//var r = Math.min(w, h) / 5 * 2;
var r = w/6 + 20;

var circleSet = [
    [w/4, h/2, r],      // left
    [w/4 * 3, h/2, r]   // right
];

var lineSet = [
    [w/4 - r, h/2, w/4 + r, h/2],           // left horizontal
    [w/4 * 3 - r, h/2, w/4 * 3 + r, h/2],   // right horizontal
    [w/4, h/2 - r, w/4, h/2 + r],           // left vertical
    [w/4 * 3, h/2 - r, w/4 * 3, h/2 + r]    // right vertical
];

var svg = d3.select("body")
    .append("svg")
    .attr("width",  w)
    .attr("height", h)

svg.selectAll("circle")
    .data(circleSet)
    .enter()
    .append("circle")
    .attr("cx", function(d) { return d[0];})
    .attr("cy", function(d) { return d[1];})
    .attr("r",  function(d) { return d[2];})
    .attr("fill", "#E6E6E6")
    .attr("opacity", "0.5")

svg.selectAll("line")
    .data(lineSet)
    .enter()
    .append("line")
    .attr("x1", function(d) { return d[0];})
    .attr("y1", function(d) { return d[1];})
    .attr("x2", function(d) { return d[2];})
    .attr("y2", function(d) { return d[3];})
    .attr("stroke-width", 30)
    .attr("stroke", "#FFF")
    .attr("opacity", "0.8")

function ref(obj, prop) {
    return {
        get: function() { return obj[prop]; },
        set: function(v) { obj[prop] = v; }
    };
};

function cartesian(x, y, xcenter, ycenter) {
    return {
        get: function() { 
            return [x.get(), y.get()]; 
        },
        set: function(p) { 
            if (Math.abs(p[0] - xcenter) > Math.abs(p[1] - ycenter)) {
                x.set(p[0]); 
                y.set(ycenter);
            } else {
                x.set(xcenter);
                y.set(p[1]);
            }
        }
    };
};

function clamped(m, lo, hi) {
    return {
        get: function() { return m.get(); },
        set: function(v) { m.set(Math.min(hi, Math.max(lo, v))); }
    };
}

var sLAX = d3.scale.linear()
                .domain([w/4 - r + 40, w/4 + r - 40])
                .rangeRound([0,1023]);

var sLAY = d3.scale.linear()
                .domain([h/2 - r + 40, h/2 + r - 40])
                .rangeRound([1023, 0]);

var sRAX = d3.scale.linear()
                .domain([w/4 * 3 - r + 40, w/4 * 3 + r - 40])
                .rangeRound([0,1023]);

var sRAY = sLAY;

/*-------------------------------------*/

var obj_left = {x: w/4, y: h/2};
var model_left = cartesian( 
                clamped(ref(obj_left, 'x'), w/4 - r + 40, w/4 + r - 40),
                clamped(ref(obj_left, 'y'), h/2 - r + 40, h/2 + r - 40),
                w/4, h/2);

var circle1 = svg.append("circle")
            .attr("id", "handle_left")
            .attr("cx", model_left.get()[0])
            .attr("cy", model_left.get()[1])
            .attr("r", 40)
            .attr("fill", "#81DAF5")


function on_drag_left() {
    d3.select("#handle_left").attr("opacity", "0.5");
    model_left.set([d3.event.x, d3.event.y]);
    redraw_left();
}

function redraw_left() {
    d3.select("#handle_left")
        .attr("cx", model_left.get()[0])
        .attr("cy", model_left.get()[1])
}

function on_dragend_left() {
    console.log("drag left end");
    console.log( [ sLAX(model_left.get()[0]), sLAY(model_left.get()[1]) ] );
    //socket.emit("message", i);
    model_left.set([w/4, h/2]); // reset
    redraw_left();
    d3.select("#handle_left").attr("opacity", "1");
}

d3.behavior.drag()  // capture mouse drag event
    .on("drag", on_drag_left)
    .on("dragend", on_dragend_left)
    .call(d3.select("#handle_left"))

/*-------------------------------------*/

var obj_right = { x: w/4 * 3, y: h/2 };
var model_right = cartesian( 
                clamped(ref(obj_right, "x"), w/4 * 3 - r + 40, w/4 * 3 + r - 40),
                clamped(ref(obj_right, "y"), h/2 - r + 40, h/2 + r - 40),
                w/4 * 3, h/2);

var circle2 = svg.append("circle")
            .attr("id", "handle_right")
            .attr("cx", model_right.get()[0])
            .attr("cy", model_right.get()[1])
            .attr("r", 40)
            .attr("fill", "#81DAF5")

function on_drag_right() {
    d3.select("#handle_right").attr("opacity", "0.5");
    model_right.set([d3.event.x, d3.event.y]);
    redraw_right();
}

function redraw_right() {
    d3.select("#handle_right")
        .attr("cx", model_right.get()[0])
        .attr("cy", model_right.get()[1])
}

function on_dragend_right() {
    console.log("drag right end");
    console.log( [ sRAX(model_right.get()[0]), sRAY(model_right.get()[1]) ] );
    //socket.emit("message", i);
    model_right.set([w/4 * 3, h/2]); // reset
    redraw_right();
    d3.select("#handle_right").attr("opacity", "1");
}

d3.behavior.drag()  // capture mouse drag event
    .on("drag", on_drag_right)
    .on("dragend", on_dragend_right)
    .call(d3.select("#handle_right"))