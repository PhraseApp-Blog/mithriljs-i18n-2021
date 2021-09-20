import m from "mithril";
import i18n from "./services/i18n";
import { setLocaleFromRoute } from "./services/i18nRouting";
import Layout from "./Layout/Layout";

const App = {
  oncreate: setLocaleFromRoute,
  onupdate: setLocaleFromRoute,
  view(vnode) {
    return i18n.status === "loading"
      ? m("p", "Loading...")
      : m(Layout, vnode.children);
  },
};

export default App;
