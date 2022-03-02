import { FontAwesome } from "@expo/vector-icons";
import React, { Dispatch, SetStateAction } from "react";
import { Modal, Pressable, ScrollView } from "react-native";
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
    <>
      <ScrollView style={{ flex: 1 }}>
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
                }}
              >
                {children}
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </>
  );
};

export default BiyouModal;
