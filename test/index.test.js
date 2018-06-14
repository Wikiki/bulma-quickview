'use strict';

const bulmaQuickview = require('../src/js/index').default;

describe('bulmaQuickview', () => {
  test('Should throw exception if instanciate with no/wrong selector', () => {
    expect(() => {
      new bulmaQuickview();
    }).toThrow('An invalid selector or non-DOM node has been provided.');
  });

  test('Should return an array', () => {
    var instances = bulmaQuickview.attach('.selector');
    expect(Array.isArray(instances)).toBe(true);
  });

  test('Should return an array of bulmaQuickview instances', () => {
    var instances = bulmaQuickview.attach();
    instances.every(i => expect(i).toBeInstanceOf(bulmaQuickview));
  });
});
