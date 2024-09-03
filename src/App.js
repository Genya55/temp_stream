// App.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { chartData, chartOptions } from './chart';

function App() {
    return (
        <div>
            <h1>My Chart</h1>
            <Bar data={chartData} options={chartOptions} />
        </div>
    );
}

export default App;
