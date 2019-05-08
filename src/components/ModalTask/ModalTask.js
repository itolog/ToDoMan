import React from "react";
import {
  Modal,
  Text,
  Button,
  View,
  StyleSheet,
  KeyboardAvoidingView
} from "react-native";

import AddTask from "../AddTask/AddTask";

const ModalTask = (props) => {
  handleUpdate = async (text) => {
    await props.updateItem(text);
  };

  return (
    <Modal
      animationType="fade"
      transparent={false}
      onRequestClose={props.onModalClose}
      visible={props.modalVisible}>
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <Text style={styles.title}>Обновить</Text>
        <AddTask
          handleBtnPres={this.handleUpdate}
          val={props.textForUpdate}
          auto={true}
        />
        <View>
          <Button
            onPress={props.onModalClose}
            title="Назад"
            color="orange"
            accessibilityLabel="Back"
          />
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "space-between"
  },
  title: {
    color: "white",
    fontSize: 20,
    padding: 20
  }
});

export default ModalTask;
