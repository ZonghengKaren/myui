import TWEEN from "tween.js"
export default {
  methods: {
    /**
     * 透明度动画
     * @param {Boolean} isEnter 是否进入
     */
    startTweenFade(isEnter) {
      // 开始透明度承接上次的值
      const startOpacity = this.opacity
      const endOpacity = isEnter ? 1 : 0

      // 显示快 隐藏慢
      const duration = endOpacity > 0 ? 150 : 300

      const animate = () => {
        if (TWEEN.update()) {
          window.requestAnimationFrame(animate)
        }
      }

      new TWEEN.Tween({ opacity: startOpacity })
        .to({ opacity: endOpacity }, duration)
        .onUpdate(object => {
          this.opacity = object.opacity
        })
        .start()

      animate()
    },

    /**
     * 滑动动画
     * @param {Boolean} isEnter 是否进入
     */
    startTweenSlide(isEnter) {
      // 开始透明度承接上次的值
      const startPercent = this.slidePercent
      const endPercent = isEnter ? 0 : 100

      const animate = () => {
        if (TWEEN.update()) {
          window.requestAnimationFrame(animate)
        }
      }

      new TWEEN.Tween({ y: startPercent })
        .to({ y: endPercent }, 300)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(object => {
          this.slidePercent = object.y
        })
        .start()

      animate()
    }
  }
}
