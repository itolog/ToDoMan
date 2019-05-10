import React, { PureComponent } from "react";
import {
  View,
  StatusBar,
  StyleSheet,
  FlatList,
  Text,
  TouchableNativeFeedback
} from "react-native";
import FontAwesome from "react-native-vector-icons/dist/FontAwesome";
import SQLite from "react-native-sqlite-storage";

import AddTask from "../../components/AddTask/AddTask";
import HeaderNav from "../../components/HeaderNav/HeaderNav";
import { addListsItem, deleteAll } from "../../utils/dbFunction";
import ListsItem from "../ListsItem/ListsItem";

const db = SQLite.openDatabase("db.db");

export default class ListToDo extends PureComponent {
  state = {
    addTaskVisible: false,
    listViewData: []
  };

  async componentDidMount() {
    await this.getListsitem();
  }
  getListsitem = async () => {
    await db.transaction((tx) => {
      tx.executeSql(`select * from lists`, [], (tx, res) => {
        var temp = [];
        for (let i = 0; i < res.rows.length; ++i) {
          temp.push(res.rows.item(i));
        }
        this.setState({ listViewData: temp });
      });
    });
  };

  handleAddPres = async () => {
    await this.setState({ addTaskVisible: true });
  };
  handleMinusPres = async () => {
    await this.setState({ addTaskVisible: false });
  };
  // Добавления в список
  addListItem = async (text) => {
    await addListsItem(text);
    await this.getListsitem();
  };
  // Удаление
  deleteListsItem = async () => {
    await deleteAll("lists");
    await this.getListsitem();
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#294F6D" }}>
        <StatusBar hidden={true} />
        <HeaderNav openDrawer={() => this.props.navigation.openDrawer()} />
        {/**HEADER MENU */}
        <View style={styles.header}>
          <TouchableNativeFeedback onPress={this.deleteListsItem}>
            <FontAwesome name="close" size={38} color="#AA3939" />
          </TouchableNativeFeedback>
          <View>
            <Text style={{ color: "white" }}>
              В списке: {this.state.listViewData.length}
            </Text>
          </View>
          {this.state.addTaskVisible ? (
            <TouchableNativeFeedback onPress={this.handleMinusPres}>
              <FontAwesome name="minus-circle" size={38} color="#47D6D6" />
            </TouchableNativeFeedback>
          ) : (
            <TouchableNativeFeedback onPress={this.handleAddPres}>
              <FontAwesome name="plus-circle" size={38} color="#47D6D6" />
            </TouchableNativeFeedback>
          )}
        </View>
        {/** Content*/}
        {this.state.addTaskVisible ? (
          <AddTask handleBtnPres={this.addListItem} val="" auto={true} />
        ) : (
          <View style={styles.listWrapp}>
            <FlatList
              data={this.state.listViewData}
              keyExtractor={(item) => item.id.toString()}
              ListEmptyComponent={() => (
                <View style={styles.empty}>
                  <Text style={styles.emptyText}>список пуст</Text>
                </View>
              )}
              renderItem={({ item }) => (
                <ListsItem text={item.content} check={item.flag} id={item.id} />
              )}
            />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: 10
  },
  listWrapp: {
    flex: 1,
    marginBottom: 10
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
