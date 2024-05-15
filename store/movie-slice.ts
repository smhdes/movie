import { MovieDetail } from "@/pages/movie-details/movie-details.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MovieState {
    movieInfo: string;
    movieDetail:MovieDetail
}

const initialState: MovieState = {
    movieInfo: '',
      movieDetail: {
        Title: '',
        Year: '',
        Director: '',
        Genre: '',
        imdbRating: '',
        imdbVotes: '',
        imdbID: '',
        Type: '',
        DVD: '',
        BoxOffice: '',
        Poster: '',
        Runtime:'',
        Plot:''
    }
};

export const MovieSlice = createSlice({
    name: 'MovieSlice',
    initialState,
    reducers: {
        setMovieDetails: (state, action: PayloadAction<string>) => {
            state.movieInfo = action.payload;
        },
        getMovieInfoBanner:(state,action:PayloadAction<MovieDetail>)=>{
            state.movieDetail = action.payload
        }
    }
});

export const { setMovieDetails,getMovieInfoBanner } = MovieSlice.actions;
export default MovieSlice.reducer;
