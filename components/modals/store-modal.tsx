'use client'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

import { useStoreModal } from "@/hooks/use-store-modal"
import { Modal } from "@/components/ui/modal"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from '@/components/ui/input'
import { Button } from "@/components/ui/button"

const formSchema = z.object({
    name: z.string().min(3, { message: "Tên cửa hàng phải có ít nhất 3 ký tự" }),
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
            toast.error("Đã có lỗi xảy ra! Hãy thử lại sau.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Modal
            title="Tạo một cửa hàng"
            description="Tạo một cửa hàng trực tuyến mới để quản lý sản phẩm và hóa đơn"
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
                                            Tên cửa hàng
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
                                    Trở về
                                </Button>
                                <Button disabled={loading} type='submit'>
                                    Tiếp tục
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </Modal>
    )
}