import { createElement } from "react-native";

export default function DateTimePicker({ value, onChange, style }: any) {
  return createElement("input", {
    type: "date",
    value: value,
    onInput: onChange,
    style,
  });
}
