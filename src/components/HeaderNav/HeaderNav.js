import React, { PureComponent } from "react";
import {
  BackHandler,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableNativeFeedback
} from "react-native";
import Ionicons from "react-native-vector-icons/dist/Ionicons";
// import { getInfoTable } from "../../utils/dbFunction";

export default class HeaderNav extends PureComponent {
  static navigationOptions = {
    header: null
  };
  componentDidMount() {
    // getInfoTable("tasks");
  }

  // LOGOUT
  logOut = () => {
    BackHandler.exitApp();
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.left}>
          <TouchableNativeFeedback onPress={this.logOut}>
            <Ionicons name="ios-log-out" size={32} color="red" />
          </TouchableNativeFeedback>
        </View>
        <View>
          <Text style={styles.text}>Tasker</Text>
        </View>
        <View style={styles.right}>
          <TouchableNativeFeedback onPress={this.props.openDrawer}>
            <Ionicons name="md-menu" size={34} color="#4CAF50" />
          </TouchableNativeFeedback>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#2196F3",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
    width: Dimensions.get("window").width
  },
  text: {
    color: "white"
  },
  left: {
    marginLeft: 8
  },
  right: {
    marginRight: 8
  }
});
