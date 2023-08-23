'use client'

import { useState, useEffect } from "react"

import { StoreModal } from "@/components/modals/store-modal"

export const ModalProvider = () => {
    const [hasMounted, setHasMounted] = useState(false)

    useEffect(() => {
        setHasMounted(true) 
    },[])

    if(!hasMounted) return null

    return (
        <StoreModal/>
    )
}
