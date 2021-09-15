import m from "mithril";
import Row from "./CharacterDetailRow";
import { fetchCharacterDetails } from "./characterApi";
import { characterDetailsFromApi } from "./characterModel";

let state = {
  status: "loading",
  details: {},
};

const CharacterDetailsPage = {
  oncreate(vnode) {
    fetchCharacterDetails(vnode.attrs.id).then((result) => {
      state.details = characterDetailsFromApi(result);
      state.status = "idle";
    });
  },
  view() {
    return m(
      "[",
      state.status === "loading"
        ? m("p", "Loading...")
        : m("[", [
            m("h1", state.details.name),
            m(".character-details", [
              m(Row, {
                label: "Height",
                value: state.details.height,
              }),
              m(Row, {
                label: "Mass",
                value: state.details.mass,
              }),
              m(Row, {
                label: "Birth Year",
                value: state.details.birth_year,
              }),
              m(Row, {
                label: "Last edited",
                value: state.details.last_edited,
              }),
            ]),
          ]),
    );
  },
};

export default CharacterDetailsPage;
