'use client'

import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { FC } from "react"

import { Button } from "@/components/ui/Button"
import { Header } from "@/components/ui/Header"
import { Separator } from "@/components/ui/Separator"
import { SizeColumn, columns } from "./column"
import { DataTable } from "@/components/ui/DataTable"
import ApiList from "@/components/ui/ApiList"

interface SizeClientProps {
    data: SizeColumn[]
}

const SizeClient: FC<SizeClientProps> = ({
    data
}) => {
    const router = useRouter() 
    const params = useParams()

    return (
        <>
            <div className="flex items-center justify-between">
                <Header
                    title={`Sizes (${data.length})`}
                    description="Manage all sizes of your store"
                />
                <Button onClick={() => router.push(`/${params.storeId}/sizes/new`)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add new size
                </Button>
            </div>
            <Separator />
            <DataTable columns={columns} data={data} searchKey="name"/>
            <Header title="API" description="API calls for size" />
            <Separator/>
            <ApiList
                entityName="sizes"
                entityIdName="sizeId"
            />
        </>
    )
}

export default SizeClient