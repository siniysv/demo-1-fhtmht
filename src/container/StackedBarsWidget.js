import React, { Component } from "react";
import StackedBars from "../rechart/StackedBars";
import "../style/style.css";

class StackedBarsWidget extends Component {
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
    return(
      <div className="widget" title={title}>
        <div>
          <h1>{header}</h1>
        </div>
        <div className="widget-content">
          {this.state.content.data ?
            <StackedBars
              data={this.state.content.data}
              colors={this.state.colors}
              />
            : "<Empty>"}
        </div>
      </div>
    )
  }
}

export default StackedBarsWidget;
