import { getViaProps, essentials } from "./webpack";

const ModalVariables = getViaProps("ModalRoot");

export const ModalComponents = {
    Root: ModalVariables.ModalRoot,
    CloseButton: ModalVariables.ModalCloseButton,
    Content: ModalVariables.ModalContent,
    Footer: ModalVariables.ModalFooter,
    Header: ModalVariables.ModalHeader,
    ListContent: ModalVariables.ModalListContent,
    Sizes: ModalVariables.ModalSize
};

export function open(component: () => JSX.Element, size: "small" | "medium" | "large" | "dynamic" = "small") {
    const { openModal } = getViaProps("openModal", "openModalLazy"); 
    openModal(modalStuff => essentials.React.createElement(ModalVariables.ModalRoot, {
        ...modalStuff,
        className: "fc-modal"
    }, essentials.React.createElement(component, { 
        size
    })));
}

export function close() {
    const { useModalsStore } = getViaProps("useModalsStore");
    const { default: modals } = useModalsStore.getState();
    const modalOrder = modals.pop();
    if (modalOrder) modalOrder.onCloseRequest();
}