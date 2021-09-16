import m from "mithril";

const defaultLocale = "en";
const messageUrl = "/lang/{locale}.json";

const i18n = {
  defaultLocale,
  currentLocale: "",
  messages: {},
  status: "loading",
  t,
  loadAndSetLocale,
};

export function t(key) {
  return i18n.messages[key] || key;
}

function loadAndSetLocale(newLocale) {
  if (i18n.currentLocale === newLocale) {
    return;
  }

  i18n.status = "loading";

  fetchLocale(newLocale, (messages) => {
    i18n.messages = messages;
    i18n.currentLocale = newLocale;
    i18n.status = "idle";
  });
}

function fetchLocale(locale, onComplete) {
  m.request(messageUrl.replace("{locale}", locale)).then(
    (data) => onComplete(data),
  );
}

export default i18n;
