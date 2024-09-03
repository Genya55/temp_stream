import React from "react";
import { Line } from "react-chartjs-2";

function App() {
    const labels = ["1 ��", "2 ��", "3 ��", "4 ��", "5 ��", "6 ��"];
    const graphData = {
        labels: labels,
        datasets: [
            {
                label: "A��",
                data: [65, 59, 60, 81, 56, 55],
                borderColor: "rgb(75, 192, 192)",
            },
            {
                label: "B��",
                data: [60, 55, 57, 61, 75, 50],
                borderColor: "rgb(75, 100, 192)",
            },
        ],
    };

    const options: {} = {
        maintainAspectRatio: false,
    };

    const divStyle: React.CSSProperties = {
        marginLeft: "auto",
        marginRight: "auto",
        margin: "10px",
        width: "500px",
    };

    return (
        <div className="App" style={divStyle}>
            <Line
                height={300}
                width={300}
                data={graphData}
                options={options}
                id="chart-key"
            />
        </div>
    );
}

export default App;