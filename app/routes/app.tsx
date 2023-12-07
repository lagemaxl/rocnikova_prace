import { useState, useEffect, SetStateAction } from "react";
import {
  IconBellRinging,
  IconSettings,
  IconSwitchHorizontal,
  IconLogout,
  IconHome,
} from "@tabler/icons-react";
import classes from "~/style/NavbarSimple.module.css";
import { Group } from "@mantine/core";
import pb from "../lib/pocketbase";
import { useNavigate } from 'react-router-dom';

const data = [
  { link: "", label: "Domů", icon: IconHome },
  { link: "", label: "Oznámení", icon: IconBellRinging },
  { link: "", label: "Nastavení", icon: IconSettings },
];

export default function NavbarSimple() {
  const [active, setActive] = useState("Domů");
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
  if (pb.authStore.isValid === false) {
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
