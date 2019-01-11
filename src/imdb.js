const _ = require("lodash");
const imdb = require("imdb-api");

const cli = new imdb.Client({ apiKey: process.env.IMDB_API_KEY });

const _formatShow = show => {
  return _.pick(show, [
    "title",
    "rated",
    "plot",
    "poster",
    "rating",
    "totalseasons",
    "name",
    "imdburl",
    "start_year",
    "end_year"
  ]);
};

const _formatEpisode = episode => {
  return _.pick(episode, ["title", "season", "episode", "rating", "imdburl"]);
};

const getMovie = async name => {
  if (_.isEmpty(name)) return;
  const search = await cli.search({ name });
  const movieDetails = await cli.get({ name });
  //   console.log(movieDetails)
  return _.first(search.results);
};

const getEpisodes = async name => {
  if (_.isEmpty(name)) return;
  const show = await cli.get({ name });
  // console.log(show);
  const episodes = await show.episodes();
  return {
    show: _formatShow(show),
    episodes: _.map(episodes, _formatEpisode)
  };
};

module.exports = {
  getMovie,
  getEpisodes
};
