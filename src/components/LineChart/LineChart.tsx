import React, { Component } from 'react';
import * as d3 from 'd3';
import { d3Node, d3Link, Graph } from './types'

class LineChart extends Component<any> {

/*    constructor(props) {
        super(props);
    }*/
    ref: any;
    // ref: SVGSVGElement;



    componentDidMount() {
        const context: any = d3.select(this.ref);
        // const color = d3.scaleOrdinal(d3.schemeCategory20b);
        const color = d3.scaleOrdinal().range(["red", "green", "blue", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

        const simulation: any = d3.forceSimulation()
            .force("link", d3.forceLink().id(function(d: any) {
                return d.id;
            }))
            .force("charge", d3.forceManyBody())
            .force("center", d3.forceCenter(this.props.width / 2, this.props.height / 2));

        let link = context.append("g")
            .attr("class", "links")
            .selectAll("line")
            .data(this.props.data.links)
            .enter().append("line")
            .attr("stroke-width", function(d: d3Link) {
                return Math.sqrt(d.value);
            });

        const node = context.append("g")
            .attr("class", "nodes")
            .selectAll("circle")
            .data(this.props.data.nodes)
            .enter().append("circle")
            .attr("r", 5)
            .attr("fill", function(d: d3Node) {
                return color(d.group.toString());
            })
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));

        node.append("title")
            .text(function(d: d3Node) {
                return d.id;
            });

        simulation.nodes(this.props.data.nodes).on("tick", ticked);
        simulation.force("link").links(this.props.data.links);

        function dragstarted(d: any) {
            if (!d3.event.active) {
                simulation.alphaTarget(0.3).restart();
            }
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(d: any) {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        }

        function dragended(d: any) {
            if (!d3.event.active) {
                simulation.alphaTarget(0);
            }
            d.fx = null;
            d.fy = null;
        }

        function ticked() {
            link
                .attr("x1", function(d: any) {
                    return d.source.x;
                })
                .attr("y1", function(d: any) {
                    return d.source.y;
                })
                .attr("x2", function(d: any) {
                    return d.target.x;
                })
                .attr("y2", function(d: any) {
                    return d.target.y;
                });

            node
                .attr("cx", function(d: any) {
                    return d.x;
                })
                .attr("cy", function(d: any) {
                    return d.y;
                });
        }
    }

    render() {
        const { width, height, name, data } = this.props;



        return (
            <svg
                className="container"
                ref={(ref: SVGSVGElement) => this.ref = ref}
                width={width}
                height={height}>
            </svg>
        )
    }
}

export default LineChart;