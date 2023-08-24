'use client'

import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { FC } from "react"

import { Button } from "@/components/ui/Button"
import { Header } from "@/components/ui/Header"
import { Separator } from "@/components/ui/Separator"
import { BillboardColumn, columns } from "./column"
import { DataTable } from "@/components/ui/DataTable"
import ApiList from "@/components/ui/ApiList"

interface BillboardClientProps {
    data: BillboardColumn[]
}

const BillboardClient: FC<BillboardClientProps> = ({
    data
}) => {
    const router = useRouter() 
    const params = useParams()

    return (
        <>
            <div className="flex items-center justify-between">
                <Header
                    title={`Billboards (${data.length})`}
                    description="Manage all billboards of your store"
                />
                <Button onClick={() => router.push(`/${params.storeId}/billboards/new`)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add new billboard
                </Button>
            </div>
            <Separator />
            <DataTable columns={columns} data={data} searchKey="label"/>
            <Header title="API" description="API calls for billboard" />
            <Separator/>
            <ApiList
                entityName="billboards"
                entityIdName="billboardId"
            />
        </>
    )
}

export default BillboardClient