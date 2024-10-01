const config = {
    type: 'line',
    data: data,
};

// const labels = Utils.months({count: 7});

const data = {
    labels: ['조회수', '시작수', '완료수'],
    datasets: [{
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: true,
        borderColor: ['rgba(198, 218, 253, 1)', 'rgba(198, 237, 208, 1)', 'rgba(229, 204, 254, 1)'],
        tension: 0.1
    }]
};