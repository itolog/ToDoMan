import React from "react";
import { useScreens } from "react-native-screens";

useScreens();

import AppNavigator from "./src/navigation/MyDrawerNavigator";
import { createDb } from "./src/utils/dbFunction";
// import BackgroundJob from "react-native-background-job";

// const backgroundJob = {
//   jobKey: "myJob",
//   job: () => console.log("Running in background")
// };

// BackgroundJob.register(backgroundJob);

// var backgroundSchedule = {
//   jobKey: "myJob",
//   period: 1000,
//   timeout: 10000,
//   exact: true
// };
export default class App extends React.Component {
  // componentDidMount() {
  //   BackgroundJob.schedule(backgroundSchedule);
  // }

  state = {
    // fontLoaded: false
  };
  async componentDidMount() {
    // Создание базы данных USER
    await createDb(
      "create table if not exists user (id integer primary key not null, name text);"
    );
    // Создание базы данных Lists
    await createDb(
      "create table if not exists lists (id integer primary key not null, content text, flag text);",
      "lists"
    );
    // TASK TABLE CREATE
    await createDb(
      "create table if not exists tasks (id integer primary key not null, task text, date text);",
      "tasks"
    );
    await createDb(
      "create table if not exists notes (id integer primary key not null, note text, date text);",
      "notes"
    );
  }

  render() {
    return <AppNavigator />;
  }
}
