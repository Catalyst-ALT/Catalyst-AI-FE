const MediumNav = ({ navData }) => {
  console.log(navData);

  return (
    <>
      <div className={["flex flex-row w-full space-x-4 text-sm"].join(" ")}>
        {navData.map((datum) => (
          <div
            key={`${datum.title}-${datum.isActive}`}
            className={[
              datum.isActive ? "text-slate-700" : "text-slate-300",
            ].join(" ")}
          >
            {datum.title}
          </div>
        ))}
      </div>
    </>
  );
};
export default MediumNav;
