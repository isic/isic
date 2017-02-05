const Discord = require("discord.js")

class DiscordHandler extends Discord.Client {
    constructor(bot, token) {
        super()

        this.bot = bot

        this.login(token)
    }

    get servers() {
        return this.guilds.array()
    }

    findUser(id) {
        return this.users.get(id)
    }

    hasPermission(server, user, permissions) {
        if(!server || !user) {
            return false
        }

        if(!Array.isArray(permissions)) {
            permissions = [permissions]
        }

        if(permissions.length == 0) {
            return true
        }

        let serverUser = server.members.get(user.id)
        return serverUser.hasPermissions(permissions)
    }

    canI(server, permissions) {
        return this.hasPermission(server, this.user, permissions)
    }

    emojiExists(server, name) {
        return server.emojis.filterArray(e => e.name === name).length > 0
    }

    serverEmoji(server, name, altText) {
        try {
            const emojis = server.emojis.filterArray(e => e.name === name)

            if(emojis.length > 0) {
                let [emoji, ...rest] = emojis
                return `<:${name}:${emoji.id}>`
            }
        } catch(ex) {
            this.bot.log.warn("Potentially wanted TypeError for property 'emojis' of null, because server can be a DM", ex)
        }

        if(typeof altText !== "undefined") {
            return altText
        }

        return name
    }
}

module.exports = DiscordHandler
