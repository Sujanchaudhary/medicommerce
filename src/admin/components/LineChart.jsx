import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { useState } from "react";
import { useCallback } from "react";
import axios from "axios";
import { useEffect } from "react";
import { APIclass } from "../../config";

function LineChart() {
  const api = new APIclass();

  const [orderDetails, setOrderDetails] = useState([]);

  const getCarts = useCallback(async () => {
    await axios
      .get(`${api.baseUrl}get-all-order`, api.getHeader)
      .then((res) => {
        setOrderDetails(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    getCarts();
  }, [getCarts]);
  const data = {
    labels: orderDetails.map((s) => s.createdAt.slice(0, 10)),
    datasets: [
      {
        label: "Orders",
        data: orderDetails.map((s) => s.totalAmount),
        fill: false,
        borderColor: "#0f6bf8",
        tension: 0.1,
      },
    ],
  };
  return <Line data={data} />;
}

export default LineChart;
