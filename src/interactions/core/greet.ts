import {
  SlashCommandBuilder,
  type ChatInputCommandInteraction,
} from "discord.js"
import { prisma } from "@/utils/client"

const greet = {
  data: new SlashCommandBuilder()
    .setName("greet")
    .setNameLocalizations({
      "zh-TW": "歡迎訊息",
      "zh-CN": "欢迎消息",
      ja: "挨拶",
    })
    .setDescription("Setup greeting message for the server")
    .setDescriptionLocalizations({
      "zh-TW": "設定伺服器歡迎訊息",
      "zh-CN": "设置服务器欢迎消息",
      ja: "サーバーの挨拶メッセージを設定",
    })
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setNameLocalizations({
          "zh-TW": "頻道",
          "zh-CN": "频道",
          ja: "チャンネル",
        })
        .setDescription("Select the channel for the greeting message")
        .setDescriptionLocalizations({
          "zh-TW": "選擇歡迎訊息的頻道",
          "zh-CN": "选择欢迎消息的频道",
          ja: "挨拶メッセージのチャンネルを選択",
        })
        .setRequired(true),
    )
    .addStringOption((option) =>
      option
        .setName("message")
        .setNameLocalizations({
          "zh-TW": "訊息",
          "zh-CN": "消息",
          ja: "メッセージ",
        })
        .setDescription("The greeting message")
        .setDescriptionLocalizations({
          "zh-TW": "歡迎訊息",
          "zh-CN": "欢迎消息",
          ja: "挨拶メッセージ",
        })
        .setRequired(true),
    ),
  async execute(interaction: ChatInputCommandInteraction) {
    const channel = interaction.options.getChannel("channel")
    const message = interaction.options.getString("message") as string
    const embed = {
      title: "歡迎加入**{guildName}**!",
      author: {
        name: "{ownerName}",
        icon_url: "{ownerAvatar",
        url: "https://www.youtube.com/@fishgood9583",
      },
      description: "歡迎你的加入 <@{userId}>!",
      thumbnail: {
        url: "{guildIcon",
      },
      color: 0x4c6de8,
      footer: {
        text: "© {year} なるこStudio",
        icon_url: "https://naruko.studio/logo.svg",
      },
      timestamp: "{now}",
    }
    try {
      await prisma.greet.create({
        data: {
          guildId: interaction.guildId as string,
          channelId: channel?.id as string,
          message,
          embed,
        },
      })
    } catch (error) {
      console.error("Error creating greet entry:", error)
    }
    await interaction.reply("content")
  },
}

export default greet
