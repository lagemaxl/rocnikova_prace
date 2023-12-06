import { useState, useEffect, SetStateAction } from "react";
import {
  IconBellRinging,
  IconSettings,
  IconSwitchHorizontal,
  IconLogout,
  IconHome,
} from "@tabler/icons-react";
import classes from "~/style/NavbarSimple.module.css";
import { Container, Group, Anchor } from "@mantine/core";
import pb from "../lib/pocketbase";
import { useNavigate } from 'react-router-dom';

const data = [
  { link: "", label: "Domů", icon: IconHome },
  { link: "", label: "Oznámení", icon: IconBellRinging },
  { link: "", label: "Nastavení", icon: IconSettings },
];

const links = [
  { link: "#", label: "Contact" },
  { link: "#", label: "Privacy" },
  { link: "#", label: "Blog" },
  { link: "#", label: "Careers" },
];

export function FooterSimple() {
  const items = links.map((link) => (
    <Anchor<"a">
      c="dimmed"
      key={link.label}
      href={link.link}
      onClick={(event) => event.preventDefault()}
      size="sm"
    >
      {link.label}
    </Anchor>
  ));

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <h1>název</h1>
        <Group className={classes.links}>{items}</Group>
      </Container>
    </div>
  );
}

import {
  TextInput,
  TextInputProps,
  ActionIcon,
  useMantineTheme,
  rem,
} from "@mantine/core";
import { IconSearch, IconArrowRight } from "@tabler/icons-react";

export function InputWithButton(props: TextInputProps) {
  const theme = useMantineTheme();

  return (
    <div className={classes.hled}>
      <TextInput
        radius="xl"
        size="md"
        placeholder="Vyhledej událost"
        rightSectionWidth={42}
        leftSection={
          <IconSearch
            style={{ width: rem(18), height: rem(18) }}
            stroke={1.5}
          />
        }
        rightSection={
          <ActionIcon
            size={32}
            radius="xl"
            color={theme.primaryColor}
            variant="filled"
          >
            <IconArrowRight
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
        }
        {...props}
      />
    </div>
  );
}


export default function NavbarSimple() {
  const [active, setActive] = useState("Billing");
  const navigate = useNavigate();
  /*
  const [token, setToken] = useState<string>("");

useEffect(() => {
  const storedToken = localStorage.getItem('token');
  if (storedToken) {
    setToken(storedToken);
  }
}, []);

*/

useEffect(() => {
  if (pb.authStore.isValid === true) {
    navigate('/login');
  }
}, [navigate]);

  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <>
      <InputWithButton />

      <nav className={classes.navbar}>
        <div className={classes.navbarMain}>
          <Group className={classes.header} justify="space-between">
            <h1>název</h1>
          </Group>
          {links}
        </div>

        <div className={classes.footer}>
          <a
            href="/login"
            className={classes.link}
            onClick={(event) => event.preventDefault()}
          >
            <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
            <span>Změna účtu</span>
          </a>

          <a
            href="/"
            className={classes.link}
            onClick={(event) => event.preventDefault()}
          >
            <IconLogout className={classes.linkIcon} stroke={1.5} />
            <span>Odhlásit se</span>
          </a>
        </div>
      </nav>
      {/*<FooterSimple />*/}
    </>
  );
}
