import React from 'react';
import LineChart from './components/LineChart/LineChart';
import { data, defaultLineChartProps } from './components/LineChart/constants';

import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
        <LineChart {...defaultLineChartProps} data={data} width={800} height={600} className="test-chart" />
    </div>
  );
}

export default App;
