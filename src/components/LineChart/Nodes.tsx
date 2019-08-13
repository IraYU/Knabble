import React, { Component } from 'react';
import * as d3 from 'd3';
import { d3Node } from './types';

class Node extends React.Component<{ node: d3Node }, {}> {
    ref: any;

    componentDidMount() {
        d3.select(this.ref).data([this.props.node]);
    }

    render() {
        return (
            <circle className="node" r={5} fill="#eee"
                    ref={(ref: SVGCircleElement) => this.ref = ref}>
                <title>{this.props.node.id}</title>
            </circle>
        );
    }
}

class Nodes extends React.Component<{ nodes: d3Node[], simulation: any }, {}> {
    componentDidMount() {
        const simulation = this.props.simulation;
/*        d3.selectAll(".node")
            .call(d3.drag()
                .on("start", onDragStart)
                .on("drag", onDrag)
                .on("end", onDragEnd));*/

        function onDragStart(d: any) {
            if (!d3.event.active) {
                simulation.alphaTarget(0.3).restart();
            }
            d.fx = d.x;
            d.fy = d.y;
        }

        function onDrag(d: any) {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        }

        function onDragEnd(d: any) {
            if (!d3.event.active) {
                simulation.alphaTarget(0);
            }
            d.fx = null;
            d.fy = null;
        }
    }

    render() {
        return (
            <g className="nodes">
                {this.props.nodes.map((node: d3Node, index: number) => (
                    <Node key={index} node={node} />
                ))}
            </g>
        );
    }
}
export default Nodes;