import axios from "axios";

// The getRecipes method retrieves recipes from the server
// It accepts a "query" or term to search the recipe api for
export default {
	gameSearch: function (query) {
		return axios.get(`/api/search/${query}`);
	},
	getPopular: function () {
		return axios.get(`/api/popular`);
	},

	coverSearch: function (query) {
		return axios.get(`/api/games/covers/${query}`);
	}
};
