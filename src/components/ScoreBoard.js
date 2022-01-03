import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { IconButton } from '@mui/material'
import React, { useState } from 'react'
import './ScoreBoard.css'
import MathUtil from '../util/MathUtil'

const ScoreBoard = () => {
  const [inning, setInning] = useState(1)
  const [currentRunStack, setCurrentRunStack] = useState([])
  const [totalRuns, setTotalRuns] = useState(0)
  const [runsByOver, setRunsByOver] = useState(0)
  const [totalWickets, setTotalWickets] = useState(0)
  const [totalOvers, setTotalOvers] = useState(0)
  const [currentRunRate, setCurrentRunRate] = useState(0)
  const [batters, setBatters] = useState([])
  const [ballCount, setBallCount] = useState(0)
  const [overCount, setOverCount] = useState(0)
  const [bowlers, setBowlers] = useState({})
  const [overs, setOvers] = useState([])
  const [batter1, setBatter1] = useState('')
  const [batter2, setBatter2] = useState('')
  const [bowler, setBowler] = useState('')
  const [isBatter1Edited, setBatter1Edited] = useState(false)
  const [isBatter2Edited, setBatter2Edited] = useState(false)

  let data = JSON.parse(localStorage.getItem('data'))
  const { team1, team2 } = data

  const handleBatter1Blur = (e) => {
    let name = e.target.value
    name = name.charAt(0).toUpperCase() + name.slice(1)
    e.target.value = name
    e.target.disabled = true
    setBatter1(name)
    if (isBatter1Edited) {
      const index = batters.findIndex((batter) => batter.name === batter1)
      const filteredArray = batters.filter((batter) => batter.name === batter1)
      const obj = filteredArray[0]
      obj.name = name
      const arr = [...batters]
      arr[index] = obj
      setBatters(arr)
    } else {
      const randomNo = MathUtil.getRandomNo()
      setBatters((state) => [
        ...state,
        {
          id: name + randomNo,
          name: name,
          run: 0,
          ball: 0,
          four: 0,
          six: 0,
          strikeRate: 0,
        },
      ])
    }
  }
  const handleBatter2Blur = (e) => {
    let name = e.target.value
    name = name.charAt(0).toUpperCase() + name.slice(1)
    e.target.value = name
    e.target.disabled = true
    setBatter2(name)
    if (isBatter2Edited) {
      const index = batters.findIndex((batter) => batter.name === batter2)
      const filteredArray = batters.filter((batter) => batter.name === batter2)
      const obj = filteredArray[0]
      obj.name = name
      const arr = [...batters]
      arr[index] = obj
      setBatters(arr)
    } else {
      const randomNo = MathUtil.getRandomNo()
      setBatters((state) => [
        ...state,
        {
          id: name + randomNo,
          name: name,
          run: 0,
          ball: 0,
          four: 0,
          six: 0,
          strikeRate: 0,
        },
      ])
    }
  }
  const handleBowlerBlur = (e) => {
    let name = e.target.value
    name = name.charAt(0).toUpperCase() + name.slice(1)
    e.target.value = name
    e.target.disabled = true
    setBowler(name)
  }
  const editBatter1Name = () => {
    const batter1NameElement = document.getElementById('batter1Name')
    batter1NameElement.disabled = false
    setBatter1Edited(true)
  }
  const editBatter2Name = (e) => {
    const batter2NameElement = document.getElementById('batter2Name')
    batter2NameElement.disabled = false
    setBatter2Edited(true)
  }
  const editBowlerName = (e) => {
    const bowlerNameElement = document.getElementById('bowlerName')
    bowlerNameElement.disabled = false
  }
  const handleZeroRun = () => {
    setCurrentRunStack((state) => [...state, 0])
    setBallCount(ballCount + 1)
    if (ballCount === 5) {
      const arr = [...currentRunStack]
      arr.push(0)
      overCompleted(runsByOver, arr)
    }
  }
  const handleOneRun = () => {
    setBallCount(ballCount + 1)
    setCurrentRunStack((state) => [...state, 1])
    setTotalRuns(totalRuns + 1)
    setRunsByOver(runsByOver + 1)
    if (ballCount === 5) {
      const arr = [...currentRunStack]
      arr.push(1)
      overCompleted(runsByOver + 1, arr)
    }
  }
  const handleTwoRun = () => {
    setBallCount(ballCount + 1)
    setCurrentRunStack((state) => [...state, 2])
    setTotalRuns(totalRuns + 2)
    setRunsByOver(runsByOver + 2)
    if (ballCount === 5) {
      const arr = [...currentRunStack]
      arr.push(2)
      overCompleted(runsByOver + 2, arr)
    }
  }
  const handleThreeRun = () => {
    setBallCount(ballCount + 1)
    setCurrentRunStack((state) => [...state, 3])
    setTotalRuns(totalRuns + 3)
    setRunsByOver(runsByOver + 3)
    if (ballCount === 5) {
      const arr = [...currentRunStack]
      arr.push(3)
      overCompleted(runsByOver + 3, arr)
    }
  }
  const handleFourRun = () => {
    setBallCount(ballCount + 1)
    setCurrentRunStack((state) => [...state, 4])
    setTotalRuns(totalRuns + 4)
    setRunsByOver(runsByOver + 4)
    if (ballCount === 5) {
      const arr = [...currentRunStack]
      arr.push(4)
      overCompleted(runsByOver + 4, arr)
    }
  }
  const handleSixRun = () => {
    setBallCount(ballCount + 1)
    setCurrentRunStack((state) => [...state, 6])
    setTotalRuns(totalRuns + 6)
    setRunsByOver(runsByOver + 6)
    if (ballCount === 5) {
      const arr = [...currentRunStack]
      arr.push(6)
      overCompleted(runsByOver + 6, arr)
    }
  }
  const handleWicket = () => {
    setCurrentRunStack((state) => [...state, 'W'])
    setBallCount(ballCount + 1)
    if (ballCount === 5) {
      overCompleted()
    }
  }
  const handleNoBall = () => {
    setCurrentRunStack((state) => [...state, 'NB'])
    setTotalRuns(totalRuns + 1)
    setRunsByOver(runsByOver + 1)
  }
  const handleWide = () => {
    setCurrentRunStack((state) => [...state, 'Wd'])
    setTotalRuns(totalRuns + 1)
    setRunsByOver(runsByOver + 1)
  }
  const overCompleted = (runsByOverParam, currentRunStackParam) => {
    const bowlerNameElement = document.getElementById('bowlerName')
    bowlerNameElement.disabled = false
    bowlerNameElement.value = ''
    setBowler('')
    disableAllScoreButtons()
    setOvers((state) => [...state, { overNo: overCount + 1, bowler: bowler, runs: runsByOverParam, stack: currentRunStackParam }])
    setCurrentRunStack([])
    setRunsByOver(0)
    setBallCount(0)
    setOverCount(overCount + 1)
  }
  const disableAllScoreButtons = () => {
    const scoreTypesButtons = document.querySelectorAll('.score-types-button')
    for (let i = 0; i < scoreTypesButtons.length; i++) {
      scoreTypesButtons[i].disabled = true
    }
  }
  const enableAllScoreButtons = () => {
    const scoreTypesButtons = document.querySelectorAll('.score-types-button')
    for (let i = 0; i < scoreTypesButtons.length; i++) {
      scoreTypesButtons[i].disabled = false
    }
  }

  if (batter1 !== '' && batter2 !== '' && bowler !== '') {
    enableAllScoreButtons()
  }
  return (
    <div className='container'>
      <div className='inning'>
        {team1} vs {team2}, {inning === 1 ? '1st' : '2nd'} Inning
      </div>
      <div className='score-container'>
        <div className='score'>
          <div>
            {team1} : {totalRuns}/{totalWickets} ({totalOvers})
          </div>
          <div>CRR : {currentRunRate}</div>
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
                <td className='score-types'>
                  <input type='text' id='batter1Name' className='batter-name' onBlur={handleBatter1Blur} />
                  <IconButton color='primary' className='icon-button' onClick={editBatter1Name}>
                    <EditIcon className='icon-size' />
                  </IconButton>
                </td>
                <td className='score-types'>
                  {0}({0})
                </td>
                <td className='score-types'>{0}</td>
                <td className='score-types'>{0}</td>
                <td className='score-types'>{0}</td>
              </tr>
              <tr>
                <td className='score-types'>
                  <input type='text' id='batter2Name' className='batter-name' onBlur={handleBatter2Blur} />
                  <IconButton color='primary' className='icon-button' onClick={editBatter2Name}>
                    <EditIcon className='icon-size' />
                  </IconButton>
                </td>
                <td className='score-types'>
                  {0}({0})
                </td>
                <td className='score-types'>{0}</td>
                <td className='score-types'>{0}</td>
                <td className='score-types'>{0}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='bowler-container'>
          <div className='bowler'>
            Bowler: <input type='text' id='bowlerName' className='batter-name' onBlur={handleBowlerBlur} />
            <IconButton color='primary' className='icon-button' onClick={editBowlerName}>
              <EditIcon className='icon-size' />
            </IconButton>
          </div>
          <div className='bowler-runs'>
            {currentRunStack.map((run, i) => (
              <div key={i}>{run}</div>
            ))}
            <IconButton color='warning' className='icon-button'>
              <DeleteIcon className='icon-size' />
            </IconButton>
          </div>
        </div>
        <div className='score-types-container'>
          <table>
            <tbody>
              <tr>
                <td className='score-types' onClick={handleZeroRun}>
                  <button className='score-types-button' disabled>
                    0
                  </button>
                </td>
                <td className='score-types' onClick={handleOneRun}>
                  <button className='score-types-button' disabled>
                    1
                  </button>
                </td>
                <td className='score-types' onClick={handleTwoRun}>
                  <button className='score-types-button' disabled>
                    2
                  </button>
                </td>
                <td className='score-types' onClick={handleNoBall}>
                  <button className='score-types-button' disabled>
                    NB
                  </button>
                </td>
                <td rowSpan='2' className='score-types' onClick={handleWicket}>
                  <button className='score-types-button' disabled>
                    W
                  </button>
                </td>
              </tr>
              <tr>
                <td className='score-types' onClick={handleThreeRun}>
                  <button className='score-types-button' disabled>
                    3
                  </button>
                </td>
                <td className='score-types' onClick={handleFourRun}>
                  <button className='score-types-button' disabled>
                    4
                  </button>
                </td>
                <td className='score-types' onClick={handleSixRun}>
                  <button className='score-types-button' disabled>
                    6
                  </button>
                </td>
                <td className='score-types' onClick={handleWide}>
                  <button className='score-types-button' disabled>
                    Wd
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='recent-over-container'>
          <div className='recent-over-text'>Recent Overs</div>
          <div className='recent-over-details'>
            <table>
              <tbody>
                {overs.map((over, i) => (
                  <tr key={i}>
                    <td>{over.overNo}.</td>
                    <td>{over.bowler}:</td>
                    <td>
                      <div className='recent-over-runs'>
                        {over.stack.map((run, index) => (
                          <div key={index}>{run}</div>
                        ))}
                      </div>
                    </td>
                    <td className='recent-over-total-run'>
                      <div>{over.runs}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ScoreBoard
