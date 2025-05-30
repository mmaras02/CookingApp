export type ModalProps = {
        visible: boolean;
        onClose: () => void;
        createList: (title: string) => void;
        isLoading?: boolean;
};
