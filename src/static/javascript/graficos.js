var dom = document.getElementById('grafico1');
var myChart = echarts.init(dom, null, {
  renderer: 'canvas',
  useDirtyRect: false,
});
var app = {};

var option;

option = {
  backgroundColor: '#181818',
  title: {
    text: '',
    left: 'center',
    top: 20,
    textStyle: {
      color: '#ccc',
    },
  },
  tooltip: {
    trigger: 'item',
  },
  visualMap: {
    show: false,
    min: 1,
    max: 2000,
    inRange: {
      colorLightness: [0, 1],
    },
  },
  series: [
    {
      name: 'Casos Registrados',
      type: 'pie',
      radius: '55%',
      center: ['50%', '50%'],
      data: [
        { value: 1450, name: 'RyH Vehiculos' },
        { value: 850, name: 'RyH Motocicletas' },
        { value: 754, name: 'Homicidios' },
        { value: 1245, name: 'Lesionados' },
      ].sort(function (a, b) {
        return a.value - b.value;
      }),
      roseType: 'radius',
      label: {
        color: 'rgba(255, 255, 255, 0.3)',
      },
      labelLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.3)',
        },
        smooth: 0.2,
        length: 10,
        length2: 20,
      },
      itemStyle: {
        color: '#c23531',
        shadowBlur: 200,
        shadowColor: 'rgba(0, 0, 0, 0.5)',
      },
      animationType: 'scale',
      animationEasing: 'elasticOut',
      animationDelay: function (idx) {
        return Math.random() * 200;
      },
    },
  ],
};

if (option && typeof option === 'object') {
  myChart.setOption(option);
}

window.addEventListener('resize', myChart.resize);

//GRAFICO 2
var dom = document.getElementById('grafico2');
var myChart = echarts.init(dom, 'dark', {
  renderer: 'canvas',
  useDirtyRect: false,
});
var app = {};

var option;

// Schema:
// date,AQIindex,PM2.5,PM10,CO,NO2,SO2
const homicidiosBD = [[191, 100, 82, 123, 76, 90, 92, 1]];
const lesionadosBD = [[322, 186, 143, 92, 215, 158, 129, 1]];
const vehiculosBD = [[330, 118, 182, 214, 227, 327, 51, 1]];
const motocicletasBD = [[177, 84, 97, 123, 93, 144, 132, 1]];
const lineStyle = {
  width: 2,
  opacity: 0.8,
};
option = {
  backgroundColor: '#181818',
  title: {
    text: '',
    left: 'center',
    top: 2,
    textStyle: {
      color: '#eee',
    },
  },
  legend: {
    bottom: 5,
    data: ['Homicidios', 'Lesionados', 'RyH Vehiculos', 'RyH Motociletas'],
    itemGap: 20,
    textStyle: {
      color: '#fff',
      fontSize: 14,
    },
    selectedMode: 'single',
  },
  radar: {
    indicator: [
      { name: 'LUN', max: 500 },
      { name: 'MAR', max: 500 },
      { name: 'MIE', max: 500 },
      { name: 'JUE', max: 500 },
      { name: 'VIE', max: 500 },
      { name: 'SAB', max: 500 },
      { name: 'DOM', max: 500 },
    ],
    shape: 'circle',
    splitNumber: 10,
    axisName: {
      color: 'rgb(238, 197, 102)',
    },
    splitLine: {
      lineStyle: {
        color: [
          'rgba(238, 197, 102, 0.1)',
          'rgba(238, 197, 102, 0.2)',
          'rgba(238, 197, 102, 0.4)',
          'rgba(238, 197, 102, 0.6)',
          'rgba(238, 197, 102, 0.8)',
          'rgba(238, 197, 102, 1)',
        ].reverse(),
      },
    },
    splitArea: {
      show: false,
    },
    axisLine: {
      lineStyle: {
        color: 'rgba(238, 197, 102, 0.5)',
      },
    },
  },
  series: [
    {
      name: 'Homicidios',
      type: 'radar',
      lineStyle: lineStyle,
      data: homicidiosBD,
      symbol: 'none',
      itemStyle: {
        color: '#F9713C',
      },
      areaStyle: {
        opacity: 0.1,
      },
    },
    {
      name: 'Lesionados',
      type: 'radar',
      lineStyle: lineStyle,
      data: lesionadosBD,
      symbol: 'none',
      itemStyle: {
        color: '#B3E4A1',
      },
      areaStyle: {
        opacity: 0.05,
      },
    },
    {
      name: 'RyH Vehiculos',
      type: 'radar',
      lineStyle: lineStyle,
      data: vehiculosBD,
      symbol: 'none',
      itemStyle: {
        color: 'rgb(238, 197, 102)',
      },
      areaStyle: {
        opacity: 0.05,
      },
    },
    {
      name: 'RyH Motociletas',
      type: 'radar',
      lineStyle: lineStyle,
      data: motocicletasBD,
      symbol: 'none',
      itemStyle: {
        color: 'rgb(238, 197, 102)',
      },
      areaStyle: {
        opacity: 0.05,
      },
    },
  ],
};

