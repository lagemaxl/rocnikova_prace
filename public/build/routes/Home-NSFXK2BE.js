import {
  IconCalendarEvent,
  IconMapPin
} from "/build/_shared/chunk-2RRWKGRL.js";
import {
  pocketbase_default
} from "/build/_shared/chunk-5BEURE6G.js";
import {
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

// app/routes/Home.tsx
var import_react = __toESM(require_react(), 1);

// app/style/BadgeCard.module.css
var BadgeCard_module_default = { "carde": "BadgeCard-module__carde__buOg-", "card": "BadgeCard-module__card__UAlFl", "imgcontainer": "BadgeCard-module__imgcontainer__Y3A3f", "image": "BadgeCard-module__image__7z1tM", "home": "BadgeCard-module__home__EwOV-", "icontext": "BadgeCard-module__icontext__nONYr", "info": "BadgeCard-module__info__3Nrbe", "buttonjoin": "BadgeCard-module__buttonjoin__S-Maq", "buttonabout": "BadgeCard-module__buttonabout__6jPDD", "buttonjoinNO": "BadgeCard-module__buttonjoinNO__vehDu", "buttons": "BadgeCard-module__buttons__vMIBz", "cardcontent": "BadgeCard-module__cardcontent__DRbdZ" };

// app/routes/Home.tsx
init_dist();
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\Home.tsx"' + id);
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
    "app\\routes\\Home.tsx"
  );
}
function formatDate(dateStr) {
  const date = new Date(dateStr);
  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  };
  return date.toLocaleString("cs-CZ", options).replace(",", "");
}
async function getEvents() {
  try {
    const res = await fetch(
      "http://127.0.0.1:8090/api/collections/events/records/",
      //`${process.env.DATABASE_URL_STRING}/api/collections/events/records/`,
      {
        cache: "no-store"
      }
    );
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
    const data = await res.json();
    return data?.items || [];
  } catch (error) {
    console.error("Failed to fetch events:", error);
    return [];
  }
}
function Home() {
  _s();
  const [events, setEvents] = (0, import_react.useState)([]);
  (0, import_react.useEffect)(() => {
    getEvents().then(setEvents);
  }, []);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: BadgeCard_module_default.home, children: events.map((event) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(EventCard, { event }, event.id, false, {
    fileName: "app/routes/Home.tsx",
    lineNumber: 68,
    columnNumber: 28
  }, this)) }, void 0, false, {
    fileName: "app/routes/Home.tsx",
    lineNumber: 67,
    columnNumber: 10
  }, this);
}
_s(Home, "j18ueuia/psAZ/XawE3UyqzOWsE=");
_c = Home;
function EventCard({
  event
}) {
  _s2();
  const imageUrl = `http://127.0.0.1:8090/api/files/${event.collectionId}/${event.id}/${event.image}`;
  const shortDescription = event.description.length > 100 ? `${event.description.substring(0, 97)}...` : event.description;
  const [dataUser, setDataUser] = (0, import_react.useState)(null);
  const [eventUsers, setEventUsers] = (0, import_react.useState)({
    users: []
  });
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
    if (pocketbase_default.authStore.isValid) {
      fetchData();
    }
  }, [pocketbase_default?.authStore?.isValid]);
  (0, import_react.useEffect)(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8090/api/collections/events/records/${event.id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        setEventUsers(jsonData);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };
    fetchData();
  }, []);
  const data = {
    users: [...eventUsers.users.filter((user) => user !== dataUser?.id)]
  };
  const isUserInEvent = eventUsers.users.includes(dataUser?.id ?? "");
  const handleJoinEvent = async (eventId) => {
    if (isUserInEvent) {
      data.users = eventUsers.users.filter((user) => user !== dataUser?.id);
    } else {
      data.users = [dataUser?.id ?? "", ...eventUsers.users];
    }
    await pocketbase_default.collection("events").update(eventId, data);
    try {
      const response = await fetch(`http://127.0.0.1:8090/api/collections/events/records/${eventId}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      setEventUsers(jsonData);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };
  const navigate = useNavigate();
  const handleAboutEvent = async (eventId) => {
    navigate(`/app/event?id=${eventId}`);
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: BadgeCard_module_default.card, children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: BadgeCard_module_default.cardcontent, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: BadgeCard_module_default.imgcontainer, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { src: imageUrl, alt: "Event Image", className: BadgeCard_module_default.image }, void 0, false, {
        fileName: "app/routes/Home.tsx",
        lineNumber: 151,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/routes/Home.tsx",
        lineNumber: 150,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: BadgeCard_module_default.info, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { children: event.title }, void 0, false, {
          fileName: "app/routes/Home.tsx",
          lineNumber: 154,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: shortDescription }, void 0, false, {
          fileName: "app/routes/Home.tsx",
          lineNumber: 155,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: BadgeCard_module_default.icontext, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IconMapPin, {}, void 0, false, {
            fileName: "app/routes/Home.tsx",
            lineNumber: 157,
            columnNumber: 13
          }, this),
          " ",
          event.place
        ] }, void 0, true, {
          fileName: "app/routes/Home.tsx",
          lineNumber: 156,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: BadgeCard_module_default.icontext, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IconCalendarEvent, {}, void 0, false, {
            fileName: "app/routes/Home.tsx",
            lineNumber: 160,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: [
            formatDate(event.from_date),
            " - ",
            formatDate(event.to_date)
          ] }, void 0, true, {
            fileName: "app/routes/Home.tsx",
            lineNumber: 161,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/Home.tsx",
          lineNumber: 159,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/Home.tsx",
        lineNumber: 153,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/Home.tsx",
      lineNumber: 149,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: BadgeCard_module_default.buttons, children: [
      isUserInEvent ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: BadgeCard_module_default.buttonjoinNO, onClick: () => handleJoinEvent(event.id), children: "U\u017E nem\xE1m z\xE1jem" }, void 0, false, {
        fileName: "app/routes/Home.tsx",
        lineNumber: 168,
        columnNumber: 26
      }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: BadgeCard_module_default.buttonjoin, onClick: () => handleJoinEvent(event.id), children: "M\xE1m z\xE1jem" }, void 0, false, {
        fileName: "app/routes/Home.tsx",
        lineNumber: 171,
        columnNumber: 23
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: BadgeCard_module_default.buttonabout, onClick: () => handleAboutEvent(event.id), children: "V\xEDce informac\xED" }, void 0, false, {
        fileName: "app/routes/Home.tsx",
        lineNumber: 176,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/Home.tsx",
      lineNumber: 167,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/Home.tsx",
    lineNumber: 148,
    columnNumber: 10
  }, this);
}
_s2(EventCard, "xpgmLmtyP2hEi33tbarnNgkTX5Q=", false, function() {
  return [useNavigate];
});
_c2 = EventCard;
var _c;
var _c2;
$RefreshReg$(_c, "Home");
$RefreshReg$(_c2, "EventCard");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  Home as default
};
//# sourceMappingURL=/build/routes/Home-NSFXK2BE.js.map
