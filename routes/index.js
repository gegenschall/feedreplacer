var FeedParser = require('feedparser')
  , parser = new FeedParser()
	;

function feedCallback (error, meta, articles) {
	if (error) console.error(error);
	else {
		articles.forEach(function (article){
            console.log(article);
		});
	}
}

exports.rss = function(req, res){
    var feed = parser.parseUrl('http://www.namhaft.org/rss', function(error, meta, articles){
        if (error) {
            console.log(error);
            res.statusCode = 500;
            res.send('Error occured!');
        }
        else {
            console.log(meta.link);
            res.render('rss', {'lang': 'de-de', 'articles': articles, 'meta': meta}, function(err, html) {
                res.set('Content-Type', 'text/xml');
                res.send(new Buffer(html));
            });
        }
    });    
};

exports.index = function(req, res){
    res.send('There is nothing here, Steffi!');
};
