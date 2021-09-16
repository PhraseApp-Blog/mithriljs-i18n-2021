import m from "mithril";

const defaultLocale = "en";
const supportedLocales = {
  en: "English",
  ar: "Arabic (العربية)",
};
const messageUrl = "/lang/{locale}.json";

const i18n = {
  defaultLocale,
  supportedLocales,
  currentLocale: "",
  messages: {},
  onChangeListeners: [],
  status: "loading",
  t,
  loadAndSetLocale,
  supported,
  addOnChangeListener,
  removeOnChangeListener,
};

export function t(key) {
  return i18n.messages[key] || key;
}

function loadAndSetLocale(newLocale) {
  if (i18n.currentLocale === newLocale) {
    return;
  }

  const resolvedLocale = supported(newLocale)
    ? newLocale
    : defaultLocale;

  i18n.status = "loading";

  fetchLocale(resolvedLocale, (messages) => {
    i18n.messages = messages;
    i18n.currentLocale = resolvedLocale;
    i18n.status = "idle";

    i18n.onChangeListeners.forEach((callback) =>
      callback(),
    );
  });
}

function supported(locale) {
  return Object.keys(supportedLocales).indexOf(locale) > -1;
}

function fetchLocale(locale, onComplete) {
  m.request(messageUrl.replace("{locale}", locale)).then(
    (data) => onComplete(data),
  );
}

function addOnChangeListener(callback) {
  i18n.onChangeListeners.push(callback);
}

function removeOnChangeListener(callback) {
  const callbackIndex =
    i18n.onChangeListeners.indexOf(callback);

  if (callbackIndex > -1) {
    i18n.onChangeListeners = i18n.onChangeListeners.filter(
      (_, index) => {
        index !== callbackIndex;
      },
    );
  }
}

export default i18n;
