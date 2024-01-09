import {
  AuthenticationImage_module_default
} from "/build/_shared/chunk-FIELH5ZQ.js";
import {
  Button,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title
} from "/build/_shared/chunk-3GBQBW3O.js";
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

// app/routes/login.tsx
var import_react = __toESM(require_react(), 1);
init_dist();
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\login.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\login.tsx"
  );
}
function links() {
  return [{
    rel: "stylesheet",
    href: AuthenticationImage_module_default
  }];
}
var AuthenticationImage = () => {
  _s();
  const [email, setEmail] = (0, import_react.useState)("");
  const [password, setPassword] = (0, import_react.useState)("");
  const [error, setError] = (0, import_react.useState)("");
  const [isTouched, setIsTouched] = (0, import_react.useState)({
    email: false,
    password: false
  });
  const navigate = useNavigate();
  const isValidEmail = (email2) => {
    return /\S+@\S+\.\S+/.test(email2);
  };
  const handleLogin = async () => {
    setIsTouched({
      email: true,
      password: true
    });
    if (!email || !password) {
      setError("Pros\xEDm vypl\u0148te v\u0161echna pole");
      return;
    }
    if (!isValidEmail(email)) {
      setError("Pros\xEDm zadejte platn\xFD email");
      return;
    }
    try {
      const authData = await pocketbase_default.collection("users").authWithPassword(email, password);
      console.log("Authentication Successful", authData);
      console.log(authData.token);
      navigate("/app/home");
    } catch (err) {
      if (err instanceof Error) {
        setError("Nepoda\u0159ilo se p\u0159ihl\xE1sit, zkuste to pros\xEDm znovu");
      } else {
        setError("Nastala chyba, zkuste to pros\xEDm znovu pozd\u011Bji");
      }
    }
  };
  const emailClasses = `${AuthenticationImage_module_default.input} ${isTouched.email && (!email || !isValidEmail(email)) ? AuthenticationImage_module_default.error : ""}`;
  const passwordClasses = `${AuthenticationImage_module_default.input} ${isTouched.password && !password ? AuthenticationImage_module_default.error2 : ""}`;
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: AuthenticationImage_module_default.wrapper, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Paper, { className: AuthenticationImage_module_default.form, radius: 0, p: 30, children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Title, { order: 2, className: AuthenticationImage_module_default.title, ta: "center", mt: "md", mb: 50, children: "V\xEDtejte zp\u011Bt" }, void 0, false, {
      fileName: "app/routes/login.tsx",
      lineNumber: 76,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextInput, { label: "Email:", placeholder: "V\xE1\u0161 email", size: "md", value: email, onChange: (e) => setEmail(e.currentTarget.value), className: emailClasses }, void 0, false, {
      fileName: "app/routes/login.tsx",
      lineNumber: 80,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PasswordInput, { label: "Heslo:", placeholder: "Va\u0161e heslo", mt: "md", size: "md", value: password, onChange: (e) => setPassword(e.currentTarget.value), className: passwordClasses }, void 0, false, {
      fileName: "app/routes/login.tsx",
      lineNumber: 82,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { fullWidth: true, mt: "xl", size: "md", onClick: handleLogin, children: "P\u0159ihl\xE1sit se" }, void 0, false, {
      fileName: "app/routes/login.tsx",
      lineNumber: 84,
      columnNumber: 9
    }, this),
    error && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { color: "red", mt: "md", children: error }, void 0, false, {
      fileName: "app/routes/login.tsx",
      lineNumber: 88,
      columnNumber: 19
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { ta: "center", mt: "md", children: [
      "Nem\xE1te \xFA\u010Det? ",
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: "/register", children: "Registrovat se" }, void 0, false, {
        fileName: "app/routes/login.tsx",
        lineNumber: 91,
        columnNumber: 24
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/login.tsx",
      lineNumber: 90,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/login.tsx",
    lineNumber: 75,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/routes/login.tsx",
    lineNumber: 74,
    columnNumber: 10
  }, this);
};
_s(AuthenticationImage, "14T9mvYiCX40EU8HACBEhLs7804=", false, function() {
  return [useNavigate];
});
_c = AuthenticationImage;
var login_default = AuthenticationImage;
var _c;
$RefreshReg$(_c, "AuthenticationImage");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  login_default as default,
  links
};
//# sourceMappingURL=/build/routes/login-J5AISEPR.js.map
