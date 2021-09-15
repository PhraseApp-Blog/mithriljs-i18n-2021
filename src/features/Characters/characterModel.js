export function characterListFromApi(results) {
  return results.map((character) => ({
    id: character.url.split("/").slice(-2)[0],
    name: character.name,
    birth_year: character.birth_year,
    height_in_cm: character.height,
    last_edited: character.edited,
  }));
}

export function characterDetailsFromApi(data) {
  const { name, height, mass, birth_year, edited } = data;

  return {
    name,
    height,
    mass,
    birth_year,
    last_edited: edited,
  };
}
