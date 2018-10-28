import React, { Component } from "react";
import {ResponsiveContainer, BarChart, Bar, Legend, LabelList} from "recharts";

const defaultData = [
      {"name": "<Month>", "Protected": 46, "Unprotected": 10}
    ];
const defaultColors = ["#fcda0e", "#5d87bd"]

class StackedBars extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name || "vsBar",
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
    const colors = this.state.colors;
    const totalFormatter = (label) => {
      const item = data.find(x => x.name === label);
      const total = item["Protected"] + item["Unprotected"];
      return total
    }
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{top: 30, right: 0, left: 0, bottom: 0}}
          >
        >
           <Legend
             layout="horizontal"
             align="left"
             />
           <Bar dataKey="Unprotected" stackId="a" fill={this.state.colors[0]}>
             <LabelList dataKey="Unprotected" position="center" />
           </Bar>
           <Bar dataKey="Protected" stackId="a" fill={this.state.colors[1]} label={{ position: "top" }}>
             <LabelList dataKey="Protected" position="center" />
           </Bar>
        </BarChart>
      </ResponsiveContainer>
    )
  }
}
export default StackedBars;
