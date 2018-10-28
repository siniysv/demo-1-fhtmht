import React, { Component } from "react";
import {ResponsiveContainer, BarChart, Bar, Legend} from "recharts";
import Rainbow from "rainbowvis.js";


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


const defaultData = [{"Windows XP": 3, "Windows 2003": 1}];

const defaultColors = ["#fcda0e", "#5dffbd"];

class GroupedBars extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name || "GroupedBars",
      data: this.props.data || defaultData,
      colors: this.props.colors || defaultColors
    }
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
    const keys = Object.keys(data[0]);
    const colors = generateColors(this.state.colors, keys.length);
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{top: 30, right: 0, left: 0, bottom: 0}}
          >
        >
           <Legend
             align="left"
             />
           { keys.map((key, index) =>
              <Bar key={`Bar-${index}`} dataKey={key} fill={colors[index]} label={{ position: 'top' }}/>
           )}
        </BarChart>
      </ResponsiveContainer>
    )
  }
}
export default GroupedBars;
