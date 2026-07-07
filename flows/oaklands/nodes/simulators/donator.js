/* node */

import { BaseNode } from "../../../node.js"

export class Node extends BaseNode {
    static id         = "donator"
    static display    = "Donator"
    static size       = [.75, 1.25]
    static icon       = "$assets/unknown.png"
    static category   = "simulators"

    constructor() {
        super()
        const size = this.getSize()
        const width = size[0] - 10
        const height = 20
        this.addInteractableRegion('#press', size[0] / 2 - width / 2, size[1] / 2 - height / 2, width, height)
        this.addConnectionPoint('output', 'left', '#out1', 'The user id of the user that bought it')
        this.addConnectionPoint('output', 'left', '#out2', 'The user id of the user that bought it')

        this.cached = true
        this.pressed = false
        this.cooldown = false
    }

    update() {
        super.update()
    }

    input(action) {
        switch (action) {
            case '#press':
                if (this.pressed)
                    return
                this.pressed = true
                this.invalidate()
                for (let i = 0; i < 2; i++)
                    this.setConnectionPointValue(`#out${i + 1}`, 12345678)
                this.schedule(() => {
                    for (let i = 0; i < 2; i++)
                        this.setConnectionPointValue(`#out${i + 1}`, 0)
                    this.pressed = false
                    this.invalidate()
                }, 1)
                break
        }
    }

    /**
     * @param {CanvasRenderingContext2D} context 
     */
    draw(context) {
        const context2 = super.draw(context)
        if (!context2)
            return this.cacheDraw(context)
        const size = this.getSize()
        const centerX = size[0] / 2
        const centerY = size[1] / 2

        const width = size[0] - 10
        const height = 20

        // draw button
        context2.fillStyle = this.pressed ? 'red' : 'green'
        context2.beginPath()
        context2.roundRect(centerX - width / 2, centerY - height / 2, width, height, 10)
        context2.fill()

        // text
        context2.fillStyle = '#fff'
        context2.font = 'bold 15px monospace'
        context2.textAlign = 'center'
        context2.textBaseline = 'middle'
        context2.fillText('Donate', centerX, centerY)

        this.cacheDraw(context)
    }
}