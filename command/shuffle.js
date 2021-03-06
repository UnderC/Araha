const Model = require('./model')
const SmallRichEmbed = require('../utils/embed.js')

module.exports = class Shuffle extends Model {
  constructor () {
    super({
      cmds: ['shuffle', '셔플'],
      description: 'cmd_shuffle_desc',
      category: 'category_music',
      commandname: 'cmd_shuffle',
      isownercmd: false,
      voiceChannel: true
    })
  }

  async run (pkg) {
    const Embed = new SmallRichEmbed()
    const player = pkg.client.m.get(pkg.msg.guild.id)
    const { queue } = player

    if (this.voiceChannel && !pkg.msg.member.voiceChannel) {
      Embed.addField(pkg.lang.get('cmd_warning'), pkg.lang.get('use_in_voice'))
      Embed.setColor(14217046)
      return pkg.msg.channel.send(Embed.get())
    }

    if (!player.connection || queue.isLast) {
      Embed.addField(
        pkg.lang.get('cmd_warning'),
        pkg.lang.get('no_music_playing')
      )
      Embed.setColor(14217046)
      return pkg.msg.channel.send(Embed.get())
    }

    queue.shuffle()
    Embed.addField(pkg.lang.get('cmd_success'), pkg.lang.get('shuffled_queue'))
    pkg.msg.channel.send(Embed.get())
  }
}
