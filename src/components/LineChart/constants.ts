export const data = [
    [0, 0.6], [3, 0.85], [6, 0.46],
    [1, 0.15], [4, 0.3], [7, 0.54],
    [9, 0.54], [11, 0.28], [13, 0.32],
    [10, 0.9], [12, 0.43], [14, 0.82],
    [15, 0.57], [17, 0.33], [19, 0.47],
    [16, 0.87], [18, 0.29], [20, 0.1],
    [2, 0.3], [5, 0.28], [8, 0.4],
];

export const dataSmall = [
    [5, 20], [11, 100], [13, 0.32],
    [10, 25], [17, 30], [6, 3],
    [16, 87], [8, 22], [60, 44],
];

export const defaultProps = {
    plotIndents: {
        left: 35,
        right: 25,
        top: 25,
        bottom: 25,
    },
};

export const defaultLineChartProps = {
    ...defaultProps,
    dotsRadius: 4,
    dotsStrokeWidth: 2,
};