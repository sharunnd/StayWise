export default function Footer() {
  return (
    <div className=" bg-white shadow py-10 border-t border-t-gray-100">
      <div className=" container mx-auto flex justify-between items-center">
        <span className=" text-3xl text-black font-bold tracking-tight">
          StayWise
        </span>
        <span className="text-black font-bold tracking-tight flex gap-4">
          <p className=" cursor-pointer">Privacy Policy</p>
          <p className=" cursor-pointer">Terms of Service</p>
        </span>
      </div>
    </div>
  );
}
