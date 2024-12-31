import { Pressable } from 'react-native';
import colors from '@/constants/colors';
import Svg, { Path } from "react-native-svg"

export default function RepeatButton( props ) {
    const { isActive, onPress } = props;
    const color = isActive ? colors.primary : '#6D6D6D';


    return (
        <Pressable
            onPress={onPress}
        >
            <Svg
                width={28}
                height={28}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <Path
                    d="M15.78 2.47a.75.75 0 00-1.06 1.06l.72.72h-4.602c-1.706 0-2.747 0-3.615.281a5.75 5.75 0 00-3.692 3.692c-.281.868-.281 1.909-.281 3.615v.324c0 1.706 0 2.747.281 3.615a.75.75 0 101.427-.464C4.759 14.702 4.75 13.92 4.75 12c0-1.92.01-2.702.208-3.313a4.25 4.25 0 012.729-2.729C8.298 5.759 9.08 5.75 11 5.75h4.178l-.658.549a.75.75 0 10.96 1.152l1.409-1.174a1.747 1.747 0 00.117-2.582L15.78 2.47zM20.469 8.223a.75.75 0 10-1.427.464c.199.611.208 1.393.208 3.313 0 1.92-.01 2.702-.208 3.313a4.25 4.25 0 01-2.729 2.729c-.611.199-1.393.208-3.313.208h-2c-.967 0-1.646-.002-2.16-.03l.69-.69a.75.75 0 10-1.06-1.06l-1.226 1.225a1.749 1.749 0 00.117 2.582l1.409 1.174a.75.75 0 00.96-1.152l-.681-.568c.51.02 1.097.02 1.795.019h2.318c1.706 0 2.747 0 3.615-.281a5.75 5.75 0 003.692-3.692c.281-.868.281-1.909.281-3.615v-.324c0-1.706 0-2.747-.281-3.615z"
                    fill={color}
                />
            </Svg>
        </Pressable>
        
    )
}