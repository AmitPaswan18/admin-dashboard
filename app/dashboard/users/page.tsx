import { columns } from "../../components/columns";
import { DataTable } from "@/app/components/data-table";
import { getUsers } from "@/app/_lib/actions";

export default async function Page() {
  const data = await getUsers();

  return (
    <div className="ml-20">
      <h1 className="mb-6 text-3xl font-bold">All Users</h1>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
