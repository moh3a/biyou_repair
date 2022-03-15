import React, { useCallback, useEffect, useState } from "react";
import { Pressable, StyleSheet, TextInput } from "react-native";
import { doc, getFirestore, onSnapshot, setDoc } from "firebase/firestore";

import { Text, View } from "../Themed";
import BiyouButton from "../elements/Button";
import BiyouModal from "../elements/Modal";
import BiyouTextInput from "../elements/TextInput";
import { createNewId, IEntry, localISODate } from "../../utils/method";
import Colors from "../../constants/Colors";
import Error from "../Error";
import axios from "axios";
import { FontAwesome } from "@expo/vector-icons";

export default function AddItem({
  openAddModal,
  setOpenAddModal,
}: {
  openAddModal: boolean;
  setOpenAddModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [products, setProducts] = useState<{ model: string; id: number }[]>([
    { model: "", id: Math.floor(Math.random() * 1000) },
  ]);
  const [error, setError] = useState("");
  const [brands, setBrands] =
    useState<{ name: string; models: [{ name: string }] }[]>();
  const [brand, setBrand] = useState("");
  const db = getFirestore();

  const getLastId = useCallback(async () => {
    onSnapshot(doc(db, "currentId", "currentId"), (doc) => {
      if (doc.exists()) {
        setId(createNewId(doc.data().id));
      }
    });
  }, []);

  useEffect(() => {
    getLastId();
  }, [getLastId]);

  const addHandler = async () => {
    if (id && name && phoneNumber && products.length > 0) {
      let bon: IEntry = {
        clientName: name.toLowerCase(),
        clientPhoneNumber: phoneNumber,
        itemId: id.toUpperCase(),
        createdAt: localISODate(),
        products: [],
      };
      products.map((product) => {
        if (product.model) {
          bon.products?.push({
            model: product.model,
            status: "En attente",
            notified: { isNotified: false },
          });
        }
      });
      await setDoc(doc(db, "items", id), bon);
      await setDoc(doc(db, "currentId", "currentId"), { id });
      setOpenAddModal(false);
      setName("");
      setPhoneNumber("");
      setProducts([]);
    } else if (!id) {
      setError("Erreur avec le numéro de bon");
      setTimeout(() => {
        setError("");
      }, 3000);
    } else {
      setError("Champs obligatoire!");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  const getBrands = async () => {
    const { data } = await axios.get(
      "https://biyourepairapi.herokuapp.com/smartphones"
    );
    console.log(data);
    if (data.success) {
      setBrands(data.data);
    }
  };

  return (
    <BiyouModal open={openAddModal} setOpen={setOpenAddModal}>
      {error.length > 1 && <Error message={error} />}
      <Text style={styles.modalText}>Créer: {id}</Text>
      <BiyouTextInput
        placeholder="nom du client"
        value={name}
        setValue={setName}
        condition={!name}
      />
      <BiyouTextInput
        placeholder="numéro de téléphone du client"
        value={phoneNumber}
        setValue={setPhoneNumber}
        condition={!phoneNumber}
      />
      <Text
        style={{
          marginTop: 20,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Produits
      </Text>
      {products.map((product, idx) => (
        <BiyouTextInput
          key={product.id}
          placeholder="modèle du produit"
          value={products[idx].model}
          setValue={(e) => {
            let old = [...products];
            old[idx] = { id: products[idx].id, model: e.toString() };
            setProducts(old);
          }}
          // setValue={setModel}
          // condition={!model}
        />
      ))}
      {/* <View
        style={{
          backgroundColor: "transparent",
          marginHorizontal: 15,
          marginVertical: 4,
        }}
      >
        <TextInput
          style={{
            padding: 10,
            borderRadius: 15,
            backgroundColor: Colors.gray,
            color: Colors.black,
          }}
          placeholder="Marque du produit"
          placeholderTextColor={"#999"}
          value={brand}
          onFocus={getBrands}
          onChangeText={(e) => setBrand(e)}
        />
      </View> */}
      <Pressable
        onPress={() =>
          setProducts((old) => [
            ...old,
            { model: "", id: Math.floor(Math.random() * 1000) },
          ])
        }
        style={{
          backgroundColor: "transparent",
          marginHorizontal: 15,
          marginTop: 4,
          marginBottom: 20,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>
          <FontAwesome size={20} color={Colors.green} name="plus-circle" />{" "}
          Ajouter un produit...
        </Text>
      </Pressable>

      <BiyouButton title="Créer" clickHandler={addHandler} />
    </BiyouModal>
  );
}

const styles = StyleSheet.create({
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
