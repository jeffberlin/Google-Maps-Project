module.exports = {
    styles: [
      {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [
          { color: '#F67503'}
          ]
      },
      {
        featureType: 'administrative.locality',
        elementType: 'labels.text.stroke',
        stylers: [
          { color: '#ffffff'},
          { weight: 5 }
        ]
      },
      {
        featureType: 'administrative.neighborhood',
        elementType: 'labels.text.fill',
        stylers: [
          { color: '#1B63C0'}
        ]
      },
      {
        featureType: 'administrative.province',
        elementType: 'labels.text.fill',
        stylers: [
          { color: '#27ACF9'}
        ]
      },
      {
        featureType: 'administrative.province',
        elementType: 'labels.text.stroke',
        stylers: [
          {weight: 3}
        ]
      },
      {
        featureType: 'road.arterial',
        elementType: 'geometry',
        stylers: [
          {color: '#FDDC06'}
        ]
      },
      {
        featureType: 'road.local',
        elementType: 'geometry',
        stylers: [
          {color: '#ECDAA1'}
        ]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.fill',
        stylers: [
          {color: '#FEDD02'}
        ]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [
          {color: '#000000'},
          {weight: .5}
        ]
      },
      {
        featureType: 'road.highway.controlled_access',
        elementType: 'geometry.fill',
        stylers: [
          {color: '#D12E05'},
          {lightness: 30}
        ]
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [
          {color: '#0598FA'},
          {saturation: 10 },
          {hue: -3},
          {lightness: -5}
        ]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [
          {color: '#ffffff'}
        ]
      },
      {
        featureType: 'poi.attraction',
        elementType: 'labels.text.fill',
        stylers: [
          {color: '#ffffff'}
        ]
      },
      {
        featureType: 'poi.attraction',
        elementType: 'labels.text.stroke',
        stylers: [
          {color: '#845A1A'},
          {weight: 2}
        ]
      },
      {
        featureType: 'poi.medical',
        elementType: 'labels.text.fill',
        stylers: [
          {color: '#F30101'}
        ]
      },
      {
        featureType: 'poi.medical',
        elementType: 'labels.text.stroke',
        stylers: [
          {color: '#ffffff'},
          {weight: 3}
        ]
      },
      {
        featureType: 'poi.school',
        elementType: 'labels.text.fill',
        stylers: [
          {color: '#805F04'}
        ]
      },
      {
        featureType: 'poi.school',
        elementType: 'labels.text.stroke',
        stylers: [
          {color: '#ffffff'},
          {weight: 3}
        ]
      },
      {
        featureType: 'transit',
        elementType: 'labels.text.fill',
        stylers: [
          {color: '#ffffff'}
        ]
      },
      {
        featureType: 'transit',
        elementType: 'labels.text.stroke',
        stylers: [
          {color: '#01B2FE'},
          {weight: 3},
          {lightness: -10}
        ]
      }
  ]
}