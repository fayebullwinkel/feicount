import React, { Component } from 'react';
import Tricount from "./Tricount";

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <div>
        <Tricount />
      </div>
    );
  }
}
