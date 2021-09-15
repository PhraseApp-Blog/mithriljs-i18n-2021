export function fromApi(results) {
  return results.map((character) => ({
    id: character.url.split("/").slice(-2)[0],
    name: character.name,
    birth_year: character.birth_year,
    height_in_cm: character.height,
    last_edited: character.edited,
  }));
}
