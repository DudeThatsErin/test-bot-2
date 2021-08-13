module.exports = {
    name: 'warn',
    async execute(client, info) {

        client.logger.warn(info)
    }
}