import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import NotFound from '../components/NotFound'
import ScoreBoard from '../components/ScoreBoard'
import StepperContainer from '../components/StepperContainer'

const Main = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={StepperContainer} />
        <Route exact path='/score' component={ScoreBoard} />
        <Route path='*' component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
}

export default Main
