'use client'

import { FC, useState } from "react"
import { Trash } from "lucide-react"
import * as z from 'zod'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "react-hot-toast"
import { useParams, useRouter } from "next/navigation"
import axios from "axios"

import { Billboard } from "@prisma/client"
import { Header } from "@/components/ui/Header"
import { Button } from "@/components/ui/Button"
import { Separator } from "@/components/ui/Separator"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/Form"
import { Input } from "@/components/ui/Input"
import AlertModal from "@/components/modals/AlertModal"
import ImageUpload from "@/components/ui/ImageUpload"

interface BillboardFormProps {
    initialData: Billboard | null
}

const formSchema = z.object({
    label: z.string().min(3),
    imageUrl: z.string().min(1)
})

type BillboardFormValue = z.infer<typeof formSchema>

const BillboardForm: FC<BillboardFormProps> = ({
    initialData
}) => {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const params = useParams()
    const router = useRouter()

    const title = initialData ? 'Edit billboard' : "Create billboard"
    const description = initialData ? 'Edit a billboard' : "Create a new billboard"
    const toastMessage = initialData ? 'Billboard updated successfully' : "Billboard created successfully"
    const action = initialData ? 'Save changes' : "Create"

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            label: '',
            imageUrl: ''
        }
    })

    const onSubmit = async (updatedName: BillboardFormValue) => {
        try {
            setLoading(true)
            // if existed => call api to update billboards for a specific store
            // if not existed => call api to create new billboard for a specific store 
            if(initialData){
                await axios.patch(`/api/${params.storeId}/billboards/${params.billboardId}`, updatedName)
            } else {
                await axios.post(`/api/${params.storeId}/billboards`, updatedName)
            }
            router.refresh()
            router.push(`/${params.storeId}/billboards`)
            toast.success(toastMessage)
        } catch (error) {
            toast.error("Something went wrong! Try again later.")
        } finally {
            setLoading(false)
        }
    }

    const onDelete = async () => {
        try {
            setLoading(true)

            await axios.delete(`/api/${params.storeId}/billboards/${params.billboardId}`)
            router.refresh()
            router.push(`/${params.storeId}/billboards`)
            toast.success('Billboard deleted successfully')
        } catch (error) {
            toast.error('Make sure that you already removed all categories using this billboard')
        } finally {
            setLoading(false)
            setOpen(false)
        }
    }

    return (
        <>
            <AlertModal
                loading={loading}
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
            />
            <div className="flex items-center justify-between">
                <Header
                    title={title}
                    description={description}
                />
                {
                    initialData && (
                        <Button
                            disabled={loading}
                            variant="destructive"
                            size="icon"
                            onClick={() => setOpen(true)}
                        >
                            <Trash className="w-4 h-4" />
                        </Button>
                    )
                }
            </div>
            <Separator />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                    <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Background image
                                </FormLabel>
                                <FormControl>
                                    <ImageUpload
                                        disabled={loading}
                                        onChange={(url) => field.onChange(url)}
                                        onRemove={() => field.onChange('')}
                                        values={field.value ? [field.value] : []}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="label"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Label
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder="Billboard label"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button disabled={loading} type="submit">
                        {action}
                    </Button>
                </form>
            </Form>
        </>
    )
}

export default BillboardForm