import m from "mithril";

const AboutPage = {
  view() {
    return m("[", [
      m("h1", "About"),
      m("p", [
        "A fun demo by Phrase to explore localizing Mithril apps. Created with ",
        m("a[href=https://mithril.js.org/]", "Mithril"),
        ", ",
        m("a[href=http://getskeleton.com/]", "Skeleton"),
        ", and ",
        m(
          "a[href=https://swapi.dev/]",
          "SWAPI (The Star Wars API)",
        ),
        ". Copyright (c) 2021 Phrase / Memsource GmbH under the MIT license.",
      ]),
    ]);
  },
};

export default AboutPage;
