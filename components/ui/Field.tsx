import {TextInput} from "react-native";
import {FC} from "react";
import {Colors} from "@/constants/Colors";

interface IField {
    placeholder: string;
    isSecure?: boolean;
    value: string;
    onChange: (text: string) => void;
}

export const Field: FC<IField> = ({placeholder,  isSecure, value,onChange}) => {
    return <TextInput style={{
        padding: 16,
        borderRadius: 12,
        backgroundColor: Colors.secondary
    }} placeholder={placeholder} secureTextEntry={isSecure} autoCapitalize='none' value={value} onChangeText={(text) => onChange(text)} />
}