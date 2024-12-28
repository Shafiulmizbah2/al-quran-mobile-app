import { StatusBar } from 'expo-status-bar';
import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';

import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately

const RootApp = () => {
    return (
        <>
            <StatusBar style="auto" />
            <NavigationContainer>
                <App />
            </NavigationContainer>
        </>
    );
}

registerRootComponent(RootApp);
