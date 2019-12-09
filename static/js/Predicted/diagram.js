var realDataBLM = [
       {"sets": ["Literature"], "size": 16549},
       {"sets": ["semEP"], "size": 3253},
       {"sets": ["BLM"], "size": 87715},
       {"sets": ["Literature", "semEP"], "size": 261},
       {"sets": ["Literature", "BLM"], "size": 6070},
       {"sets": ["semEP", "BLM"], "size": 142},
       {"sets": ["Literature", "semEP", "BLM"], "size": 18}];

var realDataLapRLS = [
       {"sets": ["Literature"], "size": 14353},
       {"sets": ["semEP"], "size": 3221},
       {"sets": ["LapRLS"], "size": 64743},
       {"sets": ["Literature", "semEP"], "size": 243},
       {"sets": ["Literature", "LapRLS"], "size": 3874},
       {"sets": ["semEP", "LapRLS"], "size": 110},
       {"sets": ["Literature", "semEP", "LapRLS"], "size": 9}];

function buildDiagram(option) {
    var sets = {};

    if (option === "blm") {
        sets = data3;
    } else if (option === "laprls") {
        sets = data4;
    }

    var chart = venn.VennDiagram()
                     .width(600)
                     .height(600);

    var div = d3.select("#venn");
    div.datum(sets).call(chart);

    // Changing style
    d3.select("#venn").datum(sets).call(chart);
            var colours = ['green', 'orchid', 'red', 'yellow'];
            d3.selectAll("#venn .venn-circle path")
                .style("stroke-width", 10)
                .style("fill", function(d,i) {
                    //var s = d.sets[0];
                    return colours[i];
                });

    d3.selectAll("#venn .venn-circle text")
                .style("fill", function(d,i) { return 'black'})
                .style("font-size", "14px")
                .style("font-weight", "300");

}

function checkArraysEquality(arr1, arr2) {
    var a1l = arr1.length;
    var a2l = arr2.length;
    var n = a1l > a2l ? a1l : a2l;
    var equal = true;

    for (var i=0; i<n; i++) {
        if (arr1[i] != arr2[i]) {
            equal = false;
        }
    }

    return equal;
}

function repaint(number) {
    console.log("painting")
    var realData = realDataBLM;
    if (number === 1) {
        realData = realDataBLM;
    } else {
        realData = realDataLapRLS;
    }

    //console.log(realData);
    var div = d3.select("#venn");

    // Adding tooltips on hover
    var tooltip = d3.select("body").append("div")
        .attr("class", "venntooltip");

    // add listeners to all the groups to display tooltip on mouseover
    div.selectAll("path")
        .style("stroke-opacity", 0)
        .style("stroke", "#fff")
        .style("stroke-width", 3);
    div.selectAll("g")
        .on("mouseover", function(d, i) {
            var realSize = 0;

            for (var i=0; i < realData.length; i++) {
                var areEqual = checkArraysEquality(realData[i].sets, d.sets);
                if (areEqual) {
                  realSize = realData[i].size;
                }
            }

            var inter = realSize === 1 ? "1 interaction" : realSize + " interactions";

            // sort all the areas relative to the current item
            venn.sortAreas(div, d);

            // Display a tooltip with the current size
            tooltip.transition().duration(400).style("opacity", 1);
            tooltip.text(inter);

            // highlight the current path
            var selection = d3.select(this).transition("tooltip").duration(400);
            selection.select("path")
                .style("fill-opacity", .7)
                .style("stroke-opacity", 1);
        })
        .on("mousemove", function() {
            tooltip.style("left", (d3.event.pageX) + "px")
                   .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function(d, i) {
            tooltip.transition().duration(400).style("opacity", 0);
            var selection = d3.select(this).transition("tooltip").duration(400);
            selection.select("path")
                .style("fill-opacity", d.sets.length === 1 ? .25 : .0)
                .style("stroke-opacity", 0);
        });
}

export default {
    buildDiagram: buildDiagram,
    repaint: repaint
}