import m from "mithril";

export function fetchCharacters(locale) {
  return m.request(`/data/data-${locale}.json`);
}

export function fetchCharacterDetails(id, locale) {
  return new Promise((resolve) => {
    fetchCharacters(locale).then((characters) =>
      resolve(
        characters.find((c) => c.id === parseInt(id)),
      ),
    );
  });
}
