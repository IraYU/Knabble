import React from 'react';
import LineChart from './components/LineChart/LineChart';
import { data, defaultLineChartProps } from './components/LineChart/constants';

import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
        <LineChart
            {...defaultLineChartProps}
            className="test-chart"
            data={data}
            width={800}
            height={600}
            sort={true}
        />
    </div>
  );
}

export default App;
