var React = require("react");

class Home extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h1>Welcome to Pokedex</h1>
          <ul>
            {this.props.rows.map(pokemon => (
              <li key={pokemon.id}>
                <p>{pokemon.name}</p>
                <p>{pokemon.num}</p>
                <img src={pokemon.img}/>
              </li>
            ))}
          </ul>
        </body>
      </html>
    );
  }
}

module.exports = Home;
