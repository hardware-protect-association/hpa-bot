import { createCanvas, loadImage } from "@napi-rs/canvas"

export async function generateGreetImage({
  backgroundImageUrl,
  avatarUrl,
  username,
  guildName,
}: {
  backgroundImageUrl: string
  avatarUrl: string
  username: string
  guildName: string
}): Promise<Buffer> {
  const bg = await loadImage(backgroundImageUrl)
  const avatar = await loadImage(avatarUrl)

  const canvas = createCanvas(bg.width, bg.height)
  const ctx = canvas.getContext("2d")

  ctx.drawImage(bg, 0, 0)

  ctx.drawImage(avatar, 50, 100, 200, 200)

  ctx.fillStyle = "#fff"
  ctx.font = "bold 36px Sans"
  ctx.fillText(`Welcome, ${username}`, 270, 180)
  ctx.font = "24px Sans"
  ctx.fillText(`to ${guildName}`, 270, 230)

  return canvas.encode("webp")
}
