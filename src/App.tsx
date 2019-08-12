import React from 'react';
import LineChart from './components/LineChart/LineChart';
import { data, width, height } from './components/LineChart/constants';

import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">111

        <LineChart data={data} width={width} height={height}  name="testChart" />

    </div>
  );
}

export default App;
