import { User, columns } from "../../components/columns";
import { DataTable } from "@/components/data-table";
async function getUsers(): Promise<User[]> {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/fetchusers`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data;
}

export default async function Page() {
  const data = await getUsers();

  return (
    <div className="ml-20">
      <h1 className="mb-6 text-3xl font-bold">All Users</h1>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
