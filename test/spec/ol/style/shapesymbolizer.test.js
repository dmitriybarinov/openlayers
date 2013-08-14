goog.provide('ol.test.style.Shape');

describe('ol.style.Shape', function() {

  describe('constructor', function() {

    it('accepts literal values', function() {
      var symbolizer = new ol.style.Shape({
        size: 4,
        fill: new ol.style.Fill({
          color: '#ff0000'
        })
      });
      expect(symbolizer).to.be.a(ol.style.Shape);
    });

    it('accepts expressions', function() {
      var symbolizer = new ol.style.Shape({
        size: ol.expr.parse('sizeAttr'),
        stroke: new ol.style.Stroke({
          color: ol.expr.parse('color')
        })
      });
      expect(symbolizer).to.be.a(ol.style.Shape);
    });

  });

  describe('#createLiteral()', function() {

    it('evaluates expressions with the given feature', function() {
      var symbolizer = new ol.style.Shape({
        size: ol.expr.parse('sizeAttr'),
        fill: new ol.style.Fill({
          opacity: ol.expr.parse('opacityAttr'),
          color: '#BADA55'
        })
      });

      var feature = new ol.Feature({
        sizeAttr: 42,
        opacityAttr: 0.4,
        geometry: new ol.geom.Point([1, 2])
      });

      var literal = symbolizer.createLiteral(ol.geom.GeometryType.POINT,
          feature);
      expect(literal).to.be.a(ol.style.ShapeLiteral);
      expect(literal.size).to.be(42);
      expect(literal.fillOpacity).to.be(0.4);
    });

    it('can be called without a feature', function() {
      var symbolizer = new ol.style.Shape({
        size: 10,
        fill: new ol.style.Fill({
          color: '#BADA55'
        }),
        stroke: new ol.style.Stroke({
          color: '#013',
          opacity: 1,
          width: 2
        })
      });

      var literal = symbolizer.createLiteral(ol.geom.GeometryType.POINT);
      expect(literal).to.be.a(ol.style.ShapeLiteral);
      expect(literal.size).to.be(10);
      expect(literal.fillColor).to.be('#BADA55');
      expect(literal.strokeColor).to.be('#013');
      expect(literal.strokeOpacity).to.be(1);
      expect(literal.strokeWidth).to.be(2);
    });

  });

  describe('#getFill()', function() {

    it('returns the fill', function() {
      var symbolizer = new ol.style.Shape({
        fill: new ol.style.Fill({
          color: '#ff0000'
        })
      });

      var fill = symbolizer.getFill();
      expect(fill).to.be.a(ol.style.Fill);
    });

  });

  describe('#getStroke()', function() {

    it('returns the stroke', function() {
      var symbolizer = new ol.style.Shape({
        stroke: new ol.style.Stroke({
          color: '#ff0000'
        })
      });

      var stroke = symbolizer.getStroke();
      expect(stroke).to.be.a(ol.style.Stroke);
    });

  });

  describe('#getType()', function() {

    it('returns the shape type', function() {
      var symbolizer = new ol.style.Shape({
        stroke: new ol.style.Stroke({
          width: 1,
          opacity: 0.123
        })
      });

      var type = symbolizer.getType();
      expect(type).to.be(ol.style.ShapeType.CIRCLE);
    });

  });

  describe('#setFill()', function() {

    it('sets the fill', function() {
      var symbolizer = new ol.style.Shape({
        stroke: new ol.style.Stroke({color: '#ff0000'})
      });
      expect(symbolizer.getFill()).to.be(null);

      symbolizer.setFill(new ol.style.Fill({color: '#0000ff'}));
      expect(symbolizer.getFill()).to.be.a(ol.style.Fill);
    });

    it('throws when not provided a fill', function() {
      var symbolizer = new ol.style.Shape({
        fill: new ol.style.Fill({color: '#ff0000'})
      });

      expect(function() {
        symbolizer.setFill('#0000ff');
      }).throwException(function(err) {
        expect(err).to.be.a(goog.asserts.AssertionError);
      });
    });

  });

  describe('#setStroke()', function() {

    it('sets the stroke', function() {
      var symbolizer = new ol.style.Shape({
        fill: new ol.style.Fill({color: '#ff0000'})
      });
      expect(symbolizer.getStroke()).to.be(null);

      symbolizer.setStroke(new ol.style.Stroke({color: '#0000ff'}));
      expect(symbolizer.getStroke()).to.be.a(ol.style.Stroke);
    });

    it('throws when not provided a stroke', function() {
      var symbolizer = new ol.style.Shape({
        stroke: new ol.style.Stroke({color: '#ff0000'})
      });

      expect(function() {
        symbolizer.setStroke('#0000ff');
      }).throwException(function(err) {
        expect(err).to.be.a(goog.asserts.AssertionError);
      });
    });

  });

  describe('#setType()', function() {

    it('sets the shape type', function() {
      var symbolizer = new ol.style.Shape({
        stroke: new ol.style.Stroke({
          width: 1,
          opacity: 0.123
        })
      });
      symbolizer.setType(ol.style.ShapeType.CIRCLE);

      var type = symbolizer.getType();
      expect(type).to.be(ol.style.ShapeType.CIRCLE);
    });

  });

});

goog.require('goog.asserts.AssertionError');

goog.require('ol.Feature');
goog.require('ol.geom.GeometryType');
goog.require('ol.geom.Point');
goog.require('ol.expr');
goog.require('ol.expr.Literal');
goog.require('ol.style.Fill');
goog.require('ol.style.Shape');
goog.require('ol.style.ShapeLiteral');
goog.require('ol.style.ShapeType');
goog.require('ol.style.Stroke');
