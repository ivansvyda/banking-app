import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
        <Tabs.Screen
            name="transactions"
            options={{
                title: 'Transactions',
                tabBarIcon: ({ color, focused }) => (
                    <TabBarIcon name={focused ? 'repeat' : 'repeat-outline'} color={color} />
                ),
            }}
        />
        <Tabs.Screen
            name="reports"
            options={{
                title: 'Reports',
                tabBarIcon: ({ color, focused }) => (
                    <TabBarIcon name={focused ? 'bar-chart' : 'bar-chart-outline'} color={color} />
                ),
            }}
        />
        <Tabs.Screen
            name="manage"
            options={{
                title: 'Manage',
                tabBarIcon: ({ color, focused }) => (
                    <TabBarIcon name={focused ? 'apps' : 'apps-outline'} color={color} />
                ),
            }}
        />
    </Tabs>
  );
}

export default TabLayout;