
export interface Movie {
    Title: string
    Year: string
    imdbID: string
    Type: string
    Poster: string
  }
  
  export interface TMovieDetails extends Movie {
    Plot: string
    Director: string
    Genre: string
    Runtime: string
    Released: string
    imdbRating: string
    Actors: string
    Country: string
  }
  
  export {}