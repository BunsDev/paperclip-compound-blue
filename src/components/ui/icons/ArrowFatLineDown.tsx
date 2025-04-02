import { cn } from "@/utils/shadcn";
import { HTMLAttributes } from "react";

export default function ArrowFatLineDown({ className, ...props }: HTMLAttributes<SVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="#000000"
      viewBox="0 0 256 256"
      className={cn(className)}
      {...props}
    >
      <path d="M72,40a8,8,0,0,1,8-8h96a8,8,0,0,1,0,16H80A8,8,0,0,1,72,40Zm159.39,92.94A8,8,0,0,0,224,128H184V72a8,8,0,0,0-8-8H80a8,8,0,0,0-8,8v56H32a8,8,0,0,0-5.66,13.66l96,96a8,8,0,0,0,11.32,0l96-96A8,8,0,0,0,231.39,132.94Z" />
    </svg>
  );
}
