/**
 * @module M/control/SRSselectorControl
 */

import SRSselectorImplControl from 'impl/srsselectorcontrol';
import template from 'templates/srsselector';
import options from 'templates/options';

export default class SRSselectorControl extends M.Control {
  /**
   * @classdesc
   * Main constructor of the class. Creates a PluginControl
   * control
   *
   * @constructor
   * @extends {M.Control}
   * @api stable
   */
  constructor(projections) {
    // 1. checks if the implementation can create PluginControl
    if (M.utils.isUndefined(SRSselectorImplControl)) {
      M.exception('La implementación usada no puede crear controles SRSselectorControl');
    }
    // 2. implementation of this control
    const impl = new SRSselectorImplControl();
    super(impl, 'SRSselector');

    // Checks if Mapea supports projections
    this.projections = projections.filter((projection) => {
      const supportedProjs = [
        'EPSG:4230',
        'EPSG:4258',
        'EPSG:4326',
        'EPSG:23028',
        'EPSG:23029',
        'EPSG:23030',
        'EPSG:23031',
        'EPSG:25828',
        'EPSG:25829',
        'EPSG:25830',
        'EPSG:25831',
        'EPSG:32628',
      ];
      return supportedProjs.includes(projection.code);
    });
  }

  /**
   * This function creates the view
   *
   * @public
   * @function
   * @param {M.Map} map to add the control
   * @api stable
   */
  createView(map) {
    return new Promise((success, fail) => {
      const html = M.template.compileSync(template);
      const compiledOptions =
        M.template.compileSync(options, { vars: { projections: this.projections } });
      html.appendChild(compiledOptions);
      html.querySelector('select#m-srsselector-srs').addEventListener('change', evt => this.changeSRS(evt));
      this.map = map;
      compiledOptions.querySelectorAll('.m-xylocator-srs-option').forEach((option) => {
        const mapProjection = map.getProjection().code;
        if (option.value === mapProjection) {
          option.setAttribute('selected', 'selected');
        }
      });
      success(html);
    });
  }

  /**
   * This function is called on the control activation
   *
   * @public
   * @function
   * @api stable
   */
  activate() {
    // calls super to manage de/activation
    super.activate();
  }
  /**
   * This function is called on the control deactivation
   *
   * @public
   * @function
   * @api stable
   */
  deactivate() {
    // calls super to manage de/activation
    super.deactivate();
  }
  /**
   * This function gets activation button
   *
   * @public
   * @function
   * @param {HTML} html of control
   * @api stable
   */
  getActivationButton(html) {
    return html.querySelector('.m-srsselector button');
  }

  /**
   * This function compares controls
   *
   * @public
   * @function
   * @param {M.Control} control to compare
   * @api stable
   */
  equals(control) {
    return control instanceof SRSselectorControl;
  }

  /**
   * @public
   * @function
   * @param {*} e
   * @api
   */
  changeSRS(e) {
    const epsg = e.target.value;
    const units = e.target.selectedOptions[0].dataset.units;
    const selectedProjection = `${epsg}*${units}`;
    this.map.setProjection(selectedProjection);
    const mouseControl = this.map.getControls('mouse')[0];
    if (mouseControl !== undefined) {
      this.map.removeControls('mouse');
      this.map.addControls('mouse', { projection: selectedProjection });
    }
    // this.map.setBbox(this.map.getProjection().getExtent());
  }
}
