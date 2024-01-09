import "/build/_shared/chunk-O2R3VXRG.js";
import {
  ActionIcon,
  Avatar,
  Group,
  Menu,
  Text,
  rem
} from "/build/_shared/chunk-3GBQBW3O.js";
import {
  IconBellRinging,
  IconDots,
  IconHistory,
  IconHome,
  IconLogout,
  IconSettings,
  IconUserCircle,
  IconUsersGroup
} from "/build/_shared/chunk-2RRWKGRL.js";
import {
  pocketbase_default
} from "/build/_shared/chunk-5BEURE6G.js";
import {
  Outlet,
  init_dist2 as init_dist,
  useNavigate
} from "/build/_shared/chunk-4FPL6IGH.js";
import "/build/_shared/chunk-GIAAE3CH.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XU7DNSPJ.js";
import {
  createHotContext
} from "/build/_shared/chunk-LWKL7RQX.js";
import "/build/_shared/chunk-UWV35TSL.js";
import {
  require_react
} from "/build/_shared/chunk-BOXFZXVX.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/routes/app.tsx
var import_react = __toESM(require_react(), 1);
init_dist();

// app/style/NavbarSimple.module.css
var NavbarSimple_module_default = { "container": "NavbarSimple-module__container__4TC3G", "navbar": "NavbarSimple-module__navbar__iB-Ha", "navbarMain": "NavbarSimple-module__navbarMain__GTm-T", "header": "NavbarSimple-module__header__Xj97U", "footer": "NavbarSimple-module__footer__LrYmN", "link": "NavbarSimple-module__link__hqowb", "linkIcon": "NavbarSimple-module__linkIcon__3lARl", "footerGroup": "NavbarSimple-module__footerGroup__mGmf5", "inner": "NavbarSimple-module__inner__psfYH", "links": "NavbarSimple-module__links__4nly6", "activeLink": "NavbarSimple-module__activeLink__9M0I7", "addeventbutton": "NavbarSimple-module__addeventbutton__SVmGv", "appcontainer": "NavbarSimple-module__appcontainer__pAy2L" };

