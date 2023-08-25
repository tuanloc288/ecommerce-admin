"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./CellAction"

// All of this come from https://ui.shadcn.com/docs/components/data-table
export type ProductColumn = {
    id: string
    name: string
    price: string
    category: string
    size: string
    color: string
    isFeatured: boolean
    isOutOfStock: boolean
    createdAt: string
}

export const columns: ColumnDef<ProductColumn>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "isFeatured",
        header: "Featured",
    },
    {
        accessorKey: "isOutOfStock",
        header: "Out of stock",
    },
    {
        accessorKey: "price",
        header: "Price",
    },
    {
        accessorKey: "category",
        header: "Category",
    },
    {
        accessorKey: "size",
        header: "Size",
    },
    {
        accessorKey: "color",
        header: "Color",
        cell: ({ row }) => (
            <div className="flex items-center gap-x-2">
                {row.original.color}
                <div 
                    className="h-6 w-6 rounded-full border" 
                    style={{ backgroundColor: row.original.color }} 
                />
            </div>
        )
    },
    {
        accessorKey: "createdAt",
        header: "Date",
    },
    {
        id: "actions",
        header: 'Actions',
        cell: ({ row }) => <CellAction data={row.original} />,
    }
]
