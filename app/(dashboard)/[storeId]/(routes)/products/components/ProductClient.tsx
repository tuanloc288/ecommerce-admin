'use client'

import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { FC } from "react"

import { Button } from "@/components/ui/Button"
import { Header } from "@/components/ui/Header"
import { Separator } from "@/components/ui/Separator"
import { ProductColumn, columns } from "./column"
import { DataTable } from "@/components/ui/DataTable"
import ApiList from "@/components/ui/ApiList"

interface ProductClientProps {
    data: ProductColumn[]
}

const ProductClient: FC<ProductClientProps> = ({
    data
}) => {
    const router = useRouter() 
    const params = useParams()

    return (
        <>
            <div className="flex items-center justify-between">
                <Header
                    title={`Products (${data.length})`}
                    description="Manage all products of your store"
                />
                <Button onClick={() => router.push(`/${params.storeId}/products/new`)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add new product
                </Button>
            </div>
            <Separator />
            <DataTable columns={columns} data={data} searchKey="name"/>
            <Header title="API" description="API calls for product" />
            <Separator/>
            <ApiList
                entityName="products"
                entityIdName="productId"
            />
        </>
    )
}

export default ProductClient