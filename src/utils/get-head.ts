import MISSING_HEAD_ELEMENT_ERROR from '../constants/missing-head-element-error';

const FIRST = 0;

export default function getHead(): HTMLHeadElement {
  const head: HTMLHeadElement | null = document
    .getElementsByTagName('head')
    .item(FIRST);

  if (head === null) {
    throw MISSING_HEAD_ELEMENT_ERROR;
  }

  return head;
}
