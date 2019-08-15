import React from 'react';
import LineChart from './components/LineChart/LineChart';
import { data, defaultLineChartProps } from './components/LineChart/constants';

const App: React.FC = () => {
  return (
    <div className="content">
        <LineChart
            {...defaultLineChartProps}
            className="test-chart"
            data={data}
            width={800}
            height={600}
            sortData={true}
        />
    </div>
  );
}

export default App;
