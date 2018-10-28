import React, { Component } from "react";
import ToolBar from "./ToolBar";
import ToolBarBS from "./ToolBarBS";
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

  componentDidMount() {
    if (!this.state.data) {
      const data = getFromLS("mssp_data");
      if (data) {
        this.updateData(data);
        this.ToolBarBS.setMonthsMenu(data);
      }
    }
    if (!this.state.colors) {
      const colors = getFromLS("mssp_colors");
      if (colors) {
        this.updateColors(colors);
      }
    }
  }

  updateData = (data) => {
    if (data) {
      this.setState({ data: data });
      saveToLS("mssp_data", data)
      console.log("App data updated");
      const months = data.map(x => x.month);
      saveToLS("mssp_months", months)
      const latestMonth = months[data.length - 1];
      this.updateMonth(latestMonth);
      this.prepareData(data, latestMonth);
    }
  }

  updateColors = (colors) => {
    if (colors) {
      this.setState({ reportColors: colors });
      saveToLS("mssp_colors", colors);
      console.log("App colors updated");
    }
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

  resetLayouts = () => {
    if (this.state.reportData) {
      this.MSSPReport.resetLayouts();
    }
  }

  render() {
    const data = this.state.reportData.data;
    const month = this.state.reportData.month;
    const headers = this.state.reportData.headers;
    const colors = this.state.reportColors;
    return(
      <>
        <ToolBarBS
          updateData={this.updateData}
          updateMonth={this.updateMonth}
          updateColors={this.updateColors}
          resetLayouts={this.resetLayouts}
          ref={instance => { this.ToolBarBS = instance; }}
           />
         { data &&
          <MSSPReport
            data={data}
            month={month}
            headers={headers}
            colors={colors}
            ref={instance => { this.MSSPReport = instance; }}
            />
          }
      </>
    )
  }
}

export default App;

function getFromLS(item) {
  // console.log("Getting from LS", item);
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem(item));
      // console.log("Got mssp_data from LS", ls);
      return ls.value;
  } catch (e) {
      // skip
    }
  }
  // console.log("No mssp_data found in LS");
  return ""
}

function saveToLS(item, value) {
  // console.log("Saving to LS", item);
  if (global.localStorage) {
    global.localStorage.setItem(
      item,
      JSON.stringify({
        value
      })
    );
  }
}
