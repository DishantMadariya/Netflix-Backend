const { fetchFromTMDB } = require("../services/tmdb");

module.exports.getTrending = async (req, res) => {
    try {
        const data = await fetchFromTMDB(`${process.env.TMDB_API_URL}trending/tv/day?language=en-US`);
        if (data.results.length === 0) return res.status(404).json({ success: false, message: "No tv shows found" });
        const randomTv = data.results[Math.floor(Math.random() * data.results?.length)];
        if (!randomTv)  return res.status(404).json({ success: false, message: "No tv shows found" });
        return res.status(201).json({ success: true, content: randomTv });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

module.exports.getTrailer = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(`${process.env.TMDB_API_URL}tv/${id}/videos?language=en-US`);
        if (data.results.length === 0) return res.status(404).json({ success: false, message: "No tv shows found" });
        const randomTv = data.results[Math.floor(Math.random() * data.results?.length)];
        if (!randomTv)  return res.status(404).json({ success: false, message: "No tv shows found" });
        return res.json({ success: true, trailers: randomTv });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

module.exports.getTvDetails = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(`${process.env.TMDB_API_URL}tv/${id}?language=en-US`);
        if (!data) return res.status(404).json({ success: false, message: "No tv shows found" });
        return res.status(200).json({ success: true, content: data });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

module.exports.getSimilarTvs = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(`${process.env.TMDB_API_URL}tv/${id}/similar?language=en-US&page=1`);
        if (data.results.length === 0) return res.status(404).json({ success: false, message: "No tv shows found" });
        const randomTv = data.results[Math.floor(Math.random() * data.results?.length)];
        if (!randomTv) return res.status(404).json({ success: false, message: "No tv shows found" });
        return res.status(200).json({ success: true, similar: data.results });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

module.exports.getTvsByCategory = async(req, res)=> {
	const { category } = req.params;
	try {
        const data = await fetchFromTMDB(`${process.env.TMDB_API_URL}tv/${category}?language=en-US&page=1`);
        if (!data) return res.status(404).json({ success: false, message: "No tv shows found" });
        return res.status(200).json({ success: true, content: data });
    } catch (error) {
        console.log(error);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}