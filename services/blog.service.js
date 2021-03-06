const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();


class blogServ {
    async all_blogs() {
        try {
            return await prisma.blog.findMany({
                include: { user: true }
            })
        } catch (err) {
            return err.message;
        }
    }

    async add_blog(id, data) {
        try {
            data = { ...data, reactor_id: JSON.stringify({ liked: [], disliked: [] }), user_id: id }
            const result = await prisma.blog.create({
                data
            })
            return result;
        } catch (err) {
            return err.message;
        }
    }

    async edit_blog(user_id, id, data) {
        try {
            const result = await prisma.blog.findUnique({
                where: { id }
            })
            if (result) {
                if (user_id === result.user_id) {
                    const result2 = await prisma.blog.create({
                        where: { id },
                        data
                    })
                    return result2;
                }
                return 'You are not allowed to edit this post!!'
            }
            return 'Your post does not exist!!';

        } catch (err) {
            return err.message;

        }
    }

    async likes_dislikes(id, reactor_id, reaction) {
        try {
            const result = await prisma.blog.findUnique({
                where: { id }
            })
            console.log(JSON.parse(result.reactor_id[0]), 'this one...');
            if (result) {
                let likes = result.likes
                let dislikes = result.dislikes;
                console.log(`Likes ==> ${likes} Dislikes ==> ${dislikes}`);
                let parsedReac = JSON.parse(result.reactor_id[0])

                if (reaction.hasOwnProperty('likes') && reaction.likes) {
                    if ((parsedReac.liked).includes(reactor_id)) {
                        likes = likes - 1;
                        let isReacted = parsedReac.liked.indexOf(reactor_id);
                        if (isReacted >= 0) {
                            parsedReac.liked.splice(isReacted, 1)
                        }
                    }
                    else {
                        likes = likes + 1;
                        parsedReac.liked.push(reactor_id)
                        let isReacted = parsedReac.disliked.indexOf(reactor_id);
                        if (isReacted >= 0) {
                            parsedReac.disliked.splice(isReacted, 1)
                            dislikes = dislikes - 1;
                        }
                    }
                }
                else if (reaction.hasOwnProperty('dislikes') && reaction.dislikes) {
                    if ((parsedReac.disliked).includes(reactor_id)) {
                        dislikes = dislikes - 1;
                        let isReacted = parsedReac.disliked.indexOf(reactor_id);
                        if (isReacted >= 0) {
                            parsedReac.disliked.splice(isReacted, 1)
                        }
                    }
                    else {
                        dislikes = dislikes + 1;
                        parsedReac.disliked.push(reactor_id)
                        let isReacted = parsedReac.liked.indexOf(reactor_id);
                        if (isReacted >= 0) {
                            parsedReac.liked.splice(isReacted, 1)
                            likes = likes - 1;
                        }
                    }
                }
                const result2 = await prisma.blog.update({
                    where: { id },
                    data: {
                        likes,
                        dislikes,
                        reactor_id: JSON.stringify(parsedReac)
                    }
                })
                return result2
            }
            return 'The blog does not exist!!'
        } catch (err) {
            return err.message;
        }
    }

    async del_blog(id) {
        try {
            const result2 = await prisma.blog.findUnique({ where: { id } })
            if (result2) {
                const result = await prisma.blog.delete({ where: { id } })
                return result;
            }
            return 'The blog does not exist!!'
        } catch (err) {
            return err.message;

        }
    }
}

module.exports = blogServ;

