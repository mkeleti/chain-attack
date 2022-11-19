// Some of this file is a work in progress, and is not currently used in the project. - mk nov-19

import { useEffect, useRef } from "react";
import { Box } from "@mantine/core";
import {
  Engine,
  Render,
  Runner,
  Composites,
  MouseConstraint,
  Mouse,
  Composite,
  Constraint,
  Bodies,
  use,
  Body,
  Vector
} from "matter-js";
import 'matter-attractors';

// Types of components to pass to the Chain Animation
interface PropTypes {
  hashes: string[];
  nodes: string[];
}


// This a monolithic component that contains the entire chain animation
const ChainAnime = (props: PropTypes) => {
  const scene = useRef(); // Reference to the scene
  const engine = useRef(Engine.create()).current; // create an engine
  const world = engine.world; // create a world

  // Create a new renderer
  useEffect(() => {
    const cw = document.body.clientWidth; // Get the width of the screen
    const ch = document.body.clientHeight; // Get the height of the screen
    // create a renderer
    use('matter-attractors'); // Use the matter-attractors plugin (for gravity)
    const render = Render.create({ // Create a new renderer
      element: scene.current,
      engine: engine,
      options: {
        hasBounds: true,
        width: 1000,
        height: ch,
        wireframes: false,
        background: "light",
      },
    });
    Render.run(render); // Run the renderer

    // create runner
/* Creating a runner, which is a loop that runs the engine. */
    const runner = Runner.create(); // Create a new runner

    Runner.run(runner, engine); // Run the runner

    let block = Bodies.rectangle(500, 400, 70, 50, { // Create a new block
      render: { fillStyle: "lightblue", }, isStatic: true, plugin: { // Set the plugin to use the matter-attractors plugin
        attractors: [ // Set the attractors
          function(bodyA: Body, bodyB: Body) { // Create a function that takes in two bodies
            return {
              x: (bodyA.position.x - bodyB.position.x) * 1e-6,
              y: (bodyA.position.y - bodyB.position.y) * 1e-6,
            };
          }
        ]
    }});
    Composite.add(world, block); // Add the block to the world

    // loop through the hashes and create a new block for each hash
    for (let int = 0; int < props.hashes.length - 1; int++) { 
      // Create a new block
      if (int != 0) { 
        // If the index is not 0
      let block = Bodies.rectangle(500, 400 + int * 100, 70, 50, { // Create a new block
        render: { fillStyle: "lightblue" }, isStatic: true, plugin: { // Set the plugin to use the matter-attractors plugin
          attractors: [
            function(bodyA: Body, bodyB: Body) {
              return {
                x: (bodyB.position.x - bodyA.position.x) * 1e-8,
                y: (bodyB.position.y - bodyA.position.y) * 1e-8,
              };
            }
          ]
      }
      })};


      Composite.add(world, block); };
      
    props.nodes.forEach((node, index) => {
      let nodecircle = Bodies.circle(
        500 + 50 * Math.sin(index * ((2 * Math.PI) / props.nodes.length)),
        200 + 50 * Math.cos(index * ((2 * Math.PI) / props.nodes.length) +0.001),
        20,
        {
          isStatic: false, mass: 10
        }
      );
      Composite.add(world, nodecircle);
    });

    // add mouse control
    var mouse = Mouse.create(render.canvas),
      mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.2,
          render: {
            visible: false,
          },
        },
      });

    Composite.add(world, mouseConstraint);
    engine.gravity.scale = 0;
    engine.timing.timeScale = 0.6;
    // keep the mouse in sync with rendering
    render.mouse = mouse;

    // reset state to current render
    return () => {
      Render.stop(render);
      Composite.clear(engine.world, true);
      Engine.clear(engine);
      render.canvas.remove();
      render.textures = {};
    };
  }, []);

  // Render the chain animation
  return (
    <Box mt={60}>
      <div ref={scene} style={{ width: "100%", height: "100%" }} />
    </Box>
  );
};

export default ChainAnime;
