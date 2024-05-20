export default function RateFilm(rate, sessionId, filmId) {
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4Zjg4ZGE2YTE0ZjYyMGVkNDBhZWY2M2U2ODY4ODY5YyIsInN1YiI6IjY2M2I4YzE0NzcxZGEyNzUwNjNjMjMwNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RB0eEv4qtHx1qOWP4rcs0Btn3NX9qcOyfDSBD5nc2JI',
    },
    body: `{"value":${rate}}`,
  }

  fetch(`https://api.themoviedb.org/3/movie/${filmId}/rating?guest_session_id=${sessionId}`, options)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err))
}
