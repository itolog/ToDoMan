import React, { PureComponent } from "react";
import { View } from "react-native";
import SimpleLineIcons from "react-native-vector-icons/dist/SimpleLineIcons";
import Loader from "../../components/Loader/Loader";

let NotesList = null;
class Notes extends PureComponent {
  state = { needsExpensive: false };
  static navigationOptions = {
    header: null,
    title: "Заметки",
    drawerIcon: <SimpleLineIcons name="note" size={22} color="green" />
  };

  async componentDidMount() {
    if (NotesList == null) {
      NotesList = await require("../../components/NotesList/NotesList").default;
    }

    this.setState(() => ({
      needsExpensive: true
    }));
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.state.needsExpensive ? <NotesList {...this.props} /> : <Loader />}
      </View>
    );
  }
}

export default Notes;
