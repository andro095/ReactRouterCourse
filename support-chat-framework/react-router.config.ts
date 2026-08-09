import type { Config } from "@react-router/dev/config"

const names = ["john", "maria", "carlos", "ana", "david", "sofia", "luis", "elena", "diego", "isabel"]

const getRandomItem = <T,>(array: T[]): T => {
    return array[Math.floor(Math.random() * array.length)]
}

const getRandomAge = (min = 18, max = 65): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

const generatedTestingArgsRoutes = Array.from({ length: 150 }, (_, index) => {
    const id = index + 1
    const name = getRandomItem(names)
    const age = getRandomAge()
    return `/auth/testing-args/${id}/${name}/${age}`
})

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: true,

  async prerender() {
    return [
      "/auth/login",
      "/auth/register",
      "/auth/testing",

      // Products

      "/products/product-1",
      "/products/product-2",
      "/products/product-3",
      "/products/product-4",
      "/products/product-5",

      // Testing Args (150 generated routes)
      ...generatedTestingArgsRoutes
    ]
  },

} satisfies Config
