var Stats = require('./stats');

module.exports = function(viewModel, callback) {
  viewModel.sidebar = {
    stats: Stats()
  };
  callback(viewModel);
};
