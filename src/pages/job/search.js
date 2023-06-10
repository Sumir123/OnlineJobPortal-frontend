import Sidebar from "@/component/SideBar";
import Card from "@/component/Card";

function Search() {
  return (
    <>
      <Head>
        <title>Rojgar-Search</title>
      </Head>
      <div className="flex flex-col md:flex-row my-4">
        <div className="md:w-1/4 px-4">
          <Sidebar />
        </div>
        <div className="flex-1 px-4 mt-8 md:mt-0">
          <Card />
        </div>
      </div>
    </>
  );
}

export default Search;
