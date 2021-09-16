import m from "mithril";
import i18n from "./services/i18n";
import { localizedRoutes } from "./services/i18nRouting";
import App from "./App";
import CharacterListPage from "./features/Characters/CharacterListPage";
import CharacterDetailsPage from "./features/Characters/CharacterDetailsPage";
import AboutPage from "./features/About/AboutPage";

m.route(document.body, "/", {
  "/": {
    onmatch: () => m.route.set(`/${i18n.defaultLocale}`),
  },
  ...localizedRoutes({
    "/": {
      render: (vnode) => m(App, m(CharacterListPage)),
    },
    "/characters/:id": {
      render: (vnode) =>
        m(App, m(CharacterDetailsPage, vnode.attrs)),
    },
    "/about": {
      render: () => m(App, m(AboutPage)),
    },
  }),
});
