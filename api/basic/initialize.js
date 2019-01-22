var fs = require('fs');

module.exports = function (req, res) {
  fs.readFile('./public/datas/market.json', function (err, data) {
    if (err) console.log(err)
    res.json({
      "data": JSON.parse(data)
    })
  })
}