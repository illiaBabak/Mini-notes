import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export const unstable_settings = {
  initialRouteName: "index",
};

const RootLayout = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Welcome page" }} />
        <Stack.Screen name="notes/index" options={{ title: "Notes" }} />
      </Stack>
    </SafeAreaView>
  );
};

export default RootLayout;
