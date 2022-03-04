import { Dispatch, SetStateAction } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/userSlice";
import BiyouButton from "../elements/Button";
import { Text } from "../Themed";

const AddItem = ({
  setAddOpen,
}: {
  setAddOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { user } = useSelector(selectUser);
  return (
    <>
      {user && (
        <>
          <Text style={{ marginBottom: 15, textAlign: "center" }}>
            Ajouter un produit
          </Text>
          <BiyouButton title="Fermer" clickHandler={() => setAddOpen(false)} />
        </>
      )}
    </>
  );
};

export default AddItem;
