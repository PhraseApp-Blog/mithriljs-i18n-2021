import m from "mithril";
import { t } from "../services/i18n";

const Navbar = {
  view() {
    return m(
      ".navbar.u-full-width",
      m(".navbar-brand", [
        m("img[src=/img/yoda-icon.png]"),
        m(".navbar-brand-title", t("app_name")),
      ]),
      m(".navbar-menu", [
        m(
          m.route.Link,
          { href: "/" },
          t("star_wars_characters"),
        ),
        m(m.route.Link, { href: "/about" }, t("about")),
      ]),
    );
  },
};

export default Navbar;
