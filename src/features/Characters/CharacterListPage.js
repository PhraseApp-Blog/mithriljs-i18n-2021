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
                m("th", t("name")),
                m("th", t("birth_year")),
                m("th", t("last_edited")),
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
                  m(
                    "td",
                    i18n.date(character.last_edited, {
                      dateStyle: "full",
                    }),
                  ),
                ]),
              ),
            ),
          ]),
    ];
  },
};

export default CharacterListPage;
