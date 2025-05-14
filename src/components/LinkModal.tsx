import { Modal, IconButton, TextField} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import { useState } from 'react';
import styles from "../styles/components/modals.module.css";

type LinkModalProps= {
    open: boolean;
    handleClose: () => void;
    formId: string;
}

function LinkModal({ open, handleClose, formId }: LinkModalProps) {
    const [copied, setCopied] = useState(false);
    const formLink = `${window.location.origin}/forms/${formId}`;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(formLink);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

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
                >
                    Share Form Link
                </h2>
                <div className={styles.content}>
                    <TextField
                        fullWidth
                        value={formLink}
                        variant="outlined"
                        size="small"
                        InputProps={{
                            readOnly: true,
                            sx: {
                                fontSize: '1rem',
                                wordBreak: 'break-all'
                            }
                        }}
                    />
                    <IconButton
                        onClick={handleCopy}
                        color={copied ? 'success' : 'primary'}
                        sx={{
                            backgroundColor: copied ? 'rgba(76, 175, 80, 0.1)' : 'rgba(25, 118, 210, 0.1)',
                            '&:hover': {
                                backgroundColor: copied ? 'rgba(76, 175, 80, 0.2)' : 'rgba(25, 118, 210, 0.2)',
                            },
                            flexShrink: 0
                        }}
                    >
                        {copied ? <CheckIcon /> : <ContentCopyIcon />}
                    </IconButton>
                </div>
            </div>
        </Modal>
    );
}

export default LinkModal;