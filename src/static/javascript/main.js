//var echarts = requiere('echarts');

// Define y registra el tema oscuro
var darkTheme = {
  backgroundColor: '#1b1b1b', // Color de fondo oscuro
  textStyle: {
    color: 'rgba(255, 255, 255, 0.7)', // Color del texto
  },
};

echarts.registerTheme('dark', darkTheme);

const getOptionChart1 = () => {
  return {
    title: {
      text: 'Homicidios',
      textStyle: {
        color: '#d4a445',
      },
      left: 'center',
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    tooltip: {
      show: true,
      trigger: 'axis',
      triggerOn: 'mousemove|click',
    },
    dataZoom: {
      show: true,
      start: 50,
    },
    xAxis: [
      {
        type: 'category',
        data: ['LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB', 'DOM'],
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line',
      },
    ],
  };
};

const getOptionChart2 = () => {
  return {
    title: {
      text: 'Armas utilizadas en Homicidios',
      textStyle: {
        color: '#d4a445',
      },
      left: 'center',
    },
    color: ['#3246a8', '#00cc66', '#ff5050', '#c6de76', '#D96A8D'],
    tooltip: {
      show: true,
      trigger: 'axis',
    },
    legend: {
      data: [
        'Arma de Fuego',
        'Arma Blanca',
        'Objeto Contundente',
        'Explosivo',
        'Vapuleado',
      ],
      top: 30,
      textStyle: {
        // Ajusta el color del texto de las leyendas
        color: 'white', // Color blanco
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: ['LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB', 'DOM'],
        axisLine: { show: false },
        axisTick: { show: false },
        axisPointer: { type: 'shadow' },
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        name: 'Arma de Fuego',
        type: 'line',
        stack: 'Total',
        data: [120, 132, 101, 134, 90, 230, 210],
      },
      {
        name: 'Arma Blanca',
        type: 'line',
        stack: 'Total',
        data: [220, 182, 191, 234, 290, 330, 310],
      },
      {
        name: 'Objeto Contundente',
        type: 'line',
        stack: 'Total',
        data: [150, 232, 201, 154, 190, 330, 410],
      },
      {
        name: 'Explosivo',
        type: 'line',
        stack: 'Total',
        data: [320, 332, 301, 334, 390, 330, 320],
      },
      {
        name: 'Vapuleado',
        type: 'line',
        stack: 'Total',
        data: [820, 932, 901, 934, 1290, 1330, 1320],
      },
    ],
  };
};

const getOptionChart3 = () => {
  return {
    title: {
      text: 'Top 3 Departamentos con mas homicidios',
      textStyle: {
        color: '#d4a445',
      },
      left: 'center',
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    tooltip: {
      show: true,
    },
    xAxis: {
      type: 'category',
      data: ['GUATEMALA', 'ESCUINTLA', 'EL PROGRESO'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [120, 200, 150],
        type: 'bar',
      },
    ],
  };
};

const getOptionChart4 = () => {
  return {
    title: {
      text: 'Movil de los homicidios',
      textStyle: {
        color: '#d4a445',
      },
      left: 'center',
    },

    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      top: '30',
      left: 'center',
      textStyle: {
        // Ajusta el color del texto de la leyenda
        color: 'white', // Color blanco
      },
    },
    series: [
      {
        name: 'Movil',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: false,
          position: 'center',
          textStyle: {
            // Ajusta el color del texto en el gráfico
            color: 'white', // Color blanco
          },
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '40',
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 1048, name: 'Venganza Personal' },
          { value: 735, name: 'Rivalidad Pandillas' },
          { value: 580, name: 'Represalia' },
          { value: 484, name: 'Extorsion' },
          { value: 300, name: 'Sentimental' },
        ],
      },
    ],
  };
};


const initCharts = () => {
  const chart1 = echarts.init(document.getElementById('chart1'), 'dark'); // Usa el tema oscuro
  const chart2 = echarts.init(document.getElementById('chart2'), 'dark'); // Usa el tema oscuro
  const chart3 = echarts.init(document.getElementById('chart3'), 'dark'); // Usa el tema oscuro
  const chart4 = echarts.init(document.getElementById('chart4'), 'dark'); // Usa el tema oscuro

  chart1.setOption(getOptionChart1());
  chart2.setOption(getOptionChart2());
  chart3.setOption(getOptionChart3());
  chart4.setOption(getOptionChart4());

  chart1.resize();
  chart2.resize();
  chart3.resize();
  chart4.resize();
};

window.addEventListener('load', () => {
  initCharts();
});
