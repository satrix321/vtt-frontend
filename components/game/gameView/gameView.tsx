import { Viewport } from 'pixi-viewport'
import * as PIXI from 'pixi.js'
import { useEffect, useRef } from 'react'
import styles from './gameView.module.scss'

export const GameView: React.FunctionComponent = () => {
  const root = useRef<HTMLDivElement>(null)
  let app: PIXI.Application

  useEffect(() => {
    // The application will create a renderer using WebGL, if possible,
    // with a fallback to a canvas render. It will also setup the ticker
    // and the root stage PIXI.Container
    app = new PIXI.Application({
      width: root.current?.offsetWidth,
      height: root.current?.offsetHeight,
      resizeTo: window,
    })

    // The application will create a canvas element for you that you
    // can then insert into the DOM
    root.current?.appendChild(app.view)

    const viewport = new Viewport({
      screenWidth: root.current?.offsetWidth,
      screenHeight: root.current?.offsetHeight,
      worldWidth: 1000,
      worldHeight: 1000,
      interaction: app.renderer.plugins.interaction,
      disableOnContextMenu: true,
    })

    app.stage.addChild(viewport)

    viewport.drag({ mouseButtons: 'right' }).pinch().wheel().decelerate({ friction: 0.8 })

    // load the texture we need
    app.loader.add('bunny', 'bunny.jpg').load((loader, resources) => {
      // This creates a texture from a 'bunny.png' image
      if (resources.bunny) {
        const bunny = new PIXI.Sprite(resources.bunny.texture)

        // Setup the position of the bunny
        bunny.x = app.renderer.width / 2
        bunny.y = app.renderer.height / 2

        // Rotate around the center
        bunny.anchor.x = 0.5
        bunny.anchor.y = 0.5

        // Add the bunny to the scene we are building
        // app.stage.addChild(bunny)
        viewport.addChild(bunny)

        // Listen for frame updates
        app.ticker.add(() => {
          // each frame we spin the bunny around a bit
          bunny.rotation += 0.01
        })
      }
    })
  }, [root])

  return <div id="gameView" className={styles['game-view']} ref={root}></div>
}
