import { Modal } from '@mui/material';
import styles from "../styles/components/modals.module.css";
import { ModalType } from "../global.types";

type ErrorModalProps = {
    open: boolean;
    handleClose: () => void;
    type: ModalType;
    title: string;
    content: string;
}

function InfoModal({ open, handleClose, type, title, content }: ErrorModalProps) {

    return (
        <Modal
            open={open}
            onClose={handleClose}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <div className={styles.container}>
                <h2
                    id="modal-title"
                    className={styles.title}
                    style={{ color: type==="error"? "red":"green" }}
                >
                    {title}
                </h2>
                <div className={styles.content}>
                    <p>{content}</p>
                </div>
            </div>
        </Modal>
    );
}

export default InfoModal;