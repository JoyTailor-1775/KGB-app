import React, { Component } from 'react';
import * as api from '../api/families';
import { Table } from '../components/common/Table/Table';

const testData: any = [
  {
    id: 0,
    title: 'Some title',
    release_year: '1983',
    format: 'sdfs',
    cast: 'one, two, three',
  },
  {
    id: 1,
    title: 'Some title',
    release_year: '1983',
    format: 'sdfs',
    cast: 'one, two, three',
  },
  {
    id: 2,
    title: 'Some title',
    release_year: '1983',
    format: 'sdfs',
    cast: 'one, two, three',
  },
  {
    id: 3,
    title: 'Some title',
    release_year: '1983',
    format: 'sdfs',
    cast: 'one, two, three',
  },
  {
    id: 4,
    title: 'Some title',
    release_year: '1983',
    format: 'sdfs',
    cast: 'one, two, three',
  },
  {
    id: 5,
    title: 'Some title',
    release_year: '1983',
    format: 'sdfs',
    cast: 'one, two, three',
  },
];

export default class CardsPage extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      tableColumns: [
        {
          heading: 'Title',
          width: '110px',
          render: this.renderFunc,
        },
        { heading: 'Year', dataKey: 'release_year', width: '100px' },
        { heading: 'Format', dataKey: 'format', width: '100px' },
        { heading: 'Cast', dataKey: 'cast', width: '190px' },
      ],
    };
  }
  // async componentDidMount() {
  //   const res: any = await api.getFamilies();
  //   console.log({ res });
  // }

  renderFunc = ({
    index,
    dataLength,
  }: {
    index: any;
    dataLength: any;
  }): any => {
    if (index === 0) {
      return {
        children: 'children',
        props: {
          rowSpan: 6,
        },
      };
    } else {
      return {
        children: '',
        props: {
          rowSpan: 0,
        },
      };
    }
  };
  render() {
    return (
      <div>
        <Table
          columns={this.state.tableColumns}
          rowKey="id"
          data={testData}
          onRowClick={() => ({})}
        />
      </div>
    );
  }
}
