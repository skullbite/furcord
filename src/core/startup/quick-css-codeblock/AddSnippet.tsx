import { getViaDisplayName, getViaProps } from "@owo/webpack";

const { default: Clickable } = getViaDisplayName("Clickable");
const { default: Tooltip } = getViaDisplayName("Tooltip");
const { button } = getViaProps("button", "selected");

export default ({ message }) => <>
    <Tooltip text="Add Snippet">
        {({ onMouseEnter, onMouseLeave }) => (
            <Clickable
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onClick={() => {
                    console.log(message.content);
                    
                }}
            >
                <svg width="16" height="16" fill="currentColor" className={button} viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                </svg>
            </Clickable>
        )}
    </Tooltip>
</>;