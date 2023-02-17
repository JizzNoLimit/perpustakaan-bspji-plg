import cookies from "next-cookies";
import jwt from "jsonwebtoken";

export function authPageAdmin(ctx) {
    return new Promise((resolve) => {
        const token = cookies(ctx);

        if (!token.token) {
            return ctx.res
                .writeHead(302, {
                    Location: "/",
                })
                .end();
        }
        const user = jwt.decode(token.token, process.env.TOKEN_SECRET)
        if (user.role !== 'admin') {
            return ctx.res 
                .writeHead(302, {
                    Location: "/",
                })
                .end();
        }

        return resolve({
            token: token.token,
            user
        });
    });
}

export function authPageKepala(ctx) {
    return new Promise((resolve) => {
        const token = cookies(ctx);

        if (!token.token) {
            return ctx.res
                .writeHead(302, {
                    Location: "/",
                })
                .end();
        }
        const user = jwt.decode(token.token, process.env.TOKEN_SECRET)
        if (user.role !== 'kepala') {
            return ctx.res
                .writeHead(302, {
                    Location: "/",
                })
                .end();
        }

        return resolve({
            token: token.token,
            user
        });
    });
}

export function authPageUser(ctx) {
    return new Promise((resolve) => {
        const token = cookies(ctx);

        if (!token.token) {
            return ctx.res
                .writeHead(302, {
                    Location: "/",
                })
                .end();
        }
        const user = jwt.decode(token.token, process.env.TOKEN_SECRET)
        if (user.role !== 'user') {
            return ctx.res
                .writeHead(302, {
                    Location: "/",
                })
                .end();
        }

        return resolve({
            token: token.token,
            user
        });
    });
}