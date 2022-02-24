/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";

import { RootStackParamList } from "../types";

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl("/")],
  config: {
    screens: {
      Root: {
        screens: {
          Home: {
            screens: {
              HomeScreen: "home",
            },
          },
          Auth: {
            screens: {
              Account: {
                screens: {
                  AccountScreen: "account",
                },
              },
              Login: {
                screens: {
                  LoginScreen: "login",
                },
              },
              Register: {
                screens: {
                  RegisterScreen: "register",
                },
              },
            },
          },
          Admin: {
            screens: {
              AdminScreen: "admin",
            },
          },
        },
      },
      Modal: "modal",
      NotFound: "*",
    },
  },
};

export default linking;
