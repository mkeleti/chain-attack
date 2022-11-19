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


// Component Declaration for Next.js
const ChainAnime = (props: PropTypes) => {
  const scene = useRef();
  const engine = useRef(Engine.create()).current; // create an engine
  const world = engine.world; // create a world


  useEffect(() => {
    const cw = document.body.clientWidth;
    const ch = document.body.clientHeight;
    // create a renderer
    use('matter-attractors');
    const render = Render.create({
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
    Render.run(render);

    // create runner
/* Creating a runner, which is a loop that runs the engine. */
    const runner = Runner.create();

    Runner.run(runner, engine);

    let block = Bodies.rectangle(500, 400, 70, 50, {
      render: { fillStyle: "lightblue", }, isStatic: true, plugin: {
        attractors: [
          function(bodyA: Body, bodyB: Body) {
            return {
              x: (bodyA.position.x - bodyB.position.x) * 1e-6,
              y: (bodyA.position.y - bodyB.position.y) * 1e-6,
            };
          }
        ]
    }});


    Composite.add(world, block);


    for (let int = 0; int < props.hashes.length - 1; int++) {
      if (int != 0) {
      let block = Bodies.rectangle(500, 400 + int * 100, 70, 50, {
        render: { fillStyle: "lightblue" }, isStatic: true, plugin: {
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

  return (
    <Box mt={60}>
      <div ref={scene} style={{ width: "100%", height: "100%" }} />
    </Box>
  );
};

export default ChainAnime;
