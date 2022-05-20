import React from 'react';
import {MovieCard} from '../movie-card/movie-card';
import {MovieView} from '../movie-view/movie-view';

class MainView extends React.Component {
  constructor(){
    super();
    this.state = {
      movies: [
        {_id:"62739aba91f877a2ad6f0704",Title:"Silence of the Lambs",Description:"A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer.",Genre:{Name:"Thriller",Description:"Thriller film, also known as suspense film or suspense thriller, is a broad film genre that involves excitement and suspense in the audience."},ReleaseYear:"1991",Director:{Name:"Jonathan Demme",Bio:"Jonathan Demme was an American director, producer, and screenwriter.",Birth:"1944",Death:"2017"},ImagePath:"https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRK6O3rmiORv6ex7gee-NyXJMmDvHnPDAM645tGbnxchiXtanKW",Actors:["Anthony Hopkins","Jodie Foster","Lawrence A. Bonney"],Featured:true},
        {_id:"62739b5a91f877a2ad6f0705",Title:"Philadelphia",Description:"When a man with HIV is fired by his law firm because of his condition, he hires a homophobic small time lawyer as the only willing advocate for a wrongful dismissal suit.",Genre:{Name:"Drama",Description:"Drama is a category of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone."},ReleaseYear:"1993",Director:{Name:"Jonathan Demme",Bio:"Jonathan Demme was an American director, producer, and screenwriter.",Birth:"1944",Death:"2017"},ImagePath:"https://m.media-amazon.com/images/M/MV5BNDE0MWE1ZTMtOWFkMS00YjdiLTkwZTItMDljYjY3MjM0NTk5XkEyXkFqcGdeQXVyNDYyMDk5MTU@._V1_.jpg",Actors:["Tom Hanks","Denzel Washington","Roberta Maxwell"],Featured:true},
        {_id:"62739b8291f877a2ad6f0706",Title:"Funny People",Description:"When seasoned comedian George Simmons learns of his terminal, inoperable health condition, his desire to form a genuine friendship causes him to take a relatively green performer under his wing as his opening act.",Genre:{Name:"Comedy",Description:"Comedy is a genre of film in which the main emphasis is on humor. These films are designed to make the audience laugh through amusement and most often work by exaggerating characteristics for humorous effect."},ReleaseYear:"2009",Director:{Name:"Judd Apatow",Bio:"Judd Apatow is an American producer, writer, director, actor and stand-up comedian.",Birth:"1967",Death:""},ImagePath:"https://m.media-amazon.com/images/M/MV5BNWU0ZDllZWEtNWI4ZC00YjIzLTk3YjMtZmE0MmFiNzg4MmRlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_FMjpg_UX1000_.jpg",Actors:["Adam Sandler","Seth Rogen","Leslie Mann"],Featured:false}

      ],
      selectedMovie: null
    };
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  render() {
    const { movies, selectedMovie } = this.state;

  
    if (movies.length === 0) return <div className="main-view">The list is empty!</div>;
  
    return (
      <div className="main-view">
        {selectedMovie
          ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
          : movies.map(movie => (
            <MovieCard key={movie._id} movieData={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }}/>
          ))
        }
      </div>
    );
  }
}

export default MainView;

