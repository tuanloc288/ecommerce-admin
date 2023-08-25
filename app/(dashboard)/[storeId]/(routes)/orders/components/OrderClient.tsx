'use client'

import { FC } from "react"

import { Header } from "@/components/ui/Header"
import { Separator } from "@/components/ui/Separator"
import { OrderColumn, columns } from "./column"
import { DataTable } from "@/components/ui/DataTable"

interface OrderClientProps {
    data: OrderColumn[]
}

const OrderClient: FC<OrderClientProps> = ({
    data
}) => {
    return (
        <>
            <Header
                title={`Orders (${data.length})`}
                description="Manage all orders of your store"
            />
            <Separator />
            <DataTable columns={columns} data={data} searchKey="products" />
        </>
    )
}

export default OrderClient