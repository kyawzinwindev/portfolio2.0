import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "util";
import { webcrypto } from "crypto";

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as unknown as typeof global.TextDecoder;
global.Uint8Array = Uint8Array;
global.ArrayBuffer = ArrayBuffer;

if (!global.crypto) {
  (global as unknown as { crypto: unknown }).crypto = webcrypto;
}

if (typeof global.structuredClone === "undefined") {
  global.structuredClone = (val: unknown) => JSON.parse(JSON.stringify(val));
}

// In jsdom environment, bind global Fetch APIs
if (typeof globalThis.Request !== "undefined") {
  global.Request = globalThis.Request;
  global.Response = globalThis.Response;
  global.Headers = globalThis.Headers;
  global.fetch = globalThis.fetch;
}

if (typeof window !== "undefined") {
  // Mock matchMedia for jsdom
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });

  // Mock scrollTo / scrollIntoView
  window.scrollTo = jest.fn();
  if (typeof Element !== "undefined" && Element.prototype) {
    Element.prototype.scrollIntoView = jest.fn();
  }
}

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
    };
  },
  usePathname() {
    return "/";
  },
  useSearchParams() {
    return new URLSearchParams();
  },
  redirect: jest.fn(),
}));
