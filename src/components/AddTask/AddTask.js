import React, { PureComponent } from "react";
import { StyleSheet, View, Button, TextInput } from "react-native";

class AddTask extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      text: this.props.val
    };
  }

  btnOnPres = async () => {
    if (this.state.text != "") {
      await requestAnimationFrame(() => {
        this.props.handleBtnPres(this.state.text.trim());
        this.setState({ text: "" });
      });
    }
  };

  render() {
    return (
      <View style={styles.form}>
        <TextInput
          onChangeText={(text) => this.setState({ text })}
          style={styles.area}
          autoFocus={this.props.auto}
          value={this.state.text}
          placeholder="Добавить задачу ..."
          placeholderTextColor={"#9E9E9E"}
          numberOfLines={2}
          multiline={true}
        />
        <Button
          onPress={this.btnOnPres}
          title="Добавить"
          color="#1194F6"
          accessibilityLabel="Добавить"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  form: {
    backgroundColor: "black"
  },
  area: {
    marginTop: 20,
    marginBottom: 10,
    color: "white",
    borderWidth: 1,
    borderColor: "#9E9E9E"
  },
  btn: {
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: "#2196F3"
  }
});

export default AddTask;
