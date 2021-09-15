import m from "mithril";
import Layout from "./Layout/Layout";

const App = {
  view(vode) {
    return m(Layout, vode.children);
  },
};

export default App;
