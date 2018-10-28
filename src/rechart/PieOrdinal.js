import React, { Component } from "react";
import { ResponsiveContainer, PieChart, Pie, Sector, Cell, Legend, Label } from "recharts";
import "../style/style.css";

const defaultData = [{name: 'Group A', value: 400}, {name: 'Group B', value: 300},
              {name: 'Group C', value: 300}];
const defaultColors = ['#004078', '#5f5f5f', '#bcbcbc'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, value }) => {
 	const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x  = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy  + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
    	{value}
    </text>
  );
};


class PieOrdinal extends Component {
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
    const colors = this.state.colors;
    return(
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            fill="#8884d8"
            innerRadius="50%"
            paddingAngle={1}
            labelLine={false}
            label={renderCustomizedLabel}
          >
            {
              data.map((entry, index) => <Cell key={`Pie-Label-${index}`} fill={colors[index % colors.length]}/>)
            }
            <Label value={data.reduce((a, {value}) => a + value, 0)} position="center" />
          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    )
  }
}
export default PieOrdinal;
