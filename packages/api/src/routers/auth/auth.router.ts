import { publicProcedure } from "../../trpc"

export const authRouter = {
  session: publicProcedure.query(({ ctx }) => {
    return ctx.auth
  }),
}
