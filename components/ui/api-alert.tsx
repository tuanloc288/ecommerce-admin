'use client'

import { FC } from "react"
import { Copy, ServerIcon } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge, BadgeProps } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { toast } from "react-hot-toast"

interface ApiAlertProps {
    title: string
    description: string
    variant: 'public' | 'admin'
}

const textMap: Record<ApiAlertProps['variant'], string> = {
    public: "Public",
    admin: "Admin"
}

const variantMap: Record<ApiAlertProps['variant'], BadgeProps['variant']> = {
    public: "secondary",
    admin: "destructive"
}

const ApiAlert: FC<ApiAlertProps> = ({
    title,
    description,
    variant = 'public'
}) => {

    const onCopy = () => {
        navigator.clipboard.writeText(description)
        toast.success('API Route has been copied to clipboard')
    }

    return (
        <Alert>
            <ServerIcon className="w-4 h-4" />
            <AlertTitle className="flex items-center gap-x-2">
                {title}
                <Badge variant={variantMap[variant]}>
                    {textMap[variant]}
                </Badge>
            </AlertTitle>
            <AlertDescription className="mt-4 flex items-center justify-between">
                <code className="relative rounded bg-muted px-[5px] py-[3px] font-mono text-sm font-semibold">
                    {description}
                </code>
                <Button
                    variant='outline'
                    size='icon'
                    onClick={onCopy}
                >
                    <Copy className="w-4 h-4" />
                </Button>
            </AlertDescription>
        </Alert>
    )
}

export default ApiAlert