var React = require('react');
var Swipeable = require('react-swipeable');
var restaurants = require('../restaurants.json').restaurants;

var Suggest = React.createClass({
  getInitialState: function() {
    return {
      restoIdx: 0,
      cardTranslateX: 0
    };
  },

  render: function() {
    var resto = restaurants[this.state.restoIdx];
    var swipingRight = this.swiping.bind(this, 1);
    var swipingLeft = this.swiping.bind(this, -1);
    var cardStyle = {
      transform: 'translateX(' + this.state.translateX + 'px)'
    };

    return (
      <Swipeable onSwipingRight={swipingRight} onSwipingLeft={swipingLeft} onSwiped={this.swiped}>
        <div className="thumbnail">
          <img src={resto.image_url} style={cardStyle} />
          <div className="caption">
            <h3>{resto.name}</h3>
            <p>{resto.description}</p>
          </div>
        </div>
      </Swipeable>
    );
  },

  swiping: function(direction, e, delta) {
    this.setState({ translateX: direction * delta });
  },

  swiped: function(e, x, y, isFlick) {
    this.setState({ translateX: 0 });
    if (isFlick) {
      this.setState({ restoIdx: (this.state.restoIdx+1)%restaurants.length })
    }
  }
});

module.exports = Suggest;
