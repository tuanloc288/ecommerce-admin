"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./CellAction"

// All of this come from https://ui.shadcn.com/docs/components/data-table
export type SizeColumn = {
    id: string
    name: string
    value: string
    createdAt: string
}

export const columns: ColumnDef<SizeColumn>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "value",
        header: "Value",
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
