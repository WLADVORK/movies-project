export default async function findFilms(word, num) {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${word}&include_adult=true&page=${num}`,
    {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4Zjg4ZGE2YTE0ZjYyMGVkNDBhZWY2M2U2ODY4ODY5YyIsInN1YiI6IjY2M2I4YzE0NzcxZGEyNzUwNjNjMjMwNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RB0eEv4qtHx1qOWP4rcs0Btn3NX9qcOyfDSBD5nc2JI',
        accept: 'application/json',
      },
      // eslint-disable-next-line comma-dangle
    }
  )
  const json = await response.json()
  let res = json.results
  if (!word) {
    return []
  }
  if (res.length === 0) {
    res = ['nodata']
  }
  return {
    total: json.total_results,
    movies: res,
  }
}
