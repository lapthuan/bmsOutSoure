import { useEffect, useState } from "react";
import { database } from "../../connect/firebase";
import { onValue, ref } from "firebase/database";
import { Button, Modal } from "antd";
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ModalTocDo = ({ open, onClose }) => {

    const [dataChart, setDataChart] = useState([]);
    useEffect(() => {
        const fetchData = () => {
            const dbRef = ref(database, 'MONITOR');
            onValue(dbRef, (snapshot) => {
                const dataObject = snapshot.val();
                console.log(dataObject);
                setDataChart(prevData => [...prevData, dataObject?.O_RPM?.data]);
            });
        };

        fetchData();
        const intervalId = setInterval(fetchData, 5000);

        return () => clearInterval(intervalId);
    }, []);
    const chartData = {
        labels: dataChart.map((_, index) => index),
        datasets: [
            {
                label: 'Tốc độ',
                data: dataChart,
                fill: false,
                backgroundColor: 'rgba(128,0,128,0.25)',
                borderColor: 'rgba(128,0,128,0.25)',
            },
        ],
    };
    const chartOptions = {
        responsive: true,
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'Tốc độ (Rpm)' // Thêm đơn vị vào trục y
                }
            },

        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return tooltipItem.dataset.label + ': ' + tooltipItem.raw + ' Rpm'; // Thêm đơn vị vào tooltip
                    }
                }
            }
        }
    };
    return (<>

        <Modal
            title="Line Chart"
            open={open}
            onCancel={onClose}
            footer={null}
        >
            <Line data={chartData} options={chartOptions} />
        </Modal>

    </>);
}

export default ModalTocDo;