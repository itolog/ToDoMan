import { createDrawerNavigator, createAppContainer } from "react-navigation";

import ToDoScreen from "../screens/ToDo/ToDo";
import NotesScreen from "../screens/Notes/Notes";
import ListScreen from "../screens/ListScreen/ListScreen";

const MyDrawerNavigator = createDrawerNavigator(
  {
    ToDo: {
      screen: ToDoScreen
    },
    Notes: {
      screen: NotesScreen
    },
    ListScreen: {
      screen: ListScreen
    }
  },
  {
    drawerPosition: "right"
  }
);

export default createAppContainer(MyDrawerNavigator);
