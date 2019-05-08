import { createDrawerNavigator, createAppContainer } from "react-navigation";

import ToDoScreen from "../screens/ToDo/ToDo";
import NotesScreen from "../screens/Notes/Notes";
const MyDrawerNavigator = createDrawerNavigator(
  {
    ToDo: {
      screen: ToDoScreen
    },
    Notes: {
      screen: NotesScreen
    }
  },
  {
    drawerPosition: "right"
  }
);

export default createAppContainer(MyDrawerNavigator);
