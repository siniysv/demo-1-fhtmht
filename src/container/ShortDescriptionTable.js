import React, { Component } from "react";
import "../style/style.css";
import Rainbow from "rainbowvis.js";
import FontAwesome from "react-fontawesome";

function generateColors(range, number) {
  const myRainbow = new Rainbow();
  myRainbow.setSpectrum(range[0], range[1]);
  myRainbow.setNumberRange(1, number);
  let colors = [];
  for (let i = 1; i <= number; i++) {
    colors.push('#' + myRainbow.colourAt(i));
  }
  return colors
}

const defaultData = ["Default Systems with full protection", "Default Systems partially protected", "Default Systems almost unrpotected"];
const defaultColors = ["#fcda0e", "#5d87bd"]

class ShortDescriptionTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name || "ShortDescriptionTable",
      data: this.props.data || defaultData,
      colors: this.props.colors || defaultColors,
      icon: this.props.icon || "flag"
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.data != this.state.data) {
      this.setState({
        data: nextProps.data,
        colors: nextProps.colors
      })
    }
  }

  render () {
    const data = this.state.data;
    // console.log(data);
    const colors = generateColors(this.state.colors, data.length);
    const icon = this.state.icon;
    return (
      <table className="short-desc-table">
        <tbody>
          { data.map((item, index) =>
            <tr key={`ShortDescriptionTable-Row-${index}`}>
              <td className="min">
                <FontAwesome name={icon} style={{color: colors[index]}} />
              </td>
              <td>{item}</td>
            </tr>
          )}
        </tbody>
      </table>
    )
  }
}

export default ShortDescriptionTable;
