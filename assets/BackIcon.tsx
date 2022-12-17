import {Path, Svg} from "react-native-svg";

export default function BackIcon() {
  return (
    <Svg width={40} height={40} fill={"#000"}>
      <Path
        stroke={"#000"}
        d="M20 33.333 6.667 20 20 6.667l1.958 1.958-10 10h21.375v2.75H11.958l10 10Z"
      />
    </Svg>
  );
}
