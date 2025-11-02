import {defineSchema, defineTable} from "convex/server"

import { v } from "convex/values"

export default defineSchema ({
    todos: defineTable({
        user:v.id("users"),
        text: v.string(),
        isCompleted: v.boolean()
    }),
  users: defineTable({
    tokenIdentifier: v.string(),
  }).index("by_token", ["tokenIdentifier"]),
})
