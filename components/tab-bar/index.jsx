import { View, Pressable } from 'react-native';
import style from './style';
import { icons } from './constants';
import colors from '@/constants/colors';
import { useContext } from 'react';
import { StoreContext } from '@/services/store';

export default function TabBar( props ) {
    const { state, navigation } = props;
     const { setSearch } = useContext(StoreContext);
    const { routeNames } = state;

    const onTabChange = ( routeName ) => {
        setSearch({
            query: '',
            isFocused: false,
        });
        navigation.navigate(routeName);
    };

    return (
        <View style={style.wrapper}>
            {routeNames.map( ( routeName, index ) => {
                const isFocused = state.index === index;
                const icon = icons[routeName];

                return (
                    <Pressable 
                        key={routeName} 
                        onPress={() => onTabChange(routeName)}
                        android_ripple={{ color: colors.primaryAlpha10 }}
                        style={style.navButton}
                    >
                        <View style={isFocused && style.indicator}/>
                        <View style={style.navItem}>
                            {isFocused ? <icon.active/> : <icon.inactive/>}
                        </View>
                    </Pressable>
                )
            })}
        </View>
    )
}