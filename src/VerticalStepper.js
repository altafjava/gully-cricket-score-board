import { IconButton, TextField } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Stepper from '@material-ui/core/Stepper'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import { Formik } from 'formik'
import React from 'react'
import * as Yup from 'yup'

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    margin: 'auto',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  formContainer: {
    margin: '2rem 0 2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  formGroup: {
    marginBottom: '2rem',
  },
  resetContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  textField: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  textfieldWidth: {
    width: 200,
  },
  teamNameHeading: {
    fontWeight: 'bold',
    // padding: '16px',
    // paddingBottom: '0px',
  },
  center: {
    textAlign: 'center',
  },
}))
const VerticalStepper = () => {
  const classes = useStyles()
  const [activeStep, setActiveStep] = React.useState(0)
  const [isSubmitting, setSubmitting] = React.useState(false)
  const [team1Players, setTeam1Players] = React.useState([Date.now().toString()])
  const [team2Players, setTeam2Players] = React.useState([Date.now().toString()])

  const steps = ['Team', 'Players', 'Batting']
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }
  const addTeam1Player = (playerId) => {
    setTeam1Players((state) => [...state, playerId])
  }
  const removeTeam1Player = (playerId) => {
    console.log('rem playerId=', playerId)
    setTeam1Players(team1Players.filter((id) => id !== playerId))
  }
  const addTeam2Player = (playerId) => {
    setTeam2Players((state) => [...state, playerId])
  }
  const removeTeam2Player = (playerId) => {
    setTeam2Players(team2Players.filter((id) => id !== playerId))
  }

  const initialValues = {
    team1: '',
    team2: '',
    team1Players: [],
    team2Players: [],
    batting: '',
  }
  const validationSchema = [
    Yup.object().shape({
      team1: Yup.string().required('Team Name is required'),
      team2: Yup.string().required('Team Name is required'),
    }),
    Yup.object().shape({
      team1Players: Yup.array().of(Yup.string().required('Player Name is required')),
    }),
    Yup.object().shape({
      batting: Yup.string().required('Please choose who is Batting'),
    }),
  ]
  const currentValidationSchema = validationSchema[activeStep]
  function isLastStep() {
    return activeStep === steps.length - 1
  }
  return (
    <div>
      <Stepper activeStep={activeStep} orientation='horizontal'>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div className={classes.mainContainer}>
        <Formik
          enableReinitialize
          validationSchema={currentValidationSchema}
          initialValues={initialValues}
          onSubmit={(values, actions) => {
            console.log('onSubmit=', values, actions)
            handleNext()
            actions.setTouched({})
            actions.setSubmitting(false)
            if (isLastStep()) {
              setSubmitting(true)
              const formData = document.getElementById('form__data')
              formData.innerText = JSON.stringify(values, null, 2)
              setSubmitting(false)
            }
          }}
        >
          {(props) => {
            const { values, touched, errors, handleChange, handleBlur, handleSubmit, handleReset, setFieldValue } = props
            // console.log('errors=', errors)
            // console.log('touched=', touched)
            return (
              <form onSubmit={handleSubmit}>
                <div className={classes.formContainer}>
                  {activeStep === 0 && (
                    <div>
                      <div className={classes.formGroup}>
                        <TextField
                          id='team1'
                          name='team1'
                          label='Team1 Name*'
                          value={values.team1}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={errors.team1 && touched.team1 && errors.team1}
                          error={errors.team1 && touched.team1}
                          className={classes.textfieldWidth}
                        />
                      </div>
                      <div>
                        <Typography className={classes.center}>VS</Typography>
                      </div>
                      <div className={classes.formGroup}>
                        <TextField
                          id='team2'
                          name='team2'
                          label='Team2 Name*'
                          value={values.team2}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={errors.team2 && touched.team2 && errors.team2}
                          error={errors.team2 && touched.team2}
                          className={classes.textfieldWidth}
                        />
                      </div>
                    </div>
                  )}
                  {activeStep === 1 && (
                    <div>
                      <div className={classes.formGroup} id='team1-players'>
                        <Typography className={classes.teamNameHeading}>Team1 Players Name</Typography>
                        {team1Players.map((playerId, index) => {
                          const timestamp = Date.now().toString()
                          const tag = (
                            <div key={index}>
                              <Typography component='span'>{index + 1}. </Typography>
                              <TextField
                                id={timestamp}
                                name={`team1Players.${index}`}
                                label='Player Name'
                                value={values.team1Players[index]}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={classes.textfieldWidth}
                              />
                              <IconButton
                                color='primary'
                                disabled={team1Players.length >= 11 ? true : false}
                                onClick={() => addTeam1Player(timestamp)}
                              >
                                <AddCircleOutlineIcon />
                              </IconButton>
                              <IconButton
                                disabled={team1Players.length <= 1 ? true : false}
                                color='secondary'
                                onClick={() => {
                                  removeTeam1Player(playerId)
                                }}
                              >
                                <RemoveCircleOutlineIcon />
                              </IconButton>
                            </div>
                          )
                          return tag
                        })}
                      </div>
                      <div className={classes.formGroup} id='team2-players'>
                        <Typography className={classes.teamNameHeading}>Team2 Players Name</Typography>
                        {team2Players.map((playerId, index) => {
                          const timestamp = Date.now().toString()
                          const tag = (
                            <div key={index}>
                              <Typography component='span'>{index + 1}. </Typography>
                              <TextField
                                id={timestamp}
                                name={`team2Players.${index}`}
                                label='Player Name'
                                value={values.team2Players[index]}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={classes.textfieldWidth}
                              />
                              <IconButton
                                color='primary'
                                disabled={team2Players.length >= 11 ? true : false}
                                onClick={() => addTeam2Player(timestamp)}
                              >
                                <AddCircleOutlineIcon />
                              </IconButton>
                              <IconButton
                                disabled={team2Players.length <= 1 ? true : false}
                                color='secondary'
                                onClick={() => {
                                  removeTeam2Player(playerId)
                                }}
                              >
                                <RemoveCircleOutlineIcon />
                              </IconButton>
                            </div>
                          )
                          return tag
                        })}
                      </div>
                    </div>
                  )}
                  {activeStep === 2 && (
                    <div>
                      <div className={classes.formGroup}>
                        <FormControl component='fieldset'>
                          <FormLabel component='legend'>Who is Batting?</FormLabel>
                          <RadioGroup
                            name='batting'
                            value={values.batting.toString()}
                            onChange={(event) => {
                              setFieldValue('batting', event.currentTarget.value)
                            }}
                          >
                            <FormControlLabel value={values.team1} control={<Radio />} label={values.team1} />
                            <FormControlLabel value={values.team2} control={<Radio />} label={values.team2} />
                          </RadioGroup>
                        </FormControl>
                      </div>
                    </div>
                  )}
                  <div>
                    {activeStep === steps.length ? (
                      <div className={classes.resetContainer}>
                        <Typography className={classes.instructions}>All steps completed</Typography>
                        <pre>
                          <p id='form__data'>myname islataf</p>
                        </pre>
                        <Button
                          variant='contained'
                          color='secondary'
                          onClick={() => {
                            handleReset()
                            setActiveStep(0)
                          }}
                        >
                          Reset
                        </Button>
                      </div>
                    ) : (
                      <div>
                        <Button variant='contained' disabled={activeStep === 0} onClick={handleBack} className={classes.backButton}>
                          Back
                        </Button>
                        <Button id='submit' disabled={isSubmitting} variant='contained' color='primary' type='submit'>
                          {isLastStep() ? 'Start Game' : 'Next'}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </form>
            )
          }}
        </Formik>
      </div>
    </div>
  )
}

export default VerticalStepper
