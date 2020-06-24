/* eslint-disable indent */
/**
 * @module M/plugin/SRSselector
 */
import 'assets/css/srsselector';
import SRSselectorControl from './srsselectorcontrol';
import api from '../../api';

export default class SRSselector extends M.Plugin {
  /**
   * @classdesc
   * Main facade plugin object. This class creates a plugin
   * object which has an implementation Object
   *
   * @constructor
   * @extends {M.Plugin}
   * @param {Object} impl implementation object
   * @api stable
   */
  constructor(options = {}) {
    super();
    /**
     * Facade of the map
     * @private
     * @type {M.Map}
     */
    this.map_ = null;

    /**
     * Array of controls
     * @private
     * @type {Array<M.Control>}
     */
    this.controls_ = [];

    /**
     * Array of object
     * @private
     * @type {Array<Object>}
     */
    this.projections_ = [{
        title: 'WGS84 (EPSG:4326)',
        code: 'EPSG:4326',
        units: 'd',
      },
      {
        title: 'ED50 (EPSG:4230)',
        code: 'EPSG:4230',
        units: 'd',
      },
      {
        title: 'ETRS89 (EPSG:4258)',
        code: 'EPSG:4258',
        units: 'd',
      },
      {
        title: 'WGS84 (EPSG:3857)',
        code: 'EPSG:3857',
        units: 'm',
      },
      {
        title: 'ED50/UTM huso 28 (EPSG:23028)',
        code: 'EPSG:23028',
        units: 'm',
      },
      {
        title: 'ED50/UTM huso 29 (EPSG:23029)',
        code: 'EPSG:23029',
        units: 'm',
      },
      {
        title: 'ED50/UTM huso 30 (EPSG:23030)',
        code: 'EPSG:23030',
        units: 'm',
      },
      {
        title: 'ED50/UTM huso 31 (EPSG:23031)',
        code: 'EPSG:23031',
        units: 'm',
      },
      {
        title: 'ETRS89/UTM huso 28N (EPSG:25828)',
        code: 'EPSG:25828',
        units: 'm',
      },
      {
        title: 'ETRS89/UTM huso 29N (EPSG:25829)',
        code: 'EPSG:25829',
        units: 'm',
      },
      {
        title: 'ETRS89/UTM huso 30N (EPSG:25830)',
        code: 'EPSG:25830',
        units: 'm',
      },
      {
        title: 'ETRS89/UTM huso 31N (EPSG:25831)',
        code: 'EPSG:25831',
        units: 'm',
      },
    ];


    /**
     * String to css class
     * @private
     * @type {String}
     */
    this.collapsedClass_ = 'g-cartografia-flecha-izquierda';

    /**
     * Position of the Plugin
     * Posible values: TR | TL | BL | BR
     * @type {Enum}
     */
    this.position_ = options.position || 'TR';
    if (!(this.position_ === 'TL' || this.position_ === 'BL')) {
      this.positionClass_ = 'right';
    }

    /**
     * Metadata from api.json
     * @private
     * @type {Object}
     */
    this.metadata_ = api.metadata;
  }

  /**
   * This function adds this plugin into the map
   *
   * @public
   * @function
   * @param {M.Map} map the map to add the plugin
   * @api stable
   */
  addTo(map) {
    this.control_ = new SRSselectorControl(this.projections_);
    this.controls_.push(this.control_);
    this.map_ = map;
    this.panel_ = new M.ui.Panel('panelSRSselector', {
      collapsible: true,
      position: M.ui.position[this.position_],
      collapsedButtonClass: 'g-cartografia-tamano',
      tooltip: 'Selector de SRS',
      className: `srsselector-panel ${this.positionClass_}`,
    });
    this.panel_.addControls(this.controls_);
    map.addPanels(this.panel_);
  }

  /**
   * This function destroys this plugin
   *
   * @public
   * @function
   * @api stable
   */
  destroy() {
    this.map_.removeControls([this.control_]);
    [this.map_, this.control_, this.panel_] = [null, null, null];
  }

  /**
   * This function return the control of plugin
   *
   * @public
   * @function
   * @api stable
   */
  getControls() {
    const aControl = [];
    aControl.push(this.controls_);
    return aControl;
  }

  /**
   * @getter
   * @public
   */
  get name() {
    return 'srsselector';
  }

  /**
   * This function gets metadata plugin
   *
   * @public
   * @function
   * @api stable
   */
  getMetadata() {
    return this.metadata_;
  }
}
