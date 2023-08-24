'use client'

import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

import Header from "@/components/ui/header"
import { Separator } from "@/components/ui/separator"



const BillboardClient = () => {
    const router = useRouter() 
    const params = useParams()

    return (
        <>
            <div className="flex items-center justify-between">
                <Header
                    title="Billboards (0)"
                    description="Manage all billboards of your store"
                />
                <Button onClick={() => router.push(`/${params.storeId}/billboards/new`)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add new billboard
                </Button>
            </div>
            <Separator />
        </>
    )
}

export default BillboardClient