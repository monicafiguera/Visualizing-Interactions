var realData = [
       {"sets": ["DDI"], "size": 347403},
       {"sets": ["CRD"], "size": 345116},
       {"sets": ["PubMedDI"], "size": 280},
       {"sets": ["DDI", "CRD"], "size": 109534},
       {"sets": ["DDI", "PubMedDI"], "size": 54},
       {"sets": ["CRD", "PubMedDI"], "size": 55},
       {"sets": ["DDI", "CRD", "PubMedDI"], "size": 32}];

var realData2 = [
       {"sets": ["DDI"], "size": 347403},
       {"sets": ["NCRD"], "size": 5513},
       {"sets": ["PubMedDI"], "size": 280},
       {"sets": ["DDI", "NCRD"], "size": 625},
       {"sets": ["DDI", "PubMedDI"], "size": 54},
       {"sets": ["NCRD", "PubMedDI"], "size": 5},
       {"sets": ["DDI", "NCRD", "PubMedDI"], "size": 1}];


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

function buildDiagram(option) {
    var sets = {};
    var activeSet;

    if (option === "crd") {
        sets = data;
        activeSet = "crd";
    } else {
        sets = data2;
        activeSet = "ncrd";
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
                    var s = d.sets[0];

                    if (s == "DDI") {
                        return 'green';
                    } else if (s == "PubMedDI") {
                        return 'yellow';
                    } else if (s == "CRD") {
                        return 'orchid';
                    } else if (s == "NCRD") {
                        return 'red';
                    }
                });

    d3.selectAll("#venn .venn-circle text")
                .style("fill", function(d,i) { return 'black'})
                .style("font-size", "14px")
                .style("font-weight", "300");

    // Adding tooltips on hover
    var tooltip = d3.select("body").append("div")
        .attr("class", "venntooltip");
    div.selectAll("path")
        .style("stroke-opacity", 0)
        .style("stroke", "#fff")
        .style("stroke-width", 3)
    div.selectAll("g")
        .attr("id", function(d, i) {
          var elem = d3.select(this);
          var containingSets = elem["_groups"][0][0].getAttribute("data-venn-sets");
          return containingSets;
         })
        .on("mouseover", function(d, i) {
            var realSize = 0;

            if (activeSet == "crd") {
              for (var i=0; i < realData.length; i++) {
                var areEqual = checkArraysEquality(realData[i].sets, d.sets);
                if (areEqual) {
                  realSize = realData[i].size;
                }
              }
            } else {
              for (var i=0; i < realData2.length; i++) {
                var areEqual = checkArraysEquality(realData2[i].sets, d.sets);
                if (areEqual) {
                  realSize = realData2[i].size;
                }
              }
            }

            var elem = d3.select(this);
            var containingSets = elem["_groups"][0][0].getAttribute("data-venn-sets");

            //DDI_CRD_PubMedDDI

            if (containingSets.match("DDI")) {
              var e1 = document.getElementById("DDI");
              var selection = d3.select(e1).transition("tooltip").duration(400);
              selection.select("path")
                .style("fill-opacity", .7)
                .style("stroke-opacity", 1);
            }

            if (containingSets.match("CRD")) {
              var e2 = document.getElementById("CRD");
              var selection = d3.select(e2).transition("tooltip").duration(400);
              selection.select("path")
                .style("fill-opacity", .7)
                .style("stroke-opacity", 1);
            }

            if (containingSets.match("PubMedDI")) {
              var e3 = document.getElementById("PubMedDI");
              var selection = d3.select(e3).transition("tooltip").duration(400);
              selection.select("path")
                .style("fill-opacity", .7)
                .style("stroke-opacity", 1);
            }

            if (containingSets.match("NCRD")) {
              var e4 = document.getElementById("NCRD");
              var selection = d3.select(e4).transition("tooltip").duration(400);
              selection.select("path")
                .style("fill-opacity", .7)
                .style("stroke-opacity", 1);
            }

            // sort all the areas relative to the current item
            venn.sortAreas(div, d);
            // Display a tooltip with the current size
            tooltip.transition().duration(400).style("opacity", 1);
            var inter = realSize == 1 ? "1 interaction" : realSize + " interactions";

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
                .style("fill-opacity", d.sets.length == 1 ? .25 : .0)
                .style("stroke-opacity", 0);

            var e1 = document.getElementById("DDI");
              var selection = d3.select(e1).transition("tooltip").duration(400);
              selection.select("path")
                .style("fill-opacity", d.sets.length == 1 ? .25 : .2)
                .style("stroke-opacity", 0);

            var e2 = document.getElementById("CRD");
              var selection = d3.select(e2).transition("tooltip").duration(400);
              selection.select("path")
                .style("fill-opacity", d.sets.length == 1 ? .25 : .2)
                .style("stroke-opacity", 0);

            var e3 = document.getElementById("PubMedDI");
              var selection = d3.select(e3).transition("tooltip").duration(400);
              selection.select("path")
                .style("fill-opacity", d.sets.length == 1 ? .25 : .2)
                .style("stroke-opacity", 1);

            var e4 = document.getElementById("NCRD");
              var selection = d3.select(e4).transition("tooltip").duration(400);
              selection.select("path")
                .style("fill-opacity", d.sets.length == 1 ? .25 : .2)
                .style("stroke-opacity", 0);
        });
}

  export default {
      buildDiagram: buildDiagram
  }