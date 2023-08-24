'use client'

import { FC, useState } from "react"
import { Trash } from "lucide-react"
import * as z from 'zod'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "react-hot-toast"
import { useParams, useRouter } from "next/navigation"
import axios from "axios"

import { Store } from "@prisma/client"
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
import ApiAlert from "@/components/ui/ApiAlert"
import { useOrigin } from "@/hooks/useOrigin"

interface SettingsFormProps {
    initialData: Store
}

const formSchema = z.object({
    name: z.string().min(3, { message: "Store name have to be at least 3 characters" })
})

type SettingsFormValue = z.infer<typeof formSchema>

const SettingsForm: FC<SettingsFormProps> = ({
    initialData
}) => {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const params = useParams()
    const router = useRouter()
    const origin = useOrigin()

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: initialData
    })

    const onSubmit = async (updatedName: SettingsFormValue) => {
        try {
            setLoading(true)

            await axios.patch(`/api/stores/${params.storeId}`, updatedName)
            router.refresh()
            toast.success('Updated successfully!')
        } catch(error) {
            toast.error("Something went wrong! Try again later.")
        } finally { 
            setLoading(false)
        }
    }

    const onDelete = async () => {
        try {
            setLoading(true)

            await axios.delete(`/api/stores/${params.storeId}`)
            router.refresh()
            router.push('/')
            toast.success('Delete store successfully')
        } catch(error) {
            toast.error('Make sure that you already delete all products and categories')
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
                    title='Settings'
                    description='Manage store preferences'
                />
                <Button
                    disabled={loading}
                    variant="destructive"
                    size="icon"
                    onClick={() => setOpen(true)}
                >
                    <Trash className="w-4 h-4"/>
                </Button>
            </div>
            <Separator/>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Store name
                                    </FormLabel>    
                                    <FormControl>
                                        <Input  
                                            disabled={loading}
                                            placeholder="Store name"
                                            {...field}
                                        />
                                    </FormControl> 
                                    <FormMessage/> 
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button disabled={loading} type="submit">
                        Save changes
                    </Button>
                </form>
            </Form>
            <Separator/>
            <ApiAlert title="NEXT_PUBLIC_API_URL" description={`${origin}/api/${params.storeId}`} variant="public"/>
        </>
    )
}

export default SettingsForm