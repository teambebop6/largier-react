import React from 'react'

const ConcertElement = (concert) => {
  return (
    <tr>
      <td class="two wide">
        {concert.date}
      </td>
      <td>{concert.title}</td>
      <td class="three wide">{concert.venue}</td>
      <td>{concert.location}</td>
      <td class="two wide">
        <a href={concert.link}>Link</a>
      </td>
    </tr>
  )
}

export default ConcertElement;
