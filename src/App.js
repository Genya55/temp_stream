
import logo from "./logo.svg";
import "./App.css";
import { Amplify } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import awsExports from "./aws_exports";
Amplify.configure(awsExports);

Amplify.configure(awsExports);

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function App({ signOut, user }) {
    // サンプルデータとオプションの設定
    const data = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {
                label: "Sample Data",
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                borderColor: "rgba(75,192,192,1)",
                tension: 0.1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Sample Line Chart',
            },
        },
    };

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h2>Hello React with AWS</h2>
                {user ? (
                    <>
                        <h3>Welcome, {user.username}</h3>
                        <button onClick={signOut}>Sign out</button>
                    </>
                ) : (
                    <h3>Unwelcome</h3>
                )}
                {/* Chart.jsで描画したグラフを追加 */}
                <div style={{ width: "600px", margin: "0 auto" }}>
                    <Line data={data} options={options} />
                </div>
            </header>
        </div>
    );
}

export default withAuthenticator(App);