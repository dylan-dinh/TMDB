import axios from "axios";
import defaults from "lodash/defaults";

class API {
  constructor(apiKey) {
    this.apiKey = apiKey;

    let credentials = {};
    const config = defaults(credentials, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
    this.axios = axios.create(config);
  }

  fetchMoviesDesc = async (page) => {
    try {
      let response = await axios.get(
        "https://api.themoviedb.org/3/discover/movie?api_key=8e6ce3c9438e71577a102b7df1ed62f0&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=" +
          page
      );
      return response.data;
    } catch (err) {
      return err;
    }
  };

  fetchMovieDetails = async (id) => {
    try {
      let response = await axios.get(
        "https://api.themoviedb.org/3/movie/" +
          id +
          "?api_key=8e6ce3c9438e71577a102b7df1ed62f0&language=en-US"
      );
      return response.data;
    } catch (err) {
      return err;
    }
  };
}

export default API;
