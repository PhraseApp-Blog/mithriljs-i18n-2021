export function fromApi(results) {
  return results.map((character) => ({
    name: character.name,
    birth_year: character.birth_year,
    height_in_cm: character.height,
    last_edited: character.edited,
  }));
}
