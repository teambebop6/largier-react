import React from 'react';

import { Table } from 'semantic-ui-react';

import ConcertElement from './ConcertElement';

function ConcertBlock({concerts, limit}){
  if(!concerts || concerts.length === 0){
    return (
      <p>-</p>
    )
  }else{
    return (
      <Table basic="very">
        <tbody>
          {
            concerts.slice(0, limit).map((concert) => {
              return (
                <ConcertElement
                  key={concert._id}
                  concert={concert}
                />
              )
            })
          }
        </tbody>
      </Table>
    )
  }
}

export default ConcertBlock;
