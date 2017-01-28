import React, { Component, PropTypes } from 'react'
import { View, Dimensions } from 'react-native'

export default class Board extends Component {

  static propTypes = {
    rows: PropTypes.number.isRequired,
    columns: PropTypes.number.isRequired,
    squares: PropTypes.array.isRequired,
  }

  render () {
    return (
      <View style={ styles.board }>
        {
          [...Array(this.props.rows)].map((x, rowIndex) => (
            <View style={ styles.row } key={ rowIndex }>
              {
                [...Array(this.props.columns)].map((x, columnIndex) => (
                  <View style={ this.style(rowIndex, columnIndex) } key={ columnIndex } />
                ))
              }
            </View>
          ))
        }
      </View>
    )
  }

  style (rowIndex, columnIndex) {
    return {
      height: Dimensions.get('window').width / this.props.columns,
      width: Dimensions.get('window').width / this.props.columns,
      backgroundColor: this.props.squares[rowIndex][columnIndex],
    }
  }

}

const styles = {
  board: {
    // flex: 1,
  },

  row: {
    flexDirection: 'row',
  },

}
