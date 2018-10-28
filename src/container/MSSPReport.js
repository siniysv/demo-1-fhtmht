import React, { Component } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import myLayouts from "./Layouts";
import Widget from "./Widget";
import PieOrdinalWidget from "./PieOrdinalWidget";
import PieLinearWidget from "./PieLinearWidget";
import StackedBarsWidget from "./StackedBarsWidget";
import GroupedBarsWidget from "./GroupedBarsWidget";
import ShortDescriptionWidget from "./ShortDescriptionWidget";
import "../style/style.css";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

class MSSPReport extends Component {
  static defaultProps = {
    className: "layout",
    rowHeight: 30,
    cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
  };

  constructor(props) {
    super(props);
    this.state = {
      myLayouts: this.props.layouts || myLayouts,
      currentBreakPoint: "",
      mounted: false,
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
  }

  componentDidMount() {
    this.setState({ mounted: true });
  }

  onBreakpointChange = (breakpoint, cols) => this.setState({currentBreakPoint: breakpoint});
  // onLayoutChange = (layout) => console.log(layout);



  render() {
    const data = this.state.data;
    const headers = this.state.headers;
    const colors = this.state.colors;

    // console.log(data);
    if (!data) {
      return null
    };

    // console.log(data);

    return(
      <ResponsiveReactGridLayout
        layouts={this.state.myLayouts}
        onBreakpointChange={this.onBreakpointChange}
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
      </ResponsiveReactGridLayout>
    )
  }
}

export default MSSPReport;
