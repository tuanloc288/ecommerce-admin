import { useEffect, useState } from "react"

export const useOrigin = () => {
    const [hasMounted, setHasMounted] = useState(false)
    const origin = typeof window !== 'undefined' && window.location.origin 
    ? window.location.origin : '' 

    useEffect(() => {
        setHasMounted(true)
    },[])

    if(!hasMounted) return ''

    return origin
}