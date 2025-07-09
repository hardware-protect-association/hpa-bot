import {
  SlashCommandBuilder,
  EmbedBuilder,
  type ChatInputCommandInteraction,
} from "discord.js"

const ping = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setNameLocalizations({
      "zh-TW": "ping",
      "zh-CN": "ping",
      ja: "ping",
    })
    .setDescription("Get latency and API ping")
    .setDescriptionLocalizations({
      "zh-TW": "取得延遲和 API Ping",
      "zh-CN": "获取延迟和 API Ping",
      ja: "レイテンシとAPIのPingを取得",
    }),
  async execute(interaction: ChatInputCommandInteraction) {
    const embed = new EmbedBuilder()
      .setColor("Random")
      .setTitle("Pong!")
      .setAuthor({
        name: interaction.client.user.displayName,
        iconURL: interaction.client.user.displayAvatarURL(),
      })
      .setDescription(
        `WebSocket Ping: ${Math.round(interaction.client.ws.ping)}ms\n` +
          `API Ping: ${Date.now() - interaction.createdTimestamp}ms`,
      )
      .setFooter({
        text: `© ${new Date().getFullYear()} なるこStudio`,
        iconURL: "https://naruko.studio/logo.svg",
      })
    await interaction.reply({ embeds: [embed] })
  },
}
export default ping
