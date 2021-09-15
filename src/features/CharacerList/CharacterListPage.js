import m from "mithril";
import { fetchCharacters } from "./_characterListApi";
import { fromApi } from "./_characterListModel";

let state = {
  status: "loading",
  list: [],
};

const CharacterList = {
  oncreate() {
    fetchCharacters().then((results) => {
      state.list = fromApi(results);
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
                m("th", "Height"),
                m("th", "Last edited"),
              ]),
            ),
            m(
              "tbody",
              state.list.map((character) =>
                m("tr", [
                  m("td", character.name),
                  m("td", character.birth_year),
                  m("td", character.height_in_cm),
                  m("td", character.last_edited),
                ]),
              ),
            ),
          ]),
    ]);
  },
};

export default CharacterList;
