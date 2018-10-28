import React, { Component } from "react";
import "../style/style.css";

class Widget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      key: this.props.key,
      content: this.props.content || ""
    }
  }
  render() {
    return(
      <div className="widget">
        <h1>{this.state.content.header ? this.state.content.header : "<Empty>"}</h1>
        <p>{this.state.content.data ? this.state.content.data : "<Empty>"}</p>
      </div>
    )
  }
}

export default Widget;
