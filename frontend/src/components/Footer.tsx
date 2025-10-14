export default function Footer() {
  return (
    <div className="bg-white shadow border-t border-gray-100 py-10 px-5">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-2xl font-bold tracking-tight text-black m-0">
          StayWise
        </p>
        <div className="flex flex-col md:flex-row gap-4">
          <p className="cursor-pointer text-black font-bold m-0">
            Privacy Policy
          </p>
          <p className="cursor-pointer text-black font-bold m-0">
            Terms of Service
          </p>
        </div>
      </div>
    </div>
  );
}
