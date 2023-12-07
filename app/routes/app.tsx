import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import classes from "~/style/NavbarSimple.module.css";
import pb from "../lib/pocketbase";
import Home from "./Home";
import {
  Menu,
  Group,
  Text,
  useMantineTheme,
  ActionIcon,
  rem,
  Avatar as MantineAvatar,
  Avatar,
} from "@mantine/core";
import {
  IconLogout,
  IconSettings,
  IconSwitchHorizontal,
  IconDots,
  IconBellRinging,
  IconHome,
} from "@tabler/icons-react";

interface LinkData {
  link: string;
  label: string;
  icon: typeof IconHome | typeof IconBellRinging | typeof IconSettings;
}

interface UserData {
  id?: string;
  avatar?: string;
  name?: string;
  surname?: string;
  username?: string;
}

const data: LinkData[] = [
  { link: "", label: "Domů", icon: IconHome },
  { link: "", label: "Oznámení", icon: IconBellRinging },
  { link: "", label: "Nastavení", icon: IconSettings },
];

export default function NavbarSimple() {
  const [active, setActive] = useState<string>("Domů");
  const navigate = useNavigate();
  const [dataUser, setDataUser] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8090/api/collections/users/records/${pb?.authStore?.model?.id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData: UserData = await response.json();
        setDataUser(jsonData);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };
    fetchData();
  }, [pb.authStore.isValid]);

  const avatarURL = `http://127.0.0.1:8090/api/files/_pb_users_auth_/${dataUser?.id}/${dataUser?.avatar}`;

  useEffect(() => {
    if (!pb.authStore.isValid) {
      navigate("/login");
    }
  }, [navigate, pb.authStore.isValid]);

  const links = data.map((item: LinkData) => (
    <a
      className={classes.link}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
      key={item.label}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    dataUser && (
      <div className={classes.container}>
        <nav className={classes.navbar}>
          <div className={classes.navbarMain}>
            <Group className={classes.header} justify="space-between">
              <h1>Název</h1>
            </Group>
            {links}
          </div>
          <div className={classes.footer}>
            <Group gap="sm" className={classes.footerGroup}>
              <Group>
              <MantineAvatar size={50} src={avatarURL} radius={30} />
              <Text fontSize="medium" fontWeight={500}>
                {dataUser.name} {dataUser.surname} <br />@{dataUser.username}
              </Text>
              </Group>
              <UserMenu />
            </Group>
          </div>
        </nav>

        {active === "Domů" && <Home />}
      </div>
    )
  );
}

interface UserMenuProps {
  dataUser: UserData;
  avatarURL: string;
}

export function UserMenu() {
  const navigate = useNavigate();
  return (
    <Group justify="center">
      <Menu
        withArrow
        width={300}
        position="bottom"
        transitionProps={{ transition: "pop" }}
        withinPortal
      >
        <Menu.Target>
          <ActionIcon variant="default">
            <IconDots
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>Nastavení</Menu.Label>
          <Menu.Item
            leftSection={
              <IconSettings
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
              />
            }
          >
            Nastavení účtu
          </Menu.Item>
          <Menu.Item
            leftSection={
              <IconLogout
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
              />
            }
            onClick={() => {
              navigate("/login");
              pb.authStore.clear();
            }}
          >
            Odhlásit se
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
}
