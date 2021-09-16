import m from "mithril";
import i18n from "./i18n";

const localeParam = "locale";

export function localizedRoutes(routes) {
  const result = {};

  Object.keys(routes).forEach((path) => {
    result["/:" + localeParam + path] = routes[path];
  });

  return result;
}

export function setLocaleFromRoute() {
  const newLocale = m.route.param(localeParam);

  if (newLocale === i18n.currentLocale) {
    return;
  }

  if (i18n.supported(newLocale)) {
    i18n.loadAndSetLocale(newLocale);
  } else {
    m.route.set(`/${i18n.defaultLocale}`);
  }
}

export function localizeHref(href) {
  return "/" + i18n.currentLocale + href;
}

/**
 * `localizedLink("/uri", children)`
 * or
 * `localizedLink("/uri", attrs, children)`
 * @param {string} href
 * @returns Vnode
 */
export function localizedLink(href, ...args) {
  const [attrs, children] =
    args.length === 1 ? [{}, args[0]] : args;

  return m(
    m.route.Link,
    {
      ...attrs,
      href: localizeHref(href),
    },
    children,
  );
}

export function currentPathToLocale(newLocale) {
  const pathParts = m.route.get().split("/");
  pathParts[1] = newLocale;
  return pathParts.join("/");
}
