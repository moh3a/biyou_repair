import React, { useState } from "react";
import { Dimensions, StyleSheet, TouchableOpacity } from "react-native";

import { Text, View } from "../Themed";
import { IEntry } from "../../utils/method";
import Colors from "../../constants/Colors";
import ItemDetails from "../home/ItemDetails";

const ItemsList = ({ items }: { items: IEntry[] }) => {
  const [item, setItem] = useState<IEntry>();
  const [openItemDetails, setOpenItemDetails] = useState(false);

  const showItemDetails = (item: IEntry) => {
    setOpenItemDetails(true);
    setItem(item);
  };

  return (
    <View style={styles.listView}>
      <View style={{ width: "100%", display: "flex" }}>
        {
          items.length > 0 &&
            items.map((item: IEntry, index) => (
              <View
                key={index}
                style={{
                  borderRadius: 10,
                  backgroundColor: Colors.gray,
                  width: Dimensions.get("window").width - 10,
                  marginHorizontal: "auto",
                  marginVertical: 8,
                  display: "flex",
                  flexDirection: "row",
                  paddingVertical: 10,
                  paddingHorizontal: 5,
                  shadowColor: Colors.black,
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.3,
                  shadowRadius: 10,
                }}
              >
                <View
                  style={{
                    flex: 1,
                    width: "100%",
                    backgroundColor: "transparent",
                    justifyContent: "center",
                    alignItems: "center",
                    overflow: "hidden",
                  }}
                >
                  <Text>{item.itemId}</Text>
                </View>
                <View
                  style={{
                    flex: 6,
                    backgroundColor: "transparent",
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      display: "flex",
                      backgroundColor: "transparent",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      paddingVertical: 5,
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: "transparent",
                        justifyContent: "center",
                        alignItems: "center",
                        overflow: "hidden",
                      }}
                    >
                      <Text style={{ fontWeight: "bold", textAlign: "center" }}>
                        {item.clientName}
                      </Text>
                    </View>
                    <View
                      style={{
                        backgroundColor: "transparent",
                        justifyContent: "center",
                        alignItems: "center",
                        overflow: "hidden",
                      }}
                    >
                      <Text>{item.clientPhoneNumber}</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      backgroundColor: "transparent",
                    }}
                  >
                    <TouchableOpacity onPress={() => showItemDetails(item)}>
                      <View
                        style={{
                          flex: 1,
                          backgroundColor: "transparent",
                          justifyContent: "center",
                          alignItems: "center",
                          overflow: "hidden",
                        }}
                      >
                        <Text style={{ fontStyle: "italic" }}>
                          {item.model}
                        </Text>
                      </View>
                      <View
                        style={{
                          backgroundColor: "transparent",
                          flex: 1,
                          justifyContent: "center",
                          alignItems: "center",
                          overflow: "hidden",
                        }}
                      >
                        <Text
                          style={[
                            {
                              color: Colors.white,
                              fontWeight: "bold",
                              paddingHorizontal: 3,
                            },
                            item.status === "En attente" && {
                              backgroundColor: Colors.red,
                            },
                            item.status === "Réparé" && {
                              backgroundColor: "green",
                            },
                            item.status === "Devis" && {
                              backgroundColor: Colors.violet,
                            },
                            item.status === "Retour au client" && {
                              backgroundColor: Colors.red,
                            },
                            item.status === "Attente de pièces" && {
                              backgroundColor: Colors.yellow,
                            },
                          ]}
                        >
                          {item.status}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))
          // ) : (
          //   <View
          //     style={{
          //       borderRadius: 10,
          //       backgroundColor: Colors.gray,
          //       width: Dimensions.get("window").width - 10,
          //       marginHorizontal: "auto",
          //       marginVertical: 8,
          //       display: "flex",
          //       flexDirection: "row",
          //       paddingVertical: 10,
          //       paddingHorizontal: 5,
          //       shadowColor: Colors.black,
          //       shadowOffset: { width: 0, height: 1 },
          //       shadowOpacity: 0.3,
          //       shadowRadius: 10,
          //     }}
          //   >
          //     <View
          //       style={{
          //         flex: 1,
          //         width: "100%",
          //         backgroundColor: "transparent",
          //         justifyContent: "center",
          //         alignItems: "center",
          //         overflow: "hidden",
          //       }}
          //     >
          //       <Text>{items.itemId}</Text>
          //     </View>
          //     <View
          //       style={{
          //         flex: 6,
          //         backgroundColor: "transparent",
          //         width: "100%",
          //         display: "flex",
          //         flexDirection: "row",
          //       }}
          //     >
          //       <View
          //         style={{
          //           flex: 1,
          //           display: "flex",
          //           backgroundColor: "transparent",
          //           flexDirection: "column",
          //           alignItems: "center",
          //           justifyContent: "center",
          //           paddingVertical: 5,
          //         }}
          //       >
          //         <View
          //           style={{
          //             backgroundColor: "transparent",
          //             justifyContent: "center",
          //             alignItems: "center",
          //             overflow: "hidden",
          //           }}
          //         >
          //           <Text style={{ fontWeight: "bold", textAlign: "center" }}>
          //             {items.clientName}
          //           </Text>
          //         </View>
          //         <View
          //           style={{
          //             backgroundColor: "transparent",
          //             justifyContent: "center",
          //             alignItems: "center",
          //             overflow: "hidden",
          //           }}
          //         >
          //           <Text>{items.clientPhoneNumber}</Text>
          //         </View>
          //       </View>
          //       <View
          //         style={{
          //           flex: 1,
          //           display: "flex",
          //           flexDirection: "column",
          //           backgroundColor: "transparent",
          //         }}
          //       >
          //         {items.products?.map((product: any, idx: number) => (
          //           <TouchableOpacity
          //             key={idx}
          //             onPress={() =>
          //               showItemDetails({
          //                 ...product,
          //                 clientName: items.clientName,
          //                 itemId: items.itemId,
          //                 clientPhoneNumber: items.clientPhoneNumber,
          //                 clientEmail: items.clientEmail,
          //                 createdAt: items.createdAt,
          //               })
          //             }
          //           >
          //             <View
          //               style={{
          //                 flex: 1,
          //                 backgroundColor: "transparent",
          //                 justifyContent: "center",
          //                 alignItems: "center",
          //                 overflow: "hidden",
          //               }}
          //             >
          //               <Text style={{ fontStyle: "italic" }}>
          //                 {product.model}
          //               </Text>
          //             </View>
          //             <View
          //               style={{
          //                 backgroundColor: "transparent",
          //                 flex: 1,
          //                 justifyContent: "center",
          //                 alignItems: "center",
          //                 overflow: "hidden",
          //               }}
          //             >
          //               <Text
          //                 style={[
          //                   {
          //                     color: Colors.white,
          //                     fontWeight: "bold",
          //                     paddingHorizontal: 3,
          //                   },
          //                   product.status === "En attente" && {
          //                     backgroundColor: Colors.red,
          //                   },
          //                   product.status === "Réparé" && {
          //                     backgroundColor: "green",
          //                   },
          //                   product.status === "Devis" && {
          //                     backgroundColor: Colors.violet,
          //                   },
          //                   product.status === "Retour au client" && {
          //                     backgroundColor: Colors.red,
          //                   },
          //                   product.status === "Attente de pièces" && {
          //                     backgroundColor: Colors.yellow,
          //                   },
          //                 ]}
          //               >
          //                 {product.status}
          //               </Text>
          //             </View>
          //           </TouchableOpacity>
          //         ))}
          //       </View>
          //     </View>
          //   </View>
        }
      </View>
      {openItemDetails && item && (
        <ItemDetails
          item={item}
          openItemDetails={openItemDetails}
          setOpenItemDetails={setOpenItemDetails}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  listView: {
    flex: 1,
    width: "100%",
    paddingTop: 30,
    paddingBottom: 10,
  },
  buttoncontainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: 40,
    marginVertical: 10,
    borderRadius: 50,
    padding: 10,
    elevation: 10,
    backgroundColor: Colors.red,
  },
  textDesc: {
    overflow: "hidden",
  },
});

export default ItemsList;
