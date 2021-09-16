import m from "mithril";
import i18n from "../../services/i18n";
import Row from "./CharacterDetailsRow";
import { fetchCharacterDetails } from "./characterApi";
import { characterDetailsFromApi } from "./characterModel";

const { t } = i18n;

let state = {
  status: "loading",
  details: {},
};

function innerList(arr) {
  return arr.map((item) =>
    m("p.character-details-inner-list-item", item),
  );
}

function loadCharacterDetails(id) {
  return fetchCharacterDetails(id, i18n.currentLocale).then(
    (result) => {
      state.details = characterDetailsFromApi(result);
      state.status = "idle";
    },
  );
}

const CharacterDetailsPage = {
  oncreate(vnode) {
    this.loader = loadCharacterDetails.bind(
      null,
      vnode.attrs.id,
    );
    this.loader();
    i18n.addOnChangeListener(this.loader);
  },
  onremove() {
    i18n.removeOnChangeListener(this.loader);
  },
  view() {
    const { details } = state;

    return m(
      "[",
      state.status === "loading"
        ? m("p", "Loading...")
        : [
            m(
              "h1",
              t("character_name", { name: details.name }),
            ),
            m(".character-details", [
              m(Row, {
                label: t("homeworld"),
                value: details.homeworld,
              }),
              m(Row, {
                label: t("height"),
                value: details.height,
              }),
              m(Row, {
                label: t("mass"),
                value: details.mass,
              }),
              m(Row, {
                label: t("birth_year"),
                value: details.birth_year,
              }),
              m(Row, {
                label: t("films"),
                value: innerList(details.films),
              }),
              m(Row, {
                label: t("species"),
                value: innerList(details.species),
              }),
              m(Row, {
                label: t("vehicles"),
                value: innerList(details.vehicles),
              }),
              m(Row, {
                label: t("starships"),
                value: innerList(details.starships),
              }),
              m(Row, {
                label: t("last_edited"),
                value: details.last_edited,
              }),
            ]),
          ],
    );
  },
};

export default CharacterDetailsPage;
