import Image from "next/image";
import Link from "next/link";

const AboutPage = () => {
   return (
      <div className="container mt-10">
         <Image src="/images/avatar.jpg" alt="Author's avatar" width={200} height={200}/>
         <h1 className="text-2xl">Hello, I`m Rodrigo Vargas, a software developer</h1>
         <p>I help to build and mantain web systems at ADP in Porto Alegre. Previously, I was an engineer at Dell, where I worked in their financial division.</p>
         <p>I`m married with my former WoW healer, and I`m a dad of a wonderful princess. And I live in Porto Alegre, south of Brazil</p>

         For more information:

         <ul>
            <li>
               <a href="/resume.pdf">Download resume (PDF)</a>
            </li>
            <li>
               <Link href="/resume">Resume</Link>
            </li>
         </ul>

         <div className="grid grid-cols-3 gap-4">
            <div className="year bg-gray-100 p-5">
               <h2>2024</h2>
               <div>
                  <ul>
                     <li className="mb-5 bg-gray-200 p-5">
                        <h3>ADP</h3>
                        <p className="mb-0">Hired by ADP as a Lead Developer</p>
                        <time>December 2024</time>
                     </li>
                     <li className="mb-5 bg-gray-200 p-5">
                        <h3>Become father</h3>
                        <p className="mb-0">My first daughter born in the beginning of the biggest flood in our city</p>
                        <time>April 2024</time>
                     </li>
                  </ul>
               </div>
            </div>

            <div className="year bg-gray-100 p-5">
               <h2>2023</h2>
               <div>
                  <ul>
                     <li className="mb-5 bg-gray-200 p-5">
                        <h3>Dell</h3>
                        <p>Promoted to Principal Software Engineer</p>
                     </li>
                  </ul>
               </div>
            </div>

            <div className="year bg-gray-100 p-5">
               <h2>2021</h2>
               <div>
                  <ul>
                     <li className="mb-5 bg-gray-200 p-5">
                        <h3>Dell</h3>
                        <p>Hired at Dell as Senior Software Engineer</p>
                     </li>
                  </ul>
               </div>
            </div>
         </div>
      </div>
   )
};

export default AboutPage;