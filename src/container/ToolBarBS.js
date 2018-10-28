import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from "reactstrap";

import ReactFileReader from "react-file-reader";
import ModalEditor from "./ModalEditor";
import defaultData from "../data/data.json";
import defaultColors from "../style/colors.json";


class ToolBarBS extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      months: null,
      selectedMonth: "",
      ddMonthOpen: false,
      ddLayoutOpen: false,
      ddDataOpen: false,
      isOpen: false
    };
  }
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
      ddMonthOpen: false
    });
  }
  toggleDDMonth = () => {
    this.setState(prevState => ({
      ddMonthOpen: !prevState.ddMonthOpen
    }));
  }
  toggleDDLayout = () => {
    this.setState(prevState => ({
      ddLayoutOpen: !prevState.ddLayoutOpen
    }));
  }
  toggleDDData = () => {
    this.setState(prevState => ({
      ddDataOpen: !prevState.ddDataOpen
    }));
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
  selectMonth = month => {
    this.setState({ selectedMonth: month });
    this.props.updateMonth(month);
  }
  setMonthsMenu = (data) => {
    const months = data.map(x => x.month);
    const latestMonth = months[data.length - 1];
    this.setState({
      months: months,
      selectedMonth: latestMonth
    })
  }
  handleFiles = (files) => {
    var reader = new FileReader();
    reader.onload = function(e) {
      const data = JSON.parse(reader.result);
      // console.log("Got file", data);
      this.setMonthsMenu(data.monthlyData);
      this.props.updateData(data.monthlyData);
      this.props.updateColors(data.colorScheme);
    }.bind(this)
    reader.readAsText(files[0]);
  }

  handleMonthSelect = event => {
    console.log("Selected", event.target.innerText);
    this.selectMonth(event.target.innerText);
  }
  handleLayoutSelect = event => {
    console.log("Layout:", event.target.innerText);
    switch (event.target.innerText) {
      case "Reset":
        this.props.resetLayouts();
    }
  }

  showModalEditor = () => {
    this.ModalEditor.setState({ modal: true });
  }

  render() {
    const months = this.state.months;
    const selectedMonth = this.state.selectedMonth;
    const ddMenu = () => {
      if (months) {
        return(
          <DropdownMenu>
            {months.map((month, index) =>
              <DropdownItem key={`option-${index}`} onClick={this.handleMonthSelect}><strong>{month}</strong></DropdownItem>
            )}
          </DropdownMenu>
        )
      } else {
        return(
          <DropdownMenu>
            <DropdownItem key={`option-0`} >Empty</DropdownItem>
          </DropdownMenu>
        )
      }
    }
    return(
      <div>
      <ModalEditor ref={instance => { this.ModalEditor = instance; }}></ModalEditor>
       <Navbar color="faded" light expand="md">
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
              <Dropdown isOpen={this.state.ddMonthOpen} toggle={this.toggleDDMonth} nav inNavbar>
                <DropdownToggle caret nav>
                  { selectedMonth ? <strong>{selectedMonth}</strong> : "Select month" }
                </DropdownToggle>
                {ddMenu()}
              </Dropdown>
            <NavItem>
              <NavLink href="#" onClick={this.resetData}>Demo data</NavLink>
            </NavItem>
            <Dropdown isOpen={this.state.ddDataOpen} toggle={this.toggleDDData} nav inNavbar>
              <DropdownToggle caret nav>
                Data
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>
                  <ReactFileReader handleFiles={this.handleFiles} fileTypes={'.json'}>
                    <span>Upload</span>
                  </ReactFileReader>
                </DropdownItem>
                <DropdownItem onClick={this.showModalEditor}>Edit</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Dropdown isOpen={this.state.ddLayoutOpen} toggle={this.toggleDDLayout} nav inNavbar>
              <DropdownToggle caret nav>
                Layout
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={this.handleLayoutSelect}>Reset</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Nav>
        </Collapse>
       </Navbar>
       </div>
    )
  }
}

export default ToolBarBS;
