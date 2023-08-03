import React from 'react';
import { View, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const NotificationIcon = ({ notificationCount }) => {
  return (
    <View>
      <AntDesign name="bells" size={30} color="black" />
      {notificationCount > 0 && (
        <View
          style={{
            position: 'absolute',
            top: -8,
            right: -8,
            backgroundColor: 'red',
            width: 16,
            height: 16,
            borderRadius: 8,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: 'black', fontSize: 12 }}>{notificationCount}</Text>
        </View>
      )}
    </View>
  );
};

export default NotificationIcon;