import React from "react";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";
import { authModalState } from "../../../atoms/authModalAtom";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/clientApp";
import { FIREBASE_ERRORS } from "../../../firebase/errors";

type SignUpProps = {};

const SignUp: React.FC<SignUpProps> = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const [signUpForm, setSignUpForm] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formError, setFormError] = React.useState("");
  const [
    createUserWithEmailAndPassword,
    _,
    loading,
    authError,
  ] = useCreateUserWithEmailAndPassword(auth);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formError) setFormError("");

    if (!signUpForm.email.includes("@")) {
      return setFormError("Please enter a valid email");
    }

    if (signUpForm.password !== signUpForm.confirmPassword) {
      return setFormError("Passwords do not match");
    }

    createUserWithEmailAndPassword(signUpForm.email, signUpForm.password);
  }

  const onChange = ({target: {name, value}}: React.ChangeEvent<HTMLInputElement>) => {
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
        type="email"
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

      <Text textAlign="center" fontSize="10pt" color="red">
        {formError || FIREBASE_ERRORS[authError?.message as keyof typeof FIREBASE_ERRORS]}
      </Text>

      <Button w="100%" mb={4} mt={4} type="submit" isLoading={loading} >
        Sign Up
      </Button>

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