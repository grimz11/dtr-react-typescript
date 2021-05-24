import { capitalize } from "lodash";

// ----------------------------------------------------------------------

function getFirstCharacter(name: string) {
  const stringName = name?.replace(/([a-z]+) .* ([a-z]+)/i, "$1 $2");
  const matches = stringName?.match(/\b(\w)/g);
  const acronym = matches?.join("");

  return capitalize(acronym && acronym).toLocaleUpperCase();
}

function getAvatarColor(name: string) {
  if (
    ["A", "N", "H", "L", "Q", "9", "8"].includes(
      getFirstCharacter(name.charAt(0)),
    )
  )
    return "#ff4d4f";
  if (
    ["F", "G", "T", "I", "J", "1", "2", "3"].includes(
      getFirstCharacter(name.charAt(0)),
    )
  )
    return "#ff9100";
  if (
    ["K", "D", "Y", "B", "O", "4", "5"].includes(
      getFirstCharacter(name.charAt(0)),
    )
  )
    return "#1890ff";
  if (
    ["P", "E", "R", "S", "C", "U", "6", "7"].includes(
      getFirstCharacter(name.charAt(0)),
    )
  )
    return "#7265e6";
  if (["V", "W", "X", "M", "Z"].includes(getFirstCharacter(name.charAt(0))))
    return "#ff4d4f";
  return;
}
export default function createAvatar(name: string) {
  return {
    name: getFirstCharacter(name),
    color: getAvatarColor(name),
  };
}
