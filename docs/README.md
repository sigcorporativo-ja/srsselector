# M.plugin.SRSselector

Plugin que permite establecer el sistema de referencias en el mapa.

![Imagen1](../img/srsSelector_1.png)

## Dependencias

- srsselector.ol.min.js
- srsselector.ol.min.css


```html
 <link href="../../plugins/srsselector/srsselector.ol.min.css" rel="stylesheet" />
 <script type="text/javascript" src="../../plugins/srsselector/srsselector.ol.min.js"></script>
```

## Parámetros

- El constructor se inicializa con un JSON de _options_ con el siguiente atributo:
  
- **position**. Indica la posición donde se mostrará el plugin
  - 'TL':top left
  - 'TR':top right (default)
  - 'BL':bottom left
  - 'BR':bottom right

## Eventos

## Otros métodos

## Ejemplos de uso

### Ejemplo 1
```javascript
  const map = M.map({
    container: 'map'
  });

  const mp = new M.plugin.SRSselector({
    position: 'TL',
  });

  map.addPlugin(mp);
```
### Ejemplo 2
```javascript
  const map = M.map({
    container: 'map'
  });

  const mp = new M.plugin.SRSselector();

  map.addPlugin(mp);
```
