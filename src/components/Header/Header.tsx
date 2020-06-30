import React, { Component } from 'react';
import './Header.scss';
import NavigationProp from '../../global/types/NavigationProp';
import { routes } from '../../config/routes';
import NavBar from '../NavBar';

const routesObject: NavigationProp[] = Object.keys(routes).map((el) => {
  return {
    path: routes[el],
    name: el.toLowerCase(),
  };
});

export default class Header extends Component {
  render(): JSX.Element {
    console.log({ routesObject });
    return (
      <header className="header">
        <img
          className="header__logo"
          height="auto"
          width="60px"
          src="https://upload.wikimedia.org/wikipedia/commons/8/8f/Emblema_KGB.svg"
          alt="KGB logo"
        />
        <h1 className="header__title">Comrad.APP</h1>
        <NavBar routes={routesObject} />
      </header>
    );
  }
}
