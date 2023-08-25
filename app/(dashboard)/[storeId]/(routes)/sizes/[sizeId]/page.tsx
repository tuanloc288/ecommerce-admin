import prismadb from "@/lib/prismadb"
import SizeForm from "./components/SizeForm"

const SizePage = async ({
  params
}: {
  params: { sizeId: string }
}) => {

  // if found => existing size => edit size form
  // if not found => new size => create new size form
  const size = await prismadb.size.findUnique({
    where: {
      id: params.sizeId
    }
  })
 
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeForm
          initialData={size}
        />
      </div>
    </div>
  )
}

export default SizePage