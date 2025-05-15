import { Modal } from '@mui/material';
import styles from "../styles/components/modals.module.css";
import { ModalType } from "../global.types";
import { nanoid } from 'nanoid';

type ErrorModalProps = {
    open: boolean;
    handleClose: () => void;
    type: ModalType;
    title: string;
    content: string|object;
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
                    {type==="error" && <p>{content as string}</p>}
                    {type==="submitted"&& <ol className={styles.output}>
                        {Object.entries(content).map(([key,val])=>{
                            return(
                                <li key={nanoid()}>{key}: {val}</li>
                            )
                        })}
                    </ol>}
                </div>
            </div>
        </Modal>
    );
}

export default InfoModal;