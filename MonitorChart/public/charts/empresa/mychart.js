const ctx = document.getElementById('myChart').getContext('2d');

const myChart = new Chart(ctx, {
  type: 'pie',
  data: {
    labels: ['Atendidas', 'Abandonadas'],
    datasets: [{
      label: 'Value',
      data: [],
      backgroundColor: [
        'rgb(165, 234, 79)',
        'rgb(242, 8, 8)',
      ],
      borderColor: [
        'rgb(131, 131, 131)',
        'rgba(54, 162, 235, 1)',
      ],
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    plugins: {
      labels: {
        render: 'value',
        fontColor: '#000',
        precision: 0
      }
    }
  }
});

const updateChart = (data) => {
  // Extrair os valores relevantes do JSON para a empresa 'Empresa'
  const empresaData = data.find(entry => entry.csqname === 'Empresa');

  if (empresaData) {
    // Atualizar os valores do gráfico com os valores da empresa
    myChart.data.datasets[0].data = [empresaData.handled, empresaData.total_aband];
    myChart.update();
  } else {
    console.error('Dados da empresa não encontrados no JSON.');
  }
};

const fetchData = () => {
  const endpoint = "http://localhost/query";
  fetch(endpoint)
    .then(res => res.json())
    .then(data => {
      updateChart(data);
    })
    .catch(error => {
      console.error("Erro:", error);
    });
};

fetchData();

setInterval(fetchData, 3000);