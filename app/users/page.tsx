import { User, columns } from "./columns";
import { DataTable } from "@/components/UserData";

async function getUsers(): Promise<User[]> {
  const res = await fetch("http://localhost:3000/api/fetchusers", {
    cache: "no-cache",
  });
  const data = await res.json();
  console.log(data);
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
