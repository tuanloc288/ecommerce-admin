import prismadb from "@/lib/prismadb"
import CategoryForm from "./components/CategoryForm"

const CategoriesPage = async ({
  params
}: {
  params: { categoryId: string, storeId: string }
}) => {

  // if found => existing category => edit category form
  // if not found => new category => create new category form
  const category = await prismadb.category.findUnique({
    where: {
      id: params.categoryId,
    }
  })

  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId
    }
  })

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm
          initialData={category}
          billboards={billboards}
        />
      </div>
    </div>
  )
}

export default CategoriesPage