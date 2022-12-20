import React from 'react';
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";
import { authModalState } from "../../../atoms/authModalAtom";

type SignUpProps = {

};

const SignUp:React.FC<SignUpProps> = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const [signUpForm, setSignUpForm] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formError, setFormError] = React.useState("");

  const onSubmit = ({target}: React.ChangeEvent<HTMLInputElement>) => {

  }

  const onChange = ({target: { name, value }}: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpForm((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <form onSubmit={onSubmit}>
      <Input
        required
        name="name"
        placeholder="name"
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
      <Input
        required
        name="confirmPassword"
        placeholder="confirm password"
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
      >Sign Up</Button>
      <Flex
        fontSize="9pt"
        justify="center"
      >
        <Text mr={1}>Have an account?</Text>
        <Text
          color="blue.500"
          cursor="pointer"
          fontWeight="700"
          onClick={() => setAuthModalState(prev => ({
            ...prev,
            view: "login"
          }))}
        >LOG IN</Text>
      </Flex>
    </form>
  )
}
export default SignUp;