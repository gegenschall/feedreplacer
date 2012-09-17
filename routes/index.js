var FeedParser = require('feedparser')
  , parser = new FeedParser()
	;

exports.rss = function(req, res, feedConfig){
    var feed = parser.parseUrl(feedConfig.feedUrl, function(error, meta, articles){
        if (error) {
            console.log(error);
            res.send(500, {error: 'Error occured!'});
        }
        else {
            for (var key in feedConfig.replace){
                meta[key] = feedConfig.replace[key];
            }
            res.render('rss', {'articles': articles, 'meta': meta}, function(err, html) {
                res.set('Content-Type', 'text/xml');
                if (err) console.log(err);
                res.send(html);
            });
        }
    });    
};

exports.index = function(req, res){
    res.send(404, 'There is nothing here, Steffi!');
};
