import React, { Component } from "react";
import { View } from "react-native";

import FontAwesome from "react-native-vector-icons/dist/FontAwesome";
import Loader from "../../components/Loader/Loader";

let ListComponent = null;

export default class ListScreen extends Component {
  state = { needsExpensive: false };
  static navigationOptions = {
    header: null,
    title: "Список",
    drawerIcon: <FontAwesome name="list-alt" size={22} color="green" />
  };

  async componentDidMount() {
    if (ListComponent == null) {
      ListComponent = await require("../../components/ListToDo/ListToDo")
        .default;
    }

    this.setState(() => ({
      needsExpensive: true
    }));
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.state.needsExpensive ? (
          <ListComponent {...this.props} />
        ) : (
          <Loader />
        )}
      </View>
    );
  }
}
