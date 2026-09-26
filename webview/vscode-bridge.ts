import type { WebviewToExtensionMessage, ExtensionToWebviewMessage } from '../src/messages';

interface VsCodeApi {
  postMessage(message: unknown): void;
  getState(): unknown;
  setState(state: unknown): unknown;
}

declare function acquireVsCodeApi(): VsCodeApi;

let vscodeApi: VsCodeApi | undefined;

function getVsCodeApi(): VsCodeApi {
  if (!vscodeApi) {
    if (typeof acquireVsCodeApi === 'function') {
      vscodeApi = acquireVsCodeApi();
    } else {
      vscodeApi = {
        postMessage: (msg: unknown) => console.log('[Mock VS Code API postMessage]', msg),
        getState: () => undefined,
        setState: (state: unknown) => state,
      };
    }
  }
  return vscodeApi;
}

export function postMessage(message: WebviewToExtensionMessage): void {
  getVsCodeApi().postMessage(message);
}

export function onMessage(handler: (msg: ExtensionToWebviewMessage) => void): () => void {
  const listener = (event: MessageEvent) => {
    if (event.data) {
      handler(event.data as ExtensionToWebviewMessage);
    }
  };
  window.addEventListener('message', listener);
  return () => window.removeEventListener('message', listener);
}

export function getState<T>(): T | undefined {
  return getVsCodeApi().getState() as T | undefined;
}

export function setState<T>(state: T): void {
  getVsCodeApi().setState(state);
}
