import SRSselector from 'facade/srsselector';

const map = M.map({
  container: 'mapjs',
  controls: 'mouse',
  layers: ['OSM'],
});

const mp = new SRSselector({
  position: 'TL',
});

map.addPlugin(mp);

window.map = map;
