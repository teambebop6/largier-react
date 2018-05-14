import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import moment from 'moment';

import '../../../node_modules/moment/locale/de';

import ConcertElement from './ConcertElement';

import './ConcertBlock.less';

const ConcertBlock = ({ concerts, limit }) => {
  if (!concerts || concerts.length === 0) {
    return (
      <p>-</p>
    );
  }
  return (
    <Table basic="very" className="concertsTable">
      <tbody>
        {
          concerts.slice(0, limit).map(concert => (
            <ConcertElement
              key={concert._id}
              concert={concert}
              date={moment(concert.date).format('YYYY MMM DD')}
              weekday={moment(concert.date).format('ddd')}
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
