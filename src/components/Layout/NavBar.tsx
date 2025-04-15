const Navbar = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "8px 16px",
        backgroundColor: "#fff",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        {/* <Image src='' alt="Roya" width={200} preview={false} /> */}
        <h1>Roya</h1>
      </div>
    </div>
  );
};

export default Navbar;
