export type Props = {
    width: number,
    height: number,
    className: string,
    data: Data,
    sortData: boolean,
    yAxisMax: number,
    plotIndents: plotIndents,
    dotsRadius: number,
    dotsStrokeWidth: number,
};

export type plotIndents = {
    left: number,
    right: number,
    top: number,
    bottom: number,
};

export type Data = Point[];

export type Point = [number, number];
