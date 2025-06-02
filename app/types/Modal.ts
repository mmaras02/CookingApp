export type ModalProps = {
        visible: boolean;
        onClose: () => void;
        createList: (title: string) => Promise<any>;
        isLoading?: boolean;
};
