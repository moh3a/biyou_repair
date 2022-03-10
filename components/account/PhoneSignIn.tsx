import auth from "@react-native-firebase/auth";
import { useState } from "react";
import BiyouButton from "../elements/Button";
import BiyouTextInput from "../elements/TextInput";

const PhoneSignIn = () => {
  const [confirm, setConfirm] = useState<any>(null);
  const [code, setCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  async function signInWithPhoneNumber(phoneNumber: string) {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
  }

  async function confirmCode() {
    try {
      await confirm.confirm(code);
    } catch (error) {
      console.log("Invalid code.");
    }
  }

  if (!confirm) {
    return (
      <>
        <BiyouTextInput
          placeholder="numero de telephone"
          value={phoneNumber}
          setValue={setPhoneNumber}
        />
        <BiyouButton
          title="Phone Number Sign In"
          clickHandler={() => signInWithPhoneNumber(phoneNumber)}
        />
      </>
    );
  }

  return (
    <>
      <BiyouTextInput
        placeholder="votre code"
        value={code}
        setValue={setCode}
      />
      <BiyouButton title="Confirm Code" clickHandler={() => confirmCode()} />
    </>
  );
};

export default PhoneSignIn;
