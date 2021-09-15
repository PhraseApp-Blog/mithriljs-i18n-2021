import m from "mithril";
import Navbar from "./Navbar";

const Layout = {
  view(vnode) {
    return m(".container", [
      m(".row", m(".twelve.columns", m(Navbar))),
      m(".row", m(".twelve.columns", vnode.children)),
    ]);
  },
};

export default Layout;
