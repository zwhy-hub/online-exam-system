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

const GetIdOnly = (url: string) => {
  return function (
    target: any,
    context: ClassMethodDecoratorContext<any, (this: any, ...args: any[]) => any>,
  ) {
    context.addInitializer(function () {
      const originalMethod = this[context.name]

      this[context.name] = async function (...args: any[]) {
        try {
          const requestUrl = `${url}/${args[0]}`
          // console.log(`GET ${requestUrl}`)
          const response = await req.get(requestUrl)
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

const PostById = (url: string) => {
  return function (
    target: any,
    context: ClassMethodDecoratorContext<any, (this: any, ...args: any[]) => any>,
  ) {
    context.addInitializer(function () {
      const originalMethod = this[context.name]

      this[context.name] = async function (...args: any[]) {
        try {
          const requestUrl = `${url}/${args[0]}`
          // console.log(`POST ${requestUrl}`)
          const response = await req.post(requestUrl, args[1])
          return response
        } catch (error) {
          console.error(`POST ${url} API error:`, error)
          return originalMethod?.apply(this, args)
        }
      }
    })
  }
}

const PostIdOnly = (url: string) => {
  return function (
    target: any,
    context: ClassMethodDecoratorContext<any, (this: any, ...args: any[]) => any>,
  ) {
    context.addInitializer(function () {
      const originalMethod = this[context.name]

      this[context.name] = async function (...args: any[]) {
        try {
          const requestUrl = `${url}/${args[0]}`
          // console.log(`POST ${requestUrl}`)
          const response = await req.post(requestUrl)
          return response
        } catch (error) {
          console.error(`POST ${url} API error:`, error)
          return originalMethod?.apply(this, args)
        }
      }
    })
  }
}

// const Param = (param: string) => {
//   return function (
//     target: any,
//     context: ClassMethodDecoratorContext<any, (this: any, ...args: any[]) => any>,
//     index: number,
//   ) {
//     context.addInitializer(function () {
//       const originalMethod = this[context.name]

//       this[context.name] = async function (...args: any[]) {
//         args[0][param] = args[index]
//         return originalMethod?.apply(this, args)
//       }
//     })
//   }
// }

export { Get, Post, PostById, PostIdOnly, GetIdOnly }
