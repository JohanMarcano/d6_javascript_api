// Incluye esta línea para almacenar la instancia del gráfico actual
let myChart;

function consultarCambio() {
  const monto = document.getElementById('monto').value;
  const moneda = document.getElementById('moneda').value;

  fetch('mindicador.json')
    .then(response => response.json())
    .then(data => {
      if (data[moneda]) {
        const tipoCambio = data[moneda].valor;

        if (data[moneda].hasOwnProperty('valor')) {
          const resultado = monto * tipoCambio;
          document.getElementById('resultado').innerHTML = `El resultado es: ${resultado.toFixed(2)} ${moneda.toUpperCase()}`;

          const fechas = [data.fecha];
          const valores = [data[moneda].valor];

          const ctx = document.getElementById('chart').getContext('2d');

          // Verificar si ya hay un gráfico existente y destruirlo
          if (myChart instanceof Chart) {
            myChart.destroy();
          }

          // Crear el nuevo gráfico
          myChart = new Chart(ctx, {
            type: 'line',
            data: {
              labels: fechas,
              datasets: [{
                label: `${moneda.toUpperCase()} a Pesos Chilenos`,
                data: valores,
                borderColor: 'blue',
                borderWidth: 1,
                fill: false
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                x: {
                  type: 'category',
                  labels: fechas
                },
                y: {
                  beginAtZero: true
                }
              }
            }
          });
        } else {
          document.getElementById('resultado').innerHTML = `Error: La propiedad "valor" no está definida para la moneda seleccionada.`;
        }
      } else {
        document.getElementById('resultado').innerHTML = `Error: La moneda seleccionada no está definida en el JSON.`;
      }
    })
    .catch(error => {
      document.getElementById('resultado').innerHTML = `Error: ${error.message}`;
    });
}
