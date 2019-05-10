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

import { deleteItem, addItem, updateItem } from "../../utils/dbFunction";
import AddTask from "../AddTask/AddTask";
import HeaderNav from "../../components/HeaderNav/HeaderNav";
import ModalTask from "../ModalTask/ModalTask";
import ParseData from "../../utils/dateFormat";

const newDate = new Date();
const time = ParseData(newDate);

class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listViewData: [],
      modalVisible: false,
      idTaskItem: "",
      textForUpdate: ""
    };
  }

  async componentDidMount() {
    await this.getTasks();
  }
  async componentDidUpdate() {
    // UIManager.setLayoutAnimationEnabledExperimental &&
    //   UIManager.setLayoutAnimationEnabledExperimental(true);
    // LayoutAnimation.spring();
  }

  // ADD TASK
  handleBtnPres = async (text) => {
    await requestAnimationFrame(() => {
      addItem("tasks", "task", text, time);
      this.getTasks();
    });
  };
  // UPDATE TASK
  handleUpdateTask = async (text) => {
    await updateItem(text, this.state.idTaskItem, "tasks", "task");
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
  onModalClose = async () => {
    await this.setState({ modalVisible: false });
    await this.getTasks();
  };

  getTasks = async () => {
    await db.transaction((tx) => {
      tx.executeSql(`select * from tasks`, [], (tx, res) => {
        var temp = [];
        for (let i = 0; i < res.rows.length; ++i) {
          temp.push(res.rows.item(i));
        }
        this.setState({ listViewData: temp });
      });
    });
  };

  handleDeleteTask = async (key) => {
    await deleteItem("tasks", key);
    await this.getTasks();
  };

  render() {
    const listViewData = this.state.listViewData;
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <HeaderNav openDrawer={() => this.props.navigation.openDrawer()} />
        <AddTask handleBtnPres={this.handleBtnPres} val="" />
        {listViewData.length != 0 && (
          <View>
            <Text style={{ color: "white" }}>
              Всего задач: {this.state.listViewData.length}
            </Text>
          </View>
        )}
        <ModalTask
          modalVisible={this.state.modalVisible}
          onModalClose={this.onModalClose}
          updateItem={this.handleUpdateTask}
          textForUpdate={this.state.textForUpdate}
        />

        <FlatList
          data={this.state.listViewData}
          keyExtractor={(item) => item.id.toString()}
          initialNumToRender={3}
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
              <Text style={styles.cardText}>{item.task}</Text>
              <View style={styles.btnBlock}>
                <TouchableNativeFeedback
                  onPress={() => this.handleDeleteTask(item.id)}>
                  <View style={[styles.btn, { backgroundColor: "#F44336" }]}>
                    <EvilIcons name="trash" size={32} color="black" />
                  </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback
                  onPress={() => {
                    this.setModalVisible(item.id, item.task);
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
    backgroundColor: "black"
  },
  card: {
    padding: 5,
    borderColor: "#E2E2E2",
    borderWidth: 2,
    marginBottom: 10,
    marginTop: 5
  },
  cardHeader: {
    padding: 5,
    borderBottomColor: "#E2E2E2",
    borderWidth: 1,
    marginBottom: 5
  },
  cardHeaderText: {
    color: "#CBCBCB"
  },
  cardText: {
    color: "orange",
    fontSize: 18,
    borderBottomColor: "#E2E2E2",
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
    borderColor: "#E2E2E2",
    borderWidth: 3
  },
  emptyText: {
    color: "white",
    fontSize: 20
  }
});

export default TaskList;
