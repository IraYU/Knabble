import React from 'react';
import LineChart from './components/LineChart/LineChart';
import { data, dataSmall, defaultLineChartProps } from './components/LineChart/constants';

const App: React.FC = () => {
  return (
    <div className="content">
        <LineChart
            {...defaultLineChartProps}
            key={'line-chart-1'}
            className="line-chart-test"
            data={data}
            width={800}
            height={600}
            sortData={true}
            yAxisMax={1}
        />

        <LineChart
            {...defaultLineChartProps}
            key={'line-chart-2'}
            className="line-chart-test-2"
            data={dataSmall}
            width={800}
            height={200}
            sortData={true}
        />

        <LineChart
            {...defaultLineChartProps}
            key={'line-chart-3'}
            className="line-chart-test-3"
            data={[...dataSmall]}
            width={400}
            height={400}
        />
    </div>
  );
}

export default App;
