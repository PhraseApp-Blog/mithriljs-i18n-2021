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
