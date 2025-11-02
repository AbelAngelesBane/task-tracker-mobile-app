import { Doc } from './_generated/dataModel';
import {mutation, query} from './_generated/server'
import { ConvexError, v } from 'convex/values'


//mutatations (add,delete, update)
const isAuthenticated = async  (ctx: any)=>{
        
        const identity = await ctx.auth.getUserIdentity();
        if(identity === null) throw new Error ("Not authenticated")
        
        let user = await ctx.db
            .query("users")
            .filter((q: { eq: (arg0: any, arg1: any) => any; field: (arg0: string) => any; }) => q.eq(q.field("tokenIdentifier"), identity.tokenIdentifier ))
            .first();
        if (user === null) return null
        return user
}

export const getTodos = query({
    handler: async (ctx) => {
        
        const user = await isAuthenticated(ctx)
        if (!user)throw new Error ("User not found")

        const todos = await ctx.db.query("todos")
            .filter((q) => q.eq(q.field("user"), user._id)).order("desc").collect()

        return todos
    }
})



export const addTodo = mutation({
    args: {text: v.string()},
    handler: async(ctx, args) => {


        let user = await isAuthenticated(ctx)
        if (user === null)throw new Error ("User not found")

        const todoId = await ctx.db.insert("todos",{
            user: user!._id,
            text: args.text,
            isCompleted: false
        })
        return todoId
    }
   
})


export const toggleTodo = mutation({
    args: {id:v.id("todos")},
    handler: async(ctx, args) => {


        let user = await isAuthenticated(ctx)
        if (user === null)throw new Error ("User not found")        

        const todo  = await ctx.db.get(args.id)
        if (!todo) throw new ConvexError("To do not found")
        if(todo.user !== user._id) throw new ConvexError("Invalid action")

        await ctx.db.patch(args.id, {
            isCompleted: !todo.isCompleted
        })
    }
})


export const updateTodo = mutation({
    args: {
        id:v.id("todos"),
        text:v.string()},
        
    handler: async(ctx, args) => {

        let user = await isAuthenticated(ctx)
        if (user === null)throw new Error ("User not found")        

        const todo  = await ctx.db.get(args.id)
        if (!todo) throw new ConvexError("To do not found")
        if(todo.user !== user._id) throw new ConvexError("Invalid action")

        await ctx.db.patch((args.id), {
            text:args.text
        })
    }
})

export const deleteTodo = mutation({
    args: {id:v.id("todos")},
    handler: async(ctx, args) => {
        let user = await isAuthenticated(ctx)
        if (user === null)throw new Error ("User not found")        

        const todo  = await ctx.db.get(args.id)
        if (!todo) throw new ConvexError("To do not found")
        if(todo.user !== user._id) throw new ConvexError("Invalid action")

        await ctx.db.delete(args.id)
    }
})

export const deleteAllTodo = mutation({
    handler: async(ctx) => {
        let user = await isAuthenticated(ctx)
        if (user === null)throw new Error ("User not found")     

        const todos  = await ctx.db.query("todos").filter((q) => q.eq(q.field("user"), user._id)).collect()

        for (const todo of todos){
            await ctx.db.delete(todo._id)
        }

        return {deletedCount: todos.length}

    }
})