// app/routes/app.tsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\app.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
var _s2 = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\app.tsx"
  );
}
var data = [{
  link: "/app/home",
  label: "Dom\u016F",
  icon: IconHome
}, {
  link: "/app/notifications",
  label: "Ozn\xE1men\xED",
  icon: IconBellRinging
}, {
  link: "/app/settings",
  label: "Nastaven\xED",
  icon: IconSettings
}, {
  link: "/app/groups",
  label: "Skupiny",
  icon: IconUsersGroup
}, {
  link: "/app/profile",
  label: "M\u016Fj profil",
  icon: IconUserCircle
}, {
  link: "/app/history",
  label: "Historie",
  icon: IconHistory
}];
function NavbarSimple() {
  _s();
  const [active, setActive] = (0, import_react.useState)("Dom\u016F");
  const navigate = useNavigate();
  const [dataUser, setDataUser] = (0, import_react.useState)(null);
  (0, import_react.useEffect)(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8090/api/collections/users/records/${pocketbase_default?.authStore?.model?.id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        setDataUser(jsonData);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };
    fetchData();
  }, [pocketbase_default.authStore.isValid]);
  const avatarURL = `http://127.0.0.1:8090/api/files/_pb_users_auth_/${dataUser?.id}/${dataUser?.avatar}`;
  (0, import_react.useEffect)(() => {
    if (!pocketbase_default.authStore.isValid) {
      navigate("/login");
    }
  }, [navigate, pocketbase_default.authStore.isValid]);
  const links = data.map((item) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { className: `${NavbarSimple_module_default.link} ${active === item.label ? NavbarSimple_module_default.activeLink : ""}`, onClick: (event) => {
    event.preventDefault();
    setActive(item.label);
    navigate(item.link);
  }, children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(item.icon, { className: NavbarSimple_module_default.linkIcon, stroke: 2 }, void 0, false, {
      fileName: "app/routes/app.tsx",
      lineNumber: 86,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: item.label }, void 0, false, {
      fileName: "app/routes/app.tsx",
      lineNumber: 87,
      columnNumber: 7
    }, this)
  ] }, item.label, true, {
    fileName: "app/routes/app.tsx",
    lineNumber: 80,
    columnNumber: 34
  }, this));
  return dataUser && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: NavbarSimple_module_default.container, children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("nav", { className: NavbarSimple_module_default.navbar, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: NavbarSimple_module_default.navbarMain, children: [
        links,
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: NavbarSimple_module_default.addeventbutton, onClick: () => {
          setActive("newevent");
          navigate("/app/new");
        }, children: "Vytvo\u0159it ud\xE1lost" }, void 0, false, {
          fileName: "app/routes/app.tsx",
          lineNumber: 93,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/app.tsx",
        lineNumber: 91,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: NavbarSimple_module_default.footer, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { gap: "sm", className: NavbarSimple_module_default.footerGroup, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Avatar, { size: 50, src: avatarURL, radius: 30 }, void 0, false, {
            fileName: "app/routes/app.tsx",
            lineNumber: 105,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { fontSize: "medium", fontWeight: 500, children: [
            dataUser.name,
            " ",
            dataUser.surname,
            " ",
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("br", {}, void 0, false, {
              fileName: "app/routes/app.tsx",
              lineNumber: 107,
              columnNumber: 54
            }, this),
            "@",
            dataUser.username
          ] }, void 0, true, {
            fileName: "app/routes/app.tsx",
            lineNumber: 106,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/app.tsx",
          lineNumber: 104,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(UserMenu, {}, void 0, false, {
          fileName: "app/routes/app.tsx",
          lineNumber: 110,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/app.tsx",
        lineNumber: 103,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/app.tsx",
        lineNumber: 102,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/app.tsx",
      lineNumber: 90,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: NavbarSimple_module_default.appcontainer, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Outlet, {}, void 0, false, {
      fileName: "app/routes/app.tsx",
      lineNumber: 115,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/routes/app.tsx",
      lineNumber: 114,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/app.tsx",
    lineNumber: 89,
    columnNumber: 22
  }, this);
}
_s(NavbarSimple, "s3QnUerQbmiPKbr3w9g4MU303Fk=", false, function() {
  return [useNavigate];
});
_c = NavbarSimple;
function UserMenu() {
  _s2();
  const navigate = useNavigate();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { justify: "center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Menu, { withArrow: true, width: 300, position: "bottom", transitionProps: {
    transition: "pop"
  }, withinPortal: true, children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Menu.Target, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ActionIcon, { variant: "default", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IconDots, { style: {
      width: rem(16),
      height: rem(16)
    }, stroke: 1.5 }, void 0, false, {
      fileName: "app/routes/app.tsx",
      lineNumber: 133,
      columnNumber: 13
    }, this) }, void 0, false, {
      fileName: "app/routes/app.tsx",
      lineNumber: 132,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/routes/app.tsx",
      lineNumber: 131,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Menu.Dropdown, { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Menu.Label, { children: "Nastaven\xED" }, void 0, false, {
        fileName: "app/routes/app.tsx",
        lineNumber: 141,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Menu.Item, { leftSection: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IconSettings, { style: {
        width: rem(16),
        height: rem(16)
      }, stroke: 1.5 }, void 0, false, {
        fileName: "app/routes/app.tsx",
        lineNumber: 142,
        columnNumber: 35
      }, this), children: "Nastaven\xED \xFA\u010Dtu" }, void 0, false, {
        fileName: "app/routes/app.tsx",
        lineNumber: 142,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Menu.Item, { leftSection: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IconLogout, { style: {
        width: rem(16),
        height: rem(16)
      }, stroke: 1.5 }, void 0, false, {
        fileName: "app/routes/app.tsx",
        lineNumber: 151,
        columnNumber: 35
      }, this), onClick: () => {
        navigate("/login");
        pocketbase_default.authStore.clear();
      }, children: "Odhl\xE1sit se" }, void 0, false, {
        fileName: "app/routes/app.tsx",
        lineNumber: 151,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/app.tsx",
      lineNumber: 140,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/app.tsx",
    lineNumber: 127,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/routes/app.tsx",
    lineNumber: 126,
    columnNumber: 10
  }, this);
}
_s2(UserMenu, "CzcTeTziyjMsSrAVmHuCCb6+Bfg=", false, function() {
  return [useNavigate];
});
_c2 = UserMenu;
var _c;
var _c2;
$RefreshReg$(_c, "NavbarSimple");
$RefreshReg$(_c2, "UserMenu");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  NavbarSimple as default
};
//# sourceMappingURL=/build/routes/app-5SL5XRIU.js.map
