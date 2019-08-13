export const data = [
    {x: 0, y: 0.6}, {x: 3, y: 0.85}, {x: 6, y: 0.46},
    {x: 1, y: 0.15}, {x: 4, y: 0.3}, {x: 7, y: 0.54},
    {x: 9, y: 0.54}, {x: 11, y: 0.28}, {x: 13, y: 0.32},
    {x: 10, y: 0.9}, {x: 12, y: 0.43}, {x: 14, y: 0.82},
    {x: 15, y: 0.57}, {x: 17, y: 0.33}, {x: 19, y: 0.47},
    {x: 16, y: 0.87}, {x: 18, y: 0.29}, {x: 20, y: 0.1},
    {x: 2, y: 0.3}, {x: 5, y: 0.28}, {x: 8, y: 0.4}
];

export const defaultProps = {
    plotIndents: {
        left: 25,
        right: 25,
        top: 25,
        bottom: 25,
    },
};

export const defaultLineChartProps = {
    ...defaultProps,
    dotsRadius: 4,
};