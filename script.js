var screen = {width:400, height:500};
var margins = {top:10, right:50, bottom:50, left:50};

var penguinPromise = d3.json("classData.json");
penguinPromise.then(
    function(data)
        {
            console.log("works",data);
            setBanner();
            setup(data);
        },
    function(err)
        {
            console.log("despair", err)
        }
);

var setBanner = function()
    {
        d3.select("#bruce")
        .text("Penguin Graphs")
    };

var setup = function(penguins)
    {
        d3.select("svg")
            .attr("width", screen.width)
            .attr("height", screen.height)
            .append("g")
            .attr("id", "graph")
            .attr("transform", "translate("+margins.left+","+margins.top+")");
        var width = screen.width - margins.left - margins.right;
        var height = screen.height - margins.top - margins.bottom;
        
        var xscale = d3.scaleLinear()
                        .domain([0,38])
                        .range([0,width]);
        
        var yscale = d3.scaleLinear()
                        .domain([0,10])
                        .range([height,0]);
        var xAxis = d3.axisBottom(xscale);
        var yAxis = d3.axisLeft(yscale);
        d3.select("svg")
            .append("g")
            .attr("id", "axis");
        d3.select("#axis")
            .append("g")
            .attr("id", "xAxis")
            .attr("transform", "translate("+margins.left+","+(margins.top+height)+")")
            .call(xAxis);
        d3.select("#axis")
            .append("g")
            .attr("id", "yAxis")
            .attr("transform", "translate(25, "+margins.top+")")
            .call(yAxis)
        
        //drawLines(penguins);
        
    };

var drawLines = function(penguins)
    {
        
    }