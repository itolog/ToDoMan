import React, { PureComponent } from "react";
import { BackHandler, View } from "react-native";
import Octicons from "react-native-vector-icons/dist/Octicons";
import Loader from "../../components/Loader/Loader";

let TaskList = null;
class ToDo extends PureComponent {
  state = { needsExpensive: false };
  static navigationOptions = {
    header: null,
    title: "Задачи",
    drawerIcon: <Octicons name="tasklist" size={22} color="green" />
  };

  async componentDidMount() {
    if (TaskList == null) {
      TaskList = await require("../../components/TaskList/TaskList").default;
    }

    this.setState(() => ({ needsExpensive: true }));
    // EXIT APP
    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      async () => {
        await BackHandler.exitApp();
        return true;
      }
    );
  }

  async componentWillUnmount() {
    this.backHandler.remove();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.state.needsExpensive ? <TaskList {...this.props} /> : <Loader />}
      </View>
    );
  }
}

export default ToDo;
