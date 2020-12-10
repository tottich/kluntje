import { find } from '../../dom-helpers';

type LoadScriptOptions = {
  type?: string;
  async?: boolean;
  noModule?: boolean;
  text?: string;
  targetElement?: HTMLElement;
};

const STATE_LOADED = "loaded";
const STATE_ERROR = "error";
const STATE_PENDING = "pending";

/**
 * Loads JS file by creating unique script element
 * and resolves if file was loaded or script already existed
 * @param {string} id
 * @param {string} src
 * @param {LoadScriptOptions} [options]
 * @returns {Promise<void>}
 *
 * @example
 * // use with async/await
 * await loadScript("some-api-js-script", "https://some.api/script.js")
 * @example
 * // use as normal promise
 * loadScript("some-api-js-script", "https://some.api/script.js")
 *  .then(() => console.log("some.api script loaded"));
 */
export const loadScript = (id: string, src: string, options: LoadScriptOptions = {}): Promise<void> => {
  return new Promise((resolve, reject) => {
    const targetElement = options.targetElement || document.body;
    let scriptElement = find(targetElement, `#${id}`) as HTMLScriptElement;

    const removeListener = () => {
      scriptElement.removeEventListener("error", handleScriptError);
      scriptElement.removeEventListener("load", handleScriptLoaded);
    };

    const handleScriptError = () => {
      removeListener();
      scriptElement.dataset.loadedState = STATE_ERROR;
      reject(new Error(`loadScript failed for id: ${id}, src: ${src}`));
    };

    const handleScriptLoaded = () => {
      removeListener();
      scriptElement.dataset.loadedState = STATE_LOADED;
      resolve();
    };

    if (scriptElement && scriptElement.dataset.loadedState === STATE_LOADED) {
      handleScriptLoaded();
    } else if (scriptElement && scriptElement.dataset.loadedState === STATE_ERROR) {
      handleScriptError();
    } else if (!scriptElement) {
      scriptElement = document.createElement("script");
      scriptElement.id = id;
      scriptElement.src = src;
      scriptElement.async = options.async === true;
      scriptElement.noModule = options.noModule === true;
      if (options.type) {
        scriptElement.type = options.type;
      }
      if (options.text) {
        scriptElement.text = options.text;
      }
      scriptElement.dataset.loadedState = STATE_PENDING;
      targetElement.appendChild(scriptElement);
    }

    scriptElement.addEventListener("error", handleScriptError);
    scriptElement.addEventListener("load", handleScriptLoaded);
  });
};
