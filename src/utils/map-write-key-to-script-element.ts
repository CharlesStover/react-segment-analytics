import mapWriteKeyToScriptSrc from './map-write-key-to-script-src';

export default function mapWriteKeyToScriptElement(
  writeKey: string,
): HTMLScriptElement {
  const script: HTMLScriptElement = document.createElement('script');
  script.setAttribute('async', '');
  script.setAttribute('src', mapWriteKeyToScriptSrc(writeKey));
  script.setAttribute('type', 'text/javascript');
  return script;
}
