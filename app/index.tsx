import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <Text>test</Text>
      </View>
    </SafeAreaView>
  );
};

export default App;
