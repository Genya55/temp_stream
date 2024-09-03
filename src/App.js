import { Bar } from 'react-chartjs-2';

const data = {
    // x ���̃��x��
    labels: ['1 ��', '2 ��', '3 ��', '4 ��', '5 ��', '6 ��', '7 ��'],
    datasets: [
        {
            label: 'Dataset',
            // �f�[�^�̒l
            data: [65, 59, 80, 81, 56, 55, 40],
            // �O���t�̔w�i�F
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)',
            ],
            // �O���t�̘g���̐F
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)',
            ],
            // �O���t�̘g���̑���
            borderWidth: 1,
        },
    ],
};

// �����_�����O
export default function Index(): JSX.Element {
    return <Bar data={data} />;
}