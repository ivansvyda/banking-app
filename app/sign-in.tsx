import { ActivityIndicator, Text, View } from "react-native";
import { Field } from "@/components/ui/Field";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Link } from "expo-router";
import { useAuth } from "@/hooks/useAuth";
import { is } from "@babel/types";

const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isLoading } = useAuth();

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
          Login
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <Field placeholder="Enter email" value={email} onChange={setEmail} />
          <Field
            placeholder="Enter password"
            isSecure
            value={password}
            onChange={setPassword}
          />
        </View>
        <Button
          style={{ marginTop: 20 }}
          onPress={() => login(email, password)}
          disabled={isLoading}
        >
          {!isLoading ? (
            <Text style={{ color: "white", fontWeight: "600" }}>Submit</Text>
          ) : (
            <ActivityIndicator />
          )}
        </Button>
        <Text
          style={{
            marginTop: 20,
            textAlign: "center",
          }}
        >
          Don't have an account? <Link href="/sign-up">Register</Link>
        </Text>
      </View>
    </View>
  );
};

export default SignInScreen;
