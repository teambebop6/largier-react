import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';

import ConcertElement from './ConcertElement';

const ConcertBlock = ({ concerts, limit }) => {
  if (!concerts || concerts.length === 0) {
    return (
      <p>-</p>
    );
  }
  return (
    <Table basic="very">
      <tbody>
        {
          concerts.slice(0, limit).map(concert => (
            <ConcertElement
              key={concert._id}
              concert={concert}
            />
          ))
        }
      </tbody>
    </Table>
  );
};

ConcertBlock.propTypes = {
  concerts: PropTypes.object.isRequired,
  limit: PropTypes.number.isRequired,
};

export default ConcertBlock;
