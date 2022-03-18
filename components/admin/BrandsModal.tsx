import React, { useCallback, useEffect, useState } from "react";
import { Dimensions, ScrollView, TextInput } from "react-native";
import { BottomSheet, ListItem } from "react-native-elements";
import axios from "axios";

import { View } from "../Themed";
import BiyouButton from "../elements/Button";
import Colors from "../../constants/Colors";

const BrandsModal = () => {
  const fetchUrl = "http://localhost:3000/smartphones";
  // const fetchUrl =  "https://biyourepairapi.herokuapp.com/smartphones";

  // state for setting up the brand and model of the item
  const [step, setStep] = useState(0);
  const [openBrandsPicker, setOpenBrandsPicker] = useState(false);
  const [brands, setBrands] =
    useState<{ name: string; models: [{ name: string }] }[]>();
  const [brand, setBrand] = useState("");
  const [models, setModels] = useState<{ name: string; type: string }[]>();

  // fetch the models for a selected brand
  const fetchBrand = useCallback(async () => {
    if (brand.length < 1) return;
    else if (brand === "*") setOpenBrandsPicker(false);
    else {
      const { data } = await axios.post(fetchUrl, { name: brand });
      if (data.success) {
        setModels(data.data);
        setStep(1);
      }
    }
  }, [brand]);
  useEffect(() => {
    fetchBrand();
  }, [fetchBrand]);

  // fetch all the available brands
  const getBrands = async () => {
    const { data } = await axios.get(fetchUrl);
    if (data.success) {
      let p: any[] = [];
      data.data.map((brand: any) => {
        p.push({ name: brand, models: [] });
      });
      setBrands([{ name: "*", models: [] }, ...p]);
      setOpenBrandsPicker(true);
    }
  };

  return (
    <>
      <View
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
          onChangeText={(e) => setBrand(e)}
        />
        <BiyouButton clickHandler={getBrands} title="fetch brands" />
      </View>

      <BottomSheet isVisible={openBrandsPicker}>
        <ScrollView
          style={{
            height: Dimensions.get("window").height * 0.6,
            width: Dimensions.get("window").width,
          }}
        >
          {step === 0 &&
            brands &&
            brands?.map((brand, i) => (
              <ListItem
                key={i}
                onPress={() => {
                  setBrand(brand.name);
                  // setOpenBrandsPicker(false);
                }}
              >
                <ListItem.Content>
                  <ListItem.Title>{brand.name}</ListItem.Title>
                </ListItem.Content>
              </ListItem>
            ))}
          {step === 1 &&
            brand &&
            models &&
            models.length > 0 &&
            models.map((model, i) => (
              <ListItem key={i} onPress={() => console.log(model)}>
                <ListItem.Content>
                  <ListItem.Title>{model.name}</ListItem.Title>
                </ListItem.Content>
              </ListItem>
            ))}
        </ScrollView>
      </BottomSheet>
    </>
  );
};

export default BrandsModal;
