import { Box } from "@mantine/core";
import { useEffect, useState, useRef } from "react";
import { Subscription } from "../../web3/newHeads";
import Block from "./elements/Block";
import Node from "./elements/Node";

interface PropTypes {
  hashes?: string[];
  nodes?: string[];
}

export const Blockchain = (props: PropTypes) => {
  const scene = useRef();

  const [blocks, setBlocks] = useState([]);
  const [index, setIndex] = useState(0);
  const nodeArray = [];
  const nodeCount = 11;   //sorry I'm hardcoding this for a sec -emma 11/22
  var cw;
  var ch;
  
  if(index == 0){         // this is supposed to initialize nodes but it actually doesnt work
    //setNodePositions(nodeArray, nodeCount);
    /*for (var i = 0; i < nodeCount; i++) {
      nodeArray.push(Node(i));
    }*/
  }  

  useEffect(() => {
    cw = document.body.clientWidth; // Get the width of the screen
    ch = document.body.clientHeight; // Get the height of the screen
    
    Subscription.on("data", (data) => {
      const block = (
        <div style={{ display: "flex", flexDirection: "column" }}>
          {index > 0 && (
            <svg width="100" height="55">
              <line
                x1="55"
                y1="0"
                x2="55"
                y2="55"
                stroke="black"
                stroke-width="2"
              ></line>
            </svg>
          )}
          <Block key={data.hash} data={data}></Block>
        </div>
      );

      setIndex(index + 1);
      setBlocks([...blocks, block]);
    });
    return () => {};
  });

  props.nodes.forEach((node, index) => {
    
    let nodeInCircle = positionNodeInCircle(nodeArray, nodeCount, index);
    nodeArray.push(nodeInCircle);
  });


  function positionNodeInCircle(array, numberOfNodes, index){
    //nodeArray.push(Node(i));
    console.log("node positioned in circle");
    return(Node(index));
     /* let circleArray = [];
      let mainHeight, mainWidth = 500;
      var theta = [0, Math.PI / 6, Math.PI / 4, Math.PI / 3, Math.PI / 2, 2 * (Math.PI / 3), 3 * (Math.PI / 4), 5 * (Math.PI / 6), Math.PI, 7 * (Math.PI / 6), 5 * (Math.PI / 4), 4 * (Math.PI / 3), 3 * (Math.PI / 2), 5 * (Math.PI / 3), 7 * (Math.PI / 4), 11 * (Math.PI / 6)];
      console.log("circle array reached");
      for (var i = 0; i < numberOfNodes; i++) {
        //create element, add it to the array, and assign it's coordinates trigonometrically.
        //Then add it to the "main" div
        circleArray.push(Node(i));
        circleArray[i].posx = Math.round((150 * Math.cos(i * (2 * Math.PI / numberOfNodes)))) + 'px';
        circleArray[i].posy = Math.round((150 * Math.sin(i * (2 * Math.PI / numberOfNodes)))) + 'px';
        circleArray[i].style.position = "relative";
        circleArray[i].style.top = ((mainHeight / 2) - parseInt(circleArray[i].posy.slice(0, -2))) + 'px';
        circleArray[i].style.left = ((mainHeight / 2) + parseInt(circleArray[i].posx.slice(0, -2))) + 'px';
      }
      */
  }



  return (
    <div ref={scene}>
      <Box>{nodeArray}</Box>
      <Box>{blocks}</Box>;
    </div>
  )
};

export default Blockchain;