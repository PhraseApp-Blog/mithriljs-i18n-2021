import m from "mithril";
import i18n from "../../services/i18n";
import { localizedLink } from "../../services/i18nRouting";
import { fetchCharacters } from "./characterApi";
import { characterListFromApi } from "./characterModel";

const { t } = i18n;

let state = {
  status: "loading",
  list: [],
};

function loadCharacters() {
  state.status = "loading";
  fetchCharacters(i18n.currentLocale).then((results) => {
    state.list = characterListFromApi(results);
    state.status = "idle";
  });
}

const CharacterListPage = {
  oncreate() {
    loadCharacters();
    i18n.addOnChangeListener(loadCharacters);
  },
  onremove() {
    i18n.removeOnChangeListener(loadCharacters);
  },
  view() {
    return [
      m(".header", [
        m("h1", t("star_wars_characters")),
        m(
          "span",
          t("character_count", {
            count: state.list.length,
          }),
        ),
      ]),
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
                    localizedLink(
                      `/characters/${character.id}`,
                      character.name,
                    ),
                  ),
                  m("td", character.birth_year),
                  m("td", character.last_edited),
                ]),
              ),
            ),
          ]),
    ];
  },
};

export default CharacterListPage;
