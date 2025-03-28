const Project = () =>{
return (
  <div className="flex flex-col gap-5">
  <h1 className="text-semibold text-2xl">Projects</h1>
  <div className="flex flex-col bg-red-500 w-[300px]- h-[250px]- gap-2 p-5">
    <h2 className="font-semibold text-lg">Implementing User Management</h2>
    <div className="bg-[#a5a0f4]">
    <p className="text-[#4E44F4]  ">12 Feb - 15 Dec</p>
    </div>
    <p className="text-xs">project focused on creating a system that handles user registration, authentication, authorization, and account management.</p>
  </div>
  </div>

)
}
export default Project;