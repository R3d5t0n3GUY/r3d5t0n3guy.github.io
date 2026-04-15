if (tech.tech.findIndex(i => i.name === 'de Broglie-Bohm theory') < 0) {
  m.fieldUpgrades[8].effect = () => {
    m.fieldUpgrades[8].collider = Matter.Bodies.polygon(m.pos.x, m.pos.y, 8, 35, {
        friction: 0,
        frictionAir: 0.12,
        collisionFilter: { category: cat.player, mask: (tech.isPilotMapIgnore ? 0 : cat.map) }, //no collision because player is holding
        classType: "field",
        lastSpeed: 0,
    });
    Composite.add(engine.world, m.fieldUpgrades[8].collider); //add to world

    //store event function so it can be found and removed in m.setField()
    m.fieldEvent = function (event) {
      m.fieldUpgrades[8].keyLog.shift() //remove first element
      m.fieldUpgrades[8].keyLog.push(event.code) //add new key to end
      const patternA = ["ArrowDown", "ArrowDown", "ArrowRight", "ArrowDown", "ArrowLeft", "ArrowDown", "ArrowDown"]
      const patternB = [input.key.down, input.key.down, input.key.right, input.key.down, input.key.left, input.key.down, input.key.down]
      const arraysEqual = (a, b) => a.length === b.length && a.every((val, i) => val === b[i]);

      const width = 90 + Math.floor(30 * Math.random())
      const height = 11 + Math.floor(7 * Math.random())
      const yOff = 60
      const blockRegion = {
        min: {
          x: m.pos.x - width,
          y: m.pos.y + yOff - height
        },
        max: {
          x: m.pos.x + width,
          y: m.pos.y + yOff + height
        }
      }
      if (
        (arraysEqual(m.fieldUpgrades[8].keyLog, patternA) || arraysEqual(m.fieldUpgrades[8].keyLog, patternB))
        && (tech.isPilotMapIgnore || !Matter.Query.region(map, blockRegion).length)
        && !m.crouch) {
        //move player up away from block
        Matter.Body.setPosition(player, { x: player.position.x, y: player.position.y - height })

        //spawn a block
        body[body.length] = Matter.Bodies.rectangle(m.pos.x, blockRegion.max.y, width * 2, height * 2, {
          friction: 0.05,
          frictionAir: 0.001,
          collisionFilter: {
            category: cat.body,
            mask: cat.player | cat.map | cat.body | cat.bullet | cat.mob | cat.mobBullet
          },
          classType: "body",
          isPilotWave: true,
        });
        Composite.add(engine.world, body[body.length - 1]); //add to world
        simulation.inGameConsole(`Composite<span class='color-symbol'>.</span>add<span class='color-symbol'>(</span>engine.world<span class='color-symbol'>,</span> block<span class='color-symbol'>)</span> &nbsp; &nbsp; <em style ="float: right; font-family: monospace;font-size:1rem;color:#055;">//↓↓→↓←↓↓</em>`);
      }
    }
    window.addEventListener("keydown", m.fieldEvent);

    m.fieldMeterColor = "#333"
    m.eyeFillColor = m.fieldMeterColor
    m.fieldPhase = 0;
    m.fieldPosition = { x: simulation.mouseInGame.x, y: simulation.mouseInGame.y }
    m.lastFieldPosition = { x: simulation.mouseInGame.x, y: simulation.mouseInGame.y }
    m.fieldOn = false;
    if (tech.isNoPilotCost) m.fieldFire = true;

    m.fieldRadius = 0;
    m.drop();
    m.hold = function () {
      let isOn = (tech.isNoPilotCost ? !input.field : input.field)
      if (tech.isPrinter) {
        //spawn blocks if field and crouch
        if (input.field && m.fieldCDcycle < m.cycle && input.down && !m.isHolding) {
          m.printBlock()
        }
        //if holding block grow it
        if (m.isHolding) {
          m.drawHold(m.holdingTarget);
          m.holding();
          if (tech.isPrinter && m.holdingTarget.isPrinted && input.field) {
            // if (Math.random() < 0.004 && m.holdingTarget.vertices.length < 12) m.holdingTarget.vertices.push({ x: 0, y: 0 }) //small chance to increase the number of vertices
            m.holdingTarget.radius += Math.min(1.1, 1.3 / m.holdingTarget.mass) //grow up to a limit
            const r1 = m.holdingTarget.radius * (1 + 0.12 * Math.sin(m.cycle * 0.11))
            const r2 = m.holdingTarget.radius * (1 + 0.12 * Math.cos(m.cycle * 0.11))
            let angle = (m.cycle * 0.01) % (2 * Math.PI) //rotate the object 
            let vertices = []
            for (let i = 0, len = m.holdingTarget.vertices.length; i < len; i++) {
              angle += 2 * Math.PI / len
              vertices.push({ x: m.holdingTarget.position.x + r1 * Math.cos(angle), y: m.holdingTarget.position.y + r2 * Math.sin(angle) })
            }
            Matter.Body.setVertices(m.holdingTarget, vertices)
            m.definePlayerMass(m.defaultMass + m.holdingTarget.mass * m.holdingMassScale)
          }
          m.throwBlock()
        } else {
          m.holdingTarget = null; //clears holding target (this is so you only pick up right after the field button is released and a hold target exists)
        }
        //if releasing field throw it

      }
      if (isOn) {
        if (tech.isPilotMapIgnore && !simulation.testing && m.fieldOn && !simulation.isTimeSkipping) {
          level.customTopLayer();
          simulation.draw.drawMapPath();
        } //draw map before drawing field if player has de Broglie–Bohm theory
        if (m.fieldCDcycle < m.cycle) {
          if (!m.fieldOn) { // if field was off, teleport to player
            m.fieldOn = true;
            Matter.Body.setPosition(m.fieldUpgrades[8].collider, m.pos);
            m.fieldPosition.x = m.pos.x
            m.fieldPosition.y = m.pos.y
          }
            const graphicScale = 1.2 //the draw range is a bit bigger then the interaction range
            //when field is on it smoothly moves towards the mouse
            const sub = Vector.sub(simulation.mouseInGame, m.fieldUpgrades[8].collider.position)
            const mag = Vector.magnitude(sub)

            //adjust speed of field here, and with friction and mass above where the collier is spawned
            const fieldMassScale = Math.max(1.5, Math.pow(m.fieldUpgrades[8].fieldMass, 0.3)) //how much mass inside the field slows the push and cap
            const scaledMag = 0.00000017 / fieldMassScale * Math.pow(mag, 2) //having the mag squared makes the effect weaker in close for fine movement
            let push = Vector.mult(Vector.normalise(sub), scaledMag)
            const cap = 0.17 / fieldMassScale //acts like a "speed limit"
            if (Vector.magnitude(push) > cap) push = Vector.mult(Vector.normalise(push), cap)
            m.fieldUpgrades[8].collider.force = push

            //check for map collisions
            if (Matter.Query.ray(map, m.fieldPosition, m.fieldUpgrades[8].collider.position).length) {
            if (!tech.isPilotMapIgnore) {
              Matter.Body.setVelocity(m.fieldUpgrades[8].collider, Vector.mult(m.fieldUpgrades[8].collider.velocity, 0.6))
              m.fieldRadius *= 0.6
            }
            }
            m.fieldPosition.x = m.fieldUpgrades[8].collider.position.x
            m.fieldPosition.y = m.fieldUpgrades[8].collider.position.y

            //grab power ups into the field
            for (let i = 0, len = powerUp.length; i < len; ++i) {
            if (tech.isEnergyNoAmmo && powerUp[i].name === "ammo") continue

            const dxP = m.fieldPosition.x - powerUp[i].position.x;
            const dyP = m.fieldPosition.y - powerUp[i].position.y;
            const dist2 = dxP * dxP + dyP * dyP + 200;
            const graphicRange = graphicScale * m.fieldRadius
            // float towards field  if looking at and in range  or  if very close to player
            // if (
            //     dist2 < graphicRange * graphicRange &&
            //     (m.lookingAt(powerUp[i]) || dist2 < 16000)
            // ) {
            //     powerUp[i].force.x += 0.05 * (dxP / Math.sqrt(dist2)) * powerUp[i].mass;
            //     powerUp[i].force.y += 0.05 * (dyP / Math.sqrt(dist2)) * powerUp[i].mass - powerUp[i].mass * simulation.g; //negate gravity
            //     Matter.Body.setVelocity(powerUp[i], { x: powerUp[i].velocity.x * 0.11, y: powerUp[i].velocity.y * 0.11 }); //extra friction
            if (
                dist2 < graphicRange * graphicRange &&
                !simulation.isChoosing &&
                (tech.isOverHeal || powerUp[i].name !== "heal" || m.maxHealth - m.health > 0.01)
                // (powerUp[i].name !== "heal" || m.health < 0.94 * m.maxHealth)
                // (powerUp[i].name !== "ammo" || b.guns[b.activeGun].ammo !== Infinity)
            ) { //use power up if it is close enough

              simulation.ephemera.push({
                count: 5, //cycles before it self removes
                PposX: powerUp[i].position.x,
                PposY: powerUp[i].position.y,
                size: powerUp[i].size,
                color: powerUp[i].color,
                do() {
                  this.count--
                  if (this.count < 0) simulation.removeEphemera(this)
                  ctx.beginPath();
                  ctx.arc(this.PposX, this.PposY, Math.max(0.01, this.size * (this.count + 2) / 7), 0, 2 * Math.PI);
                  ctx.fillStyle = this.color
                  ctx.fill();
                },
              })

              powerUps.onPickUp(powerUp[i]);
              powerUp[i].effect();
              Matter.Composite.remove(engine.world, powerUp[i]);
              powerUp.splice(i, 1);
              // m.fieldRadius += 50
              len--; //because the array order is messed up after splice
            }
            // }
          }

          let radiusGoal, radiusSmooth, drainPassive
          if (Matter.Query.ray(map, m.fieldPosition, player.position).length) { //is there something blocking the player's view of the field
            drainPassive = 1.5 * m.fieldRegen * m.fieldUpgrades[8].drain
            if (tech.isPilotMapIgnore) {
              drainPassive *= 2;
              radiusGoal = Math.max(50, 250 - 2 * m.fieldUpgrades[8].collider.speed)
              radiusSmooth = 0.97
            } else {
              radiusGoal = 0
              radiusSmooth = 0.995
            }
          } else {
            radiusGoal = Math.max(50, 250 - 2 * m.fieldUpgrades[8].collider.speed)
            radiusSmooth = 0.97
            drainPassive = m.fieldRegen * m.fieldUpgrades[8].drain
          }
          if (tech.isNoPilotCost) drainPassive = 0
          m.fieldRadius = m.fieldRadius * radiusSmooth + radiusGoal * (1 - radiusSmooth)

          //track velocity change for calculating block energy drain
          const speedChange = Math.max(0, m.fieldUpgrades[8].collider.speed - m.fieldUpgrades[8].collider.lastSpeed)
          m.fieldUpgrades[8].collider.lastSpeed = m.fieldUpgrades[8].collider.speed

          if (m.energy >= drainPassive) {
            m.energy -= drainPassive;
            m.fieldUpgrades[8].fieldMass = 1
            for (let i = 0, len = body.length; i < len; ++i) {
              if (Vector.magnitude(Vector.sub(body[i].position, m.fieldPosition)) < m.fieldRadius && !body[i].isNotHoldable) {
                // const drainBlock = m.fieldUpgrades[8].collider.speed * body[i].mass * 0.0000013
                const drainBlock = m.fieldUpgrades[8].drain * speedChange * body[i].mass * 0.000095
                if (m.energy > drainBlock) {
                  m.energy -= drainBlock;
                  Matter.Body.setVelocity(body[i], m.fieldUpgrades[8].collider.velocity); //give block mouse velocity
                  Matter.Body.setAngularVelocity(body[i], body[i].angularVelocity * 0.8)
                  m.fieldUpgrades[8].fieldMass += body[i].mass
                  //blocks drift towards center of pilot wave
                  const sub = Vector.sub(m.fieldPosition, body[i].position)
                  const push = Vector.mult(Vector.normalise(sub), 0.0001 * body[i].mass * Vector.magnitude(sub))
                  body[i].force.x += push.x
                  body[i].force.y += push.y - body[i].mass * simulation.g //remove gravity effects

                  if (m.standingOn === body[i] && m.onGround) {
                    //try to stop the walk animation
                    m.walk_cycle -= m.flipLegs * m.Vx / player.scale
                    m.stepSize *= 0
                    //extra stability
                    Matter.Body.setAngularVelocity(body[i], body[i].angularVelocity * 0)
                    //match velocity upto a change of 10 per cycle
                    const limit = 10
                    const deltaV = Math.max(-limit, Math.min((m.fieldUpgrades[8].collider.velocity.x - player.velocity.x), limit))
                    Matter.Body.setVelocity(player, { x: player.velocity.x + deltaV, y: player.velocity.y });
                  }

                } else {
                  m.fieldCDcycle = m.cycle + 60;
                  m.fieldOn = false
                  m.fieldRadius = 0
                  break
                }
              }
            }

            // if (tech.isFreezeMobs) {
            //     for (let i = 0, len = mob.length; i < len; ++i) {
            //         if (!mob[i].isMobBullet && !mob[i].shield && !mob[i].isShielded && Vector.magnitude(Vector.sub(mob[i].position, m.fieldPosition)) < m.fieldRadius + mob[i].radius) {
            //             const ICE_DRAIN = 0.0005
            //             if (m.energy > ICE_DRAIN) m.energy -= ICE_DRAIN;
            //             mobs.statusSlow(mob[i], 180)
            //         }
            //     }
            // }
            ctx.beginPath();
            const rotate = m.cycle * 0.008;
            m.fieldPhase += 0.2 // - 0.5 * Math.sqrt(Math.min(m.energy, 1));
            const off1 = 1 + 0.06 * Math.sin(m.fieldPhase);
            const off2 = 1 - 0.06 * Math.sin(m.fieldPhase);
            ctx.beginPath();
            ctx.ellipse(m.fieldPosition.x, m.fieldPosition.y, graphicScale * m.fieldRadius * off1, graphicScale * m.fieldRadius * off2, rotate, 0, 2 * Math.PI);
            ctx.globalCompositeOperation = "exclusion";
            ctx.fillStyle = "#fff";
            ctx.fill();
            ctx.globalCompositeOperation = "source-over";
            ctx.beginPath();
            ctx.ellipse(m.fieldPosition.x, m.fieldPosition.y, graphicScale * m.fieldRadius * off1, graphicScale * m.fieldRadius * off2, rotate, 0, 2 * Math.PI * m.energy / m.maxEnergy);
            if (radiusGoal || m.cycle % 5) {
              ctx.strokeStyle = "#000";
            } else {
              ctx.strokeStyle = "#fff";
            }
            ctx.lineWidth = 4;
            ctx.stroke();
          } else {
            m.fieldCDcycle = m.cycle + 60;
            m.fieldOn = false
            m.fieldRadius = 0
          }

        } else {
            m.grabPowerUp();
        }
      } else {
        m.fieldOn = false
        m.fieldRadius = 0
      }
      //grab power ups normally at player too
      if (input.field) m.grabPowerUp();
      m.drawRegenEnergy("rgba(0,0,0,0.2)")

      // //draw physics collider
      // ctx.beginPath();
      // const vertices = m.fieldUpgrades[8].collider.vertices;
      // ctx.moveTo(vertices[0].x, vertices[0].y);
      // for (let j = 1, len = vertices.length; j < len; ++j) ctx.lineTo(vertices[j].x, vertices[j].y);
      // ctx.lineTo(vertices[0].x, vertices[0].y);
      // ctx.strokeStyle = "#000";
      // ctx.lineWidth = 2;
      // ctx.stroke();
    }
  }

  simulation.normalLoop = () => {
    simulation.gravity();
    Engine.update(engine, simulation.delta);
    simulation.wipe();
    simulation.textLog();
    if (m.onGround) {
      m.groundControl()
    } else {
      m.airControl()
    }
    m.move();
    m.look();
    simulation.camera();
    level.custom();
    powerUps.do();
    mobs.draw();
    simulation.draw.cons();
    simulation.draw.body();
    if (!m.isTimeDilated) mobs.loop();
    m.draw();
    m.hold();
    if (m.cycle < 100 || m.fieldMode !== 8 || !tech.isPilotMapIgnore || !m.fieldOn) {
      level.customTopLayer();
      simulation.draw.drawMapPath();
    } //don't draw map here first if pilot wave field is used with De Broglie–Bohm theory
    //if (m.freeCamera.isActive()) m.freeCamera.draw(); //draw the freecam at its position
    b.fire();
    b.bulletRemove();
    b.bulletDraw();
    if (!m.isTimeDilated) b.bulletDo();
    simulation.drawCircle();
    simulation.runEphemera();
    ctx.restore();
    simulation.drawCursor();
  }
  if (!simulation.testing) simulation.loop = simulation.normalLoop

  simulation.timeSkip = (cycles = 60) => {
    simulation.isTimeSkipping = true;
    for (let i = 0; i < cycles; i++) {
      simulation.cycle++;
      m.cycle++;
      simulation.gravity();
      Engine.update(engine, simulation.delta);
      if (m.onGround) {
        m.groundControl()
      } else {
        m.airControl()
      }
      m.move();
      level.custom();
      mobs.loop();
      m.walk_cycle += m.flipLegs * m.Vx;
      m.hold();
      if (m.cycle < 100 || m.fieldMode !== 8 || !tech.isPilotMapIgnore || !m.fieldOn) {
        //simulation.draw.drawMapPath();
        level.customTopLayer();
      } //don't draw map here first if pilot wave field is used with De Broglie–Bohm theory
      b.fire();
      b.bulletRemove();
      b.bulletDo();
      simulation.runEphemera();
    }
    simulation.isTimeSkipping = false;
  }

  const index = tech.tech.findIndex(i => {
    return i.name === "Bells theorem" && i.isFieldTech
  })
  tech.tech[index].allowed = () => {
    return m.fieldMode === 8 && !tech.isHarmReduce && !tech.isPilotMapIgnore
  }
  tech.tech[index].requires = "pilot wave, not degenerate matter, de Broglie-Bohm theory"
  const deBroglieBohmTheory = {
    name: "de Broglie-Bohm theory",
    description: `<strong>pilot wave</strong> can travel through <strong>anything</strong> for<br><strong>2x</strong> the <strong class='color-f'>energy</strong> cost`,
    isFieldTech: true,
    maxCount: 1,
    count: 0,
    frequency: 4,
    frequenctDefault: 4,
    allowed() {
      return m.fieldMode === 8 && !tech.isNoPilotCost
    },
    requires: "pilot wave, not Bell's theorem",
    effect() {
      tech.isPilotMapIgnore = true;
      let fieldRadius = m.fieldRadius;
      m.setField(m.fieldMode); //update pilot wave function
      requestAnimationFrame(() => {requestAnimationFrame(() => { //keep field position and radius. Not sure if it actually works
        if (m.fieldMode === 8 && m.fieldOn) {
          Matter.Body.setPosition(m.fieldUpgrades[8].collider, simulation.mouseInGame);
          m.fieldPosition = simulation.mouseInGame
          m.fieldRadius = fieldRadius;
        }
      }) })
    },
    remove() {
      tech.isPilotMapIgnore = false;
      let fieldRadius = m.fieldRadius;
      m.setField(m.fieldMode); //update pilot wave function
      requestAnimationFrame(() => { requestAnimationFrame(() => { //keep field position and radius. Not sure if it actually works
        if (m.fieldMode === 8 && m.fieldOn) {
          Matter.Body.setPosition(m.fieldUpgrades[8].collider, simulation.mouseInGame);
          m.fieldPosition = simulation.mouseInGame
          m.fieldRadius = fieldRadius;
        }
      }) })
    }
  }
  tech.tech.splice(index, 0, deBroglieBohmTheory)
  if (build.isExperimentSelection) build.populateGrid()
}