import React, { SVGProps } from "react";

interface TransferProps extends SVGProps<SVGSVGElement> {}

export default function Transfer(props: TransferProps) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            height="1em"
            width="1em"
            {...props}
        >
            <path d="M15 12l5-4-5-4v2.999H2v2h13zm7 3H9v-3l-5 4 5 4v-3h13z" />
        </svg>
    );
}
