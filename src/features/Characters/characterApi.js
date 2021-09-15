import m from "mithril";

export function fetchCharacters() {
  return m.request("/data/characters.json");
}

export function fetchCharacterDetails(id) {
  return new Promise((resolve) => {
    fetchCharacters().then((characters) =>
      resolve(
        characters.find((c) => c.id === parseInt(id)),
      ),
    );
  });
}
