export type d3Node = {
    id: string,
    group: number
};

export type d3Link = {
    source: string,
    target: string,
    value: number
};

export type d3Data = {
    nodes: d3Node[],
    links: d3Link[]
};