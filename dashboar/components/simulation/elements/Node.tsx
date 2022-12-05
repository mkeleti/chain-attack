const colors = [
  "red",
  "green",
  "purple",
  "orange",
  "maroon",
  "grey",
  "lightblue",
  "tomato",
  "pink",
  "maroon",
  "cyan",
  "magenta",
  "blue",
  "chocolate",
  "DarkSlateBlue",
];

function Node({ id }: { id: number }) {
  const height = 500;
  const radius = 100;

  let theta = [];
  const frags = 360 / 5;
  for (var i = 0; i <= 5; i++) {
    theta.push((frags / 180) * i * Math.PI);
  }

  const x = Math.round(radius * Math.cos(theta[id]));
  const y = Math.round(radius * Math.sin(theta[id]));

  const style = {
    position: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors[id],
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#000000",
    borderStyle: "solid",
    color: "white",
    top: height / 2 - y,
    left: height / 2 - x,
  };

  return (
    <div
      style={{
        display: "inline-block",
        padding: 5,
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      {/* @ts-ignore */}
      <div style={style} key={id}>
        <span style={{ fontWeight: "bold" }}>{id}</span>
      </div>
    </div>
  );
}
export default Node;
