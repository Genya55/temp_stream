import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import './App.css';

import logo from "./logo.svg";
import { Amplify } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import awsExports from "./aws_exports";
Amplify.configure(awsExports);

// Chart.jsにスケールやエレメントを登録する
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function App({ signOut, user }) {
    /** グラフデータ */
    const graphData = {
        labels: [
            ['2019', 'Jan'],
            ['2019', 'Feb'],
            ['2019', 'Mar'],
            ['2019', 'Apr'],
            ['2019', 'May'],
            ['2019', 'June'],
            ['2019', 'July'],
            ['2019', 'Aug'],
            ['2019', 'Sep'],
            ['2019', 'Oct'],
            ['2019', 'Nov'],
            ['2019', 'Dec'],
        ],
        datasets: [
            {
                data: [5.6, 7.2, 10.6, 13.6, 20, 21.8, 24.1, 28.4, 25.1, 19.4, 13.1, 8.5],
                backgroundColor: 'rgba(30, 144, 255, 1)',
                label: '(mm)',
            },
        ],
    };

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h2>Hello React with AWS</h2>
                {user ? (
                    <>
                        <h3>Welcome: {user.username}</h3>
                        <button onClick={signOut}>Sign out</button>
                        <div>
                            <Bar data={graphData} />
                        </div>
                    </>
                ) : (
                    <h3>Unwelcome</h3>
                )}
            </header>
        </div>
    );
}

export default withAuthenticator(App);
