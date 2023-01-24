import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const action = {
      type: 'GOOD'
    }
    const state = {...initialState,good:2}

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 3,
      ok: 0,
      bad: 0
    })
  })
  test('bad is incremented', () => {
    const action = {
      type: 'BAD'
    }
    const state = {...initialState,bad:2}

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 3
    })
  })
  test('OK is incremented', () => {
    const action = {
      type: 'OK'
    }
    const state = {...initialState,ok:4}

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 5,
      bad: 0
    })
  })
  test('resets all to zero', () => {
    const action = {
      type: 'ZERO'
    }
    const state = {...initialState,good:3,bad:2}

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 0
    })
  })
  test('default do nothing', () => {
    const action = {
      type: 'DEAF'
    }
    const state = {...initialState,good:3,bad:2}
    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 3,
      ok: 0,
      bad: 2
    })
  })
})