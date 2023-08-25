'use client'

import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { FC } from "react"

import { Button } from "@/components/ui/Button"
import { Header } from "@/components/ui/Header"
import { Separator } from "@/components/ui/Separator"
import { ColorColumn, columns } from "./column"
import { DataTable } from "@/components/ui/DataTable"
import ApiList from "@/components/ui/ApiList"

interface ColorClientProps {
    data: ColorColumn[]
}

const ColorClient: FC<ColorClientProps> = ({
    data
}) => {
    const router = useRouter() 
    const params = useParams()

    return (
        <>
            <div className="flex items-center justify-between">
                <Header
                    title={`Colors (${data.length})`}
                    description="Manage all colors of your store"
                />
                <Button onClick={() => router.push(`/${params.storeId}/colors/new`)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add new color
                </Button>
            </div>
            <Separator />
            <DataTable columns={columns} data={data} searchKey="name"/>
            <Header title="API" description="API calls for color" />
            <Separator/>
            <ApiList
                entityName="colors"
                entityIdName="colorId"
            />
        </>
    )
}

export default ColorClient