import React from 'react';
import moment from 'moment';

import { Table } from 'semantic-ui-react';

const ConcertElement = ({concert}) => {
  return (
    <Table.Row>
      <Table.Cell width="two">
        {moment(concert.date).format("DD. MMMM, YYYY")}
      </Table.Cell>
      <Table.Cell>{concert.title}</Table.Cell>
      <Table.Cell width="three">{concert.venue}</Table.Cell>
      <Table.Cell>{concert.location}</Table.Cell>
      <Table.Cell width="two">
        <a className="link" href={concert.link || '#'}>Link</a>
      </Table.Cell>
    </Table.Row>
  )
}

export default ConcertElement;
