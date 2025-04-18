import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

export const server = setupServer(

  http.get('https://www.omdbapi.com/', ({ request }) => {
    const url = new URL(request.url);
    if (url.searchParams.get('s') === 'movie') {
      return HttpResponse.json({
        Search: [
          { imdbID: '1', Title: 'The Dark Knight', Year: '2008' },
          { imdbID: '2', Title: 'Inception', Year: '2010' },
        ],
        totalResults: '2',
        Response: 'True',
      });
    }

    if (url.searchParams.get('s') === 'Batman') {
      return HttpResponse.json({
        Search: [
          { imdbID: '3', Title: 'Batman Begins', Year: '2005' },
          { imdbID: '4', Title: 'The Dark Knight Rises', Year: '2012' },
        ],
        totalResults: '2',
        Response: 'True',
      });
    }

    if (url.searchParams.get('i') === 'tt123456') {
      return HttpResponse.json({
        Title: 'Mocked Movie',
        Year: '2020',
        imdbRating: '8.0',
        Genre: 'Action',
        Director: 'Director Name',
        Actors: 'Actor 1, Actor 2',
        Plot: 'This is a mocked movie description.',
        Poster: 'https://via.placeholder.com/300x445?text=No+Image',
      });
    }

    return HttpResponse.json({ Response: 'False', Error: 'Movie not found!' });
  })
);