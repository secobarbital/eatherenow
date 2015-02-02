var React = require('react');
var Swipeable = require('react-swipeable');
var request = require('superagent');

var Suggest = React.createClass({
    getInitialState: function() {
        return {
            restoIdx: 0,
            restaurants: [],
            cardTranslateX: 0,
            hasGeo: 'geolocation' in navigator
        };
    },

    componentWillMount: function() {
        if (this.state.hasGeo) {
            navigator.geolocation.getCurrentPosition(this.geoPosition, this.geoError);
        }
    },

    render: function() {
        var { restaurants, error, hasGeo, geoError } = this.state;

        if (restaurants.length) {
            return this.renderSuggestion();
        }

        if (geoError) {
            return <h3>Error locating you: {error}</h3>;
        }

        if (hasGeo) {
            return <h3>Locating you...</h3>;
        }

        return <h3>Hello</h3>;

    },

    renderSuggestion: function() {
        var restoIdx = this.state.restoIdx;
        var resto = this.state.restaurants[restoIdx];
        var swipingR = this.swiping.bind(this, 1);
        var swipingL = this.swiping.bind(this, -1);
        var swiped = this.swiped;
        var cardStyle = {
            transform: 'translateX(' + this.state.translateX + 'px)'
        };

        return (
            <Swipeable onSwipingRight={swipingR} onSwipingLeft={swipingL} onSwiped={swiped}>
                <div className="thumbnail" style={cardStyle}>
                    <img src={resto.image_url} />
                    <div className="caption">
                        <h3>{resto.name}</h3>
                        <pre>{JSON.stringify(resto, null, '  ')}</pre>
                    </div>
                </div>
            </Swipeable>
        );
    },

    swiping: function(direction, e, delta) {
        this.setState({ translateX: direction * delta });
    },

    swiped: function(e, x, y, isFlick) {
        var { restaurants, restoIdx } = this.state;
        var dir;
        var max;

        this.setState({ translateX: 0 });
        if (isFlick) {
            dir = x / Math.abs(x);
            max = restaurants.length;
            this.setState({
              restoIdx: (restoIdx + dir + max) % max
            });
        }
    },

    geoPosition: function(position) {
        this.setState({ position: position }, this.getRestaurants);
    },

    geoError: function(err) {
        this.setState({ geoError: err })
    },

    getRestaurants: function() {
        var url = 'http://192.168.1.111:3000/api/restaurants';
        var coords = this.state.position.coords;
        request
            .get(url)
            .query(coords)
            .end(function(err, res) {
                if (err) {
                    this.setState({ apiError: err });
                } else {
                    this.setState({ restaurants: res.body.businesses });
                }
            }.bind(this));
    }
});

module.exports = Suggest;
