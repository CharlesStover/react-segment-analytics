import MISSING_HEAD_ELEMENT_ERROR from '../constants/missing-head-element-error';
import getHead from './get-head';

const FIRST = 0;

const removeHead = (): void => {
  const head: HTMLHeadElement | null = document
    .getElementsByTagName('head')
    .item(FIRST);

  if (head !== null) {
    head.remove();
  }
};

describe('getHead', (): void => {
  it('should throw an error when a head element is not found', (): void => {
    removeHead();

    expect((): void => {
      getHead();
    }).toThrowError(MISSING_HEAD_ELEMENT_ERROR);
  });
});
