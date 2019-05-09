import React, { PureComponent } from "react";
import { StyleSheet, Dimensions, Text, View } from "react-native";
import CheckBox from "react-native-check-box";

import { updateItem } from "../../utils/dbFunction";

export default class ListsItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      checkin: this.props.check.toLowerCase() == "1" ? true : false
    };
  }

  itemOnPres = async () => {
    await updateItem(this.state.checkin, this.props.id, "lists", "flag");
    this.setState((prevState) => ({
      checkin: !prevState.checkin
    }));
  };

  render() {
    return (
      <View
        style={[
          styles.container,
          this.state.checkin ? styles.checkedOutBody : styles.checkedInBody
        ]}>
        <View style={styles.VievLeft}>
          <Text
            style={[
              styles.text,
              this.state.checkin ? styles.checkedOut : styles.checkedIn
            ]}>
            {this.props.text}
          </Text>
        </View>
        <View style={styles.ViewRight}>
          <CheckBox
            style={styles.box}
            onClick={this.itemOnPres}
            isChecked={this.state.checkin}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    padding: 7,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  checkedOutBody: {
    width: Dimensions.get("window").width,
    marginLeft: 0,
    marginTop: 5,
    backgroundColor: "grey",
    opacity: 0.5
  },
  box: {
    height: 30,
    width: 30,
    alignItems: "center"
  },
  checkedInBody: {
    backgroundColor: "white",
    width: Dimensions.get("window").width,
    marginLeft: 0,
    marginTop: 5,
    opacity: 1
  },
  text: {
    fontWeight: "bold"
  },
  checkedOut: {
    textDecorationLine: "line-through"
  },
  checkedIn: {
    textDecorationLine: "none"
  },
  VievLeft: {
    width: "90%"
  },
  ViewRight: {
    width: "10%",
    alignSelf: "center"
  }
});
