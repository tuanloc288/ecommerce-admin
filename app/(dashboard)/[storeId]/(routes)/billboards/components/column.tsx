"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./CellAction"

// All of this come from https://ui.shadcn.com/docs/components/data-table
export type BillboardColumn = {
    id: string
    label: string
    createdAt: string
}

export const columns: ColumnDef<BillboardColumn>[] = [
    {
        accessorKey: "label",
        header: "Label",
    },
    {
        accessorKey: "createdAt",
        header: "Date",
    },
    {
        id: "actions",
        header: 'Actions',
        cell: ({ row }) => <CellAction data={row.original}/>,
    }
]
