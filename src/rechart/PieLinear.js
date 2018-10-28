import React, { Component } from "react";
import { ResponsiveContainer, PieChart, Pie, Sector, Cell, Label } from "recharts";
import "../style/style.css";
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

const defaultData = [{name: 'Group A', value: 400}, {name: 'Group B', value: 300},
              {name: 'Group C', value: 300}, {name: 'Group D', value: 200}];
const defaultColors = ['#0088FE', '#00C49F'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
 	const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x  = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy  + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
    	{`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};


class PieLinear extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name || "TotalPie",
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
  render() {
    const data = this.state.data;
    const colors = generateColors(this.state.colors, data.length);
    return(
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            innerRadius="50%"
            fill="#8884d8"
            paddingAngle={1}
            labelLine={true}
            label
          >
            {
              data.map((entry, index) => <Cell key={`Pie-Label-${index}`} fill={colors[index]}/>)
            }
            <Label value={data.reduce((a, {value}) => a + value, 0)} position="center" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    )
  }
}
export default PieLinear;
