import { getViaDisplayName, getViaProps } from "@owo/webpack";
import { StyleHTMLAttributes } from "react";

const { iconWrapper, clickable } = getViaProps("icon", "clickable", "iconWrapper");
const { default: Tooltip } = getViaDisplayName("Tooltip");
export default ({ component, onClick, tooltip, style={} }: {
        component: JSX.Element,
        onClick: () => void,
        tooltip: string,
        style?
    }) => <Tooltip text={tooltip}>
    {({ onMouseEnter, onMouseLeave }) => (
        <div 
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={onClick}
            style={style}
            className={[iconWrapper, clickable].join(" ")}
        >
            { component }
        </div>
    )}
</Tooltip>;