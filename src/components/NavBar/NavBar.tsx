import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import NavigationProp from '../../global/types/NavigationProp';
import { Routes } from '../../config/routes';
import './NavBar.scss';

type Props = RouteComponentProps<Routes> & {
  routes: NavigationProp[];
};

const NavBar: React.SFC<Props> = ({ routes, location }) => {
  return (
    <ul className="nav">
      {routes.map((el, idx) => {
        return (
          <li key={idx}>
            <Link
              to={el.path}
              className={`nav__link ${
                location.pathname === el.path ? 'highlighted' : ''
              }`}
            >
              {el.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default withRouter(NavBar);
