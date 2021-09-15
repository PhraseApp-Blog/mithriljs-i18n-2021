import m from "mithril";
import Navbar from "./components/Layout/Navbar";
import CharacterList from "./features/CharacerList/CharacterListPage";

const Layout = {
  view(vnode) {
    return m(".container", [
      m(".row", m(".twelve.columns", m(Navbar))),
      m(".row", m(".twelve.columns", m(CharacterList))),
    ]);
  },
};

m.mount(document.body, Layout);