if (option && typeof option === 'object') {
  myChart.setOption(option);
}

window.addEventListener('resize', myChart.resize);

//GRAFICO 3
var dom = document.getElementById('grafico3');
var myChart = echarts.init(dom, 'dark', {
  renderer: 'canvas',
  useDirtyRect: false,
});
var app = {};

var option;

myChart.showLoading();
const data = {
  name: 'Incidencia',
  children: [
    {
      name: 'Homicidios',
      children: [
        {
          name: 'Arma de Fuego',
          children: [
            { name: 'Guatemala', value: 721 },
            { name: 'Interior', value: 4294 },
          ],
        },
        {
          name: 'Arma Blanca',
          children: [
            { name: 'Guatemala', value: 1250 },
            { name: 'Interior', value: 5824 },
          ],
        },
      ],
    },
    {
      name: 'Lesionados',
      children: [
        {
          name: 'Arma de Fuego',
          children: [
            { name: 'Guatemala', value: 721 },
            { name: 'Interior', value: 4294 },
          ],
        },
        {
          name: 'Arma Blanca',
          children: [
            { name: 'Guatemala', value: 1250 },
            { name: 'Interior', value: 5824 },
          ],
        },

        {
          name: 'Objeto Contundente',
          children: [
            { name: 'Guatemala', value: 215 },
            { name: 'Interior', value: 1289 },
          ],
        },
      ],
    },
    {
      name: 'RyH Motocicletas',
      children: [
        { name: 'Moto', value: 4116 },
        { name: 'Cuatrimoto', value: 28 },
        { name: 'Tuc-Tuc', value: 17 },
      ],
    },
    {
      name: 'RyH Vehiculos',
      children: [
        { name: 'Automovil', value: 1616 },
        { name: 'PickUp', value: 1027 },
        { name: 'Camioneta', value: 3891 },
        { name: 'Camion', value: 891 },
        { name: 'Rastra', value: 843 },
        { name: 'Cabezal', value: 1554 },
        { name: 'Tractor', value: 970 },
        {
          name: 'methods',
          children: [
            { name: 'add', value: 593 },
            { name: 'and', value: 330 },
            { name: 'average', value: 287 },
            { name: 'count', value: 277 },
            { name: 'distinct', value: 292 },
            { name: 'div', value: 595 },
            { name: 'eq', value: 594 },
            { name: 'fn', value: 460 },
            { name: 'gt', value: 603 },
            { name: 'gte', value: 625 },
            { name: 'iff', value: 748 },
          ],
        },
      ],
    },
  ],
};

myChart.hideLoading();
myChart.setOption(
  (option = {
    backgroundColor: '#181818',
    tooltip: {
      trigger: 'item',
      triggerOn: 'mousemove',
    },
    legend: {
      top: '2%',
      left: '3%',
      orient: 'vertical',
      data: [
        {
          name: '2023',
          icon: 'rectangle',
        },
        {
          name: 'tree2',
          icon: 'rectangle',
        },
      ],
      borderColor: '#c23531',
    },
    series: [
      {
        type: 'tree',
        name: '2023',
        data: [data],
        top: '5%',
        left: '14%',
        bottom: '2%',
        right: '25%',
        symbolSize: 7,
        label: {
          position: 'left',
          verticalAlign: 'middle',
          align: 'right',
        },
        leaves: {
          label: {
            position: 'right',
            verticalAlign: 'middle',
            align: 'left',
          },
        },
        emphasis: {
          focus: 'descendant',
        },
        expandAndCollapse: true,
        animationDuration: 550,
        animationDurationUpdate: 750,
      },
    ],
  })
);

if (option && typeof option === 'object') {
  myChart.setOption(option);
}

window.addEventListener('resize', myChart.resize);

//GRAFICO 4
