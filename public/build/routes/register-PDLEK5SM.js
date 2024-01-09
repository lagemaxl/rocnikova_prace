import {
  AuthenticationImage_module_default
} from "/build/_shared/chunk-FIELH5ZQ.js";
import {
  Box,
  Button,
  Center,
  Group,
  Paper,
  PasswordInput,
  Progress,
  Text,
  TextInput,
  Title
} from "/build/_shared/chunk-3GBQBW3O.js";
import {
  IconCheck,
  IconX
} from "/build/_shared/chunk-2RRWKGRL.js";
import {
  pocketbase_default
} from "/build/_shared/chunk-5BEURE6G.js";
import {
  Link,
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

// app/routes/register.tsx
var import_react = __toESM(require_react(), 1);
init_dist();
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\register.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\register.tsx"
  );
}
function links() {
  return [{
    rel: "stylesheet",
    href: AuthenticationImage_module_default
  }];
}
var requirements = [{
  re: /[0-9]/,
  label: "\u010C\xEDslo"
}, {
  re: /[a-z]/,
  label: "Mal\xE9 p\xEDsmenko"
}, {
  re: /[A-Z]/,
  label: "Velk\xE9 p\xEDsmenko"
}, {
  re: /[$&+,:;=?@#|'<>.^*()%!-]/,
  label: "Speci\xE1ln\xED znak"
}];
function getStrength(password) {
  let multiplier = password.length > 5 ? 0 : 1;
  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });
  return Math.max(100 - 100 / (requirements.length + 1) * multiplier, 0);
}
function checkPasswordRequirements(password) {
  return requirements.every((requirement) => requirement.re.test(password));
}
function PasswordRequirement({
  meets,
  label
}) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { component: "div", color: meets ? "teal" : "red", mt: 5, size: "sm", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Center, { inline: true, children: [
    meets ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IconCheck, { size: "0.9rem", stroke: 1.5 }, void 0, false, {
      fileName: "app/routes/register.tsx",
      lineNumber: 64,
      columnNumber: 18
    }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IconX, { size: "0.9rem", stroke: 1.5 }, void 0, false, {
      fileName: "app/routes/register.tsx",
      lineNumber: 64,
      columnNumber: 61
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { ml: 7, children: label }, void 0, false, {
      fileName: "app/routes/register.tsx",
      lineNumber: 66,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/register.tsx",
    lineNumber: 63,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/routes/register.tsx",
    lineNumber: 62,
    columnNumber: 10
  }, this);
}
_c = PasswordRequirement;
var AuthenticationImage = () => {
  _s();
  const [error, setError] = (0, import_react.useState)("");
  const [isTouched, setIsTouched] = (0, import_react.useState)({
    email: false,
    password: false,
    name: false,
    surname: false,
    username: false
  });
  const navigate = useNavigate();
  const initialFormData = {
    username: "",
    email: "",
    emailVisibility: true,
    password: "",
    passwordConfirm: "",
    name: "",
    surname: "",
    premium: false
  };
  const [formData, setFormData] = (0, import_react.useState)(initialFormData);
  const handleChange = (e) => {
    const {
      name,
      value
    } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleRegisterClick = async (e) => {
    e.preventDefault();
    setIsTouched({
      email: true,
      password: true,
      name: true,
      surname: true,
      username: true
    });
    if (!formData.email || !formData.password || !formData.name || !formData.surname || !formData.username) {
      setError("Pros\xEDm vypl\u0148te v\u0161echna pole");
      return;
    }
    if (!isValidEmail(formData.email)) {
      setError("Pros\xEDm zadejte platn\xFD email");
      return;
    }
    if (!checkPasswordRequirements(formData.password)) {
      setError("Heslo nespl\u0148uje po\u017Eadavky");
      return;
    }
    formData.passwordConfirm = formData.password;
    try {
      console.log("Registering user", formData);
      const record = await pocketbase_default.collection("users").create(formData);
      console.log("Registration successful");
      navigate("/login");
    } catch (error2) {
      console.error("Registration failed", error2);
    }
  };
  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };
  const emailClasses = `${AuthenticationImage_module_default.input} ${isTouched.email && (!formData.email || !isValidEmail(formData.email)) ? AuthenticationImage_module_default.error : ""}`;
  const passwordClasses = `${AuthenticationImage_module_default.input} ${isTouched.password && !formData.password ? AuthenticationImage_module_default.error2 : ""}`;
  const nameClasses = `${AuthenticationImage_module_default.input} ${isTouched.name && !formData.name ? AuthenticationImage_module_default.error : ""}`;
  const surnameClasses = `${AuthenticationImage_module_default.input} ${isTouched.surname && !formData.surname ? AuthenticationImage_module_default.error : ""}`;
  const usernameClasses = `${AuthenticationImage_module_default.input} ${isTouched.username && !formData.username ? AuthenticationImage_module_default.error : ""}`;
  const strength = getStrength(formData.password);
  const checks = requirements.map((requirement, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PasswordRequirement, { label: requirement.label, meets: requirement.re.test(formData.password) }, index, false, {
    fileName: "app/routes/register.tsx",
    lineNumber: 162,
    columnNumber: 59
  }, this));
  const bars = Array(4).fill(0).map((_, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Progress, { styles: {
    section: {
      transitionDuration: "0ms"
    }
  }, value: formData.password.length > 0 && index === 0 ? 100 : strength >= (index + 1) / 4 * 100 ? 100 : 0, color: strength > 80 ? "teal" : strength > 50 ? "yellow" : "red", size: 4 }, index, false, {
    fileName: "app/routes/register.tsx",
    lineNumber: 163,
    columnNumber: 51
  }, this));
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: AuthenticationImage_module_default.wrapper, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Paper, { className: AuthenticationImage_module_default.form, radius: 0, p: 30, children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Title, { order: 2, className: AuthenticationImage_module_default.title, ta: "center", mt: "md", mb: 50, children: "Zaregistrujte se" }, void 0, false, {
      fileName: "app/routes/register.tsx",
      lineNumber: 170,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextInput, { label: "Jm\xE9no:", placeholder: "Jm\xE9no", size: "md", mt: "md", name: "name", value: formData.name, onChange: handleChange, className: nameClasses }, void 0, false, {
      fileName: "app/routes/register.tsx",
      lineNumber: 174,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextInput, { label: "P\u0159ijmen\xED:", placeholder: "P\u0159ijmen\xED", size: "md", mt: "md", name: "surname", value: formData.surname, onChange: handleChange, className: surnameClasses }, void 0, false, {
      fileName: "app/routes/register.tsx",
      lineNumber: 177,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextInput, { label: "U\u017Eivatelsk\xE9 jm\xE9no:", placeholder: "U\u017Eivatelsk\xE9 jm\xE9no", size: "md", mt: "md", name: "username", value: formData.username, onChange: handleChange, className: usernameClasses }, void 0, false, {
      fileName: "app/routes/register.tsx",
      lineNumber: 180,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextInput, { label: "Email:", placeholder: "V\xE1\u0161 email", mt: "md", size: "md", name: "email", value: formData.email, onChange: handleChange, className: emailClasses }, void 0, false, {
      fileName: "app/routes/register.tsx",
      lineNumber: 183,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PasswordInput, { label: "Heslo:", placeholder: "Va\u0161e heslo", mt: "md", size: "md", name: "password", value: formData.password, onChange: handleChange, className: passwordClasses }, void 0, false, {
        fileName: "app/routes/register.tsx",
        lineNumber: 187,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { gap: 5, grow: true, mt: "xs", mb: "md", children: bars }, void 0, false, {
        fileName: "app/routes/register.tsx",
        lineNumber: 190,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PasswordRequirement, { label: "Minim\xE1ln\u011B 5 znak\u016F", meets: formData.password.length > 4 }, void 0, false, {
        fileName: "app/routes/register.tsx",
        lineNumber: 194,
        columnNumber: 11
      }, this),
      checks
    ] }, void 0, true, {
      fileName: "app/routes/register.tsx",
      lineNumber: 186,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { fullWidth: true, mt: "xl", size: "md", onClick: handleRegisterClick, children: "Zaregistrovat se" }, void 0, false, {
      fileName: "app/routes/register.tsx",
      lineNumber: 199,
      columnNumber: 9
    }, this),
    error && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { color: "red", mt: "md", children: error }, void 0, false, {
      fileName: "app/routes/register.tsx",
      lineNumber: 203,
      columnNumber: 19
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { ta: "center", mt: "md", children: [
      "Ji\u017E m\xE1te \xFA\u010Det? ",
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: "/login", children: "P\u0159ihl\xE1sit se" }, void 0, false, {
        fileName: "app/routes/register.tsx",
        lineNumber: 209,
        columnNumber: 26
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/register.tsx",
      lineNumber: 208,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/register.tsx",
    lineNumber: 169,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/routes/register.tsx",
    lineNumber: 168,
    columnNumber: 10
  }, this);
};
_s(AuthenticationImage, "c10GCfZ64dA/prQ6js6MOV0y8mY=", false, function() {
  return [useNavigate];
});
_c2 = AuthenticationImage;
var register_default = AuthenticationImage;
var _c;
var _c2;
$RefreshReg$(_c, "PasswordRequirement");
$RefreshReg$(_c2, "AuthenticationImage");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  register_default as default,
  links
};
//# sourceMappingURL=/build/routes/register-PDLEK5SM.js.map
