import { SVGProps } from "react";

export const LemonIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <ellipse
      cx="32"
      cy="34"
      rx="24"
      ry="20"
      fill="url(#lemonGradient)"
    />
    <path
      d="M32 14C32 14 28 6 22 8C16 10 18 16 22 18C26 20 32 14 32 14Z"
      fill="hsl(84 81% 35%)"
    />
    <path
      d="M24 34C24 28 28 24 32 24C36 24 40 28 40 34"
      stroke="hsl(48 100% 90%)"
      strokeWidth="2"
      strokeLinecap="round"
      opacity="0.6"
    />
    <ellipse
      cx="28"
      cy="30"
      rx="2"
      ry="3"
      fill="hsl(48 100% 95%)"
      opacity="0.5"
    />
    <defs>
      <linearGradient id="lemonGradient" x1="8" y1="14" x2="56" y2="54" gradientUnits="userSpaceOnUse">
        <stop stopColor="hsl(48 100% 67%)" />
        <stop offset="1" stopColor="hsl(84 81% 50%)" />
      </linearGradient>
    </defs>
  </svg>
);

export default LemonIcon;
