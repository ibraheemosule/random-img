import { SVGAttributes } from "react";

type TIconNames = "playPause" | "reload" | "stop";
type TIcons = Record<
  TIconNames,
  (arg: SVGAttributes<HTMLOrSVGElement>) => JSX.Element
>;

const icons: TIcons = {
  playPause: ({ fill = "#000", ...props }) => (
    <svg
      width="800px"
      height="800px"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M1 14H3L9 8L3 2H1V14Z" fill={fill} />
      <path d="M15 2H13V14H15V2Z" fill={fill} />
      <path d="M9 2H11V14H9V2Z" fill={fill} />
    </svg>
  ),
  reload: ({ fill = "#000", ...props }) => (
    <svg
      fill={fill}
      width="800px"
      height="800px"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M23,12A11,11,0,1,1,12,1a10.9,10.9,0,0,1,5.882,1.7l1.411-1.411A1,1,0,0,1,21,2V6a1,1,0,0,1-1,1H16a1,1,0,0,1-.707-1.707L16.42,4.166A8.9,8.9,0,0,0,12,3a9,9,0,1,0,9,9,1,1,0,0,1,2,0Z" />
    </svg>
  ),

  stop: ({ fill = "#000", ...props }) => (
    <svg
      width="800px"
      height="800px"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect x="1" y="1" width="14" height="14" fill={fill} />
    </svg>
  ),
};

export default function Icon(
  props: { name: TIconNames } & SVGAttributes<HTMLOrSVGElement>
) {
  return icons[props.name]?.(props) || null;
}
