import React, { Component } from 'react';
import * as d3 from 'd3';
import { d3Link } from './types';


class Links extends Component<{ links: d3Link[] }, {}> {
    // ref: SVGGElement;
    ref: any;

    componentDidMount() {
        d3.select(this.ref).data([this.props.links]);
    }

    render() {
        const { links } = this.props;

        return (
            <g className="links">
                {links.map((link: d3Link, index: number) => (
                    <line className="link" ref={(ref: SVGLineElement) => this.ref = ref}
                          strokeWidth={Math.sqrt(link.value)}/>
                ))}
            </g>
        )
    }
}

export default Links;
