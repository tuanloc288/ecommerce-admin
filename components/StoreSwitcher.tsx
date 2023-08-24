'use client'

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Check, ChevronsUpDown, PlusCircle, Store as StoreIcon } from "lucide-react"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover"
import { useStoreModal } from "@/hooks/useStoreModal"
import { Store } from "@prisma/client"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"
import { 
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator
} from "@/components/ui/Command"

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface StoreSwitcherProps extends PopoverTriggerProps {
    items: Store[]
}

const StoreSwitcher = ({
    className,
    items = []
}: StoreSwitcherProps) => {
    const [open, setOpen] = useState(false)
    const storeModal = useStoreModal()
    const params = useParams()
    const router = useRouter()

    const formattedItems = items.map((item) => ({
        label: item.name,
        value: item.id   
    }))

    // return the first ele
    const currentStore = formattedItems.find((item) => item.value === params.storeId)


    const onStoreSelect = (store: { value: string, label: string }) => {
        setOpen(false)
        router.push(`/${store.value}`)
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    size='sm'
                    role="combobox"
                    aria-expanded={open}
                    aria-label="Choose a store"
                    className={cn(`
                        w-[200px]
                        justify-between
                    `, className)}
                >
                    <StoreIcon className="mr-2 h-4 w-4"/>
                    <span className="truncate"> {currentStore?.label} </span>
                    <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50"/>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandList>
                        <CommandInput placeholder="Search for a store..."/>
                        <CommandEmpty>
                            No store found
                        </CommandEmpty>
                        <CommandGroup heading="Stores">
                            {formattedItems.map((store) => (
                                <CommandItem
                                    key={store.value}
                                    onSelect={() => onStoreSelect(store)}
                                    className="text-sm cursor-pointer"
                                >   
                                    <StoreIcon className="mr-2 h-4 w-4"/>
                                    {store.label}
                                    <Check
                                        className={cn(`
                                            ml-auto
                                            h-4
                                            w-4
                                        `,
                                            currentStore?.value === store.value 
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                    <CommandSeparator/>
                    <CommandList>
                        <CommandGroup>
                            <CommandItem
                                onSelect={() => {
                                    setOpen(false)
                                    storeModal.onOpen()
                                }}
                                className="cursor-pointer"
                            >
                                <PlusCircle className="mr-2 h-5 w-5"/>
                                 Create a new store
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export default StoreSwitcher