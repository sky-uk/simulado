function withCallback(fn, callback) {
  console.warn("Callbacks are deprecated, we're moving towards a promise-based API.");
  try {
    return fn().end(function (error, res) {
      if (error) callback(error)
      else callback(error, res.body)
    });
  } catch (e) {
    callback(e);
  }
}

function withoutCallback(fn) {
  return new Promise(function (resolve, reject) {
    try {
      fn().end(function (err, res) {
        if (err) reject(err);
        else resolve(res.body);
      });
    } catch (e) {
      reject(e);
    }
  });
}

module.exports = function(fn, callback) {
  return callback ? withCallback(fn, callback) : withoutCallback(fn);
};
