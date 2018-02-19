import React from 'react';

import ConcertElement from './ConcertElement';

const ConcertBlock = (concerts) => {
  if(!concerts || !concerts.length){
    return (
      <p>-</p>
    )
  }else{
    return (
      <table class="ui very basic table">
        <tbody>
          {
            concerts.map((concert) => {
              return (
                <ConcertElement
                  concert={concert}
                />
              )
            })
          }
        </tbody>
      </table>
    )
  }
}

export default ConcertBlock;
