import { Dispatch, SetStateAction } from "react";
import { Text, View } from "../Themed";

const AddItem = ({
  setAddOpen,
}: {
  setAddOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <View>
      <Text>AddItem</Text>
    </View>
  );
};

export default AddItem;
