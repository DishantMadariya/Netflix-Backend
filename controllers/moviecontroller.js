const { fetchFromTMDB } = require("../services/tmdb");
module.exports.getTrendingMovies = async (req, res) => {
    try {
        const data = await fetchFromTMDB(`${process.env.TMDB_API_URL}trending/movie/day?language=en-US`);
        if (data.results.length === 0) {
            return res.status(404).json({ success: false, message: "No movies found" });
        }
        const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)];
        if (!randomMovie) {
            return res.status(404).json({ success: false, message: "No movies found" });
        }
        return res.status(201).json({ success: true, content: randomMovie });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

module.exports.getTrailers = async (req, res) => {
    try {
        // get the movie id from the request parameters
        const { movieId } = req.params;
        // get the movie details from the movie id
        const trailers = await fetchFromTMDB(`${process.env.TMDB_API_URL}movie/${movieId}/videos?language=en-US`);
        if (trailers.length === 0) {
            return res.status(404).json({ success: false, message: "No movie found" });
        }
        // get a random trailer from the trailers array
        const randomTrailer = trailers.results[Math.floor(Math.random() * trailers.results.length)];
        if (!randomTrailer) {
            return res.status(404).json({ success: false, message: "No trailers found" });
        }
        return res.status(201).json({ success: true, content: randomTrailer });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

module.exports.getMovieDetails = async (req, res) => {
    try {
        const { movieId } = req.params;
        const movieDetails = await fetchFromTMDB(`${process.env.TMDB_API_URL}movie/${movieId}/videos?language=en-US`);
        if (movieDetails.length === 0) {
            return res.status(404).json({ success: false, message: "No movie found" });
        }
        return res.status(201).json({ success: true, content: movieDetails })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

module.exports.getSimilarMovies = async (req, res) => {
    try {
        const { movieId } = req.params;
        const similarMovies = await fetchFromTMDB(`${process.env.TMDB_API_URL}movie/${movieId}/similar?language=en-US`);
        if (similarMovies.length === 0) {
            return res.status(404).json({ success: false, message: "No similar movies found" });
        }
        return res.status(201).json({ success: true, content: similarMovies });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

module.exports.getMoviesByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const data = await fetchFromTMDB(`${process.env.TMDB_API_URL}movie/${category}?language=en-US&page=1`);
        console.log(data);
        if (data.length === 0) {
            return res.status(404).json({ success: false, message: "No movies found in this category" });
        }
        return res.status(200).json({ success: true, content: data });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
