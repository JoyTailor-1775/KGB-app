import React, { Component } from 'react';
import * as api from '../api/families';

export default class CardsPage extends Component {
  async componentDidMount() {
    const res: any = await api.getFamilies();
    console.log({ res });
  }
  render() {
    return <div> Hello, I'm a Cards Page</div>;
  }
}
