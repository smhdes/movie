import { serviceCall } from "../base/services"

const getMovieDetails =async (imdbId:string) => {

    try {
        const res = await serviceCall.get(`http://www.omdbapi.com/?apikey=9bb20777&i=${imdbId}`)
        return res?.data
    } catch (error) {
        throw error
    }
}

export default getMovieDetails