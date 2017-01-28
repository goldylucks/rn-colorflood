import React, { Component } from 'react'
import { View, Text, TouchableWithoutFeedback, Dimensions } from 'react-native'
import Picker from './components/Picker'
import Board from './components/Board'

const COLORS = ['blue', 'red', 'green', 'yellow', 'orange']
const ROWS = 10
const COLUMNS = 10

export default class App extends Component {

  state = {
    moveCount: 0,
    squares: this.randomizeSquares(),
    completed: false,
  }

  componentWillUpdate (nextProps, nextState) {
    if (this.state.completed || !this.isCompleted(nextState.squares)) {
      return
    }
    this.setState({ completed: true })
    global.alert('Congratulations!\nYou won in ' + this.state.moveCount + ' moves!')
  }

  render () {
    return (
      <View style={ styles.container }>
        <View style={ styles.pickers }>
          { this.renderPickers() }
        </View>
        <Text style={ styles.movesCounter }>{ this.state.moveCount }</Text>
        <Board squares={ this.state.squares } rows={ ROWS } columns={ COLUMNS } />
        <TouchableWithoutFeedback onPress={ this.restart }>
          <View style={ styles.restart }>
            <Text style={ styles.restartText }>Restart</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }

  renderPickers () {
    return COLORS.map(c => (
      <Picker key={ c } color={ c } onPress={ this.onPickerPress } completed={ this.state.completed } />
    ))
  }

  restart = () => {
    this.setState({
      moveCount: 0,
      completed: false,
      squares: this.randomizeSquares(),
    })
  }

  onPickerPress = nextColor => {
    const prevColor = this.state.squares[0][0]
    const nextSquares = this.state.squares.slice()
    const processed = [] // comprised of row followed by column i.e. top left square id is '00'
    const toProcess = ['00'] // stack of ids starting at top left square
    while (toProcess.length) {
      const processing = toProcess.pop()
      this.getEdges(processing)
        .filter(id => processed.indexOf(id[0] + id[1]) === -1) // only process unprocessed squares
        .filter(id => this.state.squares[id[0]][id[1]] === prevColor) // only process if same color
        .forEach(edge => toProcess.push(edge))
      processed.push(processing)
    }
    processed.forEach(id => nextSquares[id[0]][id[1]] = nextColor)

    this.setState({
      moveCount: this.state.moveCount + 1,
      squares: nextSquares,
    })
  }

  randomizeSquares () {
    return [...Array(COLUMNS)].map((x, columnIndex) => {
      return [...Array(ROWS)].map((x, rowIndex) => {
        return COLORS[Math.floor(Math.random() * 5)]
      })
    })
  }

  getEdges (id) {
    const row = Number(id[0])
    const column = Number(id[1])
    const edges = []
    if (row > 0) edges.push(String(row - 1) + String(column))
    if (row < ROWS - 1) edges.push(String(row + 1) + String(column))
    if (column > 0) edges.push(String(row) + String(column - 1))
    if (column < COLUMNS - 1) edges.push(String(row) + String(column + 1))
    return edges
  }

  isCompleted (squares) {
    const color = squares[0][0]
    for (let rowIndex = 0; rowIndex < ROWS; rowIndex++) {
      for (let columnIndex = 0; columnIndex < COLUMNS; columnIndex++) {
        if (squares[rowIndex][columnIndex] !== color) {
          return false
        }
      }
    }
    return true
  }

}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#000',
  },

  pickers: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  movesCounter: {
    fontSize: 50,
    color: '#fff',
    textAlign: 'center',
    width: Dimensions.get('window').width,
  },

  boardContainer: {
    flex: 1,
  },

  restart: {
    marginTop: 10,
    width: Dimensions.get('window').width,
    paddingTop: 10,
    paddingBottom: 10,
    borderColor: '#fff',
    borderWidth: 1,
  },

  restartText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
  },

}
