import { Text, View } from "react-native";
import { Field } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { Link } from "expo-router";
import { useState } from "react";

const SignUpScreen = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
      }}
    >
      <View
        style={{
          paddingHorizontal: 20,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 24,
          }}
        >
          Sign Up
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <Field
            placeholder="Enter fisrt name"
            value={firstName}
            onChange={setFirstName}
          />
          <Field
            placeholder="Enter last name"
            value={lastName}
            onChange={setLastName}
          />
          <Field placeholder="Enter email" value={email} onChange={setEmail} />
          <Field
            placeholder="Enter password"
            isSecure
            value={password}
            onChange={setPassword}
          />
          <Field
            placeholder="Enter password again"
            isSecure
            value={repeatPassword}
            onChange={setRepeatPassword}
          />
        </View>
        <Button style={{ marginTop: 20 }} onPress={() => {}}>
          <Text style={{ color: "white", fontWeight: "600" }}>Submit</Text>
        </Button>
        <Text
          style={{
            marginTop: 20,
            textAlign: "center",
          }}
        >
          Already have an account? <Link href="/">Login</Link>
        </Text>
      </View>
    </View>
  );
};

export default SignUpScreen;
