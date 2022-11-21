'use server';
import { nodes, injectNodeCmd } from "../../utils/docker/containers";

const stopMiners = () => {
  injectNodeCmd(1, "miner.Stop");
}


const minerControl = (props) => (
  <div>
    <button onClick={stopMiners}>
      Stop Miners?
    </button>
  </div>
)

export default minerControl;