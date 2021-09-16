import m from "mithril";
import i18n from "./services/i18n";
import Layout from "./Layout/Layout";

const App = {
  oncreate() {
    i18n.loadAndSetLocale(i18n.defaultLocale);
  },
  view(vode) {
    return i18n.status === "loading"
      ? m("p", "Loading...")
      : m(Layout, vode.children);
  },
};

export default App;
