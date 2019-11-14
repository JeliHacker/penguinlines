var screen = {width:400, height:500};
var margins = {top:10, right:50, bottom:50, left:50};

var penguinPromise = d3.json("classData.json");

penguinPromise.then(
    function(data)
        {
            console.log("works",data);
            setBanner();
            var getQuiz = function(quiz){
                console.log("data", quiz)
                return quiz.grade;
            }
            var getPenguin = function(penguins){}
            var mappedClassroom = function(classroom)
            {
                var mapped = classroom.map(getQuiz)
                return mapped
            }
            getQuiz(data);
            
            
            var correctData = mappedClassroom(data);
            setup(correctData);
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
        
        var xScale = d3.scaleLinear()
                        .domain([0,38])
                        .range([0,width]);
        
        var yScale = d3.scaleLinear()
                        .domain([0,10])
                        .range([height,0]);
        
        var cScale = d3.scaleOrdinal(d3.schemeTableau10)
        var xAxis = d3.axisBottom(xScale);
        var yAxis = d3.axisLeft(yScale);
        
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
        
        drawLines(penguins, xScale, yScale, cScale);
        
    };

var drawLines = function(penguins, xScale, yScale, cScale)
    {
        var graph = d3.select("#graph")
            .selectAll("g")
            .data(penguins)
            .enter()
            .append("g")
            .attr("fill", "none")
            .attr("stroke",function(arr)
                 {
                return cScale(arr.name);
            })
            .attr("stroke-width", 3)
        
        var lineGenerator = d3.line()
            .x(function(num, index){return xScale(index)})
            .y(function(num){return yScale(num)})
            .curve(d3.curveNatural)
        
        graph.datum(function(obj){
            console.log("obj", obj)
            return obj.quizes[0]})
            .append("path")
            .attr("d", lineGenerator)
            
        
    }

setup(penguinPromise);