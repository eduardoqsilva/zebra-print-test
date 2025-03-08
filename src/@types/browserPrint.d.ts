declare global {
  interface Window {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    BrowserPrint: any;
  }
}

export {};
