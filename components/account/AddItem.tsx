import {
  arrayUnion,
  doc,
  getDoc,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import { Dispatch, SetStateAction, useState } from "react";
import { useSelector } from "react-redux";
import Colors from "../../constants/Colors";
import { selectUser } from "../../redux/userSlice";
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
      const docRef = await getDoc(doc(db, "items", itemId.toUpperCase()));
      if (docRef.exists()) {
        if (docRef.data().clientName.toLowerCase() === name.toLowerCase()) {
          await updateDoc(doc(db, "items", itemId.toUpperCase()), {
            clientEmail: email,
          });
          await updateDoc(doc(db, "custom", user.uid), {
            items: arrayUnion({ itemId: itemId.toUpperCase() }),
          });
          setLoading(false);
          setAddOpen(false);
        } else {
          setLoading(false);
          setError("Veuillez entrer le nom affiché sur le bon!");
          setTimeout(() => {
            setError("");
          }, 3000);
        }
      } else {
        setLoading(false);
        setError("Ce bon n'existe pas");
        setTimeout(() => {
          setError("");
        }, 3000);
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
