import React, { Component } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import myLayouts from "./Layouts";
import Widget from "./Widget";
import PieOrdinalWidget from "./PieOrdinalWidget";
import PieLinearWidget from "./PieLinearWidget";
import StackedBarsWidget from "./StackedBarsWidget";
import GroupedBarsWidget from "./GroupedBarsWidget";
import ShortDescriptionWidget from "./ShortDescriptionWidget";
import LongDescriptionWidget from "./LongDescriptionWidget";
import "../style/style.css";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const originalLayouts = getFromLS("layouts") || myLayouts;


class MSSPReport extends Component {
  static defaultProps = {
    className: "layout",
    rowHeight: 150,
    cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
  };

  constructor(props) {
    super(props);
    this.state = {
      layouts: JSON.parse(JSON.stringify(originalLayouts)),
      data: this.props.data,
      month: this.props.month,
      headers: this.props.headers,
      colors: this.props.colors
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.month != this.state.month) {
      this.setState({
        month: nextProps.month,
        data: nextProps.data,
        headers: nextProps.headers,
        colors: nextProps.colors
      })
    }
    if (nextProps.data != this.state.data) {
      this.setState({
        month: nextProps.month,
        data: nextProps.data,
        headers: nextProps.headers,
        colors: nextProps.colors
      })
    }
  }

  resetLayouts() {
    this.setState({ layouts: myLayouts });
  }

  onLayoutChange = (layout, layouts) => {
    saveToLS(layouts);
    this.setState({ layouts });
  }

  render() {
    const data = this.state.data;
    const headers = this.state.headers;
    const colors = this.state.colors;
    if (!data) {
      return null
    };

    return(
      <ResponsiveReactGridLayout
        {...this.props}
        layouts={this.state.layouts}
        onLayoutChange={(layout, layouts) =>
          this.onLayoutChange(layout, layouts)
        }
        draggableHandle=".widget h1"
        draggableCancel=".widget-content"
      >
        <div key="largePie" className="tile">
          <PieOrdinalWidget
            name="TotalPie"
            content={{header: headers["TotalPie"], data: data["TotalPie"]}}
            colors={colors["TotalPie"]}
            />
        </div>
        <div key="unmanagedBar" className="tile">
          <GroupedBarsWidget
            name="unmanagedBar"
            content={{header: headers["unmanagedBar"], data: data["unmanagedBar"]}}
            colors={colors["unmanagedBar"]}
            />
        </div>
        <div key="legacyBar" className="tile">
          <GroupedBarsWidget
            name="legacyBar"
            content={{header: headers["legacyBar"], data: data["legacyBar"]}}
            colors={colors["legacyBar"]}
            />
        </div>
        <div key="vsBar" className="tile">
          <StackedBarsWidget
            name="vsBar"
            content={{header: headers["vsBar"], data: data["vsBar"]}}
            colors={colors["vsBar"]}
            />
        </div>
        <div key="protectedPie" className="tile">
          <PieLinearWidget
            name="protectedPie"
            content={{header: headers["protectedPie"], data: data["protectedPie"]}}
            colors={colors["protectedPie"]}
            />
        </div>
        <div key="unprotectedPie" className="tile">
          <PieLinearWidget
            name="unprotectedPie"
            content={{header: headers["unprotectedPie"], data: data["unprotectedPie"]}}
            colors={colors["unprotectedPie"]}
            />
        </div>
        <div key="protectedPieDesc" className="tile">
          <ShortDescriptionWidget
            name="protectedPieDesc"
            content={{header: headers["protectedPieDesc"], data: data["protectedPieDesc"]}}
            colors={colors["protectedPie"]}
            icon="shield"
            />
          </div>
        <div key="unprotectedPieDesc" className="tile">
          <ShortDescriptionWidget
            name="unprotectedPieDesc"
            content={{header: headers["unprotectedPieDesc"], data: data["unprotectedPieDesc"]}}
            colors={colors["unprotectedPie"]}
            icon="bookmark"
            />
        </div>
        <div key="goodDescription" className="tile">
          <LongDescriptionWidget
            name="goodDescription"
            content={{header: headers["goodDescription"], data: data["goodDescription"]}}
            colors={colors["goodDescription"]}
            icon="flag"
            />
        </div>
        <div key="badDescription" className="tile">
          <LongDescriptionWidget
            name="badDescription"
            content={{header: headers["badDescription"], data: data["badDescription"]}}
            colors={colors["badDescription"]}
            icon="flag"
            />
        </div>
      </ResponsiveReactGridLayout>
    )
  }
}

export default MSSPReport;

function getFromLS() {
  console.log("Getting layouts from LS");
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem("mssp_layouts"));
      console.log("Got layouts from LS", ls);
      return ls.value;
  } catch (e) {
      // skip
    }
  }
  console.log("No layouts found in LS");
  return null
}

function saveToLS(value) {
  console.log("Saving layouts to LS");
  if (global.localStorage) {
    global.localStorage.setItem(
      "mssp_layouts",
      JSON.stringify({
        value
      })
    );
  }
}
