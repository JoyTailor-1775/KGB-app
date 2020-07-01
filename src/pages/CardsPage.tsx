import React, { Component } from 'react';
import FamilyCard from '../components/FamilyCard/FamilyCard';
import { Family, FamilyMember } from '../global/types/Family';
import normalizeFamilyApiData from '../helpers/normalizeFamilyApiData';

const testData: Family[] = [
  {
    primary: { name: 'Test User', gender: 'M', age: 32, ssn: '111-22-3333' },
  },
  {
    primary: { name: 'Test User', gender: 'M', age: 32, ssn: '111-22-3333' },
    spouse: { name: 'Test2 User', gender: 'F', age: 32, ssn: '111-22-3334' },
    children: [{ name: 'Test User', gender: 'M', age: 3, ssn: '111-22-3335' }],
  },
  {
    primary: { name: 'Test User', gender: 'M', age: 32, ssn: '111-22-3333' },
    spouse: { name: 'Test2 User', gender: 'F', age: 32, ssn: '111-22-3334' },
  },
  {
    primary: { name: 'Test User', gender: 'M', age: 32, ssn: '111-22-3333' },
    children: [{ name: 'Test User', gender: 'M', age: 3, ssn: '111-22-3335' }],
  },
  {
    primary: { name: 'Test User', gender: 'M', age: 32, ssn: '111-22-3333' },
    children: [
      { name: 'Test User', gender: 'M', age: 3, ssn: '111-22-3335' },
      { name: 'Test User', gender: 'M', age: 3, ssn: '111-22-3335' },
    ],
  },
];

export default class CardsPage extends Component {
  render(): JSX.Element {
    return (
      <main className="page">
        {/* I'm a CardsPage
        {testData.map((el) => (
          <FamilyCard cardInfo={el} />
        ))} */}
      </main>
    );
  }
}
