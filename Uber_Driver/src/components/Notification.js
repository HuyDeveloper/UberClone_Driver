import React from 'react';
import { View, Text } from 'react-native';
import { Entypo } from '@expo/vector-icons';

const NotificationIcon = ({ notificationCount, focused }) => {
  return (
    <View>
     <Entypo name='bell' color={focused ? '#0066FF' : '#fff'} size={25} />
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