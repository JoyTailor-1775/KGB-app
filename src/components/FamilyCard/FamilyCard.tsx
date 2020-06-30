import React, { Component } from 'react';
import Family from '../../global/types/Family';

interface Props {
  cardInfo: Family[];
}

export default class FamilyCard extends Component<Props> {
  render() {
    return (
      <table className="family-card">
        <thead className="family-card__head">
          <tr className="family-card__row"></tr>
        </thead>
      </table>
    );
  }
}
