import NavBar from "../navbar";
const MediumNav = ({ navData }) => {


  return (
    <>
    
      <div className={["flex flex-row min-w-full space-x-3 text-sm pr-4"].join(" ")}>
        {navData.map((datum) => (
          <div
            key={`${datum.title}-${datum.isActive}`}
            className={[
              datum.isActive ? "text-slate-700" : "text-white",
            ].join(" ")}
            onClick={datum.onClick}
          >
            {datum.title}
          </div>
          
        ))}
      </div>
    
    </>
  );
};
export default MediumNav;
