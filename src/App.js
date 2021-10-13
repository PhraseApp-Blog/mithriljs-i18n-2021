import m from "mithril";
import i18n from "./services/i18n";
import { setLocaleFromRoute } from "./services/i18nRouting";
import Layout from "./Layout/Layout";

function updateHtmlLocalization(currentLocale) {
  document.documentElement.lang = currentLocale;
  document.documentElement.dir = i18n.dir(currentLocale);
  document.title = i18n.t("app_name");
}

const App = {
  oncreate() {
    i18n.addOnChangeListener(updateHtmlLocalization);
    setLocaleFromRoute();
  },
  onupdate: setLocaleFromRoute,
  onremove() {
    i18n.removeOnChangeListener(updateHtmlLocalization);
  },
  view(vnode) {
    return i18n.status === "loading"
      ? m("p", "Loading...")
      : m(Layout, vnode.children);
  },
};

export default App;
