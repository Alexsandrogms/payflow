import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { RectButton } from 'react-native-gesture-handler';
import { Ionicons, Octicons } from '@expo/vector-icons';
import { Dimensions, Keyboard, StyleSheet } from 'react-native';

import { Home } from '../screens/Home';
import { CreateTicket } from '../screens/CreateTicket';
import { Extracts } from '../screens/Extracts';

import { theme } from '../global/styles/theme';

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {
  const [isOpenKeyboard, setIsOpenKeyboard] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setIsOpenKeyboard(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setIsOpenKeyboard(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <Navigator
      tabBarOptions={{
        showLabel: false,
        keyboardHidesTabBar: true,
        style: [
          styles.tabBar,
          { bottom: isOpenKeyboard ? -20 : getBottomSpace() + 24 },
        ],
      }}
    >
      <Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="home-outline"
              size={26}
              color={focused ? theme.colors.primary : theme.colors.body}
            />
          ),
        }}
      />
      <Screen
        name="CreateTicket"
        component={CreateTicket}
        options={{
          tabBarIcon: ({ focused }) => (
            <RectButton
              style={[
                styles.buttonPlus,
                {
                  backgroundColor: focused ? theme.colors.primary : '#FFC380',
                },
              ]}
            >
              <Octicons
                name="diff-added"
                size={24}
                color={theme.colors.background}
              />
            </RectButton>
          ),
        }}
      />
      <Screen
        name="Extracts"
        component={Extracts}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="document-text-outline"
              size={26}
              color={focused ? theme.colors.primary : theme.colors.body}
            />
          ),
        }}
      />
    </Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: theme.colors.background,
    position: 'absolute',
    width: Dimensions.get('window').width - 100,
    left: 50,
    height: 64,
    borderRadius: 8,
    shadowColor: theme.colors.secondary,
    shadowOpacity: 0.06,
    shadowOffset: {
      width: 8,
      height: 8,
    },
    borderWidth: 1,
    borderColor: theme.colors.stroke,
  },
  buttonPlus: {
    width: 56,
    height: 56,
    borderRadius: 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    bottom: 16,
  },
});
