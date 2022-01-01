import React from 'react'

const ScoreBoard = () => {
  let data = JSON.parse(localStorage.getItem('data'))
  data = JSON.stringify(data, null, 2)
  return (
    <div>
      <h2>Score Board</h2>
      <pre>{data}</pre> 
    </div>
  )
}

export default ScoreBoard
