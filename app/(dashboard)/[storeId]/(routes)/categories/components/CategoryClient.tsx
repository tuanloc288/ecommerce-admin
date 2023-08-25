'use client'

import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { FC } from "react"

import { Button } from "@/components/ui/Button"
import { Header } from "@/components/ui/Header"
import { Separator } from "@/components/ui/Separator"
import { CategoryColumn, columns } from "./column"
import { DataTable } from "@/components/ui/DataTable"
import ApiList from "@/components/ui/ApiList"

interface CategoryClientProps {
    data: CategoryColumn[]
}

const CategoryClient: FC<CategoryClientProps> = ({
    data
}) => {
    const router = useRouter() 
    const params = useParams()

    return (
        <>
            <div className="flex items-center justify-between">
                <Header
                    title={`Categories (${data.length})`}
                    description="Manage all categories of your store"
                />
                <Button onClick={() => router.push(`/${params.storeId}/categories/new`)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add new category
                </Button>
            </div>
            <Separator />
            <DataTable columns={columns} data={data} searchKey="name"/>
            <Header title="API" description="API calls for category" />
            <Separator/>
            <ApiList
                entityName="categories"
                entityIdName="categoryId"
            />
        </>
    )
}

export default CategoryClient