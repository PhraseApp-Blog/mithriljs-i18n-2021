import m from "mithril";
import Row from "./CharacterDetailsRow";
import { fetchCharacterDetails } from "./characterApi";
import { characterDetailsFromApi } from "./characterModel";

let state = {
  status: "loading",
  details: {},
};

function innerList(arr) {
  return arr.map((item) =>
    m("p.character-details-inner-list-item", item),
  );
}

const CharacterDetailsPage = {
  oncreate(vnode) {
    fetchCharacterDetails(vnode.attrs.id).then((result) => {
      state.details = characterDetailsFromApi(result);
      state.status = "idle";
    });
  },
  view() {
    const { details } = state;

    return m(
      "[",
      state.status === "loading"
        ? m("p", "Loading...")
        : [
            m("h1", details.name),
            m(".character-details", [
              m(Row, {
                label: "Homeworld",
                value: details.homeworld,
              }),
              m(Row, {
                label: "Height",
                value: details.height,
              }),
              m(Row, {
                label: "Mass",
                value: details.mass,
              }),
              m(Row, {
                label: "Birth year",
                value: details.birth_year,
              }),
              m(Row, {
                label: "Films",
                value: innerList(details.films),
              }),
              m(Row, {
                label: "Species",
                value: innerList(details.species),
              }),
              m(Row, {
                label: "Vehicles",
                value: innerList(details.vehicles),
              }),
              m(Row, {
                label: "Starships",
                value: innerList(details.starships),
              }),
              m(Row, {
                label: "Last edited",
                value: details.last_edited,
              }),
            ]),
          ],
    );
  },
};

export default CharacterDetailsPage;
