export default async function User() {
  const data = await fetch("http://localhost:3000/api/fetchusers", {
    cache: "no-cache",
  });
  const fetchdata = await data.json();
  console.log(fetchdata);
  return (
    <div className="bg-black w-30">
      {fetchdata.map((user: any, index: number) => (
        <>
          <div className="text-white text-center" key={index}>
            {user.username}
          </div>
          <div className="text-white text-center" key={index}>
            {user.email}
          </div>
          <div className="text-white text-center" key={index}>
            {user.fathername}
          </div>
          <div className="text-white text-center" key={index}>
            {user.address}
          </div>
          <div className="text-white text-center" key={index}>
            {user.country}
          </div>
        </>
      ))}
    </div>
  );
}
