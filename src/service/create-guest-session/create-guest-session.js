export default function createGuestSession() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4Zjg4ZGE2YTE0ZjYyMGVkNDBhZWY2M2U2ODY4ODY5YyIsInN1YiI6IjY2M2I4YzE0NzcxZGEyNzUwNjNjMjMwNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RB0eEv4qtHx1qOWP4rcs0Btn3NX9qcOyfDSBD5nc2JI',
    },
  }

  return fetch('https://api.themoviedb.org/3/authentication/guest_session/new', options)
    .then((response) => response.json())
    .then((response) => response)
    .catch((err) => console.error(err))
}
