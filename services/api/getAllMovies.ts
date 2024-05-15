import { serviceCall } from "../base/services"

const getAllMovies = async (currentPage: number, gradeType: string,searchText?:string,movieYear?: string) => {
try {
    const res = await serviceCall.get(`${process.env.NEXT_PUBLIC_OMDB_URL}/?apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}&y=${movieYear}&type=${gradeType}&s=${searchText}&page=${currentPage}`)
    return res?.data;
} catch (error) {
    throw error
}
}
export default getAllMovies