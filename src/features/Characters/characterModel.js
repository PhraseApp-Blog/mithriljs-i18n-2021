export function characterListFromApi(results) {
  return results.map((character) => ({
    id: character.id,
    name: character.name,
    birth_year: character.birth_year,
    last_edited: character.edited,
  }));
}

export function characterDetailsFromApi(data) {
  return {
    ...data,
    last_edited: data.edited,
  };
}
