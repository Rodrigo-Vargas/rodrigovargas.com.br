import Hero from "../Hero";

const SideNav = () => {
  return (
    <div className="sticky top-0 h-screen bg-gray-50 inline-flex p-5">
      <div className="border border-gray-300">
        <Hero />
      </div>
    </div>
  );
};

export default SideNav;
