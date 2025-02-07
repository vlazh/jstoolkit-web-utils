import type { GAEventData } from './getHandler';

export interface GAEventMessage<T extends string = string, D extends GAEventData = GAEventData> {
  type: T;
  event: D;
}

export function iframeMessenger<T extends string, D extends GAEventData>(type: T, data: D): void {
  window.parent.postMessage({ type, event: data } as GAEventMessage, '*');
}

export default iframeMessenger;
