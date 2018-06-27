var React = require("react");

class Edit extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h4>Editing: {this.props.name}</h4>
          <form
            className="pokemon-form"
            method="POST"
            action={"/" + this.props.id + "?_method=PUT"}
          >
            <div className="pokemon-attribute">
              id:<input name="id" type="text" defaultValue={this.props.id} />
            </div>
            <div className="pokemon-attribute">
              num:<input
                name="num"
                type="text"
                defaultValue={this.props.num}
              />
            </div>
            <div className="pokemon-attribute">
              name:<input
                name="name"
                type="text"
                defaultValue={this.props.name}
              />
            </div>
            <div className="pokemon-attribute">
              img:<input
                name="img"
                type="text"
                defaultValue={this.props.img}
              />
            </div>
            <div className="pokemon-attribute">
              height:<input
                name="height"
                type="text"
                defaultValue={this.props.height}
              />
            </div>
            <div className="pokemon-attribute">
              weight:<input
                name="weight"
                type="text"
                defaultValue={this.props.weight}
              />
            </div>
            <input name="submit" type="submit" />
            <input name="delete" type="submit" value="Delete" formAction={"/" + this.props.id + "?_method=DELETE"} />
          </form>
        </body>
      </html>
    );
  }
}

module.exports = Edit;
