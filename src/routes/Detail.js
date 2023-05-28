import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function Detail() {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [selectedMovie, setSelectedMovie] = useState("");

    const getMovie = async() => {
        const json = await (
            await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
        ).json();
        console.log(json);
        setSelectedMovie(json);
        setLoading(false);
    };
    useEffect(() => {
        getMovie();
    }, [])
    return (
        <div>
        {loading ?
          <h1>Loading...</h1>
          :
          <div>
                <img src={selectedMovie.data.movie.medium_cover_image} alt={selectedMovie.data.movie.title}></img>
                <h3> Title : {selectedMovie.data.movie.title}</h3>
                <h3> Genres : {selectedMovie.data.movie.genres[0]}</h3>
                <h3> Year : {selectedMovie.data.movie.year}</h3>
                <h3> Language : {selectedMovie.data.movie.language}</h3>
                <p>{selectedMovie.data.movie.description_full}</p>
                <h3><Link to='/' style={{textDecoration:"none", color:"tomato"}}>Go back</Link></h3>
          </div>}
      </div>
    );
}

export default Detail;