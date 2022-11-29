function Node(id: number) {

    const style = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        width: 80,
        height: 80,
        borderRadius: 3200,
        borderWidth: 2,
        borderColor: "#000000",
        borderStyle: "solid",
      };
      //flexDirection: "row",
      //justifyContent: "center",
    return(
      <div
          style={{
              display: "inline-block",
              padding: 5,

            }}
          >
            <div style={style} key={id.toString()}>
              <span style={{ fontWeight: "bold" }}>{id}</span>
            </div>
      </div>
  );
}
export default Node;
  