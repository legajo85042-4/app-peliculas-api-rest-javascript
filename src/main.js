const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',

    },
    params: {
        'api_key': API_KEY,
    },
});


async function getTrendingMoviesPreview(){
    const {data} = await api('trending/movie/day');


    const movies = data.results;
    console.log({data, movies});
}

