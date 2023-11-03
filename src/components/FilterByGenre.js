import React from 'react'

const FilterByGenre = ({ genres, onClick, allgenres }) => {
  /*
  console.log('genres', genres)
  console.log('allgenres', allgenres)
  */
return(

  <div>
    {
      allgenres.map(genre =>
        <button key={genre} onClick={() => onClick(genre)}>{genre}</button>
      )
    }
  </div>
)}

export default FilterByGenre