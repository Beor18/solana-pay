import {
    Modal,
    ModalOverlay,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    ModalContent,
    ModalHeader,
    Text,
} from '@chakra-ui/react';
import { ButtonGeneric } from '../../atoms/Button';

export const ModalCustom = ({ open, close, children }) => {
    return (
        <Modal blockScrollOnMount={false} isOpen={open} onClose={close}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Test Modal</ModalHeader>
                <ModalBody>{children}</ModalBody>
                <ModalFooter>
                    <ButtonGeneric text='Close' onClick={close} />
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
