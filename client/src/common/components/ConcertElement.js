import React, { Component } from 'react';

import { Table } from 'semantic-ui-react';
import '../../../node_modules/moment/locale/de';

export default class ConcertElement extends Component {
  constructor(props) {
    super(props);
    this.state = null;
  }

  render() {
    const concert = { ...this.props.concert };

    return (
      <Table.Row>
        <Table.Cell width="two">{ this.props.date }</Table.Cell>
        <Table.Cell width="two">{ this.props.weekday }</Table.Cell>
        <Table.Cell>{concert.title}</Table.Cell>
        <Table.Cell width="three">{concert.venue}</Table.Cell>
        <Table.Cell>{concert.location}</Table.Cell>
        <Table.Cell width="two">
          <a className="link" href={concert.link || '#'}>Link</a>
        </Table.Cell>
      </Table.Row>
    );
  }
}
