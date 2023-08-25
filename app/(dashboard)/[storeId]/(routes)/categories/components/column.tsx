"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./CellAction"

// All of this come from https://ui.shadcn.com/docs/components/data-table
export type CategoryColumn = {
    id: string
    name: string
    billboardLabel: string
    createdAt: string
}

export const columns: ColumnDef<CategoryColumn>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "billboard",
        header: "Billboard",
        cell: ({ row }) => row.original.billboardLabel
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
