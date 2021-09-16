import m from "mithril";
import i18n from "../../services/i18n";
import { currentPathToLocale } from "../../services/i18nRouting";

function changeLocale(newLocale) {
  m.route.set(currentPathToLocale(newLocale));
}

const LangSwitcher = {
  view() {
    return m(
      ".lang-switcher",
      m(
        "select",
        {
          onchange: (e) => changeLocale(e.target.value),
          value: i18n.currentLocale,
        },
        Object.keys(i18n.supportedLocales).map((code) =>
          m(
            `option[value=${code}]`,
            i18n.supportedLocales[code],
          ),
        ),
      ),
    );
  },
};

export default LangSwitcher;
