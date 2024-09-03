import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import './App.css';

import { Amplify, Storage } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws_exports';
import { useState, useEffect, useRef } from 'react';

Amplify.configure(awsExports);

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

function App({ signOut, user }) {
    const [graphData, setGraphData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Indoor Temperature (°C)',
                data: [],
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 1,
            },
            {
                label: 'Outdoor Temperature (°C)',
                data: [],
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderWidth: 1,
            },
            // 他のデータセットを追加できます
        ],
    });

    const fetchData = useRef();

    fetchData.current = async () => {
        try {
            const data = await Storage.get('pub/myhome', { download: true });
            const jsonData = await data.Body.text();
            const parsedData = JSON.parse(jsonData);

            // タイムスタンプを作成
            const timestamp = `${parsedData.get_date} ${parsedData.get_time}`;

            setGraphData((prevData) => {
                // 新しいデータポイントを追加
                const newLabels = [...prevData.labels, timestamp];
                const newIndoorData = [...prevData.datasets[0].data, parsedData.temp_in];
                const newOutdoorData = [...prevData.datasets[1].data, parsedData.temp_out];

                // 24時間分を超えたら古いデータを削除
                if (newLabels.length > 1440) {
                    newLabels.shift();
                    newIndoorData.shift();
                    newOutdoorData.shift();
                }

                return {
                    ...prevData,
                    labels: newLabels,
                    datasets: [
                        { ...prevData.datasets[0], data: newIndoorData },
                        { ...prevData.datasets[1], data: newOutdoorData },
                    ],
                };
            });
        } catch (error) {
            console.error('Error fetching data from S3:', error);
        }
    };

    useEffect(() => {
        // 1分ごとにデータを取得する
        const intervalId = setInterval(fetchData.current, 60000);

        // コンポーネントがアンマウントされたときにインターバルをクリアする
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                {user ? (
                    <>
                        <h3>Welcome: {user.username}</h3>
                        <button onClick={signOut}>Sign out</button>
                        <div style={{
                            height: '500px',
                            width: '100%',
                            margin: '0 auto',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Line data={graphData} />
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
