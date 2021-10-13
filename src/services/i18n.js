import m from "mithril";

const defaultLocale = "en";
const supportedLocales = {
  en: "English",
  ar: "Arabic (العربية)",
};
const defaultFullyQualifiedLocales = {
  en: "en-US",
  ar: "ar-EG",
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
  number,
  date,
  loadAndSetLocale,
  supported,
  dir,
  addOnChangeListener,
  removeOnChangeListener,
};

export function t(key, interpolations = {}) {
  const message = i18n.messages[key] || key;

  const pluralizedMessage = pluralForm(
    message,
    interpolations.count,
  );

  const numberFormattedInterpolations =
    formatNumbersInObject(interpolations);

  return interpolate(
    pluralizedMessage,
    numberFormattedInterpolations,
  );
}

export function number(num, options = {}) {
  const formatter = new Intl.NumberFormat(
    defaultFullyQualifiedLocales[i18n.currentLocale],
    options,
  );

  return formatter.format(num);
}

export function date(date, options = {}) {
  const formatter = new Intl.DateTimeFormat(
    defaultFullyQualifiedLocales[i18n.currentLocale],
    options,
  );

  const resolvedDate =
    typeof date === "string" ? new Date(date) : date;

  return formatter.format(resolvedDate);
}

function pluralForm(message, count) {
  if (!message["plural"]) {
    return message;
  }

  const rules = new Intl.PluralRules(i18n.currentLocale);

  return message.plural[rules.select(count)];
}

function interpolate(message, interpolations) {
  return Object.keys(interpolations).reduce(
    (msg, variableName) =>
      msg.replace(
        new RegExp(`{\\s*${variableName}\\s*}`, "g"),
        interpolations[variableName],
      ),
    message,
  );
}

function formatNumbersInObject(obj) {
  const result = {};

  Object.keys(obj).forEach((key) => {
    const value = obj[key];

    result[key] =
      typeof value === "number" ? number(value) : value;
  });

  return result;
}

function loadAndSetLocale(newLocale) {
  if (i18n.currentLocale === newLocale) {
    return;
  }

  const resolvedLocale = supported(newLocale)
    ? newLocale
    : defaultLocale;

  i18n.status = "loading";

  fetchMessages(resolvedLocale, (messages) => {
    i18n.messages = messages;
    i18n.currentLocale = resolvedLocale;
    i18n.status = "idle";

    i18n.onChangeListeners.forEach((listener) =>
      listener(i18n.currentLocale),
    );
  });
}

function supported(locale) {
  return Object.keys(supportedLocales).indexOf(locale) > -1;
}

function dir(locale) {
  return locale === "ar" ? "rtl" : "ltr";
}

function fetchMessages(locale, onComplete) {
  m.request(messageUrl.replace("{locale}", locale)).then(
    onComplete,
  );
}

function addOnChangeListener(listener) {
  i18n.onChangeListeners.push(listener);
}

function removeOnChangeListener(listener) {
  const removingListenerIndex =
    i18n.onChangeListeners.indexOf(listener);

  if (removingListenerIndex === -1) {
    return;
  }

  i18n.onChangeListeners = i18n.onChangeListeners.filter(
    (_, index) => index !== removingListenerIndex,
  );
}

export default i18n;
