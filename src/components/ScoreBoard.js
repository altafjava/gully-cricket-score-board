import React, { useState } from 'react'
import './ScoreBoard.css'

const ScoreBoard = () => {
  let data = JSON.parse(localStorage.getItem('data'))
  const [inning, setInning] = useState(1)
  const [runs, setRuns] = useState([1, 4, 0, 2, 'Wd', 6])
  const { team1, team2 } = data
  return (
    <div className='container'>
      <div className='inning'>
        {team1} vs {team2}, {inning}st Inning
      </div>
      <div className='score-container'>
        <div className='score'>
          <div>{team1} : 25/2 (3.4)</div>
          <div>CRR : 2.95</div>
        </div>
        <div className='batting-container'>
          <table>
            <thead>
              <tr>
                <td className='score-types'>Batting</td>
                <td className='score-types'>Run(Ball)</td>
                <td className='score-types'>4s</td>
                <td className='score-types'>6s</td>
                <td className='score-types'>SR</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='score-types'>Akbar</td>
                <td className='score-types'>24(18)</td>
                <td className='score-types'>3</td>
                <td className='score-types'>2</td>
                <td className='score-types'>15.2</td>
              </tr>
              <tr>
                <td className='score-types'>Israfil</td>
                <td className='score-types'>13(15)</td>
                <td className='score-types'>3</td>
                <td className='score-types'>2</td>
                <td className='score-types'>15.2</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='bowler-container'>
          <div className='bowler'>Bowler: Shahbaz</div>
          <div className='bowler-runs'>
            {runs.map((run, i) => (
              <div key={i}>{run}</div>
            ))}
          </div>
        </div>
        <div className='score-types-container'>
          <table>
            <tbody>
              <tr>
                <td className='score-types'>
                  <button className='score-type-button'>0</button>
                </td>
                <td className='score-types'>
                  <button className='score-type-button'>1</button>
                </td>
                <td className='score-types'>
                  <button className='score-type-button'>2</button>
                </td>
                <td className='score-types'>
                  <button className='score-type-button'>NB</button>
                </td>
                <td rowSpan='2' className='score-types'>
                  <button className='score-type-button'>W</button>
                </td>
              </tr>
              <tr>
                <td className='score-types'>
                  <button className='score-type-button'>3</button>
                </td>
                <td className='score-types'>
                  <button className='score-type-button'>4</button>
                </td>
                <td className='score-types'>
                  <button className='score-type-button'>6</button>
                </td>
                <td className='score-types'>
                  <button className='score-type-button'>Wd</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ScoreBoard
