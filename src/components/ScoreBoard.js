import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { IconButton } from '@mui/material'
import React, { useState } from 'react'
import MathUtil from '../util/MathUtil'
import './ScoreBoard.css'

const ScoreBoard = () => {
  const [inning, setInning] = useState(1)
  const [currentRunStack, setCurrentRunStack] = useState([])
  const [totalRuns, setTotalRuns] = useState(0)
  const [extras, setExtras] = useState({ total: 0, wide: 0, noBall: 0 })
  const [runsByOver, setRunsByOver] = useState(0)
  const [totalWickets, setTotalWickets] = useState(0)
  const [totalOvers, setTotalOvers] = useState(0)
  const [batters, setBatters] = useState([])
  const [ballCount, setBallCount] = useState(0)
  const [overCount, setOverCount] = useState(0)
  const [bowlers, setBowlers] = useState({})
  const [recentOvers, setRecentOvers] = useState([])
  const [batter1, setBatter1] = useState({})
  const [batter2, setBatter2] = useState({})
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
    if (isBatter1Edited) {
      const index = batters.findIndex((batter) => batter.name === batter1.name)
      const filteredArray = batters.filter((batter) => batter.name === batter1.name)
      const obj = filteredArray[0]
      obj.name = name
      const arr = [...batters]
      arr[index] = obj
      setBatters(arr)
      setBatter1((state) => ({
        ...state,
        name: name,
      }))
    } else {
      const randomNo = MathUtil.getRandomNo()
      setBatter1({
        id: name + randomNo,
        name: name,
        run: 0,
        ball: 0,
        four: 0,
        six: 0,
        strikeRate: 0,
        onStrike: true,
      })
    }
  }
  const handleBatter2Blur = (e) => {
    let name = e.target.value
    name = name.charAt(0).toUpperCase() + name.slice(1)
    e.target.value = name
    e.target.disabled = true
    setBatter2(name)
    if (isBatter2Edited) {
      const index = batters.findIndex((batter) => batter.name === batter2.name)
      const filteredArray = batters.filter((batter) => batter.name === batter2.name)
      const obj = filteredArray[0]
      obj.name = name
      const arr = [...batters]
      arr[index] = obj
      setBatters(arr)
      setBatter2((state) => ({
        ...state,
        name: name,
      }))
    } else {
      const randomNo = MathUtil.getRandomNo()
      setBatter2({
        id: name + randomNo,
        name: name,
        run: 0,
        ball: 0,
        four: 0,
        six: 0,
        strikeRate: 0,
        onStrike: false,
      })
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
  const changeStrike = () => {
    const strikeElement = document.querySelector('.strike')
    const nonStrikeElement = document.querySelector('.non-strike')
    strikeElement.textContent = ''
    strikeElement.className = 'non-strike'
    nonStrikeElement.textContent = '*'
    nonStrikeElement.className = 'strike'
  }
  const handleRun = (run) => {
    setBallCount(ballCount + 1)
    setCurrentRunStack((state) => [...state, run])
    setTotalRuns(totalRuns + run)
    setRunsByOver(runsByOver + run)
    if (ballCount === 5) {
      setTotalOvers(overCount + 1)
      const arr = [...currentRunStack]
      arr.push(run)
      overCompleted(runsByOver + run, arr)
      if (run % 2 === 0) {
        changeStrike()
      }
    } else {
      setTotalOvers(Math.round((totalOvers + 0.1) * 10) / 10)
      if (run % 2 !== 0) {
        changeStrike()
      }
    }
    if (batter1.onStrike) {
      setBatter1((state) => {
        const updatedRun = state.run + run
        const updatedBall = state.ball + 1
        const sr = Math.round((updatedRun / updatedBall) * 100 * 100) / 100
        let four = state.four
        if (run === 4) {
          four = four + 1
        }
        let six = state.six
        if (run === 6) {
          six = six + 1
        }
        return {
          ...state,
          run: updatedRun,
          ball: updatedBall,
          four: four,
          six: six,
          strikeRate: sr,
        }
      })
      if ((ballCount === 5 && run % 2 === 0) || (ballCount !== 5 && run % 2 !== 0)) {
        setBatter1((state) => ({
          ...state,
          onStrike: !state.onStrike,
        }))
        setBatter2((state) => ({
          ...state,
          onStrike: !state.onStrike,
        }))
      }
    } else {
      setBatter2((state) => {
        const updatedRun = state.run + run
        const updatedBall = state.ball + 1
        const sr = Math.round((updatedRun / updatedBall) * 100 * 100) / 100
        let four = state.four
        if (run === 4) {
          four = four + 1
        }
        let six = state.six
        if (run === 6) {
          six = six + 1
        }
        return {
          ...state,
          run: updatedRun,
          ball: updatedBall,
          four: four,
          six: six,
          strikeRate: sr,
        }
      })
      if ((ballCount === 5 && run % 2 === 0) || (ballCount !== 5 && run % 2 !== 0)) {
        setBatter2((state) => ({
          ...state,
          onStrike: !state.onStrike,
        }))
        setBatter1((state) => ({
          ...state,
          onStrike: !state.onStrike,
        }))
      }
    }
  }
  const handleWicket = () => {
    if (ballCount === 5) {
      setTotalOvers(overCount + 1)
    } else {
      setTotalOvers(Math.round((totalOvers + 0.1) * 10) / 10)
    }
    setCurrentRunStack((state) => [...state, 'W'])
    setBallCount(ballCount + 1)
    if (ballCount === 5) {
      overCompleted()
    }
  }
  const handleNoBall = () => {
    setCurrentRunStack((state) => [...state, 'nb'])
    setTotalRuns(totalRuns + 1)
    setRunsByOver(runsByOver + 1)
    setExtras((state) => ({
      ...state,
      total: state.total + 1,
      noBall: state.noBall + 1,
    }))
  }
  const handleWide = () => {
    setCurrentRunStack((state) => [...state, 'wd'])
    setTotalRuns(totalRuns + 1)
    setRunsByOver(runsByOver + 1)
    setExtras((state) => ({
      ...state,
      total: state.total + 1,
      wide: state.wide + 1,
    }))
  }
  const overCompleted = (runsByOverParam, currentRunStackParam) => {
    const bowlerNameElement = document.getElementById('bowlerName')
    bowlerNameElement.disabled = false
    bowlerNameElement.value = ''
    setBowler('')
    disableAllScoreButtons()
    setRecentOvers((state) => [...state, { overNo: overCount + 1, bowler: bowler, runs: runsByOverParam, stack: currentRunStackParam }])
    setCurrentRunStack([])
    setRunsByOver(0)
    setBallCount(0)
    setOverCount(overCount + 1.0)
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

  if (bowler !== '') {
    enableAllScoreButtons()
  }
  const overs = overCount + ballCount / 6
  const crr = (totalRuns / overs).toFixed(2)
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
          <div>CRR : {isNaN(crr) ? 0 : crr}</div>
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
                  <span className='strike'>*</span>
                  <input type='text' id='batter1Name' className='batter-name' onBlur={handleBatter1Blur} />
                  <IconButton color='primary' className='icon-button' onClick={editBatter1Name}>
                    <EditIcon className='icon-size' />
                  </IconButton>
                </td>
                <td className='score-types'>{batter1.run === undefined ? `0(0)` : `${batter1.run}(${batter1.ball})`}</td>
                <td className='score-types'>{batter1.four === undefined ? 0 : batter1.four}</td>
                <td className='score-types'>{batter1.six === undefined ? 0 : batter1.six}</td>
                <td className='score-types'>{batter1.strikeRate === undefined ? 0 : batter1.strikeRate}</td>
              </tr>
              <tr>
                <td className='score-types'>
                  <span className='non-strike'></span>
                  <input type='text' id='batter2Name' className='batter-name' onBlur={handleBatter2Blur} />
                  <IconButton color='primary' className='icon-button' onClick={editBatter2Name}>
                    <EditIcon className='icon-size' />
                  </IconButton>
                </td>
                <td className='score-types'>{batter2.run === undefined ? `0(0)` : `${batter2.run}(${batter2.ball})`}</td>
                <td className='score-types'>{batter2.four === undefined ? 0 : batter2.four}</td>
                <td className='score-types'>{batter2.six === undefined ? 0 : batter2.six}</td>
                <td className='score-types'>{batter2.strikeRate === undefined ? 0 : batter2.strikeRate}</td>
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
                <td className='score-types' onClick={() => handleRun(0)}>
                  <button className='score-types-button' disabled>
                    0
                  </button>
                </td>
                <td className='score-types' onClick={() => handleRun(1)}>
                  <button className='score-types-button' disabled>
                    1
                  </button>
                </td>
                <td className='score-types' onClick={() => handleRun(2)}>
                  <button className='score-types-button' disabled>
                    2
                  </button>
                </td>
                <td className='score-types' onClick={handleNoBall}>
                  <button className='score-types-button' disabled>
                    nb
                  </button>
                </td>
                <td rowSpan='2' className='score-types' onClick={handleWicket}>
                  <button className='score-types-button' disabled>
                    W
                  </button>
                </td>
              </tr>
              <tr>
                <td className='score-types' onClick={() => handleRun(3)}>
                  <button className='score-types-button' disabled>
                    3
                  </button>
                </td>
                <td className='score-types' onClick={() => handleRun(4)}>
                  <button className='score-types-button' disabled>
                    4
                  </button>
                </td>
                <td className='score-types' onClick={() => handleRun(6)}>
                  <button className='score-types-button' disabled>
                    6
                  </button>
                </td>
                <td className='score-types' onClick={handleWide}>
                  <button className='score-types-button' disabled>
                    wd
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='extras-container'>
          <div>Extras: {extras.total}</div>
          <div>Wd: {extras.wide}</div>
          <div>NB: {extras.noBall}</div>
        </div>
        <div className='recent-over-container'>
          <div className='recent-over-text'>Recent Overs</div>
          <div className='recent-over-details'>
            <table>
              <tbody>
                {recentOvers.map((over, i) => (
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
