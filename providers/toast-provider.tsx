'use client'

import { useEffect, useState } from "react"
import { Toaster } from "react-hot-toast"


export const ToasterProvider = () => {
    const [hasMounted, setHasMounted] = useState(false)

    useEffect(() => {
        setHasMounted(true) 
    },[])

    if(!hasMounted) return null

    return <Toaster/>
}