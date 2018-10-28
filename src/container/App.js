import React, { Component } from "react";
import ToolBar from "./ToolBar";
import MSSPReport from "./MSSPReport";
import "../style/style.css";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      reportData: "",
      reportColors: "",
      month: ""
    }
  }

  updateData = (data) => {
    this.setState({ data: data });
    console.log("App data updated");
    const months = data.map(x => x.month);
    const latestMonth = months[data.length - 1];
    if (months.findIndex(x => x === this.state.month) === -1) {
      this.updateMonth(latestMonth);
      this.prepareData(data, latestMonth);
    } else {
      this.prepareData(data, this.state.month);
    }
  }

  updateColors = (colors) => {
    this.setState({ reportColors: colors });
    console.log("App colors updated");
  }

  updateMonth = (month) => {
    this.setState({ month: month });
    console.log("App month updated", month);
    this.prepareData(this.state.data, month);
  }

  prepareData = (data, month) => {
    if (data) {
      if (month) {
        this.setState({
          reportData: data.find(o => o.month === month)
        });
        console.log("Loaded report data for", month);
      } else {
        const months = data.map(x => x.month);
        const latestMonth = months[data.length - 1];
        console.log("No month set for report, setting latest available", latestMonth);
        // console.log(data.find(o => o.month === latestMonth));
        this.setState({
          reportData: data.find(o => o.month === latestMonth)
        });
      }
    } else {
      console.log("No data found for widgets in", data);
    }
  }

  render() {
    const data = this.state.reportData.data;
    // console.log("Report Data", data);
    const month = this.state.reportData.month;
    console.log("Report month", month);
    const headers = this.state.reportData.headers;
    const colors = this.state.reportColors;
    return(
      <>
        <ToolBar
          updateData={this.updateData}
          updateMonth={this.updateMonth}
          updateColors={this.updateColors}
           />
         { data &&
          <MSSPReport
            data={data}
            month={month}
            headers={headers}
            colors={colors}
            />
          }
      </>
    )
  }
}

export default App;
