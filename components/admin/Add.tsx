import React, { useCallback, useEffect, useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import { doc, getFirestore, onSnapshot, setDoc } from "firebase/firestore";

import { Text } from "../Themed";
import BiyouButton from "../elements/Button";
import BiyouModal from "../elements/Modal";
import BiyouTextInput from "../elements/TextInput";
import { createNewId, localISODate } from "../../utils/method";
import Colors from "../../constants/Colors";
import Error from "../Error";
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
  const db = getFirestore();

  // set the entry ID
  const getLastId = useCallback(async () => {
    onSnapshot(doc(db, "currentId", "currentId"), (doc) => {
      console.log("getLastId called");
      if (doc.exists()) {
        setId(createNewId(doc.data().id));
      }
    });
  }, []);
  useEffect(() => {
    getLastId();
  }, [getLastId]);

  // final submit function
  const addHandler = async () => {
    if (id && name && phoneNumber && products.length > 0) {
      console.log("addHandler called");
      products.map(async (product) => {
        if (product.model) {
          const entryRef = id + Math.floor(Math.random() * 10000).toString();
          await setDoc(doc(db, "items", entryRef), {
            itemId: id.toUpperCase(),
            entryRef,
            clientName: name.toLowerCase(),
            clientPhoneNumber: phoneNumber,
            createdAt: localISODate(),
            model: product.model,
            status: "En attente",
            notified: { isNotified: false },
          });
        }
      });
      await setDoc(doc(db, "currentId", "currentId"), { id });
      setOpenAddModal(false);
      setName("");
      setPhoneNumber("");
      setProducts([{ model: "", id: Math.floor(Math.random() * 1000) }]);
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
        />
      ))}

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
