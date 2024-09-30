const User = require('../models/User.js');
const { fetchFromTMDB } = require('../services/tmdb.js');

module.exports.searchPerson= async (req, res)=> {
	const { query } = req.params;
    try {
		const response = await fetchFromTMDB(
			`${process.env.TMDB_API_URL}search/person?query=${query}&include_adult=false&language=en-US&page=1`
		);

		if (response.results.length === 0) {
			return res.status(404).send(null);
		}

		await User.findByIdAndUpdate(req.user._id, {
			$push: {
				searchHistory: {
					id: response.results[0].id,
					image: response.results[0].profile_path,
					title: response.results[0].name,
					searchType: "person",
					createdAt: new Date(),
				},
			},
		});
		return res.status(200).json({ success: true, content: response.results });
	} catch (error) {
		console.log("Error in searchPerson controller: ", error.message);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}

module.exports.searchMovie= async (req, res)=> {
	const { query } = req.params;

	try {
		const response = await fetchFromTMDB(
			`${process.env.TMDB_API_URL}search/movie?query=${query}&include_adult=false&language=en-US&page=1`
		);

		if (response.results.length === 0) {
			return res.status(404).send(null);
		}

		await User.findByIdAndUpdate(req.user._id, {
			$push: {
				searchHistory: {
					id: response.results[0].id,
					image: response.results[0].poster_path,
					title: response.results[0].title,
					searchType: "movie",
					createdAt: new Date(),
				},
			},
		});
		return res.status(200).json({ success: true, content: response.results });
	} catch (error) {
		console.log("Error in searchMovie controller: ", error.message);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}

module.exports.searchTv= async (req, res)=> {
	const { query } = req.params;

	try {
		const response = await fetchFromTMDB(
			`${process.env.TMDB_API_URL}search/tv?query=${query}&include_adult=false&language=en-US&page=1`
		);

		if (response.results.length === 0) {
			return res.status(404).send(null);
		}

		await User.findByIdAndUpdate(req.user._id, {
			$push: {
				searchHistory: {
					id: response.results[0].id,
					image: response.results[0].poster_path,
					title: response.results[0].name,
					searchType: "tv",
					createdAt: new Date(),
				},
			},
		});
		return res.json({ success: true, content: response.results });
	} catch (error) {
		console.log("Error in searchTv controller: ", error.message);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}

module.exports.getSearchHistory= async (req, res)=> {
	try {
		return res.status(200).json({ success: true, content: req.user.searchHistory });
	} catch (error) {
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}

module.exports.removeItemFromSearchHistory= async (req, res)=> {
	let { id } = req.params;

	id = parseInt(id);

	try {
		await User.findByIdAndUpdate(req.user._id, {
			$pull: {
				searchHistory: { id: id },
			},
		});

		return res.status(200).json({ success: true, message: "Item removed from search history" });
	} catch (error) {
		console.log("Error in removeItemFromSearchHistory controller: ", error.message);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}
