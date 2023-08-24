'use client'

import { FC, useEffect, useState } from "react"
import { Modal } from "@/components/ui/Modal"
import { Button } from "@/components/ui/Button"

interface AlertModalProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    loading: boolean
}

const AlertModal: FC<AlertModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    loading
}) => {
    const [hasMounted, setHasMounted] = useState(false)

    useEffect(() => {
        setHasMounted(true)
    },[])

    if(!hasMounted) return null

    return (
        <Modal
            title="Confirmation to delete"
            description="This action cannot be undo! Think twice before you click 'Confirm'"
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button
                    disabled={loading}
                    variant='outline'
                    onClick={onClose}
                >
                    Cancel
                </Button>
                <Button
                    disabled={loading}
                    variant='destructive'
                    onClick={onConfirm}
                >
                    Confirm
                </Button>
            </div>
        </Modal>
    )
}

export default AlertModal