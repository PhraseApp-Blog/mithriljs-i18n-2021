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
  status: "loading",
  t,
  loadAndSetLocale,
  supported,
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

export default i18n;
