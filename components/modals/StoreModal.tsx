'use client'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

import { useStoreModal } from "@/hooks/useStoreModal"
import { Modal } from "@/components/ui/Modal"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/Form"
import { Input } from '@/components/ui/Input'
import { Button } from "@/components/ui/Button"

const formSchema = z.object({
    name: z.string().min(3, { message: "Store name have to be at least 3 characters" }),
})

export const StoreModal = () => {
    const { isOpen, onClose } = useStoreModal()
    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: ""
        }
    })

    const onSubmit = async (value: z.infer<typeof formSchema>) => {
        // create a new store here
        try {
            setLoading(true)

            const res = await axios.post('/api/stores', value)

            // use this bc it gonna do a full reset
            window.location.assign(`/${res.data.id}`)
        } catch (error) {
            toast.error("Something went wrong! Try again later.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Modal
            title="Create a store"
            description="Create a new store to manage products, categories and others"
            isOpen={isOpen}
            onClose={onClose}
        >
            <div>
                <div className='space-y-4 py-2 pb-4'>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name='name'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Name
                                        </FormLabel>
                                        <FormControl>
                                            <Input disabled={loading} placeholder='Ecommerce store name...' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className='pt-6 space-x-2 flex items-center justify-end w-full'>
                                <Button disabled={loading} variant="outline" onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button disabled={loading} type='submit'>
                                    Create
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </Modal>
    )
}