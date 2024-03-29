import m from "mithril";
import LangSwitcher from "../features/LangSwitcher/LangSwitcher";
import { t } from "../services/i18n";
import { localizedLink } from "../services/i18nRouting";

const Navbar = {
  view() {
    return m(
      ".navbar.u-full-width",
      m(".navbar-brand", [
        m("img[src=/img/yoda-icon.png]"),
        m(".navbar-brand-title", t("app_name")),
      ]),
      m(".navbar-menu", [
        localizedLink("/", t("star_wars_characters")),
        localizedLink("/about", t("about")),
      ]),
      m(".navbar-end", m(LangSwitcher)),
    );
  },
};

export default Navbar;
