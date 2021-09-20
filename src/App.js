import m from "mithril";
import Layout from "./Layout/Layout";

const App = {
  view(vnode) {
    return m(Layout, vnode.children);
  },
};

export default App;
