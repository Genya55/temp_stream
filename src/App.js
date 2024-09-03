import React from "react";
import { Line } from "react-chartjs-2";

function App() {
    const labels = ["1 ŒŽ", "2 ŒŽ", "3 ŒŽ", "4 ŒŽ", "5 ŒŽ", "6 ŒŽ"];
    const graphData = {
        labels: labels,
        datasets: [
            {
                label: "AŽÐ",
                data: [65, 59, 60, 81, 56, 55],
                borderColor: "rgb(75, 192, 192)",
            },
            {
                label: "BŽÐ",
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