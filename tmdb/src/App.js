import React, { Component } from "react";
import "./App.css";
import apiKey from "./config/tmbdConf";
import API from "./tmdbApi/tmdbApi";
import InfiniteScroll from "react-infinite-scroller";
import Modal from "./CustomModal/Modal";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      hasMoreItems: true,
      page: 1,
      modal: false,
      details: [],
    };
  }

  fetchData(page) {
    var self = this;
    let tmdb = new API(apiKey.apiKey);

    tmdb.fetchMoviesDesc(page).then((resp, err) => {
      if (resp) {
        var movies = self.state.movies;
        resp.results.map((movie) => {
          movies.push(movie);
        });
      }
      if (page !== 501)
        self.setState({
          movies: movies,
          page: page + 1,
        });
      else {
        self.setState({ hasMoreItems: false });
      }
    });
  }

  render() {
    const loader = <div className="loader">Loading ...</div>;

    var items = [];
    this.state.movies.map((movie, i) => {
      return items.push(
        <div className="singleMovie">
          <button class="list-group-item text-center list-group-item-info">
            {movie.original_title}
            <Modal
              original_title={movie.original_title}
              overview={movie.overview}
              released={movie.release_date}
              movieID={movie.id}
            ></Modal>
          </button>
        </div>
      );
    });

    return (
      <div className="App">
        <InfiniteScroll
          pageStart={0}
          loadMore={this.fetchData.bind(this)}
          hasMore={this.state.hasMoreItems}
          loader={loader}
        >
          <div className="movies">{items}</div>
        </InfiniteScroll>
      </div>
    );
  }
}
export default App;
