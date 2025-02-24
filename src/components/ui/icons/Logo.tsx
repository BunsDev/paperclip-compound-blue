import { cn } from "@/utils/shadcn";
import { HTMLAttributes } from "react";

export default function Logo({ className, ...props }: HTMLAttributes<SVGElement>) {
  return (
    <svg
      width="27"
      height="29"
      viewBox="0 0 27 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("fill-accent-secondary", className)}
      {...props}
    >
      <g clipPath="url(#clip0_596_4847)">
        <g mask="url(#mask0_596_4847)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.08359 22.0428C3.41122 21.6315 3 20.8992 3 20.1127V15.7213C3 15.5532 3.04502 15.3912 3.12907 15.2471C3.39021 14.7968 3.96953 14.6438 4.41977 14.9079L14.3312 20.686C14.9105 21.0252 15.2677 21.6436 15.2677 22.3159V26.8664C15.2677 27.0735 15.2106 27.2806 15.1026 27.4577C14.7754 27.992 14.079 28.1601 13.5447 27.8329L4.08359 22.0428ZM18.8576 13.7042C19.4369 14.0434 19.7941 14.6618 19.7941 15.3341V24.5671C19.7941 24.8403 19.647 25.0924 19.4099 25.2245L17.2397 26.4462C17.2127 26.4612 17.1827 26.4732 17.1527 26.4822V21.3554C17.1527 20.692 16.8045 20.0767 16.2342 19.7345L7.52946 14.5267V8.73955C7.52946 8.57145 7.57449 8.40937 7.65853 8.26529C7.91967 7.81504 8.49899 7.66196 8.94923 7.9261L18.8576 13.7042ZM23.195 6.88454C23.7773 7.22072 24.1345 7.84506 24.1345 8.51743V22.0038C24.1345 22.2799 23.9814 22.535 23.7383 22.6671L21.6821 23.7777V14.3886C21.6821 13.7253 21.334 13.1129 20.7667 12.7707L11.8698 7.43384V1.94385C11.8698 1.77576 11.9148 1.61367 11.9959 1.4696C12.257 1.01935 12.8363 0.866269 13.2866 1.12741L23.195 6.88454Z"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_596_4847">
          <rect width="27" height="29" />
        </clipPath>
      </defs>
    </svg>
  );
}
