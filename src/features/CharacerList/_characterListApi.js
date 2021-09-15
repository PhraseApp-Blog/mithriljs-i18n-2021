import m from "mithril";

export function fetchCharacters() {
  return new Promise((resolve) => {
    m.request("https://swapi.dev/api/people/").then(
      ({ results }) => resolve(results),
    );
  });
}
