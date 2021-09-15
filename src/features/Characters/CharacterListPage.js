import m from "mithril";
import { fetchCharacters } from "./characterApi";
import { characterListFromApi } from "./characterModel";

let state = {
  status: "loading",
  list: [],
};

const CharacterListPage = {
  oncreate() {
    fetchCharacters().then((results) => {
      state.list = characterListFromApi(results);
      state.status = "idle";
    });
  },
  view() {
    return m("[", [
      m("h1", "Star Wars Characters"),
      state.status === "loading"
        ? m("p", "Loading...")
        : m("table.u-full-width", [
            m(
              "thead",
              m("tr", [
                m("th", "Name"),
                m("th", "Birth year"),
                m("th", "Last edited"),
              ]),
            ),
            m(
              "tbody",
              state.list.map((character) =>
                m("tr", [
                  m(
                    "td",
                    m(
                      m.route.Link,
                      {
                        href: `/characters/${character.id}`,
                      },
                      character.name,
                    ),
                  ),
                  m("td", character.birth_year),
                  m("td", character.last_edited),
                ]),
              ),
            ),
          ]),
    ]);
  },
};

export default CharacterListPage;
