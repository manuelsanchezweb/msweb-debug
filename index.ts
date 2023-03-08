export let debugList: string[] = [];

type IconsProps = {
  bug: string;
  error: string;
  info: string;
  warning: string;
  test: string;
  ok: string;
};

const icons: IconsProps = {
  bug: "🐛",
  error: "🔴",
  info: "🔵",
  warning: "🟡",
  test: "📄",
  ok: "🆗",
};

type DebugProps = {
  backgroundColor?: string;
  textColor?: string;
  border?: string;
  icon?: keyof typeof icons;
};

// Load debugList from localStorage on startup
const savedDebugList = localStorage.getItem("debugList");
if (savedDebugList) {
  debugList = JSON.parse(savedDebugList);
}

export const debug = (category: string, msg: string, props?: DebugProps) => {
  if (debugList.includes(category)) {
    const icon =
      props && props.icon && icons[props.icon] ? icons[props.icon] + " " : "";

    if (props) {
      const cssStyles = `
        background-color: ${props.backgroundColor || "transparent"};
        color: ${props.textColor || "white"};
        border: ${props.border || "none"};
      `;
      if (icon) {
        console.log(`%c${icon} ${category} ││ ${msg}`, `${cssStyles}`);
      } else {
        console.log(`%c${category} ││ ${msg}`, `${cssStyles}`);
      }
    } else {
      if (icon) {
        console.log(`${icon} ${category} ││ ${msg}`);
      } else {
        console.log(`${category} ││ ${msg}`);
      }
    }
  }
};

export const toggleDebug = (category: string, state: boolean = true) => {
  if (state == true) {
    debugList.push(category);
  } else {
    debugList = debugList.filter((element) => element !== category);
  }
  localStorage.setItem("debugList", JSON.stringify(debugList));
};
