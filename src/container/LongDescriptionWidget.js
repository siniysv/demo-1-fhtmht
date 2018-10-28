import React, { Component } from "react";
import LongDescriptionTable from "./LongDescriptionTable";
import "../style/style.css";

class LongDescriptionWidget extends Component {
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
    // console.log(this.state.content);
    const title = this.state.content.header ? this.state.content.header : "<Empty>";
    const header = this.state.content.header ? this.state.content.header : "<Empty>";
    return(
      <div className="widget">
        <div className="widget-header" title={title}>
          <h1>{header}</h1>
        </div>
        <div className="widget-text">
        {this.state.content.data ?
          <LongDescriptionTable
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

export default LongDescriptionWidget;
