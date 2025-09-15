import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#000', borderTopWidth: 0 },
        tabBarActiveTintColor: '#ff0000',
        tabBarInactiveTintColor: '#fff',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={24}
              color={color}
            />
          ),
        }}
      />
      {/* Add more Tabs.Screen for other tabs */}
    </Tabs>
  );
}