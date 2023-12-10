import executeQuery from "../api/users/bd";


export default async function Home() {
  const result = await executeQuery("select * from users",[]);
  return (
  <div>
    home
    <div>
      {JSON.stringify(result)}
    </div>
  </div>
  );
}
