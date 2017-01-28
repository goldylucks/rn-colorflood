import React, { Component, PropTypes } from 'react'
import { View, TouchableOpacity } from 'react-native'

export default class Picker extends Component {

  static propTypes = {
    color: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    onPress: PropTypes.func.isRequired,
  }

  render () {
    return (
      <TouchableOpacity onPress={ this.onPress }>
        <View style={ [styles.picker, { backgroundColor: this.props.color }] } />
      </TouchableOpacity>
    )
  }

  onPress = () => {
    if (this.props.completed) {
      global.alert('game is completed, time to move on buddy!\n\nclick the restart button or get the fuck out!')
      return
    }
    this.props.onPress(this.props.color)
  }

}

const styles = {
  picker: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 5,
  },

}
