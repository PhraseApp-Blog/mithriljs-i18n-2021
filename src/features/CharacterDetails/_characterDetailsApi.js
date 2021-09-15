import m from "mithril";

export function fetchCharacterDetails(id) {
  return m.request(`https://swapi.dev/api/people/${id}`);
}
