import Link from "next/link";

const Hero = () => {
   return (
      <>
         <div className="flex flex-col items-center justify-center w-fullbg-gray-50">
            <h1 className="text-center text-5xl font-thin mb-10">Rodrigo Vargas</h1>

             <ul className="flex flex-row">
               <li className="mr-4">
                  <Link href="/">Home</Link>
               </li>
               <li>
                  <Link href="/about">About</Link>
               </li>
            </ul>
         </div>        
      </>
   )
};

export default Hero;