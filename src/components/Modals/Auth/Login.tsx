import React from "react";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";
import { authModalState } from "../../../atoms/authModalAtom";

type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const [loginForm, setLoginForm] = React.useState({
    email: "",
    password: ""
  });
  const [formError, setFormError] = React.useState("");

  const onSubmit = ({target}: React.ChangeEvent<HTMLInputElement>) => {

  }

  const onChange = ({target: {name, value}}: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <form onSubmit={onSubmit}>
      <Input
        required
        name="email"
        placeholder="email"
        type="text"
        onChange={onChange}
        fontSize="14"
        h={12}
        mb={2}
        _placeholder={{color: "gray.500"}}
        _hover={{
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500"
        }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500"
        }}
        bg="gray.50"
      />
      <Input
        required
        name="password"
        placeholder="password"
        type="password"
        onChange={onChange}
        fontSize="14"
        h={12}
        mb={2}
        _placeholder={{color: "gray.500"}}
        _hover={{
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500"
        }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500"
        }}
        bg="gray.50"
      />
      <Button
        w="100%"
        mb={4}
        mt={4}
        type="submit"
      >Log In</Button>
      <Flex fontSize="9pt" justifyContent="center" mb={2}>
        <Text mr={1}>
          Forgot your password?
        </Text>
        <Text
          color="blue.500"
          cursor="pointer"
          fontWeight="700"
          onClick={() => setAuthModalState(prev => ({
            ...prev,
            view: "resetPassword"
          }))}
        >
          Reset
        </Text>
      </Flex>
      <Flex
        fontSize="9pt"
        justify="center"
      >
        <Text mr={1}>New here?</Text>
        <Text
          color="blue.500"
          cursor="pointer"
          fontWeight="700"
          onClick={() => setAuthModalState(prev => ({
            ...prev,
            view: "signup"
          }))}
        >SIGN UP</Text>
      </Flex>
    </form>
)
}
export default Login;