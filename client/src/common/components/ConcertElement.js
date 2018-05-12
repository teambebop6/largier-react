import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { Table } from 'semantic-ui-react';

const ConcertElement = ({ concert }) => (
  <Table.Row>
    <Table.Cell width="two">
      {moment(concert.date).format('DD. MMMM, YYYY')}
    </Table.Cell>
    <Table.Cell>{concert.title}</Table.Cell>
    <Table.Cell width="three">{concert.venue}</Table.Cell>
    <Table.Cell>{concert.location}</Table.Cell>
    <Table.Cell width="two">
      <a className="link" href={concert.link || '#'}>Link</a>
    </Table.Cell>
  </Table.Row>
);

ConcertElement.propTypes = {
  concert: PropTypes.object.isRequired,
};


export default ConcertElement;
