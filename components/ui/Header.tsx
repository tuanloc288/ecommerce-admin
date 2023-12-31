import { FC } from "react"

interface HeaderProps {
    title: string
    description: string
}


export const Header: FC<HeaderProps> = ({
    title,
    description
}) => {
    return (
        <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">
                {title}
            </h2>
            <p className="text-sm text-muted-foreground">
                {description}
            </p>
        </div>
    )
}