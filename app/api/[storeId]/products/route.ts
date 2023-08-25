import prismadb  from '@/lib/prismadb';
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
    { params }: { params: { storeId: string } }
) { 
    try {
        const { userId } = auth()
        const body = await req.json()

        const {
            name,
            price,
            categoryId,
            colorId,
            sizeId,
            images,
            isFeatured,
            isOutOfStock
        } = body

        if(!userId){
            return new NextResponse("Unauthenticated", { status: 401 })
        }

        if(!name) {
            return new NextResponse("Name is required", { status: 400 })
        }

        if(!price) {
            return new NextResponse("Price is required", { status: 400 })
        }

        if(!categoryId) {
            return new NextResponse("Category ID is required", { status: 400 })
        }

        if(!colorId) {
            return new NextResponse("Color ID is required", { status: 400 })
        }

        if(!sizeId) {
            return new NextResponse("Size ID is required", { status: 400 })
        }

        if(!images || !images.length) {
            return new NextResponse("At least 1 image is required", { status: 400 })
        }

        if(!params.storeId){
            return new NextResponse("Store id is required", { status: 400 })
        }

        // make sure the one call this API is the owner of the store
        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })

        if(!storeByUserId){
            return new NextResponse("Unauthorized", { status: 403 })
        }

        const product = await prismadb.product.create({
            data: {
                name,
                price,
                isFeatured,
                isOutOfStock,
                categoryId,
                colorId,
                sizeId,
                storeId: params.storeId,
                images: {
                    createMany: {
                        data: [
                            ...images.map((image: { url: string }) => image)
                        ]
                    }
                }
            }
        })

        return NextResponse.json(product)
    } catch(error) {
        console.log("[PRODUCTS_POST]", error);
        return new NextResponse('Internal error', { status: 500 })
    }
}

export async function GET(
    req: Request,
    { params }: { params: { storeId: string } }
) { 
    try {
        // act as a filter by route ../products get all product
        // ../products?(sizeId, colorId or any other of those 4 kinds)=[theIdItself || true if isFeatured is passed]
        const { searchParams } = new URL(req.url)
        const categoryId = searchParams.get("categoryId") || undefined
        const sizeId = searchParams.get("sizeId") || undefined
        const colorId = searchParams.get("colorId") || undefined
        const isFeatured = searchParams.get("isFeatured")

        if(!params.storeId){
            return new NextResponse("Store id is required", { status: 400 })
        }

        const products = await prismadb.product.findMany({
            where: {
                storeId: params.storeId,
                categoryId,
                colorId,
                sizeId,
                isFeatured: isFeatured ? true : undefined,
                isOutOfStock: false
            },
            include: {
                images: true,
                category: true,
                size: true,
                color: true,
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        return NextResponse.json(products)
    } catch(error) {
        console.log("[PRODUCTS_GET]", error);
        return new NextResponse('Internal error' + error, { status: 500 })
    }
}