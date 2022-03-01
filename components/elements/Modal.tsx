import { FontAwesome } from "@expo/vector-icons";
import React, { Dispatch, SetStateAction } from "react";
import { Modal, Pressable } from "react-native";
import { View } from "../Themed";

const BiyouModal = ({
  children,
  open,
  setOpen,
}: {
  children: React.ReactNode;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <View
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flex: 1,
        paddingTop: 16,
      }}
    >
      <Modal
        animationType="slide"
        transparent={true}
        visible={open}
        onRequestClose={() => {
          setOpen(!open);
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Pressable
            style={{
              position: "absolute",
              top: 5,
              right: 10,
              borderRadius: 50,
              padding: 10,
              elevation: 10,
              zIndex: 50,
              backgroundColor: "red",
            }}
            onPress={() => setOpen(!open)}
          >
            <FontAwesome
              style={{
                color: "white",
                fontWeight: "bold",
                textAlign: "center",
              }}
              size={25}
              name="close"
            />
          </Pressable>
          <View
            style={{
              width: "100%",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            {children}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default BiyouModal;
