import { useEffect, useState } from "react";
import { database } from "../../connect/firebase";
import { onValue, ref } from "firebase/database";
import { Button, Modal } from "antd";
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ModalDienAp = ({ open, onClose }) => {

    const [dataChart, setDataChart] = useState([]);
    useEffect(() => {
        const fetchData = () => {
            const dbRef = ref(database, 'MONITOR');
            onValue(dbRef, (snapshot) => {
                const dataObject = snapshot.val();

                setDataChart(prevData => [...prevData, dataObject?.O_VOLTAGE?.data]);
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
                label: 'Điện áp',
                data: dataChart,
                fill: false,
                backgroundColor: 'rgba(0,255,0,0.25)',
                borderColor: 'rgba(0,255,0,0.25)',
            },
        ],
    };
    return (<>

        <Modal
            title="Line Chart"
            open={open}
            onCancel={onClose}
            footer={null}
        >
            <Line data={chartData} />
        </Modal>

    </>);
}

export default ModalDienAp;