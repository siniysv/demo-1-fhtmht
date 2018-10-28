import React, { Component } from "react";
import ShortDescriptionTable from "./ShortDescriptionTable";
import "../style/style.css";

class ShortDescriptionWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      key: this.props.key,
      content: this.props.content || "",
      colors: this.props.colors,
      icon: this.props.icon || "flag"
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
      <div className="widget">
        <div title={title}>
          <h1>{header}</h1>
        </div>
        <div className="widget-text">
        {this.state.content.data ?
          <ShortDescriptionTable
            data={this.state.content.data}
            colors={this.state.colors}
            icon={this.state.icon}
            />
          : "<Empty>"}
        </div>
      </div>
    )
  }
}

export default ShortDescriptionWidget;
