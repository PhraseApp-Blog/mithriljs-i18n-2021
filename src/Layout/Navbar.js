import m from "mithril";

const Navbar = {
  view() {
    return m(
      ".navbar.u-full-width",
      m(".navbar-brand", [
        m("img[src=/img/yoda-icon.png]"),
        m(".navbar-brand-title", "Yodizer"),
      ]),
      m(".navbar-menu", [
        m(
          m.route.Link,
          { href: "/" },
          "Star Wars Characters",
        ),
        m(m.route.Link, { href: "/about" }, "About"),
      ]),
    );
  },
};

export default Navbar;
