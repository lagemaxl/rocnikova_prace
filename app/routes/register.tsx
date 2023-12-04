import React, { useState } from "react";
import pb from "../lib/pocketbase"; 
import {
  Box,
  Progress,
  PasswordInput,
  Group,
  Text,
  Center,
} from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import { IconCheck, IconX } from "@tabler/icons-react";
import appStyles from "~/style/register.css";
import { useNavigate } from 'react-router-dom';
export function links() {
  return [{rel: "stylesheet", href: appStyles}];
}

function checkPasswordRequirements(password: string) {
  return requirements.every(requirement => requirement.re.test(password));
}


interface PasswordRequirementProps {
  meets: boolean;
  label: string;
}

function PasswordRequirement({ meets, label }: PasswordRequirementProps) {
  return (
    <Text component="div" color={meets ? "teal" : "red"} mt={5} size="sm">
      <Center inline>
        {meets ? (
          <IconCheck size="0.9rem" stroke={1.5} />
        ) : (
          <IconX size="0.9rem" stroke={1.5} />
        )}
        <Box ml={7}>{label}</Box>
      </Center>
    </Text>
  );
}

const requirements = [
  { re: /[0-9]/, label: "Číslo" },
  { re: /[a-z]/, label: "Malé písmenko" },
  { re: /[A-Z]/, label: "Velké písmenko" },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: "Speciální znak" },
];

function getStrength(password: string) {
  let multiplier = password.length > 5 ? 0 : 1;

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 0);
}

interface FormData {
  username: string;
  email: string;
  emailVisibility: boolean;
  password: string;
  passwordConfirm: string;
  name: string;
  surname: string;
  premium: boolean;
}

export default function Register() {

  const navigate = useNavigate();

  const initialFormData: FormData = {
    username: "",
    email: "",
    emailVisibility: true,
    password: "",
    passwordConfirm: "",
    name: "",
    surname: "",
    premium: false,
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRegisterClick = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (!checkPasswordRequirements(formData.password)) {
      console.error("Password does not meet requirements");
      return;
    }
    try {
      console.log("Registering user", formData);
      const record = await pb.collection("users").create(formData);

      console.log("Registration successful");
      navigate('/login'); 
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  //const [inputValue, setInputValue] = useInputState(formData.password);
  const strength = getStrength(formData.password);
  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      label={requirement.label}
      meets={requirement.re.test(formData.password)}
    />
  ));
  const bars = Array(4)
    .fill(0)
    .map((_, index) => (
      <Progress
        styles={{ section: { transitionDuration: "0ms" } }}
        value={
          formData.password.length > 0 && index === 0
            ? 100
            : strength >= ((index + 1) / 4) * 100
            ? 100
            : 0
        }
        color={strength > 80 ? "teal" : strength > 50 ? "yellow" : "red"}
        key={index}
        size={4}
      />
    ));

  return (
    <form>
      <div>
        <label htmlFor="name">Jméno:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="surname">Přijmení:</label>
        <input
          type="text"
          id="surname"
          name="surname"
          value={formData.surname}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="username">Uživatelské jméno:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div>
      <label htmlFor="password">Heslo:</label>
        <PasswordInput
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <Group gap={5} grow mt="xs" mb="md">
          {bars}
        </Group>

        <PasswordRequirement
          label="Minimálně 5 znaků"
          meets={formData.password.length > 4}
        />
        {checks}
      </div>

      <div>
      <label htmlFor="passwordConfirm">Potvrďte heslo:</label>
        <input
          type="password"
          id="passwordConfirm"
          name="passwordConfirm"
          value={formData.passwordConfirm}
          onChange={handleChange}
          required
        />
      </div>
      <button onClick={handleRegisterClick}>Register</button>
    </form>
  );
}
