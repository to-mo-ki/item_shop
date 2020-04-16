import React from "react";
import ShowMyItem from "./ShowMyItem"
import ExhibitForm from "./ExhibitForm"

export default class MyItem extends React.Component {
  render() {
    return (
      <div>
        <ExhibitForm />
        <ShowMyItem />
      </div>
    );
  }
}