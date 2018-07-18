/**
 * @module ol/format/filter/Within
 */
import Spatial from '../filter/Spatial.js';

/**
 * @classdesc
 * Represents a `<Within>` operator to test whether a geometry-valued property
 * is within a given geometry.
 */
class Within extends Spatial {

  /**
   * @param {!string} geometryName Geometry name to use.
   * @param {!module:ol/geom/Geometry} geometry Geometry.
   * @param {string=} opt_srsName SRS name. No srsName attribute will be
   *    set on geometries when this is not provided.
   * @api
   */
  constructor(geometryName, geometry, opt_srsName) {
    super('Within', geometryName, geometry, opt_srsName);
  }

}

export default Within;
