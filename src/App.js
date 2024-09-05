import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";
import { Line } from "react-chartjs-2";
import "./App.css";

import logo from "./logo.svg";
import { Amplify } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import awsExports from "./aws_exports";
import { useEffect, useState } from "react";
Amplify.configure(awsExports);

// Chart.js�ɃX�P�[����G�������g��o�^����

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

// function to fetch https://rg3csira5nipsbrpjcpwuqxc7y0aztcd.lambda-url.us-east-1.on.aws/ and output the response as alert json string

function App({ signOut, user }) {
  const [iotData, setIotData] = useState([{ date: "2021-01-01", temp_in: 1 }]);

  useEffect(() => {
    fetchLambda();
  }, []);

  function fetchLambda() {
    axios
      .get(
        "https://rg3csira5nipsbrpjcpwuqxc7y0aztcd.lambda-url.us-east-1.on.aws/"
      )
      .then((res) => {
        // response is
        //[{"date": "2024-09-03-17-59", "temp_in": 25.625, "temp_out": 25.0625, "charging_status": 0, "load_power": 2, "solar_power": 0, "solar_voltage": 0.0, "solar_current": 0.0, "battery_voltage": 12.5} ..
        setIotData(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  }

  console.log(iotData);

  /** �O���t�f�[�^ */
  const graphData = {
    labels: iotData.map((data) => data.date),
    datasets: [
      {
        data: iotData.map((data) => data.temp_in),
        backgroundColor: "rgba(30, 144, 255, 0.2)", // �h��Ԃ��̐F
        borderColor: "rgba(30, 144, 255, 1)", // ���̐F
        borderWidth: 2, // ���̑���
        label: "(C)",
      },
    ],
  };

  return (
    <div className="App">
      <header className="App-header">
        {user ? (
          <>
            <h3>Welcome: {user.username}</h3>
            <button onClick={signOut}>Sign out</button>
            <div
              style={{
                height: "1000px",
                width: "80%",
                margin: "0 auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
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
