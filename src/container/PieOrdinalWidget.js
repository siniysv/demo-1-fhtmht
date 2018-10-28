import React, { Component } from "react";
import PieOrdinal from "../rechart/PieOrdinal";
import "../style/style.css";

class PieOrdinalWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      key: this.props.key,
      content: this.props.content || "",
      colors: this.props.colors || ""
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.content != this.state.content) {
      this.setState({
        content: nextProps.content,
        colors: nextProps.colors
      })
    }
  }

  render() {
    const title = this.state.content.header ? this.state.content.header : "<Empty>";
    const header = this.state.content.header ? this.state.content.header : "<Empty>";
    const data = this.state.content.data;
    return(
      <div className="widget" title={title}>
        <div>
          <h1>{header}</h1>
        </div>
        <div className="widget-content">
        {this.state.content.data ?
          <PieOrdinal
            data={data}
            colors={this.state.colors}
            />
          : "<Empty>"}
        </div>
      </div>
    )
  }
}

export default PieOrdinalWidget;
