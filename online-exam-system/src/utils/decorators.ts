import req from '@/utils/axios'

const Get = (url: string) => {
  return function (
    target: any,
    context: ClassMethodDecoratorContext<any, (this: any, ...args: any[]) => any>,
  ) {
    context.addInitializer(function () {
      const originalMethod = this[context.name]

      this[context.name] = async function (...args: any[]) {
        try {
          const response = await req.get(url, { params: args[0] })
          return response
        } catch (error) {
          console.error(`GET ${url} API error:`, error)
          return originalMethod?.apply(this, args)
        }
      }
    })
  }
}

const Post = (url: string) => {
  return function (
    target: any,
    context: ClassMethodDecoratorContext<any, (this: any, ...args: any[]) => any>,
  ) {
    context.addInitializer(function () {
      const originalMethod = this[context.name]

      this[context.name] = async function (...args: any[]) {
        try {
          const response = await req.post(url, ...args)
          return response
        } catch (error) {
          console.error(`POST ${url} API error:`, error)
          return originalMethod?.apply(this, args)
        }
      }
    })
  }
}

export { Get, Post }
