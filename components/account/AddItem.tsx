import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { Dispatch, SetStateAction, useState } from "react";
import { useSelector } from "react-redux";
import Colors from "../../constants/Colors";
import { selectUser } from "../../redux/userSlice";
import { IEntry } from "../../utils/method";
import BiyouButton from "../elements/Button";
import BiyouTextInput from "../elements/TextInput";
import Error from "../Error";
import { Text } from "../Themed";

const AddItem = ({
  setAddOpen,
}: {
  setAddOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { user } = useSelector(selectUser);
  const [email, setEmail] = useState(user && user.email);
  const [itemId, setItemId] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const db = getFirestore();

  const addItem = async () => {
    setLoading(true);
    if (user && user.uid && email && itemId && name) {
      const querySnapshot = await getDocs(
        query(
          collection(db, "items"),
          where("itemId", "==", itemId.toUpperCase()),
          where("clientName", "==", name.toLowerCase())
        )
      );
      if (querySnapshot.empty) {
        setLoading(false);
        setError("Ce bon n'existe pas! Veuillez bien vérifier vos entrées.");
        setTimeout(() => {
          setError("");
        }, 3000);
      } else {
        querySnapshot.forEach(async (d) => {
          const item = d.data() as IEntry;
          if (item.entryRef)
            await updateDoc(doc(db, "items", item.entryRef), {
              clientEmail: email,
            });
          if (user.uid)
            await updateDoc(doc(db, "custom", user.uid), {
              items: arrayUnion({ itemId: itemId.toUpperCase() }),
            });
        });
        setLoading(false);
        setAddOpen(false);
      }
    } else {
      setLoading(false);
      setError("Ajouter quoi?");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  return (
    <>
      {user && (
        <>
          {error.length > 0 && <Error message={error} />}
          <Text style={{ marginBottom: 15, textAlign: "center" }}>
            Ajouter un produit
          </Text>
          <BiyouTextInput value={email} placeholder="" />
          <BiyouTextInput
            value={name}
            setValue={setName}
            placeholder="entrez le nom sur le bon"
          />
          <BiyouTextInput
            value={itemId}
            setValue={setItemId}
            placeholder="entrez le numéro de bon"
          />
          {loading && (
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                color: Colors.red,
              }}
            >
              Veuillez patienter...
            </Text>
          )}
          <BiyouButton title="Ajouter" clickHandler={addItem} />
        </>
      )}
    </>
  );
};

export default AddItem;
