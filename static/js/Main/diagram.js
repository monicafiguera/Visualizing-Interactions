var realData1 = [
       {"sets": ["DDI"], "size": 347720},
       {"sets": ["CRD"], "size": 345116},
       {"sets": ["PubMedDI"], "size": 250},
       {"sets": ["DDI", "CRD"], "size": 109647},
       {"sets": ["DDI", "PubMedDI"], "size": 54},
       {"sets": ["CRD", "PubMedDI"], "size": 47},
       {"sets": ["DDI", "CRD", "PubMedDI"], "size": 32}];
var realData2 = [
       {"sets": ["DDI"], "size": 347720},
       {"sets": ["NCRD"], "size": 5513},
       {"sets": ["PubMedDI"], "size": 250},
       {"sets": ["DDI", "NCRD"], "size": 627},
       {"sets": ["DDI", "PubMedDI"], "size": 54},
       {"sets": ["NCRD", "PubMedDI"], "size": 5},
       {"sets": ["DDI", "NCRD", "PubMedDI"], "size": 1}];

function buildDiagram(option) {
    var sets = {};

    if (option === "crd") {
        sets = data;
    } else {
        sets = data2;
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
    var realData = realData1;
    if (number === 1) {
        realData = realData1;
    } else {
        realData = realData2;
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