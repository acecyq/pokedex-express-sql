var React = require("react");

class Pokemon extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <div>
            <ul className="pokemon-list">
              <li className="pokemon-attribute">
                id: {this.props.id}
              </li>
              <li className="pokemon-attribute">
                num: {this.props.num}
              </li>
              <li className="pokemon-attribute">
                name: {this.props.name}
              </li>
              <li className="pokemon-attribute">
                img: <img src={this.props.img}/>
              </li>
              <li className="pokemon-attribute">
                height: {this.props.height}
              </li>
              <li className="pokemon-attribute">
                weight: {this.props.weight}
              </li>
            </ul>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Pokemon;
