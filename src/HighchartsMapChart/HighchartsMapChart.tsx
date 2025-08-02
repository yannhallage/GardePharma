import React from 'react';
import Highcharts from 'highcharts/highmaps';
import HighchartsReact from 'highcharts-react-official';

const markerStyle = {
  symbol: 'circle',
  radius: 12,
  fillColor: '#2563eb',
  lineWidth: 2,
  lineColor: '#fff',
};

// Coordonnées fictives pour 4 communes d'Abidjan
const communes = [
  { name: 'Abobo', lat: 5.4275, lon: -4.0037 },
  { name: 'Cocody', lat: 5.3556, lon: -3.9864 },
  { name: 'Yopougon', lat: 5.3751, lon: -4.0707 },
  { name: 'Treichville', lat: 5.3097, lon: -4.0127 },
];

const options: Highcharts.Options = {
  chart: {
    map: 'custom/world', // Utilise la carte du monde par défaut pour l'apparence
    height: 600,
  },
  title: {
    text: "Communes d'Abidjan (exemple)",
  },
  mapNavigation: {
    enabled: true,
    buttonOptions: {
      verticalAlign: 'bottom',
    },
  },
  plotOptions: {
    mappoint: {
      marker: markerStyle,
      cursor: 'pointer',
      point: {
        events: {
          click: function (this: any) {
            alert('Commune : ' + this.name);
          },
        },
      },
      dataLabels: {
        enabled: true,
        format: '{point.name}',
        style: { fontWeight: 'bold', color: '#1e293b', textOutline: 'none' },
      },
    },
  },
  series: [
    {
      type: 'mappoint',
      name: 'Communes',
      data: communes,
      color: '#2563eb',
      marker: markerStyle,
    },
  ],
};

const HighchartsMapChart: React.FC = () => {
  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        constructorType={'mapChart'}
      />
    </div>
  );
};

export default HighchartsMapChart; 