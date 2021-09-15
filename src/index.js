import m from "mithril";
import App from "./App";
import CharacterListPage from "./features/CharacterList/CharacterListPage";
import CharacterDetailsPage from "./features/CharacterDetails/CharacterDetailsPage";

m.route(document.body, "/", {
  "/": {
    render: (vnode) => m(App, m(CharacterListPage)),
  },
  "/characters/:id": {
    render: (vnode) =>
      m(App, m(CharacterDetailsPage, vnode.attrs)),
  },
});
