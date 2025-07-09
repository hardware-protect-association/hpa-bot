import {
  SlashCommandBuilder,
  type ChatInputCommandInteraction,
} from "discord.js"
import { prisma } from "@/utils/client"
import { fillEmbedTemplate } from "@/utils/embed-replacer"

const greetTest = {
  data: new SlashCommandBuilder()
    .setName("greet-test")
    .setNameLocalizations({
      "zh-TW": "測試歡迎訊息",
      "zh-CN": "测试欢迎消息",
      ja: "挨拶テスト",
    })
    .setDescription(
      "Test setup greeting message for the server in current channel",
    )
    .setDescriptionLocalizations({
      "zh-TW": "在當前頻道測試伺服器歡迎訊息",
      "zh-CN": "在当前频道测试服务器欢迎消息",
      ja: "現在のチャンネルでサーバーの挨拶メッセージをテスト",
    }),
  async execute(interaction: ChatInputCommandInteraction) {
    const data = await prisma.greet.findUnique({
      where: {
        guildId: interaction.guildId as string,
      },
    })
    if (!data?.embed) return interaction.reply("請先用`/greet`指令設定歡迎訊息")
    const owner = await interaction.guild?.fetchOwner()

    const context = {
      guildName: interaction.guild?.name ?? "Unknown Guild",
      guildIcon: interaction.guild?.iconURL() ?? "",
      userId: interaction.user.id,
      year: new Date().getFullYear().toString(),
      now: new Date().toISOString(),
      ownerName: owner?.user.displayName ?? "Unknown Owner",
      ownerIcon: owner?.user.displayAvatarURL() ?? "",
    }
    const filledEmbed = fillEmbedTemplate(data.embed, context)

    await interaction.reply({
      content: "歡迎訊息測試",
      embeds: [filledEmbed as import("discord.js").APIEmbed],
    })
  },
}

export default greetTest
