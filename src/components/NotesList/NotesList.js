import React, { Component } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  LayoutAnimation,
  UIManager,
  StatusBar,
  TouchableNativeFeedback
} from "react-native";

import EvilIcons from "react-native-vector-icons/dist/EvilIcons";
import SQLite from "react-native-sqlite-storage";

const db = SQLite.openDatabase("db.db");
import HeaderNav from "../../components/HeaderNav/HeaderNav";
import { deleteItem, addItem, updateItem } from "../../utils/dbFunction";
import AddTask from "../AddTask/AddTask";
import ModalTask from "../ModalTask/ModalTask";
import ParseData from "../../utils/dateFormat";

const newDate = new Date();
const time = ParseData(newDate);

class NotesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: [],
      modalVisible: false,
      idTaskItem: "",
      textForUpdate: ""
    };
  }

  async componentDidMount() {
    await this.getNotes();
  }
  async componentDidUpdate() {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.spring();
  }

  // ADD TASK
  handleBtnPres = async (text) => {
    await addItem("notes", "note", text, time);
    await this.getNotes();
  };
  // UPDATE NOTE
  handleUpdateNote = async (text) => {
    await updateItem(text, this.state.idTaskItem, "notes", "note");
  };
  // MODAL
  setModalVisible = async (key, val) => {
    await this.setState({
      modalVisible: true,
      idTaskItem: key,
      textForUpdate: val
    });
    console.log(val);
  };
  onModalClose = () => {
    this.setState({ modalVisible: false });
    this.getNotes();
  };

  getNotes = async () => {
    await db.transaction((tx) => {
      tx.executeSql(`select * from notes`, [], (tx, res) => {
        var temp = [];
        for (let i = 0; i < res.rows.length; ++i) {
          temp.push(res.rows.item(i));
        }
        this.setState({ listData: temp });
      });
    });
  };

  handleDeleteTask = async (key) => {
    await deleteItem("notes", key);
    await this.getNotes();
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <HeaderNav openDrawer={() => this.props.navigation.openDrawer()} />
        <AddTask handleBtnPres={this.handleBtnPres} val="" />
        <View>
          <Text style={{ color: "white" }}>
            Всего заметок: {this.state.listData.length}
          </Text>
        </View>
        <ModalTask
          modalVisible={this.state.modalVisible}
          onModalClose={this.onModalClose}
          updateItem={this.handleUpdateNote}
          textForUpdate={this.state.textForUpdate}
        />
        <FlatList
          data={this.state.listData}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={() => (
            <View style={styles.empty}>
              <Text style={styles.emptyText}>задач нету</Text>
            </View>
          )}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardHeaderText}>
                  добавлено: {item.date}
                </Text>
              </View>
              <Text style={styles.cardText}>{item.note}</Text>
              <View style={styles.btnBlock}>
                <TouchableNativeFeedback
                  onPress={() => this.handleDeleteTask(item.id)}>
                  <View style={[styles.btn, { backgroundColor: "#F44336" }]}>
                    <EvilIcons name="trash" size={32} color="black" />
                  </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback
                  onPress={() => {
                    this.setModalVisible(item.id, item.note);
                  }}>
                  <View style={[styles.btn, { backgroundColor: "#E2E2E2" }]}>
                    <EvilIcons name="pencil" size={32} color="black" />
                  </View>
                </TouchableNativeFeedback>
              </View>
            </View>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#282C34"
  },
  card: {
    padding: 5,
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 4,
    marginBottom: 10,
    marginTop: 5
  },
  cardHeader: {
    padding: 5,
    borderBottomColor: "black",
    borderWidth: 1,
    marginBottom: 5
  },
  cardHeaderText: {
    color: "grey"
  },
  cardText: {
    color: "black",
    fontSize: 18,
    borderBottomColor: "black",
    borderWidth: 1,
    padding: 10
  },
  btnBlock: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
    marginBottom: 10
  },
  btn: {
    width: 140,
    height: 40,
    justifyContent: "center",
    alignItems: "center"
  },
  empty: {
    marginTop: 30,
    padding: 15,
    borderColor: "black",
    borderWidth: 3
  },
  emptyText: {
    color: "white",
    fontSize: 20
  }
});

export default NotesList;
