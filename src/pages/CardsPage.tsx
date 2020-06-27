import React, { Component } from 'react';
import * as api from '../api/families';

export default class CardsPage extends Component {
  componentDidMount() {
    const res: any = api.getFamilies();
    console.log({ res });
  }
  render() {
    return <div> Hello, I'm a Cards Page</div>;
  }
}
