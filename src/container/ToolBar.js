import React, { Component } from "react";
import ReactFileReader from "react-file-reader";
import "../style/style.css";
import defaultTheme from '../settings/theme.json';

import defaultData from "../data/data.json";
import defaultColors from "../style/colors.json";

class ToolBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: "",
      styles: {},
      months: null,
      selectedMonth: "",
    };
  }

  componentWillMount() {
    this.loadTheme(defaultTheme);
  }

  loadTheme = (theme) => {
    // console.log("Loading theme", theme);
    let toolbarStyle = {};
    try {
      toolbarStyle = {
        backgroundColor: theme.colors.toolbar.background
      };
    } catch {
      // console.log("Cannot load theme, using default CSS");
    }
    this.setState({
      theme: theme,
      styles: {toolbarStyle: toolbarStyle}
    });
  }

  resetData = (event) => {
    event.preventDefault();
    this.loadDefaultData();
    this.loadDefaultColors();
  }

  loadDefaultData = () => {
    this.setMonthsMenu(defaultData.monthlyData);
    this.props.updateData(defaultData.monthlyData);
  }

  loadDefaultColors = () => {
    this.props.updateColors(defaultData.colorScheme);
  }

  setMonthsMenu = (data) => {
    const months = data.map(x => x.month);
    const latestMonth = months[data.length - 1];
    this.setState({
      months: months,
      selectedMonth: latestMonth
    })
  }

  selectMonth = month => {
    this.setState({ selectedMonth: month });
    this.props.updateMonth(month);
  }

  handleMonthSelect = event => {
    console.log("Selected", event.target.value);
    this.selectMonth(event.target.value);
  }

  handleFiles = (files) => {
    var reader = new FileReader();
    reader.onload = function(e) {
      const data = JSON.parse(reader.result);
      // console.log("Got file", data);
      this.props.updateColors(data.colorScheme);
      this.setMonthsMenu(data.monthlyData);
      this.props.updateData(data.monthlyData);
    }.bind(this)
    reader.readAsText(files[0]);
  }

  render() {
    const toolbarStyle = this.state.styles.toolbarStyle;
    const months = this.state.months;
    return(
      <div className="toolbar" style={{...toolbarStyle}}>
        <ReactFileReader handleFiles={this.handleFiles} fileTypes={'.json'}>
          <a href="#">Upload data</a>
        </ReactFileReader>
        <a href="#" onClick={this.resetData}>Default data</a>
        <a href="#">Default layout</a>
        { months &&
          <select value={this.state.selectedMonth} onChange={this.handleMonthSelect}>
            { months.map((month, index) =>
              <option key={`option-${index}`} value={month}>{month}</option>
            )}
          </select>
        }
      </div>
    )
  }
}

export default ToolBar;
