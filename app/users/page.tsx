export default async function User() {
  const data = await fetch("http://localhost:3000/api/fetchusers", {
    cache: "no-cache",
  });
  const fetchdata = await data.json();
  console.log(fetchdata);
  return (
    <div className="bg-gray-400 w-30">
      {fetchdata.map((user: any, index: number) => (
        <div className="border-2 flex justify-center flex-col " key={index}>
          <div className="text-white">Username: {user.username}</div>
          <div className="text-white">{user.email}</div>
          <div className="text-white">Job Title: {user.fathername}</div>
          <div className="text-white">{user.jobtitle}</div>
          <div className="text-white">{user.country}</div>
        </div>
      ))}
    </div>
  );
}